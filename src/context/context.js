import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../constants/url";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({});

  const getUsers = async () => {
    try {
      await axios.get(url).then((res) => setUsers(res.data.message));
    } catch (error) {
      console.log(error);
    }
  };
  const searchUser = async (name) => {
    try {
      await axios.get(`${url}${name}`).then((res) => setUsers(res.data.message));
    } catch (error) {
     alert(error.message);
      console.log(error);
    }
  };

  const postUser = async (userData) => {
    try {
      await axios.post(url, userData).then((res) => {
        alert("Successfully Uploaded");
        navigate("/users");
      });

    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const patchUser=async (data,id)=>{
    await axios.put(`${url}${id}`, data).then((res) => {
      alert("Successfully Updated");
      navigate("/users");
    });
  }
  return (
    <APIContext.Provider value={{ getUsers, users, postUser, searchUser, setEditUser, editUser, patchUser }}>
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
