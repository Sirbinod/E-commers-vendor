const Input = ({
  input,
  placeholder,
  type,
  className,
  children,
  defaultValue,
  meta: {touched, error},
}) => (
  <div className={`form__form-group-input-wrap ${className}`}>
    <div className="form__form-group-field">
      {children}

      <input
        {...input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type}
      />
    </div>

    {touched && error && (
      <span className="form__form-group-error">{error}</span>
    )}
  </div>
);

export default Input;
