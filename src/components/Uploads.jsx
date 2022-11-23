import React from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../context/context";
import "./style.css";

const Uploads = () => {
  const { postUser } = useAPI();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = e.target.username.value;
      const occupation = e.target.occupation.value;
      const image = e.target.image.files[0];
      if (username === "" || occupation === "" || image === undefined) {
        alert("Please Fill All The Value");
      } else {
        const userData = new FormData();
        userData.append("username", username);
        userData.append("occupation", occupation);
        userData.append("profile_picture", image);
        await postUser(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="uploads-container">
    <h1>User Info</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="username-conatiner">
          <label className="username-label">User Name</label>
          <input type="text" name="username" className="username" />
        </div>
        <div className="ocupation-container">
          <label className="ocupation-label">Occupation</label>
          <input type="text" name="occupation" className="occupation" />
        </div>
        <div className="profile-container">
          <label>Upload Image</label>
          <input type="file" name="image" className="image-file" />
        </div>
        <div className="submit-container">
          <input className="submit" type="submit" value="Submit" />
        </div>
      </form>
      <Link className="link" to="/users">Users</Link>
    </div>
  );
};
export default Uploads;
