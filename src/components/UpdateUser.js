import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userVerifyUrl, localStorageKey } from "../utils/constant";
import "../styles/style.css";

function UpdateUser(props) {
  const [newuser, setNewUser] = useState({
    email: "",
    username: "",
    bio: "",
    image: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    bio: "",
    other: "",
  });

  const { user } = props;

  useEffect(() => {
    // Update the state when the user prop changes
    setNewUser((prevUser) => ({
      email: user.email || prevUser.email || "",
      username: user.username || prevUser.username || "",
      bio: user.bio || prevUser.bio || "",
      image: user.image || prevUser.image || "",
    }));
  }, [user]);

  const navigate = useNavigate();
  const storageKey = localStorage.getItem(localStorageKey);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newuser,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      bio: "",
      other: "",
    };

    // Add validation rules as needed
    // For example, you may want to check the email format.

    setErrors(newErrors);

    return !(newErrors.username || newErrors.bio || newErrors.other);
  };

  const updateUser = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      fetch(userVerifyUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: storageKey,
        },
        body: JSON.stringify({ user: newuser }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response.text();
        })
        .then((data) => {
          navigate(`/profiles/${data.user.username}`);
        })
        .catch((error) => {
          if (error.text) {
            // If it's a response object with a text method, use that
            return error.text().then((errorText) => {
              setErrors({ ...errors, other: errorText });
            });
          }
          // If it's not a response object, handle it accordingly
          setErrors({ ...errors, other: "An error occurred." });
          return false;
        });
    }
  };

  return (
    <div className="updateuser-container">
      <h1 className="updateuser-heading">Update User</h1>
      <form id="userForm">

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            className="input-field"
            rows="4"
            value={newuser.username}
            onChange={handleInputChange}
          />
          <span className="error">{errors.username}</span>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            className="input-field"
            rows="4"
            value={newuser.bio}
            onChange={handleInputChange}
          />
          <span className="error">{errors.bio}</span>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            className="input-field"
            value={newuser.image}
            onChange={handleInputChange}
          />
        </div>

        <span className="error">{errors.other}</span>

        <button type="submit" onClick={(event) => updateUser(event)} className="btn-2">
          Update User
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
