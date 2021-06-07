import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getme, getmedeleted } from "../../../../redux/actions/itemActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { baseurl } from "../../../../utils/baseApi/baseapi";

const PhotoFormatter = (value) => (
  <div className="products-list__img-wrap">
    <img src={value} alt="" />
  </div>
);

const StatusFormatter = (value) =>
  value === 1 ? (
    <span className="badge badge-secondary">Pending</span>
  ) : value === 2 ? (
    <span className="badge badge-success">Approved</span>
  ) : (
    <span className="badge badge-warning">Suspended</span>
  );

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

const CreateDataProductListTable = () => {
  let data = [];
  const CategoryFormatter = (value1, value2, value3) => {
    return (
      <div>
        <span className="badge badge-primary" style={{ "margin-left": "10px" }}>
          {value1}
        </span>
        <span
          className="badge badge-secondary"
          style={{ "margin-left": "10px" }}
        >
          {value2}
        </span>
        <span className="badge badge-success" style={{ "margin-left": "10px" }}>
          {value3}
        </span>
      </div>
    );
  };
  CategoryFormatter.propTypes = {
    value: PropTypes.string || null,
  };

  const ActionFormatter = (val) => [
    <Link
      to={`./product_page/${val}`}
      className="btn btn-outline-primary btn-sm"
    >
      <span className="lnr lnr-eye"></span>
    </Link>,
    <Link
      to={`./product/${val}/edit`}
      className="btn btn-outline-primary btn-sm"
    >
      {" "}
      <span className="lnr lnr-pencil"></span>
    </Link>,
    <button
      id={val}
      className="btn btn-outline-danger btn-sm"
      onClick={(e) => deletechk(e, val)}
    >
      <span className="lnr lnr-trash"></span>
    </button>,
  ];
  ActionFormatter.propTypes = {
    value: PropTypes.string.isRequired,
  };
  const dispatch = useDispatch();

  var token = localStorage.getItem("token");
  const { done, items } = useSelector((state) => state.items);

  // useEffect(() => {
  //   if (!done && items.length === 0) {
  //     dispatch(getme(token));
  //   }
  // });
  const deletechk = (e, idd) => {
    e.preventDefault();
    const r = window.confirm("Do you really want to Delete?");
    if (r === true) {
      var token = localStorage.getItem("token");
      const reqtem = items.filter((item) => item._id === idd);
      const slugdata = reqtem[0].slug;

      dispatch(getmedeleted(token, slugdata));
    } else {
      alert("Cancelled");
    }
  };
  if (done) {
    data = [];
    let coun = 1;
    items.map((item) => {
      data.push({
        id: coun.toString(),
        photo: PhotoFormatter(baseurl + item.image),
        name: item.name,
        quantity: item.stock.toString(),
        article: item.sku,
        price: item.price.toString(),
        categorymain: CategoryFormatter(
          item.mainCategory ? item.mainCategory.name : null,
          item.subCategory ? item.subCategory.name : null,
          item.childCategory ? item.childCategory.name : null
        ),
        status: StatusFormatter(item.status),
        actionn: [ActionFormatter(item._id)],
      });
      coun++;
      return "";
    });
  }

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        width: 80,
      },
      {
        Header: "Photo",
        accessor: "photo",
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      {
        Header: "Name",
        accessor: "name",
        disableSortBy: true,
      },

      {
        Header: "Quantity",
        accessor: "quantity",
        disableSortBy: true,
      },
      {
        Header: "SKU",
        accessor: "article",
        disableSortBy: true,
      },
      {
        Header: "Price, Rs",
        accessor: "price",
      },
      {
        Header: "Category",
        accessor: "categorymain",
        disableSortBy: true,
        disableGlobalFilter: true,
        formatter: CategoryFormatter,
        width: 110,
      },
      {
        Header: "Status",
        accessor: "status",
        disableGlobalFilter: true,
        disableSortBy: true,
        formatter: StatusFormatter,
        width: 110,
      },
      {
        Header: "Action",
        accessor: "actionn",
        disableGlobalFilter: true,
        disableSortBy: true,
        width: 110,
      },
    ],
    []
  );

  const productListTableData = {
    tableHeaderData: columns,
    tableRowsData: data,
  };

  return productListTableData;
};

export default CreateDataProductListTable;
