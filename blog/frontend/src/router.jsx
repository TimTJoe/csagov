import Home from "@pages/home";
import SignupPage from "@pages/register";
import { createBrowserRouter } from "react-router-dom";

export const Routers = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "signup",
        element: <SignupPage />
    }
])