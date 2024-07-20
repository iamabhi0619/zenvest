import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function RegForm() {
  let form = {
    id: "",
    name: "",
    email: "",
    dateofbirth: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here (e.g., send data to server)
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom className="text-red-700">
        Welcome to Team ZENVEST..!!
      </Typography>
      <Box
        component="form"
        className="flex flex-col justify-between w-25 p-7 h-100"
        onSubmit={handleSubmit}
      >
        <TextField
          name="id"
          label="Registration Number"
          type="number"
          value={formData.id}
          onChange={handleChange}
        />
        <TextField
          name="name"
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="dateofbirth"
          label="Date of Birth"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.dateofbirth}
          onChange={handleChange}
        />
        <FormControl>
          <FormLabel name="gender">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="flex"
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="number"
          label="WhatsApp Number"
          type="tel"
          value={formData.number}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="membertype">Membership Type</InputLabel>
          <Select
            labelId="membertype"
            name="type"
            value={formData.type}
            label="Membership Type"
            onChange={handleChange}
          >
            <MenuItem value="Regular">Regular</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Event">Only Event</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="interest">Interests/Preferences</InputLabel>
          <Select
            labelId="interest"
            name="interest"
            value={formData.interest}
            label="Interests/Preferences"
            onChange={handleChange}
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
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default RegForm;
