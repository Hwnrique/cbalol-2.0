import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/cadastro";

  return (
    <div className="min-h-screen bg-bgsite p-0 m-0 box-border font-raleway">
      <ToastContainer
        position="bottom-right"
        theme="dark"
        transition={Bounce}
      />
      <ScrollToTop />
      {!isAuthPage && <Header />}
      <main>
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
