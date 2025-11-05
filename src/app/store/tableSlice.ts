"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RowData {
  id: number;
  name?: string;
  email?: string;
  age?: number;
  role?: string;
  [key: string]: any;
}

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
}

interface TableState {
  rows: RowData[];
  columns: ColumnConfig[];
  searchQuery: string;
  sort: { field: string; direction: "asc" | "desc" | null };
}

const initialState: TableState = {
  rows: [
    { id: 1, name: "John Doe", email: "john@example.com", age: 28, role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 34, role: "Manager" },
  ],
  columns: [
    { id: "name", label: "Name", visible: true },
    { id: "email", label: "Email", visible: true },
    { id: "age", label: "Age", visible: true },
    { id: "role", label: "Role", visible: true },
  ],
  searchQuery: "",
  sort: { field: "", direction: null },
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find((col) => col.id === action.payload);
      if (column) column.visible = !column.visible;
    },
    addColumn: (state, action: PayloadAction<{ id: string; label: string }>) => {
      state.columns.push({ ...action.payload, visible: true });
    },
    addRow: (state, action: PayloadAction<RowData>) => {
      state.rows.push(action.payload);
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
    sortByField: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      if (state.sort.field === field) {
        state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
      } else {
        state.sort.field = field;
        state.sort.direction = "asc";
      }

      state.rows.sort((a, b) => {
        const dir = state.sort.direction === "asc" ? 1 : -1;
        if (a[field] < b[field]) return -1 * dir;
        if (a[field] > b[field]) return 1 * dir;
        return 0;
      });
    },

    // ✅ NEW REDUCER
    updateRow: (state, action: PayloadAction<{ id: number; data: Partial<RowData> }>) => {
      const { id, data } = action.payload;
      const index = state.rows.findIndex((r) => r.id === id);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...data };
      }
    },
  },
});

export const {
  setSearchQuery,
  toggleColumnVisibility,
  addColumn,
  addRow,
  deleteRow,
  sortByField,
  updateRow,
} = tableSlice.actions;

export default tableSlice.reducer;
