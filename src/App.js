import { Fragment } from "react";
import { Provider } from "react-redux";
import AppStore from "./redux/store";
import RouterComponent from "./RouterComponent";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={AppStore}>
        <RouterComponent></RouterComponent>
      </Provider>
    </>
  );
}

export default App;
