import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export type WarningDialogAction = {
  label: string;
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success" | "inherit";
  autoFocus?: boolean;
};

type WarningDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actions: WarningDialogAction[];
};

export default function WarningDialog({
  open,
  onClose,
  title,
  message,
  actions,
}: WarningDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <WarningAmberRoundedIcon
        sx={{
          fontSize: "3.5rem",
          color: "warning.main",
          display: "block",
          marginX: "auto",
          marginTop: "1.5rem",
        }}
      />
      <DialogTitle sx={{ textAlign: "center", pb: 0.5 }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center", fontSize: "0.875rem" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2, gap: 1 }}>
        {actions.map((action) => (
          <Button
            key={action.label}
            onClick={action.onClick}
            variant={action.variant ?? "outlined"}
            color={action.color ?? "primary"}
            autoFocus={action.autoFocus}
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
