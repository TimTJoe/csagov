import Home from "@pages/home";
import SignupPage from "@pages/register";
import Signin from "@pages/signin";
import StartPage from "@pages/start/start.page";
import { createBrowserRouter } from "react-router-dom";

export const Routers = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "signup",
        element: <SignupPage />
    },
    {
        path: "signin",
        element: <Signin />
    },
    {
        path: "welcome",
        element: <StartPage />
    }

])