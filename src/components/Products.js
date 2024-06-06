import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [selectUser, SetSelectUser] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const Edit = (id) => {
    const selectUser = products.find((data) => data.id === id);
    if (selectUser) {
      SetSelectUser(selectUser);
      setProductName(selectUser.name);
      setProductPrice(selectUser.price);
      setDescription(selectUser.description);
      setIsEditMode(true);
    }
  };

  const EditProduct = () => {
    const validationErrors = {};
    if (!productName.trim()) {
      validationErrors.productName = "Product name is required";
    }
    if (!productPrice.trim()) {
      validationErrors.productPrice = "Product Price is required";
    }
    if (!description.trim()) {
      validationErrors.description = "Description is required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      if (selectUser) {
        let data = {
          name: productName,
          price: productPrice,
          description: description,
        };
        fetch(`http://localhost:3000/addproduct/${selectUser.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((result) => {
          result.json().then((resp) => {
            setProductName("");
            setProductPrice("");
            setDescription("");
            updateProduct();
            setIsEditMode(false);
            SetSelectUser(0);
          });
        });
      } else {
        setProductName("");
        setProductPrice("");
        setDescription("");
        setIsEditMode(false);
        SetSelectUser(0);
      }
    }
  };

  const addProduct = () => {
    const validationErrors = {};
    if (!productName.trim()) {
      validationErrors.productName = "Product name is required";
    }
    if (!productPrice.trim()) {
      validationErrors.productPrice = "Product Price is required";
    }
    if (!description.trim()) {
      validationErrors.description = "Description is required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      let data = {

        name: productName,
        price: productPrice,
        description: description,
      };
      fetch("http://localhost:3000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((resp) => {
          setProductName("");
          setProductPrice("");
          setDescription("");
          updateProduct();
        });
      });
    }
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:3000/addproduct/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        updateProduct();
      });
    });
  };

  const updateProduct = async () => {
    let url = "http://localhost:3000/addproduct";
    const data = await fetch(url);
    const parsedData = await data.json();
    setProducts(parsedData);
  };

  useEffect(() => {
    updateProduct();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const filteredProducts = products.filter((data) =>
    search.toLowerCase() === ""
      ? data
      : data.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container">
      <label htmlFor="site-search">
        <h3>Search Product</h3>
      </label>
      <input
        type="search"
        id="site-search"
        name="q"
        onChange={handleSearchChange}
      />
      <div className="table-wrapper">

        <table className="table product">
          <thead className="table-head">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((data) => (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.name}</td>
                <td>${data.price}</td>
                <td>{data.description}</td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => deleteProduct(data.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button className="btn-primary" onClick={() => Edit(data.id)}>
                    Edit
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
      <div className="add-restaurant">
        <div className="input-fields">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          {errors.productName && <span>{errors.productName}</span>}
        </div>
        <div className="input-fields">
          <input
            type="text"
            placeholder="Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          {errors.productPrice && <span>{errors.productPrice}</span>}
        </div>
        <div className="input-fields">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span>{errors.description}</span>}
        </div>
        <div className="input-fields">
          <button
            className="btn-primary"
            onClick={isEditMode === true ? EditProduct : addProduct}
          >
            {isEditMode ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
