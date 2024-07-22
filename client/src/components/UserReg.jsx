import "./UserReg.css";
import React, { useState } from "react";
import app from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function UserReg() {
  const form = {
    id: "",
    name: "",
    email: "",
    dateofbirth: "",
    gender: "",
    number: "",
    course: "",
    interest: "",
    userimg: "",
    work: "",
  };

  const [formData, setFormData] = useState(form);
  const [formSubmit, setFormSubmit] = useState(false);
  const [apiWork, setApiWork] = useState(false);
  const [userimg, setUserimg] = useState(false);
  const [work, setWork] = useState(false);
  const [userimgs, setUserimgs] = useState("");
  const [works, setWorks] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleUpload(e) {
    try {
      const file = e.target.files[0];
      const folder = e.target.name;
      if (folder === "userimg") {
        setUserimgs("Uploading...");
      } else if (folder === "work") {
        setWorks("Uploading...");
      }
      if (file) {
        setFormSubmit(true);
        const storage = getStorage(app);
        const storageref = ref(storage, `${folder}/${formData.id}`);
        await uploadBytes(storageref, file);
        const downloadURL = await getDownloadURL(storageref);
        setFormData({
          ...formData,
          [folder]: downloadURL,
        });
        console.log(downloadURL);
        if (folder === "userimg") {
          setUserimg(true);
          setUserimgs("Uploaded");
        } else if (folder === "work") {
          setWork(true);
          setWorks("Uploaded");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormSubmit(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiWork(true);
    try {
      const response = await fetch("https://zenvestapi.onrender.com/regester", {
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
        window.location.reload();
      } else {
        window.alert("Please Enter the correct data..!!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      window.alert("Sorry, the server is not responding..!!");
    } finally {
      setApiWork(false);
    }
  };

  return (
    <>
      <section className="container">
        <div className="flex flex-row	sm:pl-14 sm:pr-14 items-center">
          <div className="max-h-20 sm:max-h-24 max-w-20 sm:max-w-24">
            <img src="https://firebasestorage.googleapis.com/v0/b/zenvest-8f417.appspot.com/o/Designer%20(7).png?alt=media&token=1902f931-1d5f-4319-8a94-1348094d756f" alt="" className="rounded-full mr-14" />
          </div>
          <div className="pl-1 sm:pl-14">
            <header className="text-2xl sm:text-4xl pb-3">Registration Form</header>
            <header className=" text-lg sm:text-2xl">Welcome to Team Zenvest</header>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="input-box">
            <label>Registration Number</label>
            <input
              type="number"
              value={formData.id}
              placeholder="Enter Your Registration Number"
              name="id"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="gender-box">
            <h3>Gender</h3>
            <div className="gender-option">
              <div className="gender">
                <input
                  type="radio"
                  value="Male"
                  onChange={handleChange}
                  id="check-male"
                  name="gender"
                />
                <label htmlFor="check-male">Male</label>
              </div>
              <div className="gender">
                <input
                  type="radio"
                  id="check-female"
                  onChange={handleChange}
                  name="gender"
                  value="Female"
                />
                <label htmlFor="check-female">Female</label>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Phone Number</label>
              <input
                type="number"
                value={formData.number}
                onChange={handleChange}
                name="number"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="input-box">
              <label>Birth Date</label>
              <input
                type="date"
                name="dateofbirth"
                value={formData.dateofbirth}
                onChange={handleChange}
                placeholder="Enter birth date"
                required
              />
            </div>
          </div>
          <div className="input-box">
            <label>Courses</label>
            <div className="select-box">
              <select onChange={handleChange} name="course" required>
                <option hidden>Select your Course</option>
                <option value="B.Tech">B.Tech</option>
                <option value="BBA">BBA</option>
                <option value="MBA">MBA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="M.Sc">M.Sc</option>
                <option value="BioTech">BioTech</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-box">
              <label>Interest</label>
              <div className="select-box">
                <select onChange={handleChange} name="interest" required>
                  <option hidden>Your Field Of Interest</option>
                  <option value="Graphic Design And Video Editing">
                    Graphic Design And Video Editing
                  </option>
                  <option value="Social Media and Content Creation">
                    Social Media and Content Creation
                  </option>
                  <option value="Technical Team">Technical Team</option>
                  <option value="Event Management and Marketing">
                    Event Management and Marketing
                  </option>
                  <option value="Public Speaking">Public Speaking</option>
                  <option value="Fine Arts">Fine Arts</option>
                  <option value="Photography">Photography</option>
                </select>
              </div>
            </div>
            <div className="file-container">
              <label>Photo </label>
              <div className="flex items-center">
                <input
                  type="file"
                  className="file-input"
                  onChange={handleUpload}
                  name="userimg"
                  accept="image/*"
                  disabled={userimg}
                />
                <p className="ml-24">{userimgs}</p>
              </div>
            </div>
            <div className="">
              <label>Previous Work </label>
              <div className="flex items-center">
                <input
                  type="file"
                  className="w-fit"
                  name="work"
                  onChange={handleUpload}
                  accept="audio/*,video/*,image/*,.pdf"
                  disabled={work}
                />
                <p className="ml-24">{works}</p>
              </div>
            </div>
          </div>
          <button
            disabled={formSubmit}
            type="submit"
            className={formSubmit ? "hidden" : ""}
          >
            {!apiWork ? "Submit" : "Submitting..."}
          </button>
        </form>
      </section>
    </>
  );
}

export default UserReg;
