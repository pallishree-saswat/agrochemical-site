import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import logo from "../../img/logo.jpg"



const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);

      // console.log(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id} className="col-md-3  catagoryexplore ">
        <img
          src={c.image && c.image.length > 0 ? c.image[0].url : logo}
          alt="icon"
        />
        <Link to={`/category/${c.slug}`} className="slugName">{c.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </div>
    </div>
  );
};

export default CategoryList;
