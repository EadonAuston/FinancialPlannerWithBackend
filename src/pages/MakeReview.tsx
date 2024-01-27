import { useState } from "react";
import { Link } from "react-router-dom";
import { Requests } from "../api";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const MakeReview = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          if (user !== null) {
            e.preventDefault();
            if (rating !== null && rating >= 1 && rating <= 5) {
              Requests.postReview(Number(rating), comment, user.id)
                .then(() => toast.success("Review Successfully Created"))
                .then(() => {
                  setRating(null);
                  setComment("");
                })
                .catch(() => toast.error("An error has occurred"));
            } else toast.error("You need to have a number in the input field");
          }
        }}
        className="flex items-center justify-center flex-col mt-[20px]">
        <div className="mr-[50vw]">
          <Link
            to={"/Home"}
            className="btn btn-accent flex md:max-w-[450] mt-[10px]">
            {"Back to Home"}
          </Link>
        </div>

        <div className="label">
          <input
            type="radio"
            name="add"
            id=""
            className="radio radio-accent size-[20px] mr-2"
            defaultChecked
          />
          <label htmlFor="add" className="text-[25px]">
            Add Review
          </label>
        </div>
        <span className="label-text">Rating out of 5:</span>
        <input
          type="number"
          min={1}
          max={5}
          placeholder="Type number here"
          value={rating === 0 || rating === null ? "" : rating}
          id="ratingValue"
          className="input input-bordered w-full max-w-[450px]"
          onKeyDown={(e) => {
            if (e.key === "e" || e.key === "+" || e.key === "-") {
              e.preventDefault();
            }
          }}
          onChange={(e) =>
            setRating(
              Number(e.target.value) > 5 ? rating : Number(e.target.value)
            )
          }
        />
        <br />
        <label htmlFor="commentValue">
          Reasoning, constructive criticism, additional comments: (optional)
        </label>
        <br />
        <textarea
          className="textarea textarea-bordered w-[90vw] h-[500px] lg:w-[70vw]"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          value={comment}
          id="commentValue"
        />
        <br />
        <input className="btn btn-outline btn-accent" type="submit" />
      </form>
    </>
  );
};

export default MakeReview;
