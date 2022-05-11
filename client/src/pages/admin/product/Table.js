import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// import Paginate from '../components/Paginate'

const BasicTable = ({ products, handleRemove }) => {
  //   const pageNumber = match.params.pageNumber || 1

  return (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>BRAND</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.title}</td>
              <td>{product.title}</td>
              <td>{product.title}</td>
              <td>{product.title}</td>
              <td>{product.title}</td>
              <td>{product.title}</td>
              {/* <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td> */}
              <td>
                <Link to={`/admin/product/${product.slug}`}>
                  <EditOutlined className="text-warning" />
                </Link>

                <Button variant="primary" className="btn-sm">
                  <DeleteOutlined
                    onClick={() => handleRemove(product.slug)}
                    className="text-danger"
                  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
    </>
  );
};

export default BasicTable;
