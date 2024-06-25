import { Button, Slider } from '@nextui-org/react';
import "./App.css"
import { ThemeSwitcher } from './components/themeSwitcher';
import { ThemeProvider, useTheme } from 'next-themes'

function App() {
  const { theme, setTheme } = useTheme()

  return (
    <ThemeProvider themes={theme} >
      <main className={`${theme} text-foreground bg-background`} >
        <ThemeSwitcher />
      </main>
    </ThemeProvider>
  );
}

export default App;