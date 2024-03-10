import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../contexts/AuthContext";
import loginValidationSchema from "../../validations/loginValidationSchema";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import LanguageDropdown from "../../components/language-dropdown/LanguageDropdown";
import Logo from "../../assets/images/logo.png";

const Login = () => {
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === data.email &&
      storedUser.password === data.password
    ) {
      seterror("");
      navigate("/dashboard");
      login();
    } else {
      seterror("error");
    }
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
          {t("logoDescription")}
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("login")}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t("mail")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="name@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red-500">{t("mailError")}</div>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t("password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-red-500">{t("passwordError")}</div>
                )}
              </div>
              {error === "error" && (
                <div className="text-red-500">{t("incorrectEntry")}</div>
              )}
              <button
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                {t("login")}
              </button>
            </form>
            <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex justify-between">
              <div>
                {t("registerDescription")}

                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"
                >
                  {t("register")}
                </Link>
              </div>
              <div>
                <LanguageDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
