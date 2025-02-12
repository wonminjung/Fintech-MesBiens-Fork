import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MesBiensShop: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/shop/category/All");
  }, [navigate]);

  return null;
};

export default MesBiensShop;
