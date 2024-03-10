import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/logo.png";
import LanguageDropdown from "../language-dropdown/LanguageDropdown";
import LogoutIcon from "../../assets/icons/logout-icon.svg";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const [user, setUser] = useState("");

  const toggleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    setUser(JSON.parse(storedUserData));
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <div className="flex items-center py-4 px-2">
                <img
                  src={Logo}
                  alt="Logo"
                  className="cursor-pointer h-8 w-8 mr-2"
                />
                <div className=" font-medium">| {t("logoDescription")}</div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <div className="py-2 px-2 font-medium flex items-center gap-2">
              <div className="w-auto">{t("welcome")}</div>
              <div className="w-auto text-green-600">{user?.name ?? " "}</div>
            </div>
            <div className="py-2 px-2 font-medium ">
              <LanguageDropdown />
            </div>
            <div
              className="flex items-center cursor-pointer py-2 px-2 font-medium text-white bg-red-600 rounded  transition duration-300"
              onClick={handleLogout}
            >
              <img src={LogoutIcon} alt="Logout" className="h-6 w-6 mr-1" />
              {t("logout")}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isNavOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={isNavOpen ? "block" : "hidden"}>
        <ul>
          <li className="active flex items-center justify-center h-10 cursor-pointer">
            <LanguageDropdown />
          </li>

          <li
            onClick={handleLogout}
            className="active flex items-center justify-center h-10 cursor-pointer"
          >
            {t("logout")}
          </li>
        </ul>
      </div>
    </nav>
  );
}
