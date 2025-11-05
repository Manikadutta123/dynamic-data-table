"use client";
import { updateRow } from "../store/tableSlice"
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TextField,
  TableSortLabel,
  Button,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setSearchQuery, sortByField } from "../store/tableSlice";
import { useState, useMemo } from "react";
import InlineEditRow from "./InlineEditRow";

export default function DataTable() {
  const dispatch = useDispatch();
  const { rows, columns, searchQuery, sort } = useSelector(
    (state: RootState) => state.table
  );

  const [page, setPage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Record<number, any>>({});
  const rowsPerPage = 10;

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    return rows.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [rows, searchQuery]);

  const handleSort = (field: string) => {
    dispatch(sortByField(field));
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const visibleColumns = columns.filter((col) => col.visible);

  const handleEditChange = (id: number, field: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSaveAll = () => {
  // Validate before saving
  const invalidRow = Object.values(editedData).find((row: any) => {
    if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) return true;
    if (row.age && (isNaN(Number(row.age)) || Number(row.age) < 0)) return true;
    return false;
  });

  if (invalidRow) {
    alert("Please correct invalid email or age values before saving.");
    return;
  }

  Object.entries(editedData).forEach(([id, updated]) => {
    dispatch(updateRow({ id: Number(id), data: updated }));
  });
  setEditedData({});
  setEditMode(false);
};


  const handleCancelAll = () => {
    setEditedData({});
    setEditMode(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 3 }}>
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        <TextField
          label="Search..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        {!editMode ? (
          <Button variant="contained" onClick={() => setEditMode(true)}>
            Edit Rows
          </Button>
        ) : (
          <>
            <Button variant="contained" color="success" onClick={handleSaveAll}>
              Save All
            </Button>
            <Button variant="outlined" color="error" onClick={handleCancelAll}>
              Cancel
            </Button>
          </>
        )}
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={sort.field === column.id}
                    direction={sort.direction === "asc" ? "asc" : "desc"}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) =>
                editMode ? (
                  <InlineEditRow
                    key={row.id}
                    row={row}
                    columns={columns}
                    editedData={editedData}
                    onEditChange={handleEditChange}
                  />
                ) : (
                  <TableRow key={row.id}>
                    {visibleColumns.map((col) => (
                      <TableCell key={col.id}>{row[col.id]}</TableCell>
                    ))}
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  );
}
