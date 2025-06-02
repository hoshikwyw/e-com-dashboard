import React from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@/components/ui/button";
import "./ComGrid.module.css";
import { FaFilter } from "react-icons/fa";

// Register all community modules globally
ModuleRegistry.registerModules([AllCommunityModule]);

// Types for props
interface Action {
  label: string;
  onClick: (row: Record<string, unknown>) => void;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  disabled?: boolean;
}

interface ComGridProps {
  columns: ColDef<Record<string, unknown>>[];
  rowData: Record<string, unknown>[];
  actions?: Action[];
  gridOptions?: object;
  className?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  checkboxSelection?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onSelectionChange?: (selectedRows: Record<string, unknown>[]) => void;
}

// Action cell renderer
const ActionCellRenderer = (
  props: ICellRendererParams<Record<string, unknown>>
) => {
  const actions = (props.colDef &&
    (props.colDef as ColDef<Record<string, unknown>> & { actions?: Action[] })
      .actions) as Action[] | undefined;
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {actions?.map((action, idx) => (
        <Button
          key={idx}
          variant={action.variant || "default"}
          size="sm"
          onClick={() => props.data && action.onClick(props.data)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
};

// Product cell renderer
const ProductCellRenderer = (
  props: ICellRendererParams<Record<string, unknown>>
) => {
  const data = props.data as { name?: string; sku?: string };
  return (
    <div className="comgrid-product-cell">
      <div className="comgrid-product-avatar" />
      <div>
        <div className="comgrid-product-title">{data?.name || ""}</div>
        <div className="comgrid-product-sku">SKU: {data?.sku || ""}</div>
      </div>
    </div>
  );
};

// Status cell renderer
const StatusCellRenderer = (
  props: ICellRendererParams<Record<string, unknown>>
) => {
  const status = props.value as string;
  let badgeClass = "comgrid-status-badge";
  if (status === "Low Stock") badgeClass += " low-stock";
  if (status === "Published") badgeClass += " published";
  return <span className={badgeClass}>{status}</span>;
};

const ComGrid: React.FC<ComGridProps> = ({
  columns,
  rowData,
  actions,
  gridOptions,
  className,
  style,
  title,
  checkboxSelection,
  pagination = false,
  pageSize = 10,
  onSelectionChange,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Pagination logic
  const paginatedData = React.useMemo(() => {
    if (!pagination) return rowData;
    const start = (currentPage - 1) * pageSize;
    return rowData.slice(start, start + pageSize);
  }, [rowData, pagination, currentPage, pageSize]);

  const totalPages = pagination ? Math.ceil(rowData.length / pageSize) : 1;

  // Add custom renderers to columns
  const enhancedColumns = React.useMemo(() => {
    return columns.map((col) => {
      if (col.field === "name") {
        return { ...col, cellRenderer: ProductCellRenderer };
      }
      if (col.field === "status") {
        return { ...col, cellRenderer: StatusCellRenderer };
      }
      return col;
    });
  }, [columns]);

  // Add checkbox selection column if enabled
  const baseColumns = React.useMemo<ColDef<Record<string, unknown>>[]>(() => {
    if (!checkboxSelection) return enhancedColumns;
    return [
      {
        headerName: "",
        field: "__checkbox__",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 40,
        pinned: "left",
        suppressMenu: true,
        sortable: false,
        filter: false,
      } as ColDef<Record<string, unknown>>,
      ...enhancedColumns,
    ];
  }, [enhancedColumns, checkboxSelection]);

  // Add action column if actions are provided
  const gridColumns = React.useMemo<ColDef<Record<string, unknown>>[]>(() => {
    const addHeaderClass = (
      col: ColDef<Record<string, unknown>>
    ): ColDef<Record<string, unknown>> => {
      if (col.headerClass) {
        return { ...col, headerClass: `${col.headerClass} comgrid-header` };
      }
      return { ...col, headerClass: "comgrid-header" };
    };
    const colsWithHeaderClass = baseColumns.map(addHeaderClass);
    if (!actions) return colsWithHeaderClass;
    return [
      ...colsWithHeaderClass,
      addHeaderClass({
        headerName: "Actions",
        field: "actions",
        cellRenderer: ActionCellRenderer,
        actions,
        pinned: "right",
        width: 150,
        suppressMenu: true,
        sortable: false,
        filter: false,
      } as ColDef<Record<string, unknown>>),
    ];
  }, [baseColumns, actions]);

  // AG Grid ref
  const gridRef = React.useRef<AgGridReact<Record<string, unknown>> | null>(
    null
  );

  // Handle selection changed
  const onSelectionChanged = React.useCallback(() => {
    if (gridRef.current) {
      const selected = gridRef.current.api.getSelectedRows();
      if (onSelectionChange) {
        onSelectionChange(selected);
      }
    }
  }, [onSelectionChange]);

  return (
    <div className="comgrid-card border border-grid-border rounded-lg bg-background">
      {/* Header with title and filter button */}
      <div className="comgrid-header-row">
        <div className="comgrid-title">{title}</div>
        <Button variant="outline" size="sm" className="comgrid-filter-btn">
          <FaFilter style={{ marginRight: 6 }} /> Filters
        </Button>
      </div>
      {/* Table */}
      <div
        className={`ag-theme-alpine ${className || ""}`}
        style={{ height: 400, width: "100%", ...style }}
      >
        <AgGridReact
          ref={gridRef}
          columnDefs={gridColumns}
          rowData={paginatedData}
          rowHeight={56}
          rowSelection={checkboxSelection ? "multiple" : undefined}
          onSelectionChanged={
            checkboxSelection ? onSelectionChanged : undefined
          }
          suppressPaginationPanel={true}
          {...gridOptions}
        />
      </div>
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="comgrid-pagination">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="comgrid-pagination-arrow"
          >
            &#60;
          </Button>
          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              size="icon"
              variant={currentPage === idx + 1 ? "default" : "ghost"}
              className={`comgrid-pagination-btn${
                currentPage === idx + 1 ? " active" : ""
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Button>
          ))}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="comgrid-pagination-arrow"
          >
            &#62;
          </Button>
        </div>
      )}
    </div>
  );
};

export default ComGrid;

export type { Action };
