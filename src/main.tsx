import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import CreateCourse from "./pages/CreateCourse";
import ViewCourse from "./pages/ViewCourse";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="new" element={<CreateCourse />} />
      </Route>
      <Route path="/c/:courseId" element={<ViewCourse />} />
    </Routes>
  </BrowserRouter>
);
