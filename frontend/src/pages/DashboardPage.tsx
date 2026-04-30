import ConfirmPasswordDialog from "@/components/static/ConfirmPasswordDialog";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import DashboardRouter from "./DashboardRouter";
import { Alert, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function DashboardPage() {
  const [isTemp, setIsTemp] = useState<boolean>(false);
  const { profile } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.isTempPassword) {
      setIsTemp(true);
    }
  }, [profile]);

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMessage(null);
  };

  const hasSuccessMessage = Boolean(successMessage?.trim());

  return (
    <>
      {isTemp ? (
        <ConfirmPasswordDialog
          open={isTemp}
          onSuccess={(message: string) => {
            setIsTemp(false);
            setSuccessMessage(message);
          }}
        />
      ) : (
        <DashboardRouter />
      )}
      {hasSuccessMessage && (
        <Snackbar
          open
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            maxWidth: "400px",
            marginTop: "2.5rem",
          }}
        >
          <Alert
            severity="success"
            variant="filled"
            onClose={handleSnackbarClose}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
