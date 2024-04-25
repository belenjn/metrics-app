import "./App.css";
import { MainPage } from "./MainPage/MainPage";
import { MetricProvider } from "./context/MetricContext";

function App() {
  return (
    <MetricProvider>
      <MainPage />
    </MetricProvider>
  );
}

export default App;
