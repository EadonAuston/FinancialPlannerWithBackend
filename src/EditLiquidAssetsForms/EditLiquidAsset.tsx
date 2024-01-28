import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { useChartData } from "../providers/ChartDataProvider";

const EditLiquidAsset = () => {
  const { user } = useAuth();
  const { setChartData } = useChartData();
  const [labels, setLabels] = useState<string[]>(["", "", ""]);
  const [dataId, setDataId] = useState<string[]>(["", "", ""]);
  const [labelToUpdate, setLabelToUpdate] = useState<string>("");
  const [liquidAssetsValue, setLiquidAssetsValue] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [indexToPatch, setIndexToPatch] = useState<number>(0);

  useEffect(() => {
    if (user !== null) {
      Requests.formatUserBarChartData(user)
        .then((data) => {
          setDataId(data.userDataId);
          setLabelToUpdate(data.labels[0]);
          setLiquidAssetsValue(data.datasets[0].data[0]);
          setColor(data.datasets[0].backgroundColor[0]);
          setLabels(data.labels);
        })
        .catch(() => toast.error("Error Fetching Chart Data"));
    }
  }, [user]);
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (user !== null) {
          Requests.patchBarChart(
            dataId[indexToPatch],
            liquidAssetsValue,
            labelToUpdate,
            color,
            user.id
          )
            .then(() => {
              Requests.formatUserBarChartData(user).then((data) => {
                setChartData(data);
              });
            })
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
          <select
            className="select select-bordered max-w-xs"
            name=""
            id=""
            onChange={(e) => {
              if (user !== null) {
                setIndexToPatch(e.target.selectedIndex);
                setLabelToUpdate(e.target.value);
                Requests.formatUserBarChartData(user).then((data) => {
                  setColor(
                    data.datasets[0].backgroundColor[e.target.selectedIndex]
                  );
                  setLiquidAssetsValue(
                    data.datasets[0].data[e.target.selectedIndex]
                  );
                });
              }
            }}>
            {labels.map((eachItem, index) => (
              <option
                value={`${eachItem}`}
                id={`${index}`}
                key={`${eachItem}${index}`}>
                {eachItem}
              </option>
            ))}
          </select>
          <span className="label-text">Which label do you want to change?</span>
        </div>
      </label>
      <label
        className="form-control w-full max-w-[450px] mb-[10px]"
        htmlFor="label">
        <div className="label">
          <span className="label-text">Change Label Name to?</span>
          <span className="label-text-alt">
            Don't need to change if you don't want to
          </span>
        </div>
        <input
          type="text"
          onChange={(e) => setLabelToUpdate(e.target.value)}
          value={labelToUpdate}
          id="label"
          className="input input-bordered w-full max-w-[450px]"
        />
      </label>
      <label
        className="form-control w-full max-w-[450px] mb-[10px]"
        htmlFor="label">
        <div className="label">
          <span className="label-text">Liquid Asset Value:</span>
          <span className="label-text-alt">($)</span>
        </div>
        <input
          type="number"
          min={1}
          id="value"
          value={liquidAssetsValue === "0" ? "" : liquidAssetsValue}
          onKeyDown={(e) => {
            if (e.key === "e" || e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
          className="input input-bordered w-full max-w-[450px]"
          onChange={(e) => setLiquidAssetsValue(e.target.value)}
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

export default EditLiquidAsset;
