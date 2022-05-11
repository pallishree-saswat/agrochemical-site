import React, { useState, useEffect } from "react";
import {
  getCategory,
  getCategories,
  getCategorySubs,
} from "../functions/category";
import ProductCard from "../components/cards/ProductCard";
import { useParams ,Link} from "react-router-dom";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      handleCatagoryChange(res.data.category._id);
      setLoading(false);
    });
  }, []);

  const handleCatagoryChange = (_id) => {
    getCategorySubs(_id).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <>
            <h4 className="mt-4 jumbotron">
             {category.name}
            </h4>
            <hr/>
            </>
          )}
        </div>
      </div>
      <div className="row">
        {subOptions.map((p) => (
          <div className="col-md-2 subcatagoryexplore" key={p._id}>
           <Link to={`/sub/${p.slug}`}>{p.name}</Link>
          </div>
        ))}
      </div>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CategoryHome;
