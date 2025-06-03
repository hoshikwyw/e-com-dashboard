import { customGridTheme } from "@/lib/gridTheme";
import {
  AllCommunityModule,
  ModuleRegistry,
  type CellEditingStoppedEvent,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type SelectionChangedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, icons } from "lucide-react";

// Register only community modules
ModuleRegistry.registerModules([AllCommunityModule]);

type RowConfirmProps<T> = {
  suppressClickAway: boolean;
  rowNodeId: keyof T;
  editableFieldId?: keyof T;
  newFieldId?: keyof T;
  onConfirm: (params: {
    selectedRow?: T | null;
    rows: T[];
    status: boolean;
  }) => void;
};

type AgGridProps<T> = {
  rowData: T[];
  columnDefs: ColDef<T>[];
  isFetching?: boolean;
  expanded?: boolean;
  title?: string;
  bulkActionButtons?: React.ReactNode;
  autoSelectFirstRow?: boolean;
  gridClassName?: string;
  onPageChanged?: (params: {
    current: number;
    pageSize: number;
    total: number;
  }) => void;
  metaData?: {
    total: number;
    current: number;
    pageSize: number;
  };
  rowConfirm?: RowConfirmProps<T>;
  rowSelection?: "single" | "multiple";
  suppressCopyAction?: boolean;
  height?: string | number;
  isSaved?: boolean;
  disabledRowKey?: keyof T;
  footerChildren?: React.ReactNode;
  onRowDoubleClicked?: (event: any) => void;
  onCellValueChanged?: (record: T, dataIndex: string, value: any) => void;
  onRowSelected?: (record: T) => void;
};

const ComGrid = forwardRef(
  <T extends object>(props: AgGridProps<T>, ref: React.Ref<any>) => {
    const {
      rowData,
      columnDefs,
      isFetching,
      title,
      bulkActionButtons,
      autoSelectFirstRow,
      onPageChanged,
      metaData,
      height,
      rowConfirm,
      rowSelection,
      isSaved,
      disabledRowKey,
      footerChildren,
      onCellValueChanged,
      onRowSelected,
      onRowDoubleClicked,
      gridClassName,
    } = props;

    const [selectedRow, setSelectedRow] = useState<T | null>(null);
    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    // Calculate pagination values only if metaData exists
    const pageSize = metaData?.pageSize || 20;
    const totalItems = metaData?.total || 0;
    const totalPages = metaData ? Math.ceil(totalItems / pageSize) : 0;
    const [currentPage, setCurrentPage] = useState(metaData?.current || 1);

    // Only show pagination if metaData exists and has values
    const showPagination = metaData;
    console.log("showPagination", showPagination);
    console.log("metaData", metaData);

    useEffect(() => {
      if (metaData?.current) {
        setCurrentPage(metaData.current);
      }
    }, [metaData?.current]);

    // Only trigger page change if metaData exists
    useEffect(() => {
      if (metaData && onPageChanged) {
        onPageChanged({
          current: currentPage,
          pageSize,
          total: totalItems,
        });
      }
    }, [currentPage, metaData, onPageChanged, pageSize, totalItems]);

    const prevSelectedRowRef = useRef<T | null>(null);

    useEffect(() => {
      if (isSaved && gridApi) {
        gridApi.refreshCells({ force: true });
      }
    }, [isSaved, gridApi]);

    useEffect(() => {
      if (onPageChanged) {
        onPageChanged({
          current: currentPage,
          pageSize,
          total: totalItems,
        });
      }
    }, [currentPage, pageSize, totalItems, onPageChanged]);

    const handleGridReady = (params: GridReadyEvent) => {
      setGridApi(params.api);
      params.api.sizeColumnsToFit();

      if (autoSelectFirstRow) {
        const firstRow = rowData[0];
        if (firstRow) {
          params.api.getDisplayedRowAtIndex(0)?.setSelected(true);
          setSelectedRow(firstRow);
          if (onRowSelected) onRowSelected(firstRow);
        }
      }
    };

    const onSelectionChanged = (event: SelectionChangedEvent) => {
      const selected = event.api.getSelectedRows()[0];
      if (selected) {
        setSelectedRow(selected);
        if (onRowSelected) onRowSelected(selected);
      }
    };

    const onCellEditStopped = (event: CellEditingStoppedEvent) => {
      const { data, colDef, newValue } = event;
      if (colDef.field && onCellValueChanged) {
        onCellValueChanged(data, colDef.field, newValue);
      }
    };

    useImperativeHandle(ref, () => ({
      getSelectedRows: () => gridApi?.getSelectedRows() || [],
    }));

    // Optimized pagination rendering - only show relevant page numbers
    const renderPageNumbers = () => {
      if (!metaData) return null;

      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            size="sm"
            variant={currentPage === i ? "default" : "accent"}
            className={`comgrid-pagination-btn ${
              currentPage === i ? "active" : ""
            }`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>
        );
      }

      return pages;
    };

    return (
      <div
        className={` w-full h-full bg-background rounded-t-[8px]`}
        style={{ height: height || "400px", width: "100%" }}
      >
        <div
          className=" w-full flex items-center justify-between px-4 py-4"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 className=" font-medium text-[18px]">{title}</h3>
          <div className=" flex items-center gap-2">{bulkActionButtons}</div>
        </div>

        <AgGridReact<T>
          theme={customGridTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          suppressCellFocus={true}
          defaultColDef={{
            suppressMovable: false,
            suppressHeaderMenuButton: true,
            cellStyle: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          rowHeight={50}
          editType="fullRow"
          onGridReady={handleGridReady}
          rowSelection={rowSelection}
          onSelectionChanged={onSelectionChanged}
          onCellEditingStopped={onCellEditStopped}
          onRowDoubleClicked={onRowDoubleClicked}
          suppressCopyRowsToClipboard={props.suppressCopyAction}
        />
        {/* Pagination */}
        {showPagination && (
          <div className=" w-full flex items-center justify-between px-4 py-4 bg-background border-t border-border rounded-b-[8px]">
            <div>
              <span className=" font-medium text-sm text-black-500">
                Showing 1 - 10 from {totalItems}
              </span>
            </div>
            <div className=" flex items-center gap-2">
              <Button
                size="sm"
                variant="accent"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="comgrid-pagination-arrow"
              >
                <ChevronLeft size={16} strokeWidth="4px" />
              </Button>

              {renderPageNumbers()}

              <Button
                size="sm"
                variant="accent"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="comgrid-pagination-arrow"
              >
                <ChevronRight size={16} strokeWidth="4px" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

ComGrid.displayName = "ComGrid";
export default ComGrid;
