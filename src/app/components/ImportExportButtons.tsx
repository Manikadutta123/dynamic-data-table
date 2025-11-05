"use client";

import { Button, Stack } from "@mui/material";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addRow } from "../store/tableSlice";

export default function ImportExportButtons() {
  const dispatch = useDispatch();
  const { rows, columns } = useSelector((state: RootState) => state.table);

  // Handle CSV Import
 
    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          const data = result.data as Record<string, string>[];
          data.forEach((row: Record<string, string>, index: number) => {
            dispatch(
              addRow({
                id: rows.length + index + 1,
                ...row,
              } as any)
            );
          });
          alert("CSV imported successfully!");
        },
        error: (err: any) => {
          alert("Error reading CSV: " + err.message);
        },
      });

      // reset input
      event.target.value = "";
    };


  // 📤 Handle CSV Export
  const handleExport = () => {
    const visibleCols = columns.filter((col) => col.visible);
    const headers = visibleCols.map((c) => c.label);
    const fields = visibleCols.map((c) => c.id);

    const dataToExport = rows.map((row) =>
      fields.reduce((acc, field) => {
        acc[field] = row[field];
        return acc;
      }, {} as Record<string, any>)
    );

    const csv = Papa.unparse(dataToExport, { columns: headers });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "table_data.csv");
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <Button variant="contained" component="label">
        Import CSV
        <input
          type="file"
          accept=".csv"
          hidden
          onChange={handleImport}
        />
      </Button>

      <Button variant="outlined" onClick={handleExport}>
        Export CSV
      </Button>
    </Stack>
  );
}
