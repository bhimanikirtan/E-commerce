import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import SnackBar from "./comon/snackBar.jsx";
import App from "./App.jsx";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import "./App.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <SnackBar />
      <App />
    </ThemeContextProvider>
  </Provider>
);
