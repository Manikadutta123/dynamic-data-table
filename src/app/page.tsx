"use client";

import { Container, Typography, Button } from "@mui/material";
import DataTable from "./components/DataTable";
import ManageColumnsModal from "./components/ManageColumnsModal";
import ImportExportButtons from "./components/ImportExportButtons";
import { useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Data Table Manager
      </Typography>

      <ImportExportButtons />

      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Manage Columns
      </Button>

      <DataTable />
      <ManageColumnsModal open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
