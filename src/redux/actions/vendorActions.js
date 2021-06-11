// import axios from "axios";
// import {vendorlistapi} from "../../utils/baseApi/baseapi";

// export const SVENDOR_START = "SVENDOR_START";
// export const LOAD_NEW_VENDOR = "LOAD_NEW_VENDOR";

// const vendorschkStart = () => {
//   return {
//     type: SVENDOR_START,
//   };
// };
// function loadvendors(vendors) {
//   return {
//     type: LOAD_NEW_VENDOR,
//     vendors,
//   };
// }

// export const getvendorsstart = (token) => (dispatch) => {
//   dispatch(vendorschkStart());

//   axios({
//     method: "get",
//     url: vendorlistapi,
//     headers: {Authorization: "Bearer " + token},
//   })
//     .then(function (response) {
//       dispatch(loadvendors(response.data.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };
