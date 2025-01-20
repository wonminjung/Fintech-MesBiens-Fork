import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MesBiensShop: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/category/전체");
  }, [navigate]);

  return null;
};

export default MesBiensShop;
