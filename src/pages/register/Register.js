import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerValidationSchema from "../../validations/registerValidationSchema";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "../../components/language-dropdown/LanguageDropdown";
import Logo from "../../assets/images/logo.png";
const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      errors.password = { type: "manual", message: t("passwordNotMatch") };
      setError("confirmPassword", {
        type: "manual",
        message: t("passwordNotMatch"),
      });
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/login");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900  h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-full">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src={Logo} alt="logo" />
          {t("logoDescription")}
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("register")}
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t("name")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  {...register("name")}
                />
                {errors.name && (
                  <div className="text-red-500">{t("requiredField")}</div>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t("surname")}
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="surname"
                  {...register("surname")}
                />
                {errors.surname && (
                  <div className="text-red-500">{t("requiredField")}</div>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t("mail")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-red-500">{t("requiredField")}</div>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-red-500">{t("requiredField")}</div>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t("confirmPassword")}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500">{t("requiredField")}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                {t("register")}
              </button>
            </form>
            <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex justify-between">
              <div>
                {t("loginDescription")}

                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-2"
                >
                  {t("login")}
                </Link>
              </div>
              <div>
                <LanguageDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
