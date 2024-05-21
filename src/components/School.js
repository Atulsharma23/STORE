import React, { useEffect, useState } from "react";
import axios from "axios";

const School = () => {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState("");
  const [school, setSchool] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [errors, setErrors] = useState({});
  const [selectUser, setSelectUser] = useState(0);
  const [editMode, seteditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust the number of items per page as needed

  const Edit = async (id) => {
    const selectUser = data.find((item) => item.id === id);
    seteditMode(true);
    setSelectUser(selectUser);
    setStudent(selectUser.student);
    setSchool(selectUser.school);
    setAddress(selectUser.address);
    setPhone(selectUser.phone);
    setZipcode(selectUser.zipcode);
  };

  const Update = async () => {
    const validationErrors = {};
    if (!student.trim()) {
      validationErrors.student = "Student name is required";
    }
    if (!school.trim()) {
      validationErrors.school = "School name is required";
    }
    if (!address.trim()) {
      validationErrors.address = "Address is required";
    }
    if (!phone.trim()) {
      validationErrors.phone = "Phone no. is required";
    }
    if (!zipcode.trim()) {
      validationErrors.zipcode = "Zipcode is required";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      let data = {
        student: student,
        school: school,
        address: address,
        phone: phone,
        zipcode: zipcode,
      };

      const response = await axios.put(
        `http://localhost:3001/school/${selectUser.id}`,
        data
      );
      setStudent("");
      setSchool("");
      setAddress("");
      setPhone("");
      setZipcode("");
      getSchool();
    }
  };

  const saveSchool = async (e) => {
    const validationErrors = {};
    if (!student.trim()) {
      validationErrors.student = "Student Name is required";
    }
    if (!school.trim()) {
      validationErrors.school = "School name is required";
    }
    if (!address.trim()) {
      validationErrors.address = "Address is required ";
    }
    if (!phone.trim()) {
      validationErrors.phone = "Phone no. is required";
    }

    if (!zipcode.trim()) {
      validationErrors.zipcode = "Zipcode is required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      e.preventDefault();
      let data = { student, school, address, phone, zipcode };
      try {
        const response = await axios.post("http://localhost:3001/school", data);
        getSchool();
      } catch (error) {
      }
      setStudent("");
      setSchool("");
      setAddress("");
      setPhone("");
      setZipcode("");
    }
  };

  const Delete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/school/${id}`);
      console.log(response);
    } catch (error) {
      console.log("There is error in deleting ", error);
    }
    getSchool();
  };

  const getSchool = async () => {
    try {
      const response = await axios.get("http://localhost:3001/school");
      setData(response.data);
    } catch (error) {
    }
  };

  useEffect(() => {
    getSchool();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sr.No.</th>
            <th scope="col">Student Name</th>
            <th scope="col">School Name</th>
            <th scope="col">School Address</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Zipcode</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr className="table-warning" key={item.id}>
              <th scope="row">{item.id}</th>
              <td className="table-primary">{item.student}</td>
              <td className="table-secondary">{item.school}</td>
              <td className="table-success">{item.address}</td>
              <td className="table-danger">{item.phone}</td>
              <td className="table-warning">{item.zipcode}</td>
              <td>
                {" "}
                <button
                  className="table-warning btn-success btr"
                  onClick={() => Edit(item.id)}
                >
                  Edit
                </button>{" "}
              </td>
              <td>
                {" "}
                <button
                  className="table-warning btn-danger btr"
                  onClick={() => Delete(item.id)}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <div className="school-form">
        <div className="heading">
          <h2>This is School Form</h2>
        </div>
        <div className="input-fields">
          <input
            placeholder="Student Name"
            type="text"
            className="in"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
          {errors.student && <span className="er">{errors.student}</span>}
        </div>
        <div className="input-fields">
          <input
            placeholder="School Name"
            type="text"
            className="in"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
          {errors.school && <span className="er">{errors.school}</span>}
        </div>
        <div className="input-fields">
          <input
            placeholder=" School Address"
            type="text"
            className="in"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && <span className="er">{errors.address}</span>}
        </div>
        <div className="input-fields">
          <input
            placeholder="Phone number"
            type="telephone"
            className="in"
            value={phone}
            maxLength="10"
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <span className="er">{errors.phone}</span>}
        </div>
        <div className="input-fields">
          <input
            placeholder="ZipCode"
            type="telephone"
            className="in"
            value={zipcode}
            maxLength="6"
            onChange={(e) => setZipcode(e.target.value)}
          />
          {errors.zipcode && <span className="er">{errors.zipcode}</span>}
        </div>
        <div className="input-fields">
          <button
            className="btn-success w-25 btr"
            onClick={editMode ? Update : saveSchool}
          >
            {editMode ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default School;

