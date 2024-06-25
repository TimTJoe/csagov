import { Button, Slider } from '@nextui-org/react';
import "./App.css"
import { ThemeSwitcher } from './components/themeSwitcher';

function App() {
  return (
    <main className="dark text-foreground bg-background">
      <ThemeSwitcher />
    </main>
  );
}

export default App;