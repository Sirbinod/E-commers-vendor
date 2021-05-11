import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getvendorsstart } from '../../../../redux/actions/vendorActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Alert, Button } from 'reactstrap';


const Img1 = `${process.env.PUBLIC_URL}/img/for_store/vase.png`;
const Img2 = `${process.env.PUBLIC_URL}/img/for_store/vase_2.png`;
const Img3 = `${process.env.PUBLIC_URL}/img/for_store/vase_3.png`;
const Img4 = `${process.env.PUBLIC_URL}/img/for_store/fur.png`;
const Img5 = `${process.env.PUBLIC_URL}/img/for_store/pillow.png`;
const Img6 = `${process.env.PUBLIC_URL}/img/for_store/pillow_2.png`;
const Img7 = `${process.env.PUBLIC_URL}/img/for_store/pillow_dog.png`;

const PhotoFormatter = value => (
  <div className="products-list__img-wrap">
    <img src={value} alt="" />
  </div>
);

const ActionFormatter = val => (
  [
  <Link to={`./product_page/${val}`}  key={`${val}`} className="btn btn-outline-secondary btn-sm"><span class="lnr lnr-eye"></span></Link>
  ]
  );

const StatusFormatter = value => (
  value === 'true' ? <span className="badge badge-success">Online</span>
    : <span className="badge badge-secondary">Offline</span>
);

ActionFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};
//  alert(token)
// fetchData(token)

let data = [];


const CreateDataVendorsListTable = () => {
  const dispatch = useDispatch();
  
  var token = localStorage.getItem('token');
  // update this line 
  const {done,vendors} = useSelector(state=>state.vendors);
  
  useEffect(() => {
    if(!done && vendors.length === 0 ){

      // api call  
        dispatch(getvendorsstart(token))
    }
   

  })
  if(done && vendors.length !== 0){
      
    data = [];
    vendors.map(vendor => {
      // console.log(item)
      data.push({
        id: vendor._id,
        name: vendor.name,
        username: vendor.username,
        email: vendor.email,
        status: StatusFormatter('true'),
        actionn: [
          (ActionFormatter(vendor._id)),
        ],
      });
    })
    console.log(data)
  
  }
    // console.log(dd)

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 80,
      },
      {
        Header: 'Name',
        accessor: 'name',
        disableSortBy: true,
      },
      {
        Header: 'Username',
        accessor: 'username',
        disableSortBy: true,
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableSortBy: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableGlobalFilter: true,
        disableSortBy: true,
        formatter: StatusFormatter,
        width: 110,
      },
      {
        Header: 'Action',
        accessor: 'actionn',
        disableGlobalFilter: true,
        disableSortBy: true,
        formatter: ActionFormatter,
        width: 110,
      }
    ], [],
  );


  const vendorsListTableData = { tableHeaderData: columns, tableRowsData: data };
  console.log(data)
  return vendorsListTableData;
};

export default CreateDataVendorsListTable;
