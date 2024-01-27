import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Requests } from "../api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import LiquidAssets from "./LiquidAssets";
import { useChartData } from "../providers/ChartDataProvider";

const Home = () => {
  const { logout, user } = useAuth();
  const { chartData, setChartData } = useChartData();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    const boilerPlateDataForNewUser = [
      { value: "500", label: "Wallet", color: "#FF0000" },
      { value: "2000", label: "Bank", color: "#FF00FF" },
      { value: "1000", label: "Savings", color: "#0000FF" },
    ];

    const testData = async () => {
      if (user !== null) {
        await Requests.formatUserBarChartData(user)
          .then((data) => {
            if (data.labels.length < 1) {
              for (let i = 0; i < boilerPlateDataForNewUser.length; i++) {
                const { value, label, color } = boilerPlateDataForNewUser[i];
                Requests.createBarChart(user.id, value, label, color).then(() =>
                  Requests.formatUserBarChartData(user).then((data) =>
                    setChartData(data)
                  )
                );
              }
              setShowWelcomeModal(true);
            }
          })
          .catch(() => toast.error("Error Fetching Chart Data"));
      }
    };
    testData();
  }, [user, setChartData]);

  return (
    <div className="flex items-center flex-col">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to={"/MonthlyExpenses"}>Monthly Expense Graph</Link>
              </li>
              <li>
                <Link to={"/CheckList"}>Financial Goals Checklist</Link>
              </li>
              <li>
                <a>Reviews</a>
                <ul className="p-2">
                  <li>
                    <Link to={"/makeReview"}>Leave a Review!</Link>
                  </li>
                  <li>
                    <Link to={"/seeReviews"}>See Our Reviews!</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">{`Welcome ${
            user !== null ? user.username : "User"
          }!`}</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/MonthlyExpenses"}>Monthly Expense Graph</Link>
            </li>
            <li>
              <Link to={"/CheckList"}>Financial Goals Checklist</Link>
            </li>
            <li>
              <details
                className=""
                onMouseEnter={() => setShowDetails(true)}
                open={showDetails}
                onMouseLeave={() => setShowDetails(false)}>
                <summary className="text-[15px]">Reviews</summary>
                <ul className="p-2 pt-[10px ]" style={{ marginTop: "0px" }}>
                  <li>
                    <Link
                      to={"/makeReview"}
                      className="btn btn-accent hover:border-[1px] hover:bg-white hover:text-accent text-center">
                      Leave a Review!
                    </Link>
                  </li>
                  <br />
                  <li>
                    <Link
                      to={"/seeReviews"}
                      className="btn btn-accent hover:border-[1px] hover:bg-white hover:text-accent text-center">
                      See Our Reviews!
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            to={"/"}
            className="btn btn-accent hover:border-[1px] hover:bg-white hover:text-accent"
            onClick={() => logout()}>
            Log Out
          </Link>
        </div>
      </div>
      <br />
      <div className="flex flex-col items-center mx-[50px] lg:flex-row md:flex-col md:items-center sm:flex-col sm:items-center">
        <div className="lg:w-[50vw] md:w-[600px] h-[350px] mr-[30px] font-bold text-[50px] w-[70vw] text-center">
          Liquid Assets Graph:
          <div className="p-4">
            <Bar data={chartData} />
          </div>
        </div>
        <LiquidAssets />
      </div>

      <br />
      <Modal
        isOpen={showWelcomeModal}
        onRequestClose={() => {
          setShowWelcomeModal(false);
        }}
        contentLabel="Welcome Modal">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-[50px]">Welcome!</h1>
          <p>
            Welcome to your Liquid Assets chart! This chart represents your cash
            on hand, providing a snapshot of your financial liquidity. Don't
            worry if it's currently empty - you can start by adding your
            financial data. Click on the 'Add to Graph' button to input your
            liquid assets. Feel free to edit or delete entries as your financial
            situation changes. You can choose different time frames, such as
            months, to analyze your data and track your financial progress.
            Additionally, explore other features on this page! At the top,
            you'll find a section to read and create reviews. Share your
            experiences and learn from others. You can also navigate to the
            Monthly Expenses chart and the Financial Goals Checklist page, each
            with its own helpful features. Enjoy managing your finances
            effectively!
          </p>
          <br />
          <button
            className="btn btn-accent"
            onClick={() => {
              setShowWelcomeModal(false);
            }}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
