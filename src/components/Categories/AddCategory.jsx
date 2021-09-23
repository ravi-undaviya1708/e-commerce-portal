import React, { useState } from "react";

const AddCategory = () => {
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`e`, e);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(`name`, name, `value`, value)
  };

  return (
    <div className="container">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">Add category</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="category_name"
                id="cat_name"
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="file"
                name="category_image"
                id="cat_image"
                className="form-control"
                onChange={(e) => handleChange(e)}
              />
              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
