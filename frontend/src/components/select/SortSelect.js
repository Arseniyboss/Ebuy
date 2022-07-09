import { Select } from "./Styles";

const SortSelect = ({ placeholder, name, value, handleChange, items }) => {
  return (
    <Select name={name} value={value} onChange={handleChange}>
      <option value="">{placeholder}</option>
      {items.map((item, index) => (
        <option key={index} value={item.label}>
          {item.label}
        </option>
      ))}
    </Select>
  );
};

export default SortSelect;
