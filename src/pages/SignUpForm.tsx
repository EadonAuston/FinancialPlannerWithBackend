import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Requests } from "../api";
import { User } from "../types";
import toast from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";

const SignUpForm = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
  const navigate = useNavigate();

  const checkIfUsernameIsTaken = () => {
    Requests.fetchAllDataAtEndpoint("users").then((data) => {
      const result = data.find((user: User) => user.username === username);
      if (result !== undefined) {
        toast.error("This username is already taken");
      } else {
        register({ username, password });
        navigate("/Home");
      }
    });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Link to={"/"} className="btn btn-accent">
              {"< Back"}
            </Link>
            <h1 className="text-5xl font-bold mt-[170px]">
              Create an Account!
            </h1>
            <p className="py-6">
              Welcome to Financial Planner! We're delighted to have you on
              board. Get ready to embark on a journey of financial empowerment
              and seamless banking. By creating an account with us, you've taken
              the first step towards a smarter and more convenient way to manage
              your finances. Whether you're saving, investing, or planning for
              the future, we're here to support your financial goals. Thank you
              for choosing Financial Planner. Let's build a brighter financial
              future together!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              className="card-body"
              onSubmit={(e) => {
                e.preventDefault();
                if (cpassword === password) {
                  checkIfUsernameIsTaken();
                } else {
                  toast.error(
                    "Make sure that the password and confirm passwords match"
                  );
                }
              }}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username:</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password:</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password:</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  onChange={(e) => {
                    setCPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
