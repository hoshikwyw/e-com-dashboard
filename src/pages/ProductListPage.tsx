import BreadCrumb from "@/components/common/BreadCrumb";
import { DatePicker } from "@/components/common/DatePicker";
import { FilterButtonWithState } from "@/components/common/FilterButtonWithState";
import { SearchInput } from "@/components/common/SearchInput";
import ProductTable from "@/components/pages/product/ProductTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const mockData = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    status: "in stock",
    date: "25-6-2025",
    price: "$100",
    SKU: "001",
    category: "Watch",
    stock: 20,
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "in stock",
    date: "25-6-2025",
    price: "$100",
    SKU: "001",
    category: "Watch",
    stock: 20,
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "low stock",
    date: "25-6-2025",
    price: "$100",
    SKU: "001",
    category: "Watch",
    stock: 2,
  },
];

const ProductListPage = () => {
  const naviagte = useNavigate();

  const handleFilterChange = (filters: any) => {
    console.log("Current filters:", {
      status: filters.status, // Array of checked statuses
      categories: filters.category, // Array of checked categories
      search: filters.searchQuery, // Search term
      radio: filters.radioFilter, // Radio selection
    });
  };

  return (
    <div className=" w-full h-full flex flex-col gap-6">
      <div className=" w-full flex items-end justify-between">
        <div className="">
          <h1 className=" pageTitle">Product</h1>
          <BreadCrumb />
        </div>
        <div className="">
          <Button variant="default" onClick={() => naviagte("add-new-product")}>
            <Plus /> Add Product
          </Button>
        </div>
      </div>

      <div className=" w-full flex items-center justify-between">
        <SearchInput placeholder="Search sellers ..." />
        <div className=" flex justify-end items-center gap-2">
          <DatePicker />

          <FilterButtonWithState onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="">
        <ProductTable rowData={mockData} />
      </div>
    </div>
  );
};

export default ProductListPage;
