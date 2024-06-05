import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Youtube = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [selectUser, setSelectUser] = useState(0);
  const [editMode, seteditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/youtubeform");
      setData(response.data);
    } catch (error) {
      console.error("Error in getting data", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/youtubeform/${id}`);
    } catch (error) {
      console.error("This is error", error);
    }
    getUsers();
  };

  const Edit = (id) => {
    const selectUser = data.find((user) => user.id === id);
    seteditMode(true);
    if (selectUser) {
      setSelectUser(selectUser);
      setName(selectUser.name);
      setChannel(selectUser.channel);
      setEmail(selectUser.email);
      setComment(selectUser.comment);
    }
  };

  const UpdateUser = async () => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!email.trim()) {
      validationErrors.email = "Enter is Required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      validationErrors.email = "Enter a Valid Email";
    }
    if (!channel.trim()) {
      validationErrors.channel = "Enter channel name";
    }
    if (!comment.trim()) {
      validationErrors.comment = "Please add comment";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (selectUser) {
        let data = {
          name: name,
          email: email,
          channel: channel,
          comment: comment,
        };

        try {
          const response = await axios.put(
            `http://localhost:3000/youtubeform/${selectUser.id}`,
            data
          );
        } catch (error) {
          console.error("Error in updating data", error);
        }
      }
      setName("");
      setChannel("");
      setComment("");
      setEmail("");
      getUsers();
    }
  };

  const SaveUser = async (e) => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      validationErrors.email = "Enter a valid email";
    }
    if (!channel.trim()) {
      validationErrors.channel = "channel name is required";
    }
    if (!comment.trim()) {
      validationErrors.comment = "comment is required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      e.preventDefault();

      let data = { name, email, channel, comment };
      try {
        const response = await axios.post(
          "http://localhost:3000/productReviews",
          data
        );
      } catch (error) {
        console.error("Error in posting data", error);
      }
      setName("");
      setChannel("");
      setComment("");
      setEmail("");
      getUsers();
    }
  };

  return (
    <div className="container">
      <div className="table-wrapper">

        <table className="table youtube">
          <thead className="table-head">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Channel</th>
              <th scope="col">Notes</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr key={index}>
                <th scope="row">{indexOfFirstItem + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.channel}</td>
                <td>{user.comment}</td>
                <td>
                  <DeleteIcon onClick={() => deleteUser(user.id)} />
                  &nbsp;
                  <EditIcon onClick={() => Edit(user.id)} seteditMode={true} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
            <button className="page-link" onClick={handlePrevPage}>Previous</button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 && 'active'}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={handleNextPage}>Next</button>
          </li>
        </ul>
      </nav>
      <div className="form-container">
        <h1 className="heading">This is Youtube Form</h1>
        <div className="Youtube-input">
          {" "}
          <input
            type="text"
            name="email"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {errors.name && <span>{errors.name}</span>}
        <div className="Youtube-input">
          {" "}
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <span>{errors.email}</span>}
        <div className="Youtube-input">
          {" "}
          <input
            type="text"
            name="name"
            placeholder="Channel"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          />
        </div>
        {errors.channel && <span>{errors.channel}</span>}
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea">Comments</label>
          {errors.comment && <span>{errors.comment}</span>}
        </div>

        <br />
        <button
          className="btn-primary "
          onClick={editMode ? UpdateUser : SaveUser}
        >
          {editMode ? "Update.." : "Save User"}
        </button>
      </div>

    </div>
  );
};

export default Youtube;
