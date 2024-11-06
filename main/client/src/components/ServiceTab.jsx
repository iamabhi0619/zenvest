import React from "react";
import { useNavigate } from "react-router-dom";

function ServiceTab({ data }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-7 rounded-xl font-suse">
      <div className="flex flex-col gap-4 items-center max-w-sm mx-auto">
        <div className="flex items-center gap-3">
          <img
            src={data.image}
            alt={`${data.name}'s profile`}
            className="w-24 h-24 object-cover rounded-full"
          />
          <div>
            <p className="text-3xl font-semibold">{data.name}</p>
            <p className="text-xl text-gray-600">{data.post}</p>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          {data.post !== "member" ? (
            <>
              <button
                className="bg-themColor-blue text-white px-4 py-2 rounded-lg text-sm font-medium"
                onClick={() => {
                  navigate("/finathone1.0");
                }}
              >
                FIN-A-THON
              </button>
              <button className="bg-themColor-blue text-white px-4 py-2 rounded-lg text-sm font-medium">
                Member List
              </button>
              <button className="bg-themColor-blue text-white px-4 py-2 rounded-lg text-sm font-medium">
                SCAN QR
              </button>
            </>
          ) : (
            <button className="bg-themColor-blue text-white px-4 py-2 rounded-lg text-sm font-medium">
              SCAN QR
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceTab;
