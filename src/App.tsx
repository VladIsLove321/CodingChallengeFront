import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import { fetchUser } from "./pages/Home/HomeApi";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Welcome from "./pages/Welcome/Welcome";

const App = () => {
  let navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const loadUserName = async () => {
    let userData = await fetchUser();
    setUserName(userData?.user.fullName);
    navigate("/home", { replace: true });
  };
  useEffect(() => {
    loadUserName();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Welcome />}>
        <Route
          path="register"
          element={<Register setUserName={setUserName} />}
        />
        <Route path="login" element={<Login setUserName={setUserName} />} />
      </Route>
      <Route
        path="/home"
        element={
          <ProtectedRoute userName={userName}>
            <Home userName={userName} />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default App;
