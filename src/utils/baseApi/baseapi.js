export const baseurl = "https://haatbazaar.herokuapp.com";

export const baseapi = `${baseurl}/api/v1/vendor`;

export const dashboardapi = `${baseapi}/statistics`;

export const loginapi = `${baseapi}/auth/signin`;

export const itemsapi = `${baseapi}/product/list`;

export const itemscreateapi = `${baseapi}/product/create`;

export const itemeditapi = `${baseapi}/product/`;

export const itemdeleteapi = (slug) => `${baseapi}/product/` + slug + `/delete`;

export const orderlistapi = `${baseapi}/order/list`;

export const orderdetailapi = `${baseapi}/order/14u3elkoshpd4i/detail`;

// export const baseadmin = "https://haatbazaar.herokuapp.com/api/v1/admin";

// export const userlistapi = `${baseadmin}/user/list`;
//
// export const vendorlistapi = `${baseadmin}/vendor/list`;

export const listCategoryListApi = `${baseurl}/api/v1/public/category/main/list`;
