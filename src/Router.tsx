import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/HomePage";
import DetailPage from "./routes/DetailPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
