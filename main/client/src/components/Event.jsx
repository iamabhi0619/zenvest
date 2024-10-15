import React, { useState } from "react";
// import app from "../firebase";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const Event = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    venue: "",
    guestSpeakers: [""],
    description: "",
    eventType: "Meetup",
    duration: "",
    maxCapacity: "",
    registrationLink: "",
    organizer: {
      name: "",
      email: "",
      phone: "",
    },
    tags: [""],
    status: "Upcoming",
    ticketPrice: 0,
    sponsors: [""],
    photos: [],
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleOrganizerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      organizer: {
        ...prevData.organizer,
        [name]: value,
      },
    }));
  };

  const handleArrayChange = (e, index, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [arrayName]: updatedArray,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFile(selectedFiles);
    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview(filePreviews);
  };

  const handleAddGuestSpeaker = () => {
    setFormData((prevData) => ({
      ...prevData,
      guestSpeakers: [...prevData.guestSpeakers, ""],
    }));
  };

  const handleAddTag = () => {
    setFormData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, ""],
    }));
  };

  const handleAddSponsor = () => {
    setFormData((prevData) => ({
      ...prevData,
      sponsors: [...prevData.sponsors, ""],
    }));
  };

  //   const handleUpload = async () => {
  //     if (file) {
  //       const storage = getStorage(app);
  //       const uploadedUrls = await Promise.all(file.map(async (image) => {
  //         const storageref = ref(storage, `post/${image.name}`);
  //         await uploadBytes(storageref, image);
  //         const downloadURL = await getDownloadURL(storageref);
  //         return downloadURL;
  //       }));

  //       setFormData((prevData) => ({
  //         ...prevData,
  //         photos: uploadedUrls
  //       }));
  //     }
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData to the backend
    console.log(formData);
    // handleUpload(); // Call to upload files and update the form data with photos
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-2xl">
      <div>
        <label>Event Name</label>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          className="input-class"
        />
      </div>

      <div>
        <label>Event Date</label>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="input-class"
        />
      </div>

      <div>
        <label>Venue</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          className="input-class"
        />
      </div>

      <div>
        <label>Guest Speakers</label>
        {formData.guestSpeakers.map((speaker, index) => (
          <div key={index}>
            <input
              type="text"
              value={speaker}
              onChange={(e) => handleArrayChange(e, index, "guestSpeakers")}
              className="input-class"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddGuestSpeaker}
          className="btn-class"
        >
          Add Speaker
        </button>
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="textarea-class"
        ></textarea>
      </div>

      <div>
        <label>Event Type</label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="select-class"
        >
          <option value="Meetup">Meetup</option>
          <option value="Workshop">Workshop</option>
          <option value="Seminar">Seminar</option>
          <option value="Conference">Conference</option>
          <option value="Webinar">Webinar</option>
        </select>
      </div>

      <div>
        <label>Duration (hours)</label>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="input-class"
        />
      </div>

      <div>
        <label>Max Capacity</label>
        <input
          type="number"
          name="maxCapacity"
          value={formData.maxCapacity}
          onChange={handleChange}
          className="input-class"
        />
      </div>

      <div>
        <label>Registration Link</label>
        <input
          type="url"
          name="registrationLink"
          value={formData.registrationLink}
          onChange={handleChange}
          className="input-class"
        />
      </div>

      <div>
        <label>Organizer Information</label>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.organizer.name}
            onChange={handleOrganizerChange}
            className="input-class"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.organizer.email}
            onChange={handleOrganizerChange}
            className="input-class"
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.organizer.phone}
            onChange={handleOrganizerChange}
            className="input-class"
          />
        </div>
      </div>

      <div>
        <label>Tags</label>
        {formData.tags.map((tag, index) => (
          <div key={index}>
            <input
              type="text"
              value={tag}
              onChange={(e) => handleArrayChange(e, index, "tags")}
              className="input-class"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddTag} className="btn-class">
          Add Tag
        </button>
      </div>

      <div>
        <label>Sponsors</label>
        {formData.sponsors.map((sponsor, index) => (
          <div key={index}>
            <input
              type="text"
              value={sponsor}
              onChange={(e) => handleArrayChange(e, index, "sponsors")}
              className="input-class"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddSponsor} className="btn-class">
          Add Sponsor
        </button>
      </div>

      <div>
        <label>Event Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="select-class"
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label>Ticket Price</label>
        <input
          type="number"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleChange}
          className="input-class"
        />
      </div>
      {file}
      <div>
        <label>Upload Photos</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="input-class"
        />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {preview.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              className="w-32 h-32 object-cover"
            />
          ))}
        </div>
      </div>

      <button type="submit" className="btn-class">
        Submit
      </button>
    </form>
  );
};

export default Event;
