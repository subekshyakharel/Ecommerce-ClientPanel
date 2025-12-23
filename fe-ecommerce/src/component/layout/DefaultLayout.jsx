import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default DefaultLayout;
