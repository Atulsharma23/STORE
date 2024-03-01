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
    if (Object.keys(validationErrors).length === 0){
    if (selectUser) {
      let data = {
        name: productName,
        price: productPrice,
        description: description,
      };
      fetch(`http://localhost:3001/addproduct/${selectUser.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        result.json().then((resp) => {
          console.log(resp);
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
      fetch("http://localhost:3001/addproduct", {
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
    fetch(`http://localhost:3001/addproduct/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        updateProduct();
      });
    });
  };

  const updateProduct = async () => {
    let url = "http://localhost:3001/addproduct";
    const data = await fetch(url);
    const parsedData = await data.json();
    setProducts(parsedData);
  };

  useEffect(() => {
    updateProduct();
  }, []);

  return (
    <div className="container">
      <label for="site-search">
        <h3>Search Product</h3>
      </label>
      <input
        type="search"
        id="site-search"
        name="q"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col"> Product Name</th>
            <th scope="col">Price </th>
            <th scope="col">Description</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((data) => {
              return search.toLowerCase() === ""
                ? data
                : data.name.toLowerCase().includes(search);
            })
            .map((data) => (
              <tr>
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
            placeholder="Discription"
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
