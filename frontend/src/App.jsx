// export default function App() {
//     return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
// }


import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import Navbar from "./features/Navbar/Navbar";
import Restaurants from './Pages/Restaurants';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/restaurants" element={<Restaurants />} />
      </Routes>
    </>
  );
}

export default App;