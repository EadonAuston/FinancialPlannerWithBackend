import { useState } from "react";
import { Requests } from "../api";
import { useAuth } from "../providers/authProvider";
import { useChartData } from "../providers/ChartDataProvider";
import toast from "react-hot-toast";

const AddLiquidAsset = ({
  setNewUser,
}: {
  setNewUser?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) => {
  const { user } = useAuth();
  const { setChartData } = useChartData();
  const [label, setLabel] = useState<string>("");
  const [liquidAssetsValue, setLiquidAssetsValue] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (user !== null) {
          Requests.createBarChart(user?.id, liquidAssetsValue, label, color)
            .then(() =>
              Requests.formatUserBarChartData(user).then((data) =>
                setChartData(data)
              )
            )
            .then(() => toast.success("Data Successfully Created"))
            .then(() => {
              if (setNewUser !== undefined) {
                setNewUser(false);
              }
            })

            .catch(() => toast.error("An error has occurred"));
        }
      }}>
      <label
        className="form-control w-full max-w-[450px] mb-[10px]"
        htmlFor="label">
        <div className="label">
          <span className="label-text">Label Name:</span>
          <span className="label-text-alt">Date / Time / Etc</span>
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
          <span className="label-text">Liquid Asset Value:</span>
          <span className="label-text-alt">($)</span>
        </div>
        <input
          type="number"
          min={1}
          placeholder="Type number here"
          value={liquidAssetsValue === "0" ? "" : liquidAssetsValue}
          id="value"
          className="input input-bordered w-full max-w-[450px]"
          onKeyDown={(e) => {
            if (e.key === "e" || e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
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
      <br />
    </form>
  );
};
export default AddLiquidAsset;
