/* eslint-disable @typescript-eslint/no-explicit-any */
import BreadCrumb from "@/components/common/BreadCrumb";
import ComPagination from "@/components/common/ComPagination";
import { FilterButtonWithState } from "@/components/common/FilterButtonWithState";
import ProfileCard from "@/components/common/ProfileCard";
import { SearchInput } from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { generateMockSellersData } from "@/entities/mockDatas";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sellers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Show 8 cards per page
  const naviagte = useNavigate();
  const handleFilterChange = (filters: any) => {
    console.log("Current filters:", {
      status: filters.status, // Array of checked statuses
      categories: filters.category, // Array of checked categories
      search: filters.searchQuery, // Search term
      radio: filters.radioFilter, // Radio selection
    });
  };

  const mockData = generateMockSellersData(20);

  const handleEditSeller = (sellerId: number) => {
    // Your edit logic here
    naviagte(`/sellers/${sellerId}`);
    console.log("Editing seller:", sellerId);
  };

  const handleDeleteSeller = async (sellerId: number) => {
    // Your delete API call here
    console.log("Deleting seller:", sellerId);
    // Simulate API call
  };

  // Get data for current page
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return mockData.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  return (
    <div className=" w-full h-full">
      <div className=" w-full flex items-end justify-between">
        <div className="">
          <h1 className=" pageTitle">Sellers</h1>
          <BreadCrumb />
        </div>
        <div className="">
          <Button variant="default" onClick={() => naviagte("/sellers/new")}>
            <Plus /> Add Seller
          </Button>
        </div>
      </div>

      <div className=" w-full flex items-center justify-between my-6">
        <SearchInput placeholder="Search sellers ..." />
        <FilterButtonWithState onFilterChange={handleFilterChange} />
      </div>

      <div className=" flex w-full h-full mb-6 flex-wrap gap-6">
        {paginatedData?.map((item, index) => (
          <ProfileCard
            id={item.id}
            key={index}
            name={item.name}
            email={item.email}
            phone={item.phoneNo}
            address={item.address}
            status={item.status}
            stock={item.itemStock}
            sells={item.sellsNo}
            itemType="seller"
            onEdit={() => handleEditSeller(item?.id)}
            onDelete={() => handleDeleteSeller(item?.id)}
          />
        ))}
      </div>
      <div className="">
        <ComPagination
          currentPage={currentPage}
          totalItems={mockData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          className="px-4 py-4 bg-background border-t border-border rounded-b-[8px]"
        />
      </div>
    </div>
  );
};

export default Sellers;
