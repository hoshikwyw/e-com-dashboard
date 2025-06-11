import React, { useState } from "react";
import ComGrid from "@/components/common/ComGrid";
import { Button } from "@/components/ui/button";
import ActionButtonsRenderer from "@/components/common/Renderer/ActionButtonsRenderer";
import SelectStatusRenderer from "@/components/common/Renderer/SelectStatusRenderer";
import { SearchInput } from "@/components/common/SearchInput";
// import CustomHeader from "@/components/common/CustomHeader";
// import type { Action } from "@/components/common/ComGrid";

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
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
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

const Customers: React.FC = () => {
  const [selectedRows, setSelectedRows] = React.useState<
    Record<string, unknown>[]
  >([]);

  // const statusOptions = [
  //   { value: "pending", label: "Pending", color: "#fef08a" }, // yellow
  //   { value: "approved", label: "Approved", color: "#86efac" }, // green
  //   { value: "rejected", label: "Rejected", color: "#fca5a5" }, // red
  //   { value: "in_progress", label: "In Progress", color: "#93c5fd" }, // blue
  // ];

  // const handleStatusChange = (selectedValue) => {
  //   console.log("Selected status:", selectedValue);
  //   // You can perform additional actions here
  // };

  const userColumns = [
    {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: false,
      floatingFilter: false,
      resizable: false,
      sortable: false,
      width: 30,
      cellStyle: { textAlign: "center", paddingRight: "0px" },
      // headerClass:
      //   "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-10",
    },
    {
      headerName: "ID",
      field: "id",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
      // headerComponent: CustomHeader,
    },
    {
      headerName: "Name",
      field: "name",
      flex: 1,
      minWidth: 200,
      unSortIcon: true,
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
    {
      headerName: "Email",
      field: "email",
      minWidth: 200,
      unSortIcon: true,
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
      flex: 1,
    },
    {
      headerName: "Status",
      field: "status", // Make sure this matches a field in your data
      minWidth: 200,
      cellRenderer: SelectStatusRenderer,
      flex: 1,
      editable: true, // Add this to make the cell editable
      cellEditor: "agSelectCellEditor", // Optional: if you want AG-Grid's select editor
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
      cellEditorParams: {
        // Optional parameters for the editor
        values: ["pending", "approved", "rejected", "in_progress"],
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: ActionButtonsRenderer,
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
      minWidth: 160,
      cellStyle: { textAlign: "center" },
    },
  ];

  // Define your bulk actions component
  const bulkActions = (
    <>
      <Button variant="outline" size="sm" disabled={selectedRows.length !== 1}>
        Copy
      </Button>
      <Button variant="default" size="sm">
        New
      </Button>
    </>
  );

  return (
    <div className=" flex w-full min-h-full">
      {/* <h1 className="text-2xl font-bold mb-4">Customers</h1> */}
      <ComGrid
        columnDefs={userColumns}
        rowData={userData}
        title="Customer List"
        checkboxSelection
        rowSelection="multiple"
        pagination
        pageSize={10}
        metaData={{
          total: userData.length,
          pageSize: 10,
          current: 1,
        }}
        headerContent={{
          left: (
            <div>
              <SearchInput
                onSearch={(value) => {
                  console.log(value);
                }}
                isLoading={false}
              />
            </div>
          ),
          right: bulkActions,
        }}
        onSelectionChange={setSelectedRows}
      />
    </div>
  );
};

export default Customers;
