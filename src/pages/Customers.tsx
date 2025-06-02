import React from "react";
import ComGrid from "@/components/common/ComGrid";
import type { Action } from "@/components/common/ComGrid";

const userColumns = [
  { headerName: "ID", field: "id", sortable: true, filter: true, flex: 1 },
  { headerName: "Name", field: "name", sortable: true, filter: true, flex: 1 },
  { headerName: "Email", field: "email", sortable: true, filter: true, flex: 1 },
];

const userData = [
  { id: 1, name: "Alice Smith", email: "alice@example.com" },
  { id: 2, name: "Bob Johnson", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

const actions: Action[] = [
  {
    label: "Edit",
    variant: "outline",
    onClick: (row: Record<string, unknown>) => {
      alert(`Edit user: ${row.name}`);
    },
  },
  {
    label: "Delete",
    variant: "destructive",
    onClick: (row: Record<string, unknown>) => {
      alert(`Delete user: ${row.name}`);
    },
  },
];

const Customers: React.FC = () => {
  const [selectedRows, setSelectedRows] = React.useState<
    Record<string, unknown>[]
  >([]);

  const bulkActions: Action[] = [
    {
      label: "Filter",
      variant: "outline",
      onClick: (row: Record<string, unknown>) => {
        alert(`Delete user: ${row.name}`);
      },
      disabled: selectedRows.length !== 0,
    },
    {
      label: "Delete Selected",
      variant: "destructive",
      onClick: (row: Record<string, unknown>) => {
        alert(`Delete user: ${row.name}`);
      },
      disabled: selectedRows.length === 0,
    },
  ];

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Customers</h1> */}
      <ComGrid
        columns={userColumns}
        rowData={userData}
        actions={actions}
        title="Customer List"
        checkboxSelection
        pagination
        pageSize={10}
        bulkActions={bulkActions}
        onSelectionChange={setSelectedRows}
      />
    </div>
  );
};

export default Customers;
