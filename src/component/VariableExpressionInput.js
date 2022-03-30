import "./VariableExpressionInput.scss";

const VariableExpressionInput = ({ options, value, onChange }) => {
  const handelOnChange = (event) => {
    const val = event.target.value;
    onChange(val);
  };

  const handelOnSelect = (event) => {
    const val = value.trim();
    const selVar = event.target.value;
    const updatedVal = val ? `${val}+1x${selVar}` : `1x${selVar}`;
    onChange(updatedVal);
  };

  return (
    <div className="varExpIp">
      <input
        className="varExpIp__input"
        value={value}
        onChange={handelOnChange}
      />
      <select className="varExpIp__select" onChange={handelOnSelect}>
        {options?.map((opt) => (
          <option>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default VariableExpressionInput;
