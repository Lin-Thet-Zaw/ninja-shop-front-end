import "./App.css";
import AdminRouters from "./Routers/AdminRouters";
import CustomerRouters from "./Routers/CustomerRouters";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="*" element={<CustomerRouters />}></Route>
        <Route path="/admin/*" element={<AdminRouters />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000} // Duration for toast to auto-close
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
