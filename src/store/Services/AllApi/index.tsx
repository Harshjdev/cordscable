import { callApi } from "../../../Utils/api/apiUtils.tsx";
import { allApi } from "../../Endpoints/AllApi/index.tsx";

export const cordsCategory = ({ body }) =>
  callApi({
    uriEndPoint: allApi.categories.v1,
    body,
  });

export const mostUsedTags = ({ body }) =>
  callApi({
    uriEndPoint: allApi.mostUsedTags.v1,
    body,
  });

export const catProduct = ({ category_id, take = 4, body }) =>
  callApi({
    uriEndPoint: allApi.cateproduct.v1,
    query: { category_id, take },
    body,
  });
export const featureProduct = ({ body }) =>
  callApi({
    uriEndPoint: allApi.featureproduct.v1,
    body,
  });
export const getbrands = ({ body }) =>
  callApi({
    uriEndPoint: allApi.getbrands.v1,
    body,
  });
export const fetchDataByTable = ({ tableName, body }) =>
  callApi({
    uriEndPoint: allApi.fetchdatabytable.v1,
    query: { table: tableName },
    body,
  });
export const getheadline = ({ body }) =>
  callApi({
    uriEndPoint: allApi.headline.v1,
    body,
  });
export const getProducts = ({
  page = 1,
  per_page,
  category_id,
  sub_category_id,
  child_category_id,
  search,
  brand_id,
  tag,
}) => {
  const query: { [key: string]: any } = {
    page, // ✅ ADD THIS LINE
    per_page,
  };

  // Always send category_id if present
  if (category_id && category_id !== "null") {
    query.category_id = category_id;
  }

  if (sub_category_id && sub_category_id !== "null") {
    query.sub_category_id = sub_category_id;
  }
  if (child_category_id && child_category_id !== "null") {
    query.child_category_id = child_category_id;
  }

  if (search) query.search = search;
  if (brand_id) query.brand_id = brand_id;
  if (tag) query.tag = tag;

  return callApi({
    uriEndPoint: allApi.getProducts.v1,
    query,
  });
};

export const getProductDetails = ({ product_id, vendor_id }) => {
  return callApi({
    uriEndPoint: allApi.productDetails.v1,
    query: { product_id, vendor_id },
  });
};

export const getSimilarProducts = ({ product_id }) => {
  return callApi({
    uriEndPoint: allApi.similarProducts.v1,
    query: { product_id },
  });
};
export const getBreadcrumb = ({
  product_id,
  category_id,
  sub_category_id,
  child_category_id,
}) => {
  const query: { [key: string]: any } = {};

  if (product_id) query.product_id = product_id;
  if (category_id) query.category_id = category_id;
  if (sub_category_id) query.sub_category_id = sub_category_id;
  if (child_category_id) query.child_category_id = child_category_id;

  return callApi({
    uriEndPoint: allApi.breadcrumb.v1,
    query,
  });
};
export const getSpecificationDetails = ({
  category_id,
  sub_category_id,
  brand_id,
  product_id,
  body,
}) =>
  callApi({
    uriEndPoint: allApi.specificationDetails.v1,
    query: { category_id, sub_category_id, brand_id, product_id },
    body,
  });
export const getProductReviews = ({ product_id, body }) =>
  callApi({
    uriEndPoint: allApi.productReviews.v1,
    query: { product_id },
    body,
  });
export const getDeliveryDays = ({ delivery_postcode, weight }) =>
  callApi({
    uriEndPoint: allApi.deliveryDays.v1,
    query: {
      delivery_postcode,
      weight,
    },
  });
export const loginCustomer = ({ email, password }) =>
  callApi({
    uriEndPoint: allApi.customerLogin.v1,
    body: {
      email,
      password,
    },
  });
export const registerCustomer = (formData) =>
  callApi({
    uriEndPoint: allApi.customerRegister.v1,
    body: formData,
  });
export const getOtherVendorsDiscount = ({ product_id, vendor_id }) => {
  return callApi({
    uriEndPoint: allApi.otherVendorsDiscount.v1,
    query: { product_id, vendor_id },
  });
};
export const getUserAddress = ({ user_id }) => {
  return callApi({
    uriEndPoint: allApi.userAddress.v1,
    query: { user_id },
  });
};
export const saveUserAddress = ({ user_id, ...rest }) => {
  return callApi({
    uriEndPoint: allApi.userAddress.v2, // /add-address
    body: {
      user_id,
      ...rest,
    },
  });
};
export const editUserAddress = ({ user_id, address_id, ...rest }) => {
  return callApi({
    uriEndPoint: allApi.userAddress.v3,
    query: {
      user_id,
      address_id,
    },
    body: {
      ...rest,
    },
  });
};
export const updateUserAddress = ({ user_id, address_id, ...rest }) => {
  return callApi({
    uriEndPoint: allApi.userAddress.v4,
    query: {
      user_id,
      address_id,
    },
    body: {
      ...rest,
    },
  });
};
