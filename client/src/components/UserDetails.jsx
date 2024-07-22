import React, { useState } from "react";

function UserDetails() {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
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
    <div className="justify-between bg-gradient-to-r from-cyan-500 to-blue-500 w-full min-h-screen p-10">
      <div className=" flex bg-red-200 p-1 mb-3 border-2 border-blue-900 rounded-xl justify-between sm:justify-start">
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
      <div className="p-5 bg-white rounded-xl">
        <div className="flex flex-col md:flex-row justify-start min-h-full">
          <div className="flex flex-col justify-between md:pr-12 items-center md:items-start">
            <div className="pb-4">
              <img
                src={`${data.userimg}`}
                alt="userphoto"
                className="w-32 h-32 rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between md:pr-12 items-center md:items-start">
            <div>
              <h1 className="text-4xl text-blue-400">{data.name}</h1>
              <h3 className="text-3xl text-black-700">{data.interest}</h3>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className="text-2xl text-blue-800">About</p>
          </div>
          <div className="flex flex-row md:p-8 border-2 border-sky-500 justify-between md:w-1/2 ">
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
              <p>{new Date(data.dateofbirth).toDateString("en-IN")}</p>
              <p>{data.gender}</p>
              <p>{data.number}</p>
              <p>{data.course}</p>
              <p>{new Date(data.date).toDateString("en-IN")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
