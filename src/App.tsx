import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      {/* vertical spacer */}
      <div style={{ height: "1rem" }} />
      <Outlet />;
    </>
  );
}
export default App;
