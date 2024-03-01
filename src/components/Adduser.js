import React, { useState, useEffect } from "react";
const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [selectUser, SetSelectUser] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  function Edit(id) {
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) {
      SetSelectUser(selectedUser);
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPassword(selectedUser.password);
      setIsEditMode(true);
    }
  }
  function handleUpdate() {

    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Name is Required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is Required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      validationErrors.email = "Email is not Valid";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password =
        "Password length should be at least 6 Characters";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {





      if (selectUser) {
        const updateUserUrl = `http://localhost:3001/users/${selectUser.id}`;

        fetch(updateUserUrl, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        })
          .then((result) => result.json())
          .then((resp) => {
            console.log(resp);
            // Additional logic after the update if needed
            SetSelectUser(null); // Reset selected user after update
            setName("");
            setEmail("");
            setPassword("");
            updateUser();
            setIsEditMode(false);
            SetSelectUser(0); // Assuming you want to update the user list after the update
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      } else {
        setName("");
        setEmail("");
        setPassword("");
        updateUser();
        setIsEditMode(false);
        SetSelectUser(0);
      }
    }
  }

  function deleteUser(id) {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        updateUser();
      });
    });
  }

  const updateUser = async () => {
    const url = "http://localhost:3001/users";
    const data = await fetch(url);
    const parsedData = await data.json();
    setUsers(parsedData);
  };

  function save() {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Name is Required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is Required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      validationErrors.email = "Email is not Valid";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password =
        "Password length should be at least 6 Characters";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let data = { name, email, password };
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .then((resp) => {
          console.log("User saved:", resp);
          setName("");
          setEmail("");
          setPassword("");
          updateUser();
        });
    } else {
      alert("Please add valid data");
    }
  }

  const updateusers = async () => {
    const url = "http://localhost:3001/users";
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
  };
  useEffect(() => {
    updateusers();
  }, []);
  useEffect(() => {
    updateUser();
  }, []);
  return (
    <div className="container">
      <h2>User List</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button className="btn-primary" onClick={() => Edit(user.id)}>
                  Edit
                </button>
                <button
                  className="btn-primary"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="Update-User">
        <div className="input-fields">
          <h2>Add User</h2>
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className="input-fields">
          <input
            type="text"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div className="input-fields">
          <input
            type="text"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
      </div>
      <div className="button">
        <button
          className="btn-primary"
          onClick={isEditMode ? handleUpdate : save}
        >
          {isEditMode ? "Update User" : "Save User"}
        </button>
      </div>
    </div>
  );
};

export default AddUser;
