import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  DELETE_SUCCEESS,
  getmedeleted,
} from "../../../../redux/actions/itemActions";
import {baseurl} from "../../../../utils/baseApi/baseapi";

const PhotoFormatter = (value) => (
  <div
    className="products-list__img-wrap"
    style={{width: "70px", height: "70px"}}
  >
    <img src={value} alt="" style={{width: "70px", height: "70px"}} />
  </div>
);

const CreateTable = () => {
  const dispatch = useDispatch();

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

  const {items} = useSelector((state) => state.items);

  const [init, setInit] = useState({product: [...items]});

  console.log(init, "what");
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
  let coun = 1;
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Image</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>SKU</th>
          <th>Price</th>
          <th>Category</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {init.product.map((item) => (
          <tr key={item._id}>
            <td>{coun.toString()}</td>
            <td>{PhotoFormatter(baseurl + "/" + item.image)}</td>
            <td>{item.name}</td>
            <td>{item.stock}</td>
            <td>{item.sku}</td>
            <td>{item.stock.toString()}</td>
            <td>
              {CategoryFormatter(
                item.mainCategory ? item.mainCategory.name : null,
                item.subCategory ? item.subCategory.name : null,
                item.childCategory ? item.childCategory.name : null
              )}
            </td>
            <td>{StatusFormatter(item.status)}</td>
            <td>{ActionFormatter(item._id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CreateTable;
