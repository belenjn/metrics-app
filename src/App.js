import { MainPage } from "./MainPage/MainPage";
import WebSocketConnection from "./WebSocket/WebSocketConnection";
import { MetricProvider } from "./context/MetricContext";
import fetchMetrics from "./utils/fetchMetrics";

function App() {
  return (
    <MetricProvider>
      <WebSocketConnection fetchMetrics={fetchMetrics} />

      <MainPage />
    </MetricProvider>
  );
}

export default App;
