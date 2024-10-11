import React, { useState, useEffect } from "react";
import Carousels from "../components/Carousels";
import Profile from "../components/Profile";

function Home() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://zenvest.onrender.com/api/member")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="scroll-wrapper">
        <h1 className="text-center my-2 mb-4 text-themColor-blue text-5xl font-bold font-suse">
          MEET OUR TEAM
        </h1>
        <div className="scroll-content">
          {userData.map((udata) => (
            <div className="scroll-item" key={udata.id}>
              <Profile data={udata} />
            </div>
          ))}
          {userData.map((udata) => (
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
