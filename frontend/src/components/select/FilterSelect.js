import { Select } from "./Styles";

const FilterSelect = ({
  placeholder,
  name,
  value,
  handleChange,
  items,
  loading,
}) => {
  return (
    <Select
      name={name}
      value={value}
      onChange={handleChange}
      loading={loading?.toString()}
    >
      {loading ? (
        <option value={value || placeholder}>{value || placeholder}</option>
      ) : (
        <option value="">{placeholder}</option>
      )}
      {items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </Select>
  );
};

export default FilterSelect;
