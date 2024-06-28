import { useState } from "react";
import homeServices from "../../services/home.services";

const HomePage = () => {
  const [response, setResponse] = useState(null)
  const handleTest = async () => {
    const res = await homeServices.initializer()
    setResponse(res.data.message)
  }
  return (
    <>
      <nav>
        <a href="signup">Signup</a>
      </nav>
      <main className="responsive">
        {response}
        <button onClick={handleTest}>Test</button>
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default HomePage;
