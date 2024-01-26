import { useState } from "react";
import { Link } from "react-router-dom";
import AddMonthlyExpense from "../EditMonthlyExpensesForms/AddMonthlyExpense";
import EditMonthlyExpense from "../EditMonthlyExpensesForms/EditMonthlyExpense";
import { useDoughnut } from "../providers/DoughnutDataProvider";

const EditMonthlyExpenses = () => {
  const { totalMonthlyExpense } = useDoughnut();
  const [radio, setRadio] = useState<"Add" | "Edit" | "Delete">("Add");
  return (
    <div className="md:mt-[100px] ">
      <Link
        to={"/Home"}
        className="btn btn-accent flex mt-[70px] mb-[-60px] md:max-w-[450] md:mt-[10px]">
        {"Back to Home"}
      </Link>
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
        </div>

        <br />

        {radio === "Add" ? (
          <AddMonthlyExpense />
        ) : radio === "Edit" ? (
          <EditMonthlyExpense />
        ) : (
          <div>Error Occurred</div>
        )}
      </div>
      <div className="my-[50px] text-[20px]">{`Total Monthly Expenses: $${totalMonthlyExpense}`}</div>
    </div>
  );
};

export default EditMonthlyExpenses;
