import React from "react";
import { useNavigate } from "react-router-dom";
import { useAPI } from "../../context/context";
import "./Card.css";

const Card = (props) => {
  const { setEditUser } = useAPI();
  const { username, occupation, profile_picture }=props.data;
  const navigate = useNavigate();

  const handleEditClick=(data)=>{
    setEditUser(data);
    navigate("/edit");
  }
  return (
      <div className="card">
        <div className="card-header">
        <img src={profile_picture} alt={username}/>
        </div>
        <div className="card-body">
          <h4>Name: {username}</h4>
          <p>Occupation: {occupation}</p>
        </div>
        <button className="editbtn" onClick={()=>handleEditClick(props.data)}>Edit</button>
      </div>
  );
};

export default Card;
