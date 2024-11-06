import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import ServiceTab from "../components/ServiceTab";

function Service() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/member/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("jwtToken");
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="h-full items-center justify-center my-auto flex">
      {!user ? <Login /> : <ServiceTab data={user} />}
    </div>
  );
}
export default Service;
