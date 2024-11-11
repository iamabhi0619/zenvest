import React, { useState, useEffect } from "react";
import Carousels from "../components/Carousels";
import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    fetch("/api/member")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="pt-4 overflow-y-scroll h-full">
      <div className="md:hidden items-center justify-center flex mb-2">
        <button
          className="text-center bg-themColor-ligthblue font-suse text-2xl tracking-wider px-2 py-0.5 rounded-xl  font-bold"
          onClick={() => {
            navigate("/join");
          }}
        >
          Join Now
        </button>
      </div>
      <div className="scroll-wrapper">
        <div className="scroll-content">
          {userData
            .filter((udata) => udata.post !== "member")
            .map((udata) => (
              <div className="scroll-item" key={udata.id}>
                <Profile data={udata} />
              </div>
            ))}
          {/* Duplicate content for seamless looping */}
          {userData
            .filter((udata) => udata.post !== "member")
            .map((udata) => (
              <div className="scroll-item" key={`duplicate-${udata.id}`}>
                <Profile data={udata} />
              </div>
            ))}
        </div>
      </div>
      <div className="w-full h-full">
        <Carousels />
      </div>
    </div>
  );
}

export default Home;
