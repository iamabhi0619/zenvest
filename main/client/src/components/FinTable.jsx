import React, { useState, useEffect } from "react";

function UsersList() {
  const itemsPerPage = 10;
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/finathone", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(Math.ceil(data.users.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleRowClick = (user) => {
    setSelectedUser(user);
  };
  const handleCloseModal = () => {
    setSelectedUser(null);
  };
  return (
    <div className="container mx-auto px-5">
      <h2 className="text-3xl font-semibold text-center font-suse mb-1">FIN-A-THON</h2>
      <p className="text-center text-xl font-suse bg-slate-100  text-themColor-blue px-3 rounded-t-md font-bold"> Total:- {users.length} </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 text-center">Profile</th>
              <th className="px-4 text-center">Name</th>
              <th className="px-4 text-center">Reg Number</th>
              <th className="px-4 text-center hidden sm:table-cell">
                Email
              </th>{" "}
              <th className="px-4 text-center">Gender</th>
              <th className="px-4 text-center">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b cursor-pointer"
                onClick={() => handleRowClick(user)}
              >
                <td className="py-2 px-4">
                  <img
                    src={user.dp}
                    alt={`${user.name}'s profile`}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-4">{user.name}</td>
                <td className="px-4">{user.regNumber}</td>
                <td className="px-4 hidden sm:table-cell">{user.email}</td>
                <td className="px-4">{user.gender.toUpperCase()}</td>
                <td className="px-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-white ${
                      user.payment.status === "captured"
                        ? "bg-green-500"
                        : user.payment.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {user.payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 font-suse">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full space-y-6 relative">
          <h3 className="text-3xl font-bold mb-4 text-center text-gray-800">
            User Details
          </h3>
          <div className="flex items-center gap-5">
            <img
              src={selectedUser.dp}
              alt={`${selectedUser.name}'s profile`}
              className="w-28 h-28 object-cover rounded-full"
            />
            <p className="text-2xl font-semibold text-gray-800">{selectedUser.name}</p>
          </div>
      
          <div className="text-lg text-gray-700 space-y-2">
            <p>
              <strong className="text-indigo-600">Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong className="text-indigo-600">Reg Number:</strong> {selectedUser.regNumber}
            </p>
          </div>
      
          <div className="space-y-2">
            <strong className="text-xl text-gray-800">Payment Details:</strong>
            <div className="text-lg text-gray-700 space-y-1">
              <p><strong className="text-indigo-600">Order ID:</strong> {selectedUser.payment.orderId}</p>
              <p><strong className="text-indigo-600">Payment ID:</strong> {selectedUser.payment.paymentId}</p>
              <p><strong className="text-indigo-600">Status:</strong> {selectedUser.payment.status}</p>
              <p><strong className="text-indigo-600">Amount:</strong> ₹{selectedUser.payment.amount}</p>
            </div>
          </div>
      
          <button
            onClick={handleCloseModal}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mt-6 w-full"
          >
            Close
          </button>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default UsersList;
