const validation = (values) => {
  let errors = {};
  if (!values.name) {
    errors["name"] = "Product name should be given";
  } else if (values.length < 2) {
    errors["name"] = "Product Name must be greater then 2";
  }
  if (!values.sku) {
    errors["sku"] = "Sku is required";
  }
  if (!values.shortname) {
    errors["shortname"] = "short Name is required";
  }
  if (!values.price || values.price === 0) {
    errors["price"] = "Price is required";
  }
  if (!values.brand) {
    errors["brand"] = "Brand is required";
  }
  if (!values.category) {
    errors["category"] = "Category is required";
  }
  if (!values.stock || values.stock === 0) {
    errors["stock"] = "Stock is required";
  }
  if (!values.tags) {
    errors["tags"] = "Tags is required";
  }
  if (!values.description) {
    console.log(values.descripiton);
    errors["descripiton"] = "description is required";
  }
  return errors;
};

export default validation;
