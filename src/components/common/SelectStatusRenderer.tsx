import React from "react";

interface SelectStatusRendererProps {
  value?: any; // Current cell value (from AG-Grid)
  data?: any; // The entire row data (from AG-Grid)
  api?: any; // AG-Grid API
  context?: any; // AG-Grid context
}

const SelectStatusRenderer: React.FC<SelectStatusRendererProps> = (props) => {
  const statusOptions = [
    { value: "pending", label: "Pending", color: "#fef08a" },
    { value: "approved", label: "Approved", color: "#86efac" },
    { value: "rejected", label: "Rejected", color: "#fca5a5" },
    { value: "in_progress", label: "In Progress", color: "#93c5fd" },
  ];

  const [selectedValue, setSelectedValue] = React.useState<string | number>(
    props.value || statusOptions[0]?.value || ""
  );

  const selectedOption = statusOptions.find(
    (option) => option.value === selectedValue
  );
  const selectedColor = selectedOption?.color || "#e2e8f0";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);

    // Update the cell value in AG-Grid
    if (props.api) {
      props.api.startEditingCell({
        rowIndex: props.rowIndex,
        colKey: props.column?.getColId(),
      });
      props.api.setValue(props.node, props.column, value);
      props.api.stopEditing();
    }
  };

  const selectStyle = {
    backgroundColor: selectedColor,
    transition: "background-color 0.3s ease",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    border: "1px solid #cbd5e0",
    outline: "none",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <select value={selectedValue} onChange={handleChange} style={selectStyle}>
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectStatusRenderer;
