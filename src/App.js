import "./App.css";
import CustomerRouters from "./Routers/CustomerRouters";
import { Route, Routes } from "react-router-dom";



function App() {
  return (
    <div className="">
      <Routes>
        <Route path='*' element={<CustomerRouters />}></Route>
      </Routes>
    </div>
  );
}

export default App;
