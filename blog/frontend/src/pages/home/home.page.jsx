import { useEffect, useState } from "react";
import homeServices from "@services/home.services";

const HomePage = () => {
  const [greeting, setGreeting] = useState(null)

  const handleGreeting = async () => {
    const res = await homeServices.initializer()
    setGreeting(res.data.message)
  }

  useEffect(() => { handleGreeting() }, [])
  return (
    <>
      <nav className="top">
        <a href="signup">Signup</a>
      </nav>
      <main className="responsive">
        {greeting}
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default HomePage;
