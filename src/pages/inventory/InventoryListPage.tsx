import BreadCrumb from "@/components/common/BreadCrumb";
import ComGrid from "@/components/common/ComGrid";
import { DatePicker } from "@/components/common/DatePicker";
import { FilterButtonWithState } from "@/components/common/FilterButtonWithState";
import IconButton from "@/components/common/IconButton";
import { SearchInput } from "@/components/common/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ColDef } from "ag-grid-community";
import {
  ClipboardList,
  Plus,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InventoryListPage = () => {
  const naviagte = useNavigate();
  const columnDef: ColDef[] = [
    {
      headerName: "",
      sortable: false,
      resizable: false,
      suppressMovable: true,
      suppressHeaderMenuButton: true,
      checkboxSelection: true,
      maxWidth: 50,
    },
    {
      headerName: "Warehouse ID",
      field: "id",
      minWidth: 60,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px", color: "#B71818" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
    {
      headerName: "country",
      field: "",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-left flex justify-left ag-header-cell-text padding-left-0",
      //   cellRenderer: (params: any) => (
      //     <div className=" w-full flex items-center pl-3">
      //       <img
      //         className="w-11 h-11 rounded-[8px] mr-2"
      //         src="https://i.pinimg.com/736x/e2/b1/ae/e2b1ae1478eaef3c5ea16078473c768d.jpg"
      //         alt={params.data.productName}
      //       />
      //       <span className=" text-black-700">{params.data.productName}</span>
      //     </div>
      //   ),
    },
    {
      headerName: "Warehouse within country",
      field: "productCategory",
      minWidth: 180,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-left flex justify-left ag-header-cell-text padding-left-0",
      //   cellRenderer: (params: any) => (
      //     <span className=" w-full pl-3">{params.data.productCategory}</span>
      //   ),
    },
    {
      headerName: "Location",
      field: "productCategory",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-left flex justify-left ag-header-cell-text padding-left-0",
      //   cellRenderer: (params: any) => (
      //     <span className=" w-full pl-3">{params.data.productCategory}</span>
      //   ),
    },
    {
      headerName: "Manager",
      field: "productCategory",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-left flex justify-left ag-header-cell-text padding-left-0",
      //   cellRenderer: (params: any) => (
      //     <span className=" w-full pl-3">{params.data.productCategory}</span>
      //   ),
    },
    {
      headerName: "Contact Number",
      field: "status",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-left flex justify-left ag-header-cell-text padding-left-0",
    },
    {
      headerName: "Stock Available",
      field: "date",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
  ];

  return (
    <div className="w-full h-full">
      {/* HEADER SECTION  */}
      <div className="w-full flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="pageTitle">Inventory List</h1>
          </div>
          <BreadCrumb />
        </div>
        <div className="">
          <Button
            variant="default"
            onClick={() => naviagte("add-new-warehouse")}
          >
            <Plus /> Add Warehouse
          </Button>
        </div>
      </div>

      <div className="md:col-span-2 space-y-6">
        {/* OVERVIEW CARDS  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className=" !p-5 flex flex-col">
            <CardContent className=" !p-0 flex flex-col gap-4">
              <IconButton
                icon={ShoppingCart}
                iconColor="#E46A11"
                iconSize={24}
                className=" !bg-yellow-100 !border-yellow-50"
              />
              <div className=" flex flex-col gap-2">
                <p className=" text-gray-500">Total Products</p>
                <div className=" text-2xl text-black-700 flex gap-2 items-center">
                  1<Badge variant={"success"}>+20%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className=" !p-5 flex flex-col">
            <CardContent className=" !p-0 flex flex-col gap-4">
              <IconButton
                icon={ClipboardList}
                iconColor="#0D894F"
                iconSize={24}
                className=" !bg-green-100 !border-green-50"
              />
              <div className=" flex flex-col gap-2">
                <p className=" text-gray-500">Total Orders</p>
                <div className=" text-2xl text-black-700 flex gap-2 items-center">
                  1234
                  <Badge variant={"success"}>+10%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className=" !p-5 flex flex-col">
            <CardContent className=" !p-0 flex flex-col gap-4">
              <IconButton
                icon={ShoppingBag}
                iconColor="#F34040"
                iconSize={24}
                className=" !bg-primary-100 !border-primary-50"
              />
              <div className=" flex flex-col gap-2">
                <p className=" text-gray-500">Out of stock Products</p>
                <div className=" text-2xl text-black-700 flex gap-2 items-center">
                  3434
                  <Badge variant={"success"}>+10%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className=" !p-5 flex flex-col">
            <CardContent className=" !p-0 flex flex-col gap-4">
              <IconButton
                icon={UsersRound}
                iconColor="#F34040"
                iconSize={24}
                className=" !bg-primary-100 !border-primary-50"
              />
              <div className=" flex flex-col gap-2">
                <p className=" text-gray-500">Total Customer Visited</p>
                <div className=" text-2xl text-black-700 flex gap-2 items-center">
                  3434
                  <Badge variant={"success"}>+10%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* List Table */}
        <div className="">
          <div className=" w-full flex items-center justify-between my-6">
            <SearchInput placeholder="Search inventory Name ..." />
            <div className=" flex justify-end items-center gap-2">
              <DatePicker />

              <FilterButtonWithState onFilterChange={() => {}} />
            </div>
          </div>

          <div className=" w-full flex flex-col min-h-full">
            <ComGrid
              columnDefs={columnDef}
              rowData={[]}
              rowSelection="multiple"
              metaData={{
                total: 0,
                pageSize: 10,
                current: 1,
              }}
              noRowsMessage="No Data"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryListPage;
