import { useEffect, useState } from "react";
import { Requests } from "../api";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type TCheckList = {
  id: string;
  name: string;
  price: string;
  userId: string;
};

const CheckList = () => {
  const { user } = useAuth();
  const [userCheckList, setUserCheckList] = useState<TCheckList[]>([
    { id: "0", name: "", price: "", userId: "" },
  ]);
  const [itemName, setItemName] = useState<string>("");
  const [itemCost, setItemCost] = useState<string>("");

  const successQuotes = [
    "You got it!",
    "Yippeee!",
    "Feels good to get what you want",
    "Onto getting the next one!",
    "Success... Success",
  ];
  const getRandomSuccessQuote = () =>
    successQuotes[Math.floor(Math.random() * successQuotes.length)];

  useEffect(() => {
    if (user !== null) {
      Requests.fetchAllDataAtEndpoint("checklist").then((data) =>
        setUserCheckList(
          data.filter((userData: TCheckList) => userData.userId === user.id)
        )
      );
    }
  }, [user]);

  const handleDelete = (itemId: string) => {
    Requests.deleteCheckListItem(itemId).then(() => {
      if (user !== null) {
        Requests.fetchAllDataAtEndpoint("checklist")
          .then((data) =>
            setUserCheckList(
              data.filter((userData: TCheckList) => userData.userId === user.id)
            )
          )
          .then(() => toast.success("Deleted Successfully"));
      }
    });
  };

  const handleCheck = (itemId: string) => {
    Requests.deleteCheckListItem(itemId)
      .then(() => {
        if (user !== null) {
          Requests.fetchAllDataAtEndpoint("checklist").then((data) =>
            setUserCheckList(
              data.filter((userData: TCheckList) => userData.userId === user.id)
            )
          );
        }
      })
      .then(() => {
        toast.success(getRandomSuccessQuote());
      });
  };

  return (
    <div className="w-[90vw] ml-[5vw] flex flex-col lg:flex-row text-center items-center justify-center">
      <div className="flex flex-col">
        <Link
          to={"/Home"}
          className="btn btn-accent flex md:max-w-[450] my-[10px] max-w-[150px]">
          {"Back to Home"}
        </Link>
        <div className="flex flex-col text-center items-center lg:mr-[20px] md:mr-[20px]">
          <h1 className="text-center text-[30px] lg:text-[40px] md:text-[30px] lg:mr-[20px]">
            Financial Wishes / Goals Checklist:
          </h1>
          {userCheckList.map((item) => (
            <div
              className="flex justify-evenly items-center w-[50vw] mt-[15px]"
              key={item.id}>
              <button onClick={() => handleDelete(item.id)}>🗑️</button>
              <div className="w-[30%] text-center">
                {item.name}: ${item.price}
              </div>

              <button
                onClick={() => handleCheck(item.id)}
                className="btn btn-accent min-h-0 h-[20px]">
                ✓
              </button>
            </div>
          ))}
        </div>
      </div>

      <form
        action=""
        className="text-center display justify-center mt-[50px]"
        onSubmit={(e) => {
          e.preventDefault();
          if (user !== null) {
            Requests.AddCheckListItem(itemName, itemCost, user?.id)
              .then(() => toast.success("List Item Successfully Created"))
              .then(() =>
                Requests.fetchAllDataAtEndpoint("checklist").then((data) =>
                  setUserCheckList(
                    data.filter(
                      (userData: TCheckList) => userData.userId === user.id
                    )
                  )
                )
              );
          }
        }}>
        <input
          type="radio"
          name="add"
          id=""
          className="radio radio-accent size-[20px] mr-2"
          defaultChecked
        />
        <label htmlFor="add" className="text-[25px]">
          Add
        </label>
        <label
          className="form-control w-full max-w-[450px] mb-[10px]"
          htmlFor="label">
          <div className="label">
            <span className="label-text">Item Name:</span>
            <span className="label-text-alt">item, wish, gift, etc</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            value={itemName}
            id="label"
            className="input input-bordered w-full max-w-[450px]"
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>
        <label
          className="form-control w-full max-w-[450px] mb-[10px]"
          htmlFor="label">
          <div className="label">
            <span className="label-text">Item Cost:</span>
            <span className="label-text-alt">($)</span>
          </div>
          <input
            type="number"
            min={1}
            placeholder="Type number here"
            value={itemCost === "0" ? "" : itemCost}
            id="value"
            className="input input-bordered w-full max-w-[450px]"
            onKeyDown={(e) => {
              if (e.key === "e" || e.key === "+" || e.key === "-") {
                e.preventDefault();
              }
            }}
            onChange={(e) => setItemCost(e.target.value)}
          />
        </label>
        <input className="btn btn-outline btn-accent" type="submit" />
      </form>
    </div>
  );
};

export default CheckList;
