import "./UserReg.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function UserReg() {
  let form = {
    id: "",
    name: "",
    email: "",
    dateofbirth: Date.now(),
    gender: "",
    number: "",
    type: "",
    interest: "",
  };
  const [formData, setFormData] = useState(form);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/regester", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.status === "ok") {
        window.alert("Welcome to Team Zenvest..!!");
        setFormData(form);
      } else {
        window.alert("Please Enter the correct data..!!")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      window.alert("Sorry Server is not responding..!!")
    }
  };
  return (
    <div
      className="flex min-h-screen justify-center"
      style={{ backgroundImage: "linear-gradient(15deg, #29E7CD, #FFFBFC)" }}
    >
      <div className="max-w-sm">
        <div className="rounded-xl shadow-lg">
          <div className=" py-6 px-5">
            <h2 className="text-3xl mb-4">Welcome to Team Zenvest..!!</h2>
            <form onSubmit={handleSubmit}>
              <div className="mt-2 ">
                <TextField
                  fullWidth
                  name="id"
                  label="Registration Number"
                  type="number"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-2">
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-2">
                <TextField
                  fullWidth
                  name="dateofbirth"
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dateofbirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-2">
                <FormControl>
                  <FormLabel name="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="mt-2">
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-2">
                <TextField
                  fullWidth
                  name="number"
                  label="WhatsApp Number"
                  type="tel"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-2">
                <FormControl fullWidth>
                  <InputLabel id="membertype">Membership Type</InputLabel>
                  <Select
                    labelId="membertype"
                    name="type"
                    value={formData.type}
                    label="Membership Type"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Regular">Regular</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Event">Only Event</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="mt-2">
                <FormControl fullWidth>
                  <InputLabel id="interest">Interests/Preferences</InputLabel>
                  <Select
                    labelId="interest"
                    name="interest"
                    value={formData.interest}
                    label="Interests/Preferences"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Graphic designing & Video editing">
                      Graphic designing & Video editing
                    </MenuItem>
                    <MenuItem value="Social media & Content writing">
                      Social media & Content writing
                    </MenuItem>
                    <MenuItem value="Technical team">Technical team</MenuItem>
                    <MenuItem value="Event management & Marketing">
                      Event management & Marketing
                    </MenuItem>
                    <MenuItem value="Public Speaking">Public Speaking</MenuItem>
                    <MenuItem value="Fine Arts">Fine Arts</MenuItem>
                    <MenuItem value="Photography">Photography</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="mt-2"></div>
              <div className="mt-4 text-center">
                <button className="button-89" typeof="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserReg;
