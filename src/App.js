import { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import AppStore from "./redux/store";
import RouterComponent from "./RouterComponent";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SetUserAuth from './Component/UserPartials/UserLayout/SetUserAuth.jsx';
import authHelper from "./helper/AuthHelper.js";
import instance from "./axios/instance.js";

function App() {


  let userData;


    try {
        userData = JSON.parse(localStorage.getItem("auth"));
    } catch (e) {
        userData = {}
    }

    let authData = {
        jwt: userData?.jwt,
        reference: userData?.reference
    }

    
     
 

  return (
    <>
      <ToastContainer />
      <Provider store={AppStore}>
        <SetUserAuth>
          <RouterComponent></RouterComponent>
        </SetUserAuth>
      </Provider>
    </>
  );
}

export default App;
