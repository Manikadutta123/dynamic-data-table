"use client";

import { TableRow, TableCell, TextField, Typography } from "@mui/material";
import { RowData } from "../store/tableSlice";
import { useState } from "react";

interface InlineEditRowProps {
  row: RowData;
  columns: { id: string; label: string; visible: boolean }[];
  editedData: Record<number, RowData>;
  onEditChange: (id: number, field: string, value: string) => void;
}

export default function InlineEditRow({
  row,
  columns,
  editedData,
  onEditChange,
}: InlineEditRowProps) {
  const currentData = editedData[row.id] || row;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    let error = "";
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Invalid email format";
    } else if (field === "age") {
      if (isNaN(Number(value)) || Number(value) < 0)
        error = "Age must be a positive number";
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    validateField(field, value);
    onEditChange(row.id, field, value);
  };

  return (
    <TableRow>
      {columns
        .filter((c) => c.visible)
        .map((col) => (
          <TableCell key={col.id}>
            <TextField
              variant="standard"
              size="small"
              value={currentData[col.id] ?? ""}
              onChange={(e) => handleChange(col.id, e.target.value)}
              error={!!errors[col.id]}
              helperText={
                errors[col.id] ? (
                  <Typography variant="caption" color="error">
                    {errors[col.id]}
                  </Typography>
                ) : (
                  ""
                )
              }
              fullWidth
            />
          </TableCell>
        ))}
    </TableRow>
  );
}
