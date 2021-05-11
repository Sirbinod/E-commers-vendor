import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getme, getmedeleted } from '../../../../redux/actions/itemActions';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../loadingSpinner';
import { Link } from 'react-router-dom';
// import { Alert, Button } from 'reactstrap';


const PhotoFormatter = value => (
  <div className="products-list__img-wrap">
    <img src={value} alt="" />
  </div>
);






const StatusFormatter = value => (
  value === '1' ? <span className="badge badge-secondary">Pending</span>
  : value === '2' ? <span className="badge badge-success">Approved</span>
    : <span className="badge badge-warning">Suspended</span>
);



StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};
//  alert(token)
// fetchData(token)

let data = [];


const CreateDataProductListTable = () => {
  
  const ActionFormatter = val => (
    [
   <Link to={`./product_page/${val}`}  className="btn btn-outline-primary btn-sm"><span className="lnr lnr-eye"></span></Link>,
    <button id={val} className="btn btn-outline-danger btn-sm" onClick={(e) => deletechk(e, val)}><span className="lnr lnr-trash"></span></button>
    ]
    );
    ActionFormatter.propTypes = {
      value: PropTypes.string.isRequired,
    };
  const dispatch = useDispatch();

  var token = localStorage.getItem('token');
  // update this line 
  const {done,items, loading} = useSelector(state=>state.items);
   
  useEffect(() => {
    if(!done && items.length === 0 ){

      // api call  
        dispatch(getme(token))
    }
   

  })
  const deletechk = (e, idd) => {
    e.preventDefault();
    // const idd = this.attr('id');
    const r = window.confirm("Do you really want to Delete?"); 
    if(r == true){ 
  var token = localStorage.getItem('token');
      const reqtem = items.filter(item => item._id === idd);
      const slugdata = reqtem[0].slug
  
      dispatch(getmedeleted(token, slugdata));
      // alert(idd);
    }else{
      alert("Cancelled")
    }
  
  }
  if(done && items.length !== 0){
      
    data = [];
  
      items.map(item => {
        // console.log(item)
        data.push({
          id: item._id,
          photo: PhotoFormatter('https://haatbazaar.herokuapp.com/'+item.image),
          name: item.name,
          category: item.mainCategory,
          quantity: item.viewCounts.toString(),
          article: item.sku,
          price: item.price.toString(),
          status: StatusFormatter('1'),
          actionn: [
            (ActionFormatter(item._id)),
          ],
        });
      })
    
    }


  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 80,
      },
      {
        Header: 'Photo',
        accessor: 'photo',
        disableGlobalFilter: true,
        disableSortBy: true,
      },
      {
        Header: 'Name',
        accessor: 'name',
        disableSortBy: true,
      },
      {
        Header: 'Category',
        accessor: 'category',
        disableSortBy: true,
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
        disableSortBy: true,
      },
      {
        Header: 'SKU',
        accessor: 'article',
        disableSortBy: true,
      },
      {
        Header: 'Price, Rs',
        accessor: 'price',
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

  loading ? <LoadingSpinner /> : data=data
  const productListTableData = { tableHeaderData: columns, tableRowsData: data };
  return productListTableData;
};

export default CreateDataProductListTable;
