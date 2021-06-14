const Input = ({
  input,
  placeholder,
  type,
  className,
  children,

  meta: {touched, error},
}) => (
  <div className={`form__form-group-input-wrap ${className}`}>
    <div className="form__form-group-field">
      {children}

      <input {...input} placeholder={placeholder} type={type} />
    </div>

    {touched && error && (
      <span className="form__form-group-error">{error}</span>
    )}
  </div>
);

export default Input;
