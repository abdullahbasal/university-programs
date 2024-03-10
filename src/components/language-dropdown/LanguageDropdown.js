import { useEffect, useRef, useState } from "react";
import TrFlag from "../../assets/icons/tr-flag.png";
import EnFlag from "../../assets/icons/en-flag.png";
import { useTranslation } from "react-i18next";

export default function LanguageDropdown() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn dropdown-toggle flex items-center"
      >
        {t("languageSelect")} :
        <img
          src={i18n.language === "en" ? EnFlag : TrFlag}
          alt={i18n.language}
          className="w-8 h-8 ml-2"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => changeLanguage("en")}
              className="w-full flex justify-center items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <img src={EnFlag} alt="en" className="w-8 h-8 mr-2" />

              <div className="w-[30px]">{t("english")}</div>
            </button>
            <button
              onClick={() => changeLanguage("tr")}
              className="w-full flex justify-center items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <img src={TrFlag} alt="tr" className="w-8 h-8 mr-2" />
              <div className="w-[30px]">{t("turkish")}</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
