import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Requests } from "../api";
import { useAuth } from "./AuthProvider";
import { TDoughnutChart } from "../types";
import toast from "react-hot-toast";

type TDoughnutContext = {
  userData: TDoughnutChart;
  setUserData: React.Dispatch<React.SetStateAction<TDoughnutChart>>;
  totalMonthlyExpense: number;
  setTotalMonthlyExpense: React.Dispatch<React.SetStateAction<number>>;
};

export const DoughnutContext = createContext<TDoughnutContext>(
  {} as TDoughnutContext
);

export const DoughnutProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<TDoughnutChart>({
    labels: [],
    datasets: [],
  } as TDoughnutChart);
  const [totalMonthlyExpense, setTotalMonthlyExpense] = useState<number>(0);
  useEffect(() => {
    if (user !== null) {
      Requests.formatUserDoughnutChartData(user)
        .then((data) => {
          setUserData(data);
          const totalMonthlyExpense = data.datasets[0].data.reduce(
            (acc, current) => Number(acc) + Number(current),
            0
          );
          setTotalMonthlyExpense(totalMonthlyExpense);
        })
        .catch(() => toast.error("Error Fetching Data"));
    }
  }, [user]);

  return (
    <DoughnutContext.Provider
      value={{
        userData,
        setUserData,
        totalMonthlyExpense,
        setTotalMonthlyExpense,
      }}>
      {children}
    </DoughnutContext.Provider>
  );
};

export const useDoughnut = () => useContext(DoughnutContext);
