const Input = ({input, placeholder, type, meta: {touched, error}}) => (
  <div className="form__form-group-input-wrap">
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      className="modalInput"
    />
    {touched && error && (
      <span className="form__form-group-error">{error}</span>
    )}
  </div>
);

export default Input;
