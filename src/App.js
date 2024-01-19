 
import { Provider } from "react-redux";
import AppStore from "./redux/store";
import RouterComponent from "./RouterComponent";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SetUserAuth from './Component/UserPartials/UserLayout/SetUserAuth.jsx';
 

function App() {
 
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
