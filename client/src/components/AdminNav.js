import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav className="adminnav">
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link admin-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link admin-link">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link admin-link">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link admin-link">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link admin-link">
          Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/queries" className="nav-link admin-link">
          Queries
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/accounts" className="nav-link admin-link">
          Accounts
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
