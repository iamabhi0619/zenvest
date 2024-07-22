import React, { useState } from "react";

function UserDetails() {
  const [data, setData] = useState({name:"ZENVEST",userimg:"https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/Designer%20(7).png?alt=media&token=1902f931-1d5f-4319-8a94-1348094d756f"});
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    setData({ ...data, name: "Loading....." });
    try {
      const response = await fetch(
        `https://zenvestapi.onrender.com/newreg?id=${search}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result.status === "Found") {
          setData(result.data);
          console.log(data);
        } else {
          result.data = {
            name: "Not Found",
            userimg:
              "https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/27156868.jpg?alt=media&token=6c238dfc-9a59-40d6-839e-53b42f8f8b7f",
          };
          setData(result.data);
          console.log(data);
        }
      } else {
        window.alert("Server not responding..!!")
        console.error(
          "Error fetching data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleId = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="justify-between bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen p-3 md:p-10">
      <div className=" flex bg-red-200 p-1 mb-3 border-2 border-blue-900 rounded-xl justify-between sm:justify-start sm:w-fit">
        <input
          type="search"
          className="text-lg p-1 border-2 border-blue-900 rounded-lg bg-transparent mr-2"
          placeholder="Enter Registration ID"
          onChange={handleId}
        />
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="p-5 bg-white rounded-xl w-full sm:w-fit">
        <div className="flex flex-col md:flex-row justify-start min-h-full sm:items-center">
          <div className="flex flex-col justify-between md:pr-12 items-center md:items-start ">
            <div className="pb-4">
              <img
                src={`${data.userimg}`}
                alt=""
                className="w-32 h-32 rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between md:pr-12 items-center md:items-start text-center">
            <div>
              <h1 className="text-4xl text-blue-400">{data.name}</h1>
              <h3 className="text-3xl text-black-700">{data.interest}</h3>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center  sm:text-start mb-0">
            <p className="text-2xl text-blue-800 mb-0">About</p>
          </div>
          <div className="flex flex-row p-1 md:p-8 border-2 border-sky-500 justify-between md:w-full mt-0">
            <div className="text-lg truncate mr-2">
              <p>Registration ID:</p>
              <p>Date-of-Birth:</p>
              <p>Gender:</p>
              <p>Phone Number:</p>
              <p>Course:</p>
              <p>Date of Registration:</p>
            </div>
            <div className="text-lg truncate">
              <p>{data.id}</p>
              <p>{data.dateofbirth? `${new Date(data.dateofbirth).toDateString("en-IN")}`: ""}</p>
              <p>{data.gender}</p>
              <p>{data.number}</p>
              <p>{data.course}</p>
              <p>{data.date? `${new Date(data.date).toDateString("en-IN")}` : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
