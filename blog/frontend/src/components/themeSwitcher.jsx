// components/ThemeSwitcher.tsx
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { HiMoon, HiSun } from "react-icons/hi";
import { useState } from "react";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()

    const handleSwitch = () => {
        if (theme == "light") {
            setTheme('dark')
        } else if (theme == "dark") {
            setTheme("light")
        }
    }

    return (
        <div>

            The current theme is: {theme}
            <Button
                color="primary"
                isIconOnly
                onClick={handleSwitch}
            >
                {
                    theme == "light" ? <HiSun /> : <HiMoon />
                }
            </Button>

        </div>
    )
};