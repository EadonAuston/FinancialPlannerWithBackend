export type User = { id: string; username: string; password: string };

export type TBarChart = {
  labels: string[];
  datasets: {
    data: string[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
};
export type TDoughnutChart = {
  labels: string[];
  datasets: {
    data: string[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
};

export type TLiquidAssets = {
  id: string;
  value: string;
  label: string;
  color: string;
  userId: string;
};

export type TMonthlyExpenses = {
  id: string;
  value: string;
  label: string;
  color: string;
  userId: string;
};

export type TReviews = {
  id: string;
  value: string;
  comment: string;
  userId: string;
};
