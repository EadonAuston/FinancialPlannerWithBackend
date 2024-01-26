import { useState } from "react";
import { Requests } from "../api";
import { useAuth } from "../providers/authProvider";
import { useDoughnut } from "../providers/DoughnutDataProvider";
import toast from "react-hot-toast";

const AddMonthlyExpense = () => {
  const { user } = useAuth();
  const { setUserData, setTotalMonthlyExpense } = useDoughnut();
  const [label, setLabel] = useState<string>("");
  const [monthlyExpenseValue, setMonthlyExpenseValue] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (user === null) {
          return;
        } else {
          Requests.createMonthlyExpense(
            user?.id,
            monthlyExpenseValue,
            label,
            color
          )
            .then(() =>
              Requests.formatUserDoughnutChartData(user).then((data) => {
                setUserData(data);
                const averageMonthlyExpense = data.datasets[0].data.reduce(
                  (acc, current) => Number(acc) + Number(current),
                  0
                );
                setTotalMonthlyExpense(averageMonthlyExpense);
              })
            )
            .then(() => toast.success("Data Updated!"))
            .catch(() =>
              toast.error("Something went wrong submitting the changes...")
            );
        }
      }}>
      <label
        className="form-control w-full max-w-[450px] mb-[10px]"
        htmlFor="label">
        <div className="label">
          <span className="label-text">Monthly Expense Name:</span>
          <span className="label-text-alt">ie. "Rent", "Car"...</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          value={label}
          id="label"
          className="input input-bordered w-full max-w-[450px]"
          onChange={(e) => setLabel(e.target.value)}
        />
      </label>
      <label
        className="form-control w-full max-w-[450px] mb-[10px]"
        htmlFor="label">
        <div className="label">
          <span className="label-text">Monthly Expense Cost:</span>
          <span className="label-text-alt">($)</span>
        </div>
        <input
          type="number"
          min={1}
          placeholder="Type number here"
          value={monthlyExpenseValue === "0" ? "" : monthlyExpenseValue}
          id="value"
          className="input input-bordered w-full max-w-[450px]"
          onKeyDown={(e) => {
            if (e.key === "e" || e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
          onChange={(e) => setMonthlyExpenseValue(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-[450px]" htmlFor="label">
        <div className="label">
          <span className="label-text">Color:</span>
          <input
            type="color"
            value={color}
            id="color"
            className="input w-full max-w-[100px]"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <input className="btn btn-outline btn-accent" type="submit" />
      </label>
    </form>
  );
};
export default AddMonthlyExpense;
