import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Requests } from "../api";
import { useAuth } from "./AuthProvider";
import { TBarChart } from "../types";
import toast from "react-hot-toast";

type TChartDataProvider = {
  chartData: TBarChart;
  setChartData: React.Dispatch<React.SetStateAction<TBarChart>>;
};

const ChartDataContext = createContext<TChartDataProvider>(
  {} as TChartDataProvider
);

export const ChartDataProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [chartData, setChartData] = useState<TBarChart>({
    labels: [],
    datasets: [],
  } as TBarChart);

  useEffect(() => {
    if (user !== null) {
      Requests.formatUserBarChartData(user)
        .then((data) => setChartData(data))
        .catch(() => toast.error("Error Fetching Data"));
    }
  }, [user]);

  return (
    <ChartDataContext.Provider value={{ chartData, setChartData }}>
      {children}
    </ChartDataContext.Provider>
  );
};

export const useChartData = () => useContext(ChartDataContext);
