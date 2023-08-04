import { AppProvider } from "./hooks";
import { HomeRoute } from "./routes";

const App = () => (
  <AppProvider>
    <HomeRoute />
  </AppProvider>
);

export default App;
