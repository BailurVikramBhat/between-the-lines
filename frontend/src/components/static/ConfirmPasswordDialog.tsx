import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useEffect, useState } from "react";

export default function ConfirmPasswordDialog({ open }: { open: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown",
  ) => {
    if (reason === "backdropClick") {
      return;
    }
    setIsOpen(false);
  };
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (passwordVisible) {
      timeout = setTimeout(() => {
        setPasswordVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [passwordVisible]);

  const togglePasswordVisible = () => {
    setPasswordVisible((show) => !show);
  };
  const handleSubmit = () => {};
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          maxWidth: "420px",
          marginX: "auto",
        }}
      >
        <IconButton
          disableRipple={true}
          sx={{
            width: 80,
            height: 80,
            color: "#158037",
            borderRadius: "50%",
            display: "block",
            marginX: "auto",
            marginTop: "1rem",
            paddingBottom: 0,
          }}
        >
          <LockResetIcon
            sx={{
              fontSize: "4rem",
              fontWeight: 700,
            }}
          />
        </IconButton>
        <DialogTitle
          sx={{
            display: "block",
            marginX: "auto",
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
          }}
        >
          Set New Password
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: "center",
              fontSize: "0.8rem",
            }}
          >
            The password you have is temporary password set by College Admin.
            Please create a new password as per the rules given below.
            <Alert
              severity="info"
              variant="outlined"
              sx={{
                marginY: "0.5rem",
                fontSize: "0.7rem",
                textAlign: "left",
              }}
            >
              Please note that your password expires in every 1 month. You will
              be prompted to enter password again
            </Alert>
          </DialogContentText>
          <form onSubmit={handleSubmit} id="new-password-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="password"
              label="Enter New Password"
              type={passwordVisible ? "text" : "password"}
              fullWidth
              variant="standard"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="button" onClick={togglePasswordVisible}>
                        {passwordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              required
              margin="dense"
              id="name"
              name="new-password"
              label="Confirm New Password"
              type={passwordVisible ? "text" : "password"}
              fullWidth
              variant="standard"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="button" onClick={togglePasswordVisible}>
                        {passwordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={true}
            type="submit"
            form="new-password-form"
            variant="contained"
            sx={{
              marginRight: "1rem",
              marginBottom: "1rem",
            }}
          >
            Save & Next
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
