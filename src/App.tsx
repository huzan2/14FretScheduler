import viteLogo from "/vite.svg";
import "./App.css";

import reactLogo from "@assets/react.svg";
import MainPage from "@pages/MainPage";
import LoginPage from "@pages/LoginPage";
import useExample from "@hooks/useExampleHooks";
import ExampleComp from "@components/ExampleComp";

function App() {
  const [cnt, setCnt] = useExample();

  return (
    <>
      <div>
        <MainPage />
        <LoginPage />
        <ExampleComp />

        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCnt((prev) => prev + 1)}>
          count is {cnt}
        </button>
      </div>
    </>
  );
}

export default App;
