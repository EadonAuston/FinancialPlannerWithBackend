import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState<boolean>(false);

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      navigate("/Home");
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Welcome to Financial Planner!
            </h1>
            <p className="mb-5">
              Envision your future, visualize your finances, and own your money
            </p>
            {!showOptions ? (
              <button
                className="btn btn-accent"
                onClick={() => setShowOptions(true)}>
                Get Started
              </button>
            ) : (
              <div>
                <Link to={"/SignIn"} className="btn btn-accent mr-[42px] ">
                  Sign In
                </Link>
                <Link to={"/SignUp"} className="btn btn-accent">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
