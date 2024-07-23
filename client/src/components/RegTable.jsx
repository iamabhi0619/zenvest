import React, { useState, useEffect } from "react";
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function RegTable() {
  const [searchid, SetSearchid] = useState("");
  const [loading, SetLoading] = useState(false);
  const [users, SetUsers] = useState([]);

  useEffect(() => {
    fetchUsers(searchid);
  }, [searchid]);

  const fetchUsers = async (query = '') => {
    try {
      SetLoading(true);
      const response = await axios.get('https://zenvestapi.onrender.com/regdetails', {
        params: { search: query },
      });
      SetUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      SetLoading(false);
    }
  };

  const handleSearch = (e) => {
    SetSearchid(e.target.value);
  };
  return (
    <div className="mx-2 my-7 rounded-xl border-2 border-black min-h-fit w-screen">
      <div className="text-5xl text-blue-600 text-center">
        <p>Registration Details</p>
      </div>
      <div className=" mt-4">
        <div >
          <input
            value={searchid}
            onChange={handleSearch}
            className="text-2xl px-5 py-2 border-2 border-blue-700 rounded-xl bg-none w-full"
            placeholder="Search"
          />
        </div>
        <div className="mt-4 px-2 border-2 border-blue-500 w-full">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Reg. Id.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>DateofReg</TableCell>
                <TableCell>Field</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">Loading...</TableCell>
                </TableRow>
              ) : users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.number}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.course}</TableCell>
                  <TableCell>{new Date(user.date).toDateString("en-IN")}</TableCell>
                  <TableCell>{user.interest}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default RegTable;
