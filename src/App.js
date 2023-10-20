import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import OtpForm from "./Components/OtpForm";
import RestaurantDetails from "./Components/RestaurantDetails";
import RestaurantPage from "./Components/RestaurantPage";

function App() {

  // const 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<OtpForm />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/details" element={<RestaurantDetails />} />
      </Routes>
    </div>
  );
}

export default App;
