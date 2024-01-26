import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInForm from "./pages/SignInForm.tsx";
import SignUpForm from "./pages/SignUpForm.tsx";
import Landing from "./pages/Landing.tsx";
import Home from "./pages/Home.tsx";
import { Toaster } from "react-hot-toast";
import LiquidAssets from "./pages/LiquidAssets.tsx";
import MakeReview from "./pages/MakeReview.tsx";
import SeeReviews from "./pages/SeeReviews.tsx";
import { ChartDataProvider } from "./providers/ChartDataProvider.tsx";
import MonthlyExpenses from "./pages/MonthlyExpenses.tsx";
import { DoughnutProvider } from "./providers/DoughnutDataProvider.tsx";
import CheckList from "./pages/CheckList.tsx";
import { AuthProvider } from "./providers/authProvider.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/SignIn", element: <SignInForm /> },
  { path: "/SignUp", element: <SignUpForm /> },
  { path: "/Home", element: <Home /> },
  { path: "/Home/edit", element: <LiquidAssets /> },
  { path: "/makeReview", element: <MakeReview /> },
  { path: "/seeReviews", element: <SeeReviews /> },
  { path: "/MonthlyExpenses", element: <MonthlyExpenses /> },
  { path: "/CheckList", element: <CheckList /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChartDataProvider>
        <DoughnutProvider>
          <RouterProvider router={router} />
          <Toaster />
        </DoughnutProvider>
      </ChartDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
