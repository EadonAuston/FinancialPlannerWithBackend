import { useState } from "react";
import AddLiquidAsset from "../EditLiquidAssetsForms/AddLiquidAsset";
import EditLiquidAsset from "../EditLiquidAssetsForms/EditLiquidAsset";
import DeleteLiquidAsset from "../EditLiquidAssetsForms/DeleteLiquidAsset";

const LiquidAssets = ({
  setNewUser,
}: {
  setNewUser?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) => {
  const [radio, setRadio] = useState<"Add" | "Edit" | "Delete">("Add");
  return (
    <div className="lg:w-[400px]  w-[50vw] mt-[100px]">
      <div className="flex items-center justify-around">
        <div>
          <input
            type="radio"
            name="radio"
            className="radio radio-accent size-[20px] mr-2"
            id="add"
            onClick={() => setRadio("Add")}
            defaultChecked={true}
          />
          <label htmlFor="add" className="text-[25px]">
            Add
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="radio"
            className="radio radio-accent size-[20px] mr-2"
            id="edit"
            onClick={() => setRadio("Edit")}
          />
          <label htmlFor="edit" className="text-[25px]">
            Edit
          </label>
        </div>
        <div>
          <input
            type="radio"
            name="radio"
            className="radio radio-accent size-[20px] mr-2"
            id="delete"
            onClick={() => setRadio("Delete")}
          />
          <label htmlFor="delete" className="text-[25px]">
            Delete
          </label>
        </div>
      </div>

      <br />

      {radio === "Add" ? (
        <AddLiquidAsset setNewUser={setNewUser} />
      ) : radio === "Edit" ? (
        <EditLiquidAsset />
      ) : (
        <DeleteLiquidAsset />
      )}
    </div>
  );
};

export default LiquidAssets;
