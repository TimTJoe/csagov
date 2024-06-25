// components/ThemeSwitcher.tsx
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()

    return (
        <div>
            The current theme is: {theme}
            <Button  color="primary" onClick={() => setTheme('light')}>Light Mode</Button>
            <Button color="primary" onClick={() => setTheme('dark')}>Dark Mode</Button>
        </div>
    )
};