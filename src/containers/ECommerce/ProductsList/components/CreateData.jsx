import React, {useMemo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  DELETE_SUCCEESS,
  getmedeleted,
} from "../../../../redux/actions/itemActions";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {baseurl} from "../../../../utils/baseApi/baseapi";

const PhotoFormatter = (value) => (
  <div
    className="products-list__img-wrap"
    style={{width: "50px", height: "100px"}}
  >
    <img src={value} alt="" style={{width: "50px", height: "100px"}} />
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
        <span className="badge badge-primary" style={{"margin-left": "10px"}}>
          {value1}
        </span>
        <span className="badge badge-secondary" style={{"margin-left": "10px"}}>
          {value2}
        </span>
        <span className="badge badge-success" style={{"margin-left": "10px"}}>
          {value3}
        </span>
      </div>
    );
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

  const dispatch = useDispatch();

  const {done, items} = useSelector((state) => state.items);

  const [init, setInit] = useState({product: [...items]});
  const [deleteConfig, setdeleteConfig] = useState({
    loading: false,
    error: null,
  });
  const deletechk = async (e, idd) => {
    // e.preventDefault();
    setdeleteConfig({loading: true, ...deleteConfig});
    const r = window.confirm("Do you really want to Delete?");
    if (r === true) {
      var token = localStorage.getItem("token");
      const reqtem = init.product.filter((item) => item._id === idd);
      const delIndex = init.product.indexOf(reqtem);
      const slugdata = reqtem[0]._id;
      try {
        await getmedeleted(token, slugdata);
        let newProduct = init.product;
        newProduct = newProduct.splice(delIndex);
        setInit({product: [...newProduct]});
        console.log(newProduct, "which on ");

        dispatch(() => {
          return {type: DELETE_SUCCEESS, payload: slugdata};
        });

        setdeleteConfig({loading: false, error: null});
      } catch (err) {
        console.log(err);
        setdeleteConfig({
          ...deleteConfig,
          loading: false,
          error: err.toString,
        });
      }
    } else {
      alert("Cancelled");
    }
  };
  if (done) {
    data = [];
    let coun = 1;
    if (init.product) {
      init.product.map((item) => {
        data.push({
          id: coun.toString(),
          photo: PhotoFormatter(baseurl + "/" + item.image),
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
