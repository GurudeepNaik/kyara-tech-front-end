import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../context/context";

const EditPage = () => {
  const { editUser, patchUser } = useAPI();
  const [edit, setEdit] = useState({
    username: editUser.username,
    occupation: editUser.occupation,
    image: "",
  });
  console.log(editUser);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = e.target.username.value;
      const occupation = e.target.occupation.value;
      let image = e.target.image.files[0];
      if (username === "" || occupation === "") {
        alert("Please Fill All The Value");
      } else {
        const userData = new FormData();
        userData.append("username", username);
        userData.append("occupation", occupation);
        if (image !== undefined) userData.append("profile_picture", image);
        await patchUser(userData, editUser._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setEdit((edit) => ({ ...edit, [e.target.name]: e.target.value }));
  };
  return (
    <div>
      <div className="uploads-container">
        <h1>Edit User</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="username-conatiner">
            <label className="username-label">User Name</label>
            <input
              type="text"
              name="username"
              className="username"
              value={edit.username}
              onChange={handleChange}
            />
          </div>
          <div className="ocupation-container">
            <label className="ocupation-label">Occupation</label>
            <input
              type="text"
              name="occupation"
              className="occupation"
              value={edit.occupation}
              onChange={handleChange}
            />
          </div>
          <div className="profile-container">
            <label>Upload Image</label>
            <input type="file" name="image" className="image-file" />
          </div>
          <div className="submit-container">
            <input className="submit" type="submit" value="Submit" />
          </div>
        </form>
        <Link className="link" to="/users">
          Users
        </Link>
      </div>
    </div>
  );
};

export default EditPage;
