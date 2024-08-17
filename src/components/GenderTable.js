import React, { useState } from "react";

const GenderTable = ({ data }) => {
  const [selectedGender, setSelectedGender] = useState("Select Gender");
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle gender selection and close dropdown
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setIsOpen(false);
  };

  // Filter data based on the selected gender
  const filterData = () => {
    console.log("Selected Gender:", selectedGender);
    if (selectedGender === "Select Gender") {
      return data; // Return all data if no gender is selected
    }
    // Filter the data based on gender
    const filtered = data.filter(
      (item) => item.gender.toLowerCase() === selectedGender.toLowerCase()
    );
    console.log("Filtered Data:", filtered);
    return filtered;
  };

  const filteredData = filterData(); // Get the filtered data

  return (
    <>
      {/* Custom dropdown for gender selection */}
      <div className="custom-dropdown">
        <div className="dropdown-header" onClick={toggleDropdown}>
          {selectedGender}
          <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            <li
              className="dropdown-item"
              onClick={() => handleGenderSelect("Select Gender")}
            >
              All
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleGenderSelect("Male")}
            >
              Male
            </li>
            <li
              className="dropdown-item"
              onClick={() => handleGenderSelect("Female")}
            >
              Female
            </li>
          </ul>
        )}
      </div>

      {/* Table displaying the filtered data */}
      <table className="table table-dark table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Gender</th>
            <th scope="col">Height</th>
            <th scope="col">Weight</th>
            <th scope="col">Address</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.firstName}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.height}</td>
                <td>{item.weight}</td>
                <td>{item.address.address}</td>
                <td>{item.address.country}</td>
              </tr>
            ))
          ) : (
            <tbody>
              {Array.isArray(data) &&
                data.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.firstName}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.height}</td>
                    <td>{item.weight}</td>
                    <td>{item.address.address}</td>
                    <td>{item.address.country}</td>
                  </tr>
                ))}
            </tbody>
          )}
        </tbody>
      </table>
    </>
  );
};

export default GenderTable;
