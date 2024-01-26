import { useEffect, useState } from "react";
import { Requests } from "../api";
import { useAuth } from "../providers/authProvider";
import toast from "react-hot-toast";
import { useChartData } from "../providers/ChartDataProvider";

const DeleteLiquidAsset = () => {
  const { user } = useAuth();
  const { setChartData } = useChartData();
  const [labels, setLabels] = useState<string[]>(["", "", ""]);
  const [dataId, setDataId] = useState<string[]>(["", "", ""]);
  const [indexToDelete, setIndexToDelete] = useState<number>(0);

  useEffect(() => {
    if (user !== null) {
      Requests.formatUserBarChartData(user)
        .then((data) => {
          setDataId(data.userDataId);
          return setLabels(data.labels);
        })
        .catch(() => toast.error("Error Fetching Chart Data"));
    }
  }, [labels, user]);

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (user !== null) {
          Requests.deleteBarChart(dataId[indexToDelete])
            .then(() =>
              Requests.formatUserBarChartData(user).then((data) =>
                setChartData(data)
              )
            )
            .then(() => toast.success("Successfully Deleted"))
            .catch(() => toast.error("An error has occurred"));
        }
      }}>
      <label
        className="form-control w-full max-w-[450px] mb-[10px]"
        htmlFor="label">
        <div className="label">
          <select
            className="select select-bordered max-w-xs"
            name=""
            id=""
            onChange={(e) => setIndexToDelete(e.target.selectedIndex)}>
            {labels.map((eachItem, index) => (
              <option
                value={`${eachItem}`}
                id={`${index}`}
                key={`${eachItem}${index}`}>
                {eachItem}
              </option>
            ))}
          </select>
          <span className="label-text">Pick a label to delete</span>
        </div>
        <input className="btn btn-outline btn-accent" type="submit" />
      </label>
    </form>
  );
};

export default DeleteLiquidAsset;
