import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import PreviousIcon from "../../assets/img/fi_chevrons-left.svg";
import NextIcon from "../../assets/img/fi_chevrons-right.svg";
import "./PageList.scss";

export const OrderList = () => {
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderData, setOrderData] = React.useState([]);
  const axios = require("axios");

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/admin/order").then((res) => {
      setOrderData(res.data);
    });
  }, [axios]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const getCurrentData = () => {
    return orderData.slice(
      currentPage * postsPerPage,
      currentPage * postsPerPage + postsPerPage
    );
  };

  const changeLimitPage = (e) => {
    setPostPerPage(parseInt(e.target.value));
  };

  const changePage = (e) => {
    setCurrentPage(parseInt(e.target.value));
  };

  return (
    <div className="page-list">
      <h4 className="table-title">List Order</h4>
      <Table className="table-list" borderless>
        <thead>
          <tr>
            <th>No</th>
            <th>User Email</th>
            <th>Car</th>
            <th>Start Rent</th>
            <th>Finish Rent</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentData().map((data, index) => {
            return (
              <tr key={`order-item-${index + 1 + currentPage * postsPerPage}`}>
                <td>{index + 1 + currentPage * postsPerPage}</td>
                <td>{data.User.email}</td>
                <td>{data.Car?.name}</td>
                <td>{data.start_rent_at}</td>
                <td>{data.finist_rent_at}</td>
                <td>{data.total_price}</td>
                <td>{data.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="button-group">
        <div className="button-group-2">
          <div className="dropdown">
            <div className="dropdown-title">Limit</div>
            <select
              name="limit-page"
              className="limit-page"
              onChange={changeLimitPage}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <div className="dropdown">
            <div className="dropdown-title">Jump to page</div>
            <div className="jump-page-group">
              <select
                name="jump-page"
                className="jump-page"
                onChange={changePage}
                value={currentPage}
              >
                {(() => {
                  let options = [];
                  for (
                    let i = 0;
                    i < Math.ceil(orderData.length / postsPerPage);
                    i++
                  ) {
                    options.push(
                      <option key={`jump-page-opt-${i}`} value={i}>
                        {i + 1}
                      </option>
                    );
                  }
                  return options;
                })()}
              </select>
              <Button variant="primary">Go</Button>
            </div>
          </div>
        </div>
        <ReactPaginate
          pageCount={Math.ceil(orderData.length / postsPerPage)}
          marginPagesDisplayed={1}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          previousLabel={<img src={PreviousIcon} alt={"Prev"} />}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLabel={<img src={NextIcon} alt={"Next"} />}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakClassName={"page-item disabled"}
          breakLinkClassName={"page-link"}
          onPageChange={handlePageClick}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export const CarList = () => {
  const [postsPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [carData, setCarData] = useState([]);
  const axios = require("axios");

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/admin/car").then((res) => {
      setCarData(res.data);
    });
  }, [axios]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const getCurrentData = () => {
    return carData.slice(
      currentPage * postsPerPage,
      currentPage * postsPerPage + postsPerPage
    );
  };

  const changeLimitPage = (e) => {
    setPostPerPage(parseInt(e.target.value));
  };

  const changePage = (e) => {
    setCurrentPage(parseInt(e.target.value));
  };

  return (
    <div className="page-list">
      <h4 className="table-title">List Car</h4>
      <Table className="table-list" borderless>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Start Rent</th>
            <th>Finish Rent</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentData().map((data, index) => {
            return (
              <tr key={`car-item-${index + 1 + currentPage * postsPerPage}`}>
                <td>{index + 1 + currentPage * postsPerPage}</td>
                <td>{data.name}</td>
                <td>{data.category}</td>
                <td>{data.price}</td>
                <td>{data.start_rent_at}</td>
                <td>{data.finist_rent_at}</td>
                <td>{data.updatedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="button-group">
        <div className="button-group-2">
          <div className="dropdown">
            <div className="dropdown-title">Limit</div>
            <select
              name="limit-page"
              className="limit-page"
              onChange={changeLimitPage}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <div className="dropdown">
            <div className="dropdown-title">Jump to page</div>
            <div className="jump-page-group">
              <select
                name="jump-page"
                className="jump-page"
                onChange={changePage}
                value={currentPage}
              >
                {(() => {
                  let options = [];
                  for (
                    let i = 0;
                    i < Math.ceil(carData.length / postsPerPage);
                    i++
                  ) {
                    options.push(
                      <option key={`jump-page-opt-${i}`} value={i}>
                        {i + 1}
                      </option>
                    );
                  }
                  return options;
                })()}
              </select>
              <Button variant="primary">Go</Button>
            </div>
          </div>
        </div>
        <ReactPaginate
          pageCount={Math.ceil(carData.length / postsPerPage)}
          marginPagesDisplayed={1}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          previousLabel={<img src={PreviousIcon} alt={"Prev"} />}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLabel={<img src={NextIcon} alt={"Next"} />}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakClassName={"page-item disabled"}
          breakLinkClassName={"page-link"}
          onPageChange={handlePageClick}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};
