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
import { ChevronLeft, ChevronRight } from "lucide-react";

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

type HeaderContentProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

type AgGridProps<T> = {
  rowData: T[];
  columnDefs: ColDef<T>[];
  isFetching?: boolean;
  expanded?: boolean;
  title?: string;
  bulkActionButtons?: React.ReactNode;
  headerContent?: HeaderContentProps;
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
      headerContent,
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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Calculate pagination values based on metaData or defaults
    useEffect(() => {
      if (metaData) {
        setCurrentPage(metaData.current || 1);
        setPageSize(metaData.pageSize || 10);
      }
    }, [metaData]);

    const totalItems = metaData?.total || rowData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const showPagination = !!metaData || rowData.length > pageSize;

    // Handle page changes
    const handlePageChange = (newPage: number) => {
      const validatedPage = Math.max(1, Math.min(newPage, totalPages));
      setCurrentPage(validatedPage);

      if (onPageChanged) {
        onPageChanged({
          current: validatedPage,
          pageSize,
          total: totalItems,
        });
      }
    };

    // Handle grid ready
    const handleGridReady = (params: GridReadyEvent) => {
      setGridApi(params.api);
      params.api.sizeColumnsToFit();

      if (autoSelectFirstRow && rowData.length > 0) {
        params.api.getDisplayedRowAtIndex(0)?.setSelected(true);
        setSelectedRow(rowData[0]);
        if (onRowSelected) onRowSelected(rowData[0]);
      }
    };

    // Handle selection changes
    const onSelectionChanged = (event: SelectionChangedEvent) => {
      const selected = event.api.getSelectedRows()[0];
      if (selected) {
        setSelectedRow(selected);
        if (onRowSelected) onRowSelected(selected);
      }
    };

    // Handle cell editing
    const onCellEditStopped = (event: CellEditingStoppedEvent) => {
      const { data, colDef, newValue } = event;
      if (colDef.field && onCellValueChanged) {
        onCellValueChanged(data, colDef.field, newValue);
      }
    };

    // Expose API methods
    useImperativeHandle(ref, () => ({
      getSelectedRows: () => gridApi?.getSelectedRows() || [],
      getGridApi: () => gridApi,
    }));

    // Calculate paginated data if not using server-side pagination
    const getPaginatedData = () => {
      if (metaData) {
        // Server-side pagination - use all rowData
        return rowData;
      }
      // Client-side pagination
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return rowData.slice(startIndex, endIndex);
    };

    // Render page numbers
    const renderPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust if we're at the beginning or end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Always show first page
      if (startPage > 1) {
        pages.push(
          <Button
            key={1}
            size="sm"
            variant={currentPage === 1 ? "default" : "accent"}
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>
        );
        if (startPage > 2) {
          pages.push(<span key="start-ellipsis">...</span>);
        }
      }

      // Show visible pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            size="sm"
            variant={currentPage === i ? "default" : "accent"}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>
        );
      }

      // Always show last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<span key="end-ellipsis">...</span>);
        }
        pages.push(
          <Button
            key={totalPages}
            size="sm"
            variant={currentPage === totalPages ? "default" : "accent"}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }

      return pages;
    };

    // Render header content
    const renderHeaderContent = () => {
      if (headerContent) {
        return (
          <>
            <div className="flex items-center gap-2">{headerContent.left}</div>
            <div className="flex items-center gap-2">{headerContent.right}</div>
          </>
        );
      }
      return (
        <>
          <h3 className="font-medium text-[18px]">{title}</h3>
          <div className="flex items-center gap-2">{bulkActionButtons}</div>
        </>
      );
    };

    // Calculate showing range
    const getShowingRange = () => {
      if (metaData) {
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalItems);
        return `Showing ${start} - ${end} of ${totalItems}`;
      }
      const start = (currentPage - 1) * pageSize + 1;
      const end = Math.min(currentPage * pageSize, rowData.length);
      return `Showing ${start} - ${end} of ${rowData.length}`;
    };

    return (
      <div
        className={`w-full h-full bg-background rounded-t-[8px] ${
          gridClassName || ""
        }`}
        style={{ height: height || "400px", width: "100%" }}
      >
        <div className="w-full flex items-center justify-between px-4 py-4">
          {renderHeaderContent()}
        </div>

        <AgGridReact<T>
          theme={customGridTheme}
          rowData={getPaginatedData()}
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
          // paginationPageSize={pageSize}
          // pagination={true}
          rowHeight={50}
          editType="fullRow"
          onGridReady={handleGridReady}
          rowSelection={rowSelection}
          onSelectionChanged={onSelectionChanged}
          onCellEditingStopped={onCellEditStopped}
          onRowDoubleClicked={onRowDoubleClicked}
          suppressCopyRowsToClipboard={props.suppressCopyAction}
        />

        {showPagination && (
          <div className="w-full flex items-center justify-between px-4 py-4 bg-background border-t border-border rounded-b-[8px]">
            <div>
              <span className="font-medium text-sm text-black-500">
                {getShowingRange()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="accent"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} strokeWidth="4px" />
              </Button>

              {renderPageNumbers()}

              <Button
                size="sm"
                variant="accent"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
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
