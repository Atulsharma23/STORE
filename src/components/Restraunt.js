import React, { useEffect, useState } from "react";

const Restraunt = () => {
  const [restau, setRestau] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [email, setEmail] = useState("");
  const [selectUser, setSelectUser] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const Edit = (id) => {
    const selectedUser = restau.find((restaurant) => restaurant.id === id);
    if (selectedUser) {
      setSelectUser(selectedUser);
      setName(selectedUser.name);
      setAddress(selectedUser.address);
      setEmail(selectedUser.email);
      setRating(selectedUser.rating);
      setIsEditMode(true);
    }
  };

  const updateRes = () => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Restaurant name is required";
    }
    if (!address.trim()) {
      validationErrors.address = "Address is Required";
    }
    if (!rating.trim()) {
      validationErrors.rating = "Rating is  Required";
    }
    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      validationErrors.email=("Enter Valid email");
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0){
    if (selectUser) {
      let data = { name, address, rating, email };

      fetch(`http://localhost:3001/restaurant/${selectUser.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => result.json())
        .then((resp) => {
          console.log(resp);
          setName("");
          setAddress("");
          setEmail("");
          setRating("");
          updateRestraunt();
          setIsEditMode(false);
          setSelectUser(0);
        });
    } else {
      setName("");
      setAddress("");
      setEmail("");
      setRating("");
      updateRestraunt();
      setIsEditMode(false);
      setSelectUser(0);
    }
  }
  };

  const addrestaurant = () => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Restaurant name is required";
    }
    if (!address.trim()) {
      validationErrors.address = "Address is Required";
    }
    if (!rating.trim()) {
      validationErrors.rating = "Rating is  Required";
    }
    if (!email.trim()) {
      validationErrors.email="Email is required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      validationErrors.email("Enter Valid email");
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let data = { name, address, rating, email };
      fetch("http://localhost:3001/restaurant", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((resp) => {
          console.log(resp);
          setName("");
          setAddress("");
          setRating("");
          setEmail("");
          updateRestraunt();
        });
      });
    }
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:3001/restaurant/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        updateRestraunt();
      });
    });
  };

  const updateRestraunt = async () => {
    const url = "http://localhost:3001/restaurant";
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);
    setRestau(parsedData);
  };

  useEffect(() => {
    updateRestraunt();
  }, []);

  return (
    <div className="container">
      <div className="Restraunt-List">
        <h2>Restraunt List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">RESTAURANT NAME</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">RATING</th>
              <th scope="col">EMAIL</th>
              <th scope="col">DELETE</th>
              <th scope="col">EDIT</th>
            </tr>
          </thead>
          <tbody>
            {restau.map((restaurant) => (
              <tr key={restaurant.id}>
                <th scope="row">{restaurant.id}</th>
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.rating}</td>
                <td>{restaurant.email}</td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => deleteUser(restaurant.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => Edit(restaurant.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="add-restaurant">
          <div className="input-fields">
            <input
              type="text"
              placeholder="Restaurant"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div className="input-fields">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <span>{errors.address}</span>}
          </div>

          <div className="input-fields">
            <input
              type="number"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            {errors.rating && <span>{errors.rating}</span>}
          </div>

          <div className="input-fields">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="input-fields">
            <button
              className="btn-primary"
              onClick={isEditMode === true ? updateRes : addrestaurant}
            >
              {isEditMode ? "Update Restaurant" : "Add Restaurant"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restraunt;