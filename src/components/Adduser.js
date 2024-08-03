import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [selectUser, SetSelectUser] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const notify = () => toast.success("User Saved successfully!");
  const notifyq = () => toast.success("User Deleted successfully!");
  const notifyw = () => toast.success("User Updated successfully!");


  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    const url = "http://localhost:3000/users";
    const data = await fetch(url);
    const parsedData = await data.json();
    setUsers(parsedData);
  };

  const Edit = (id) => {
    const selectedUser = users.find((user) => user.id === id);
    if (selectedUser) {
      SetSelectUser(selectedUser);
      setName(selectedUser.name);
      setEmail(selectedUser.email);
      setPassword(selectedUser.password);
      setIsEditMode(true);
    }
  };

  const handleUpdate = () => {
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
      validationErrors.password = "Password length should be at least 6 Characters";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (selectUser) {
        const updateUserUrl = `http://localhost:3000/users/${selectUser.id}`;
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
            SetSelectUser(null); // Reset selected user after update
            setName("");
            setEmail("");
            setPassword("");
            updateUsers();
            setIsEditMode(false);
            SetSelectUser(0); // Assuming you want to update the user list after the update
            notifyw("updated")
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      } else {
        setName("");
        setEmail("");
        setPassword("");
        updateUsers();
        setIsEditMode(false);
        SetSelectUser(0);
      }
    }
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        updateUsers();
        notifyq("Deleted");
      });
    });
  };

  const save = () => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Name is Required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is Required";
    }
    // } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
    //   validationErrors.email = "Email is not Valid";
    // }
    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password length should be at least 6 Characters";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      let data = { name, email, password };
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .then((resp) => {
          setName("");
          setEmail("");
          setPassword("");
          updateUsers();
          notify("Login successful!");

        });
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };


  const searchTerm = (search || "").toLowerCase();
  const filteredUsers = users.filter((data) =>
    searchTerm === "" || (data.name && data.name.toLowerCase().includes(searchTerm))
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />

      <h2>User List</h2>
      <h6>Search User</h6>
      <input
        type="search"
        id="site-search"
        placeholder="Search by Username"
        name="q"
        onChange={handleSearchChange}
      />
      <div className="table-wrapper">

        <table className="table addnew">
          <thead className="table-head">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button className="btn-primary" onClick={() => Edit(user.id)}>
                    Edit
                  </button>
                  <button className="btn-primary" onClick={() => deleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
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
