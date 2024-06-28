import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/home";
import Signup from "@pages/Signup";

export const Routers = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "signup",
        element: <Signup />
    }
])