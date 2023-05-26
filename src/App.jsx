import "./App.css";
import { HashRouter } from "react-router-dom";
import { MainRoutes } from "./routes";
import { AuthProvider, ThemeContextProvider } from "./contexts";

function App() {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <HashRouter>
          <MainRoutes />
        </HashRouter>
      </AuthProvider>
    </ThemeContextProvider>
  );
}

export default App;
