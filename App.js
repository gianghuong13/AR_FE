import { Provider } from "react-redux";
import Routes from "./routes/Routes";
import { store } from "./states/store";

export default function App() {
  console.reportErrorsAsExceptions = false;
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
