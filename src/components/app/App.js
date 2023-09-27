import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";

import "./../../styles/style.scss";

import {
  MainPage,
  GoodsPage,
  AccountPage,
  AdminPage,
  SellerPage,
  Page404,
} from "../../pages";
import "./../../styles/style.scss";

function App() {
  const location = useLocation();
  const contentClass =
    location.pathname === "/login" ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/404") ||
    location.pathname.includes("/admin") ||
    location.pathname.includes("/seller")
      ? "contentWithImg"
      : "content";
  const containerClass =
    location.pathname === "/login" ||
    location.pathname.includes("/register") ||
    location.pathname.includes("/404") ||
    location.pathname.includes("/admin") ||
    location.pathname.includes("/seller")
      ? "containerWithImg"
      : "container";
  return (
    <div className="App">
      <Header />
      <div className={contentClass}>
        <div className={containerClass}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/goods" element={<GoodsPage />} />
            <Route path="/login" element={<AccountPage />} />
            <Route path="/register" element={<AccountPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/seller" element={<SellerPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
    
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
