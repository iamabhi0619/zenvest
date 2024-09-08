import React, { useState, useEffect } from "react";
import Carousels from "../components/Carousels";
import Profile from "../components/Profile";

function Home() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("/api/member")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <div className="scroll-wrapper">
      <div className="scroll-content">
        {userData.map((udata) => (
          <div className="scroll-item" key={udata.id}>
            <Profile data={udata} />
          </div>
        ))}
        {/* Duplicate content for seamless looping */}
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
