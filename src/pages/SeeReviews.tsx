import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Requests } from "../api";
import { TReviews, User } from "../types";

const SeeReviews = () => {
  const [averageRating, setAverageRating] = useState<number>(0);
  const [reviews, setReviews] = useState<TReviews[]>([] as TReviews[]);
  const [users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    Requests.fetchAllDataAtEndpoint("reviews").then((data) => {
      setAverageRating(
        data.reduce(
          (acc: number, curr: TReviews) => acc + Number(curr.value),
          0
        ) / data.length
      );
      setReviews(data);
    });

    Requests.fetchAllDataAtEndpoint("users").then((data) => {
      setUsers(data);
    });
  }, []);

  const generateMoonRating = (rating: number) => {
    const fullMoons = Math.floor(rating);
    const fractionalPart = rating % 1;

    const moons = [];

    // Add full moons
    for (let i = 0; i < fullMoons; i++) {
      moons.push(<span key={i}>🌕</span>);
    }

    // Add fractional moon if applicable
    if (fractionalPart > 0) {
      moons.push(<span key="fractional">🌗</span>);
    }

    // Add empty moons to make a total of 5 moons
    const remainingMoons = 5 - moons.length;
    for (let i = 0; i < remainingMoons; i++) {
      moons.push(<span key={`empty${i}`}>🌑</span>);
    }

    return moons;
  };

  return (
    <div className="flex items-center justify-center flex-col mt-[20px]">
      <div className="mr-[50vw]">
        <Link
          to={"/Home"}
          className="btn btn-accent flex md:max-w-[450] mt-[10px] ">
          {"Back to Home"}
        </Link>
      </div>

      <div className="lg:text-[50px] text-center md:text-[40px] text-[30px]">
        <div>Average Review:</div>
        <div>
          {averageRating} {generateMoonRating(averageRating)}
        </div>
      </div>
      <hr />
      {reviews.map((review) => {
        const foundUser = users.find((user) => user.id === review.userId);

        return (
          <div
            className={`w-[50vw] ${
              Number(review.value) >= 3 ? "border-accent" : "border-error"
            } border-[5px] my-[10px] p-[20px] text-center`}>
            <div>{`${foundUser?.username}: ${review.value}`}</div>
            {review.comment !== "" ? <div>{`${review.comment}`}</div> : ""}
          </div>
        );
      })}
    </div>
  );
};

export default SeeReviews;
