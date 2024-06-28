import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import HomePage from "@pages/home";

export const Routers = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "signup",
        element: <Home />
    }
])