import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import data from "../../db/data.json";
import DataTable from "../../components/data-table/DataTable";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <DataTable data={data} />
    </div>
  );
};

export default Dashboard;
