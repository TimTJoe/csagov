import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";
import HomePage from "./pages/home";

export const Routers = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "signup",
        element: <Signup />
    }
])