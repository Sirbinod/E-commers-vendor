const validation = (values) => {
  let errors = {};
  if (!values.name) {
    errors["name"] = "Name should be given";
  } else if (values.length < 2) {
    errors["name"] = "Name must be greater then 2";
  }
  if (!values.phone) {
    errors["phone"] = "Phone number should be given";
  } else if (values.length < 9) {
    errors["phone"] = "phone number must be 10 degit";
  }
  if (!values.address) {
    errors["address"] = "Address is required";
  }
  if (!values.description) {
    errors["description"] = "Address is required";
  }

  return errors;
};

export default validation;
