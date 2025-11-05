"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addColumn, toggleColumnVisibility } from "../store/tableSlice";
import { useState } from "react";

interface ManageColumnsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ManageColumnsModal({ open, onClose }: ManageColumnsModalProps) {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.table.columns);

  const [newField, setNewField] = useState("");
  const [newLabel, setNewLabel] = useState("");

  const handleAddColumn = () => {
    if (!newField.trim() || !newLabel.trim()) return;
    dispatch(addColumn({ id: newField.trim(), label: newLabel.trim() }));
    setNewField("");
    setNewLabel("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
          Show / Hide Columns:
        </Typography>
        <Stack>
          {columns.map((col) => (
            <FormControlLabel
              key={col.id}
              control={
                <Checkbox
                  checked={col.visible}
                  onChange={() => dispatch(toggleColumnVisibility(col.id))}
                />
              }
              label={col.label}
            />
          ))}
        </Stack>

        <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
          Add New Column:
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Field ID (e.g. department)"
            size="small"
            fullWidth
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
          />
          <TextField
            label="Label (e.g. Department)"
            size="small"
            fullWidth
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <Button onClick={handleAddColumn} variant="contained">
            Add
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
