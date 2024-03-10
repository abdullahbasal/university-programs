import React, { useState } from "react";
import Pagination from "../pagination/Pagination";
import { useTranslation } from "react-i18next";
import SortIcon from "../../assets/icons/sort-icon.svg";
import TurkeyFlag from "../../assets/icons/tr-flag.png";
import UsaFlag from "../../assets/icons/usa-Flag.png";
import NetherlandsFlag from "../../assets/icons/nl-flag.png";
import FranceFlag from "../../assets/icons/fr-flag.png";
import UkraineFlag from "../../assets/icons/uk-flag.png";
import GermanyFlag from "../../assets/icons/de-flag.png";

const DataTable = ({ data }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortCost, setSortCost] = useState("asc");
  const [sortApplicationDeadLine, setSortApplicationDeadLine] = useState("asc");
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({
    university: "",
    country: "",
    duration: "",
    language: "",
    minCost: "",
    maxCost: "",
  });

  const clearFilters = () => {
    setFilters({
      university: "",
      country: "",
      duration: "",
      language: "",
      minCost: "",
      maxCost: "",
    });
    document.getElementById("university").value = "";
    document.getElementById("country").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("language").value = "";
    document.getElementById("minCost").value = "";
    document.getElementById("maxCost").value = "";
    setFilteredData(data);
  };
  const uniqueUniversities = [...new Set(data.map((item) => item.university))];
  const uniqueCountries = [...new Set(data.map((item) => item.country))];

  const sortCostFilter = () => {
    const sorted = [...filteredData].sort((a, b) => {
      return sortCost === "asc" ? a.cost - b.cost : b.cost - a.cost;
    });
    setFilteredData(sorted);
    setSortCost((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  const sortApplicationDeadLineFilter = () => {
    const sorted = [...filteredData].sort((a, b) => {
      return sortApplicationDeadLine === "asc"
        ? a.applicationDeadline - b.applicationDeadline
        : b.applicationDeadline - a.applicationDeadline;
    });
    setFilteredData(sorted);
    setSortApplicationDeadLine((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const filteredData = data.filter((item) => {
      if (filters.university && item.university !== filters.university) {
        return false;
      }
      if (filters.country && item.country !== filters.country) {
        return false;
      }
      if (filters.duration && item.duration !== filters.duration) {
        return false;
      }
      if (filters.language && item.language !== filters.language) {
        return false;
      }
      if (filters.minCost && item.cost < filters.minCost) {
        return false;
      }
      if (filters.maxCost && item.cost > filters.maxCost) {
        return false;
      }
      return true;
    });
    setFilteredData(filteredData);
    setCurrentPage(1);
  };

  const handleUniversityChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, university: value });
  };

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, country: value });
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      duration: value === "" ? value : parseInt(value),
    });
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, language: value });
  };

  const handleMinCostChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, minCost: value });
  };

  const handleMaxCostChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, maxCost: value });
  };

  const paginate = (pageNumber) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  return (
    <div className="overflow-x-auto data-table-container ">
      <div className="filter-group border border-gray-300 rounded-xl p-4 shadow-md">
        <form onSubmit={handleFilter} className="flex flex-col ">
          <label htmlFor="university">{t("universities")}</label>
          <select
            id="university"
            onChange={handleUniversityChange}
            className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">{t("allUniversities")}</option>
            {uniqueUniversities.map((university, index) => (
              <option key={index} value={university}>
                {university}
              </option>
            ))}
          </select>
          <label htmlFor="country">{t("country")}</label>
          <select
            id="country"
            onChange={handleCountryChange}
            className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">{t("allCountries")}</option>
            {uniqueCountries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <label htmlFor="duration">{t("durations")}</label>
          <select
            id="duration"
            onChange={handleDurationChange}
            className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">{t("allDurations")}</option>
            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
            <option value={"3"}>3</option>
            <option value={"4"}>4</option>
          </select>
          <label htmlFor="language">{t("languages")}</label>
          <select
            id="language"
            onChange={handleLanguageChange}
            className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">{t("allLanguages")}</option>
            <option value="English">English</option>
            <option value="Turkish">Turkish</option>
            <option value="French">French</option>
          </select>
          <label htmlFor="minCost">{t("minCost")}</label>
          <input
            type="number"
            id="minCost"
            onChange={handleMinCostChange}
            min="0"
            step="any"
            className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <label htmlFor="maxCost">{t("maxCost")}</label>
          <input
            type="number"
            id="maxCost"
            onChange={handleMaxCostChange}
            min="0"
            step="any"
            className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <button
            type="submit"
            className=" text-white text-lg  bg-yellow-400   font-semibold rounded-lg  px-5 py-2.5 mt-2"
          >
            {t("filter")}
          </button>
        </form>
        <div
          onClick={clearFilters}
          className="text-white text-lg  bg-red-400   font-semibold rounded-lg  px-5 py-2.5 flex items-center cursor-pointer justify-center mt-2"
        >
          {t("clearFilters")}
        </div>
      </div>

      <div className="table w-full">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2"> {t("name")}</th>
              <th className="border border-gray-200 px-4 py-2">
                {t("universities")}
              </th>
              <th className="border border-gray-200 px-4 py-2">
                {t("country")}
              </th>
              <th className="border border-gray-200 px-4 py-2">
                {t("durations")}
              </th>
              <th className="border border-gray-200 px-4 py-2 ">
                <div className="flex items-center gap-2">
                  {t("costs")}
                  <img
                    src={SortIcon}
                    alt="sort"
                    className="w-6 h-6  cursor-pointer"
                    onClick={sortCostFilter}
                  />
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2 flex items-center">
                <div className="flex items-center gap-2">
                  {t("applicationDeadlines")}
                  <img
                    src={SortIcon}
                    alt="sort"
                    className="w-6 h-6 cursor-pointer"
                    onClick={sortApplicationDeadLineFilter}
                  />
                </div>
              </th>
              <th className="border border-gray-200 px-4 py-2">
                {t("languages")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginate(currentPage).map((item, index) => (
              <tr
                key={index}
                className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="border border-gray-200 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {item.university}
                </td>
                <td className="border border-gray-200 px-4 py-2 ">
                  {item.country === "Turkey" ? (
                    <img
                      src={TurkeyFlag}
                      alt="Turkey"
                      className="w-8 h-8 m-auto"
                    />
                  ) : item.country === "USA" ? (
                    <img src={UsaFlag} alt="USA" className="w-8 h-8  m-auto" />
                  ) : item.country === "Germany" ? (
                    <img
                      src={GermanyFlag}
                      alt="Germany"
                      className="w-8 h-8  m-auto"
                    />
                  ) : item.country === "France" ? (
                    <img
                      src={FranceFlag}
                      alt="France"
                      className="w-8 h-8  m-auto"
                    />
                  ) : item.country === "Netherlands" ? (
                    <img
                      src={NetherlandsFlag}
                      alt="Netherlands"
                      className="w-8 h-8  m-auto"
                    />
                  ) : item.country === "Ukraine" ? (
                    <img
                      src={UkraineFlag}
                      alt="Ukraine"
                      className="w-8 h-8  m-auto"
                    />
                  ) : null}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {item.duration + " " + t("year")}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  ${item.cost}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(item.applicationDeadline).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {item.language}
                </td>
              </tr>
            ))}
          </tbody>
          {paginate(currentPage).length === 0 && (
            <div className="text-red-500 flex justify-center items-center">
              {t("noData")}
            </div>
          )}
        </table>
        <div className="flex justify-between mt-4">
          <div className="mb-4 flex items-center justify-between w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
            <div>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(parseInt(e.target.value))
                }
                className="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
