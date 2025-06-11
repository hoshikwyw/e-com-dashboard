/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import BreadCrumb from "@/components/common/BreadCrumb";
import IconButton from "@/components/common/IconButton";
import ProfileDetailCard from "@/components/common/ProfileDetailCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DockIcon,
  ShoppingCart,
  Trash2,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { generateSellerTableData } from "@/entities/mockDatas";
import ComGrid from "@/components/common/ComGrid";
import type { ColDef } from "ag-grid-community";
import { SearchInput } from "@/components/common/SearchInput";
import { DatePicker } from "@/components/common/DatePicker";
import { FilterButtonWithState } from "@/components/common/FilterButtonWithState";

const mockSeller = {
  id: "123",
  name: "John Doe",
  email: "john.doe@example.com",
  phoneNo: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  status: "Active",
  itemStock: 42,
  sellsNo: 128,
  joinDate: "2023-01-15",
  lastActivity: "2023-06-10",
  rating: 4.7,
  bio: "Professional seller with 5 years of experience in high-quality products.",
  products: [
    { id: "p1", name: "Premium Widget", price: 29.99, stock: 15, sales: 42 },
    { id: "p2", name: "Deluxe Gadget", price: 49.99, stock: 8, sales: 23 },
    { id: "p3", name: "Basic Thingamajig", price: 12.99, stock: 19, sales: 63 },
  ],
  orders: [
    { id: "o1", date: "2023-05-15", amount: 89.97, status: "Completed" },
    { id: "o2", date: "2023-06-01", amount: 49.99, status: "Shipped" },
    { id: "o3", date: "2023-06-08", amount: 64.98, status: "Processing" },
  ],
};

const SellerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sellerProducts = generateSellerTableData(10);

  const handleEditSeller = () => {
    console.log("Editing seller:", id);
  };

  const handleFilterChange = (filters: any) => {
    console.log("Current filters:", {
      status: filters.status, // Array of checked statuses
      categories: filters.category, // Array of checked categories
      search: filters.searchQuery, // Search term
      radio: filters.radioFilter, // Radio selection
    });
  };

  const handleDeleteSeller = async () => {
    console.log("Deleting seller:", id);
    // await deleteSeller(id);
    navigate("/sellers");
  };

  const columnDef: ColDef[] = [
    {
      headerName: "ID",
      field: "id",
      minWidth: 60,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px", color: "#B71818" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
    {
      headerName: "Product",
      field: "",
      minWidth: 260,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-left flex justify-left ag-header-cell-text padding-left-0",
      cellRenderer: (params: any) => (
        <div className=" w-full flex items-center pl-3">
          <img
            className="w-11 h-11 rounded-[8px] mr-2"
            src="https://i.pinimg.com/736x/e2/b1/ae/e2b1ae1478eaef3c5ea16078473c768d.jpg"
            alt={params.data.productName}
          />
          <span className=" text-black-700">{params.data.productName}</span>
        </div>
      ),
    },
    {
      headerName: "Category",
      field: "productCategory",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-left flex justify-left ag-header-cell-text padding-left-0",
      cellRenderer: (params: any) => (
        <span className=" w-full pl-3">{params.data.productCategory}</span>
      ),
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      cellRenderer: (params: any) => {
        // Determine badge variant based on status value
        const getBadgeVariant = (status: string) => {
          switch (status.toLowerCase()) {
            case "in stock":
            case "active":
              return "success";
            case "low stock":
            case "pending":
              return "secondary";
            case "out of stock":
            case "inactive":
              return "primary";
            default:
              return "default";
          }
        };

        return (
          <span className="w-full pl-3">
            <Badge variant={getBadgeVariant(params.value)}>
              {params.value}
            </Badge>
          </span>
        );
      },
      headerClass:
        "[&_.ag-header-cell-label]:justify-left flex justify-left ag-header-cell-text padding-left-0",
    },
    {
      headerName: "Date",
      field: "date",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
  ];

  const bulkActions = (
    <>
      <DatePicker
        className=" w-[160px]"
        value={new Date()}
        onChange={() => {
          console.log("changed");
        }}
        placeholder="Select date"
      />
      <FilterButtonWithState onFilterChange={handleFilterChange} />
    </>
  );

  return (
    <div className="w-full h-full">
      {/* HEADER SECTION  */}
      <div className="w-full flex items-end justify-between mb-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="pageTitle">Seller Details</h1>
          </div>
          <BreadCrumb />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEditSeller}>
            <X className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Cancel</span>
          </Button>
          <Button variant="secondary" onClick={handleEditSeller}>
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Delete</span>
          </Button>
          <Button variant="default" onClick={handleDeleteSeller}>
            <DockIcon className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Save</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* PROFILE CARD SECTION  */}
        <div className=" col-span-1 flex justify-center items-center">
          <div className=" max-w-[360px]">
            <ProfileDetailCard
              id={123}
              name="John Doe"
              status="active"
              phone="050 414 8778"
              email="lindablair@mail.com"
              address="1833 Bel Meadow Drive, Fontana, California 92335, USA"
              verified
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className=" !p-5 flex flex-col">
              <CardContent className=" !p-0 flex flex-col gap-4">
                <IconButton
                  icon={Wallet}
                  iconColor="#0D894F"
                  iconSize={24}
                  className=" !bg-green-100 !border-green-50"
                />
                <div className=" flex flex-col gap-2">
                  <p className=" text-gray-500">Total Profits</p>
                  <div className=" text-2xl text-black-700 flex gap-2 items-center">
                    {mockSeller.itemStock}
                    <Badge variant={"success"}>+20%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className=" !p-5 flex flex-col">
              <CardContent className=" !p-0 flex flex-col gap-4">
                <IconButton
                  icon={ShoppingCart}
                  iconColor="#E46A11"
                  iconSize={24}
                  className=" !bg-yellow-100 !border-yellow-50"
                />
                <div className=" flex flex-col gap-2">
                  <p className=" text-gray-500">Total Orders</p>
                  <div className=" text-2xl text-black-700 flex gap-2 items-center">
                    {mockSeller.itemStock}
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
                  <p className=" text-gray-500">Total Users</p>
                  <div className=" text-2xl text-black-700 flex gap-2 items-center">
                    {mockSeller.itemStock}{" "}
                    <Badge variant={"success"}>+10%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* List Table */}
          <div className=" w-full flex flex-col min-h-full">
            <ComGrid
              columnDefs={columnDef}
              rowData={sellerProducts}
              rowSelection="multiple"
              metaData={{
                total: sellerProducts.length,
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailPage;
