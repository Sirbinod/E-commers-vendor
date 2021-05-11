import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserstart } from '../../../../redux/actions/userActions';
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


const CreateDataUserListTable = () => {
  const dispatch = useDispatch();
  
  var token = localStorage.getItem('token');
  // update this line 
  const {done,users} = useSelector(state=>state.users);
  
  useEffect(() => {
    if(!done && users.length === 0 ){

      // api call  
        dispatch(getuserstart(token))
    }
   

  })
  if(done && users.length !== 0){
      
    data = [];
    users.map(user => {
      // console.log(item)
      data.push({
        id: user._id,
        photo: PhotoFormatter('https://haatbazaar.herokuapp.com/'+user.profileDetails.profilePicture),
        name: user.profileDetails.firstname,
        phone: user.profileDetails.phone,
        email: user.profileDetails.email,
        status: StatusFormatter(user.verified),
        actionn: [
          (ActionFormatter(user._id)),
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
        Header: 'Phone',
        accessor: 'phone',
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


  const userListTableData = { tableHeaderData: columns, tableRowsData: data };
  console.log(data)
  return userListTableData;
};

export default CreateDataUserListTable;
