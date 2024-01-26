import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useDoughnut } from "../providers/DoughnutDataProvider";
import EditMonthlyExpenses from "./EditMonthlyExpenses";
import Modal from "react-modal";
import { useEffect, useState } from "react";

const MonthlyExpenses = () => {
  const { userData } = useDoughnut();
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);
  const [hasShownWelcomeModal, setHasShownWelcomeModal] =
    useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);

  useEffect(() => {
    if (
      userData &&
      userData.datasets &&
      userData.datasets[0] &&
      userData.datasets[0].data
    ) {
      if (userData.datasets[0].data.length < 1 && !hasShownWelcomeModal) {
        setShowWelcomeModal(true);
        setHasShownWelcomeModal(true);
        setNewUser(true);
      }
    }
  }, [userData, hasShownWelcomeModal]);

  return (
    <div className="w-[90vw] ml-[5vw]">
      <div className="flex flex-col items-center mx-[50px] lg:flex-row md:flex-col md:items-center sm:flex-col sm:items-center">
        <div className="lg:w-[45vw] lg:h-[45vw] md:w-[70vw] md:h-[70vw] md:text-[40px] h-[500px] lg:mr-[30px] font-bold text-[30px] w-[70vw] text-center">
          Monthly Expenses Graph:
          {!newUser ? (
            <Doughnut data={userData} />
          ) : (
            <div className="flex justify-center mt-[200px] text-[40px]">
              Nothing to show here yet!
            </div>
          )}
        </div>
        <EditMonthlyExpenses />
      </div>
      <Modal
        isOpen={showWelcomeModal}
        onRequestClose={() => {
          setShowWelcomeModal(false);
        }}
        contentLabel="Welcome Modal">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-[50px]">Welcome!</h1>
          <p>
            Welcome to your Monthly Expenses chart! This powerful tool allows
            you to manage and plan your monthly expenses effectively. You can
            easily add, edit, or delete items to reflect your financial
            commitments accurately. Planning your expenses is a key step towards
            financial well-being. Personalize your chart by choosing vibrant
            colors for each expense category, making it visually appealing and
            easy to distinguish. Whether it's rent, utilities, groceries, or
            other essentials, you can track and analyze your spending patterns.
            Take control of your budget and make informed decisions about your
            finances. Feel free to explore other features on this page,
            including the ability to create and read reviews at the top.
            Additionally, check out the Financial Goals Checklist page for more
            ways to organize your financial priorities. Enjoy utilizing these
            tools to enhance your financial journey!
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

export default MonthlyExpenses;
