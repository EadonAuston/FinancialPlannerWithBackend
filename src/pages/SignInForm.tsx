import { Link, useNavigate } from "react-router-dom";
import { Requests } from "../api";
import { useState } from "react";
import { User } from "../types";
import { useAuth } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const SignInForm = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <Link to={"/"} className="btn btn-accent">
              {"< Back"}
            </Link>
            <h1 className="text-5xl font-bold mt-[80px]">Login now!</h1>
            <p className="py-6">
              Welcome back to Financial Planner! We're thrilled to have you
              here. Your financial well-being is our top priority, and we're
              committed to providing you with a secure and seamless experience.
              Whether you're checking your balances, managing transactions, or
              planning for your financial goals, we're here to support you every
              step of the way. Thank you for choosing Financial Planner, where
              your financial success begins. Let's make every transaction count!
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              className="card-body"
              onSubmit={(e) => {
                e.preventDefault();
                Requests.fetchAllDataAtEndpoint("users").then((data) => {
                  const result = data.find(
                    (user: User) =>
                      user.username === username && user.password === password
                  );
                  if (result === undefined) {
                    toast.error("Invalid Credentials");
                  } else {
                    setUser(result);
                    localStorage.setItem("user", JSON.stringify(result));
                    navigate("/Home");
                  }
                });
              }}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username:</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  required
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
