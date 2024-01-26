import { useEffect, useState } from "react";
import { useAuth } from "../providers/authProvider";
import { Requests } from "../api";
import toast from "react-hot-toast";
import "../pages/MonthlyExpenses.css";
import { useDoughnut } from "../providers/DoughnutDataProvider";

const EditMonthlyExpense = () => {
  const { user } = useAuth();
  const { setUserData, setTotalMonthlyExpense } = useDoughnut();
  const [monthlyExpenses, setMonthlyExpenses] = useState<
    Array<{
      label: string;
      value: string;
      color: string;
      dataId: string;
    }>
  >([]);

  useEffect(() => {
    if (user !== null) {
      Requests.formatUserDoughnutChartData(user)
        .then((data) => {
          setUserData(data);
          setMonthlyExpenses(
            data.labels.map((label, index) => ({
              label,
              value: data.datasets[0].data[index],
              color: data.datasets[0].backgroundColor[index],
              dataId: data.userDataId[index],
            }))
          );
        })
        .catch(() => toast.error("Error Fetching Chart Data"));
    }
  }, [user, setUserData]);

  const handleUpdate = () => {
    if (user !== null) {
      for (let i = 0; i < monthlyExpenses.length; i++) {
        const { dataId, value, label, color } = monthlyExpenses[i];
        Requests.patchDoughnutChart(dataId, value, label, color, user.id)
          .then(() => {
            Requests.formatUserDoughnutChartData(user).then((data) => {
              setUserData(data);
              const averageMonthlyExpense = data.datasets[0].data.reduce(
                (acc, current) => Number(acc) + Number(current),
                0
              );
              setTotalMonthlyExpense(averageMonthlyExpense);
            });
          })
          .then(() => {
            if (i === monthlyExpenses.length - 1) {
              toast.success("Data Updated!");
            }
          })
          .catch(() =>
            toast.error("Something went wrong submitting the changes...")
          );
      }
    }
  };

  const handleDelete = (index: number) => {
    if (user !== null) {
      const deletedItem = monthlyExpenses[index];
      Requests.deleteDoughnutChart(deletedItem.dataId)
        .then(() => {
          Requests.formatUserDoughnutChartData(user).then((data) => {
            setUserData(data);
            const averageMonthlyExpense = data.datasets[0].data.reduce(
              (acc, current) => Number(acc) + Number(current),
              0
            );
            setTotalMonthlyExpense(averageMonthlyExpense);
            setMonthlyExpenses((prevExpenses) =>
              prevExpenses.filter((_, i) => i !== index)
            );
          });
        })
        .then(() => toast.success("Successfully Deleted!"))
        .catch(() => toast.error("Something went wrong deleting the item..."));
    }
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdate();
      }}>
      <div className="overflow-x-auto">
        <table className="table border-[1px]">
          <tbody>
            {monthlyExpenses.map((item, index) => (
              <tr key={index}>
                <td className="">
                  <input
                    className="input input-bordered w-[80px] max-w-xs pr-0 pl-[0.5rem]"
                    type="number"
                    value={item.value === "0" ? "" : item.value}
                    placeholder="Cost"
                    onKeyDown={(e) => {
                      if (e.key === "e" || e.key === "+" || e.key === "-") {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setMonthlyExpenses((prevExpenses) => {
                        const updatedExpenses = [...prevExpenses];
                        updatedExpenses[index] = {
                          ...item,
                          value: newValue === "" ? "0" : newValue,
                        };
                        return updatedExpenses;
                      });
                    }}
                  />
                </td>
                <td className="w-auto">
                  <input
                    type="color"
                    value={item.color}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setMonthlyExpenses((prevExpenses) => {
                        const updatedExpenses = [...prevExpenses];
                        updatedExpenses[index] = {
                          ...item,
                          color: newValue,
                        };
                        return updatedExpenses;
                      });
                    }}
                  />
                </td>
                <td className="w-auto">
                  <input
                    className="input input-bordered w-[80px] max-w-xs pr-0 pl-[0.5rem]"
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setMonthlyExpenses((prevExpenses) => {
                        const updatedExpenses = [...prevExpenses];
                        updatedExpenses[index] = {
                          ...item,
                          label: newValue,
                        };
                        return updatedExpenses;
                      });
                    }}
                  />
                </td>
                <td className="w-auto">
                  <button type="button" onClick={() => handleDelete(index)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <input className="btn btn-outline btn-accent mt-[10px]" type="submit" />
    </form>
  );
};

export default EditMonthlyExpense;
