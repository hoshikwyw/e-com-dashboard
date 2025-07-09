import ComGrid from "@/components/common/ComGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ColDef } from "ag-grid-community";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductTableProps {
  rowData: any[];
}

const ProductTable = ({ rowData }: ProductTableProps) => {
  const naviagte = useNavigate();
  const columnDefs: ColDef[] = [
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
      field: "id",
      headerName: "Product",
      unSortIcon: true,
      width: 100,
      flex: 1,
      cellRenderer: (params: any) => {
        console.log(params);
        return (
          <div className=" flex w-full items-center h-11 gap-[11px]">
            <img
              src="/logo.png"
              alt="logoImg"
              className=" w-11 h-11 rounded-[8px]"
            />
            <div className=" flex flex-col h-11 gap-1">
              <p className=" text-sm text-black-700">{params.data.name}</p>
              <p className=" text-xs text-black-500">2 Variants</p>
            </div>
          </div>
        );
      },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
    {
      field: "SKU",
      headerName: "SKU",
      unSortIcon: true,
      width: 120,
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
    {
      field: "category",
      headerName: "Category",
      unSortIcon: true,
      width: 200,
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
    {
      field: "stock",
      headerName: "Stock",
      unSortIcon: true,
      width: 200,
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
    {
      field: "basePrice",
      headerName: "Price",
      unSortIcon: true,
      width: 200,
      flex: 1,
      cellStyle: { textAlign: "center" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
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
          switch (status?.toLowerCase()) {
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
      headerName: "Added",
      field: "date",
      minWidth: 100,
      flex: 1,
      unSortIcon: true,
      cellStyle: { textAlign: "left", paddingLeft: "5px" },
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
    },
    {
      headerName: "Actions",
      field: "actions",
      headerClass:
        "[&_.ag-header-cell-label]:justify-center flex justify-center ag-header-cell-text padding-left-0",
      minWidth: 160,
      cellStyle: { textAlign: "center" },
      cellRenderer: () => {
        return (
          <div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => naviagte("details/1")}
            >
              <Eye />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => naviagte("edit/1")}
            >
              <Pencil />
            </Button>
            <Button size="sm" variant="ghost">
              <Trash2 />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className=" flex w-full min-h-full">
      <ComGrid
        columnDefs={columnDefs}
        rowData={[]}
        title=""
        rowSelection="multiple"
        metaData={{
          total: rowData.length,
          pageSize: 10,
          current: 1,
        }}
        noRowsMessage="No records found. Please try again later."
      />
    </div>
  );
};

export default ProductTable;
