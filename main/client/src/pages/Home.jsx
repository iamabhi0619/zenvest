// import React, { useState, useEffect } from "react";
// import Carousels from "../components/Carousels";
// import Profile from "../components/Profile";
import { NavLink } from "react-router-dom";

function Home() {
  // const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   fetch("https://zenvest.onrender.com/api/member")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserData(data.user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="flex justify-center items-center my-auto h-full">
      <div className="flex flex-col items-center gap-6">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/Designer%20(7).png?alt=media&token=1902f931-1d5f-4319-8a94-1348094d756f"
          alt=""
          className="w-40 h-40 md:w-60 md:h-60 p-0.5 border border-white rounded-full shadow shadow-white sm:w-24 sm:h-24"
        />
        <a href="/newreg"><p className="text-2xl bg-white py-2 px-6 rounded-xl font-semibold hover:cursor-pointer hover:bg-slate-200">JOIN the TEAM</p></a>
      </div>
      {/* <div className="scroll-wrapper">
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
      </div> */}
    </div>
  );
}

export default Home;
