import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts";
import HomePage from "./pages/home";
import Predict from "./pages/predict";

const App = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<Predict />} />
      </Routes>
    </DefaultLayout>
  );
};

export default App;
