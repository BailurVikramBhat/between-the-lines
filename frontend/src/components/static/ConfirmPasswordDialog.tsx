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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useEffect, useState } from "react";
import { passwordRules } from "@/utils/validationUtils";
import { usePassword } from "@/hooks/usePassword";

export default function ConfirmPasswordDialog({
  open,
  onSuccess,
}: {
  open: boolean;
  onSuccess: (message: string) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [existingPassword, setExistingPassword] = useState<string>("");
  const [existingPasswordVisible, setExistingPasswordVisible] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confPasswordVisible, setConfPasswordVisible] =
    useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<string>("");
  const { error, loading, successMessage, handlePasswordUpdate } =
    usePassword();

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const showRules = password?.length > 0;
  const allRulesPassing = passwordRules.every((rule) => rule.test(password));
  const passwordsMatch = password === confirmPassword;
  const canSubmit = allRulesPassing && passwordsMatch;
  const handleClose = (
    _event: {},
    reason: "backdropClick" | "escapeKeyDown",
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    setIsOpen(false);
  };
  useEffect(() => {
    if (successMessage?.trim()) {
      setTimeout(() => {
        setIsOpen(false);
        onSuccess(successMessage);
      }, 500);
    }
  }, [onSuccess, successMessage]);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (existingPasswordVisible) {
      timeout = setTimeout(() => {
        setExistingPasswordVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [existingPasswordVisible]);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (passwordVisible) {
      timeout = setTimeout(() => {
        setPasswordVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [passwordVisible]);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (confPasswordVisible) {
      timeout = setTimeout(() => {
        setConfPasswordVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [confPasswordVisible]);

  const toggleExistingPasswordVisible = () => {
    setExistingPasswordVisible((show) => !show);
  };
  const togglePasswordVisible = () => {
    setPasswordVisible((show) => !show);
  };
  const toggleConfirmPasswordVisible = () => {
    setConfPasswordVisible((show) => !show);
  };

  const handleExistingPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setExistingPassword(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (confirmPassword !== "" && value !== confirmPassword) {
      setPasswordMismatch("Passwords do not match!");
    } else {
      setPasswordMismatch("");
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setPasswordMismatch("Passwords do not match!");
    } else {
      setPasswordMismatch("");
    }
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setExistingPassword("");
    setPassword("");
    setConfirmPassword("");
    handlePasswordUpdate(existingPassword, password);
  };

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);
  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };
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
            component="div"
            sx={{
              textAlign: "center",
              fontSize: "0.8rem",
              mb: "1rem",
            }}
          >
            The password you have is temporary password set by College Admin.
            Please create a new password as per the rules given below.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="update-password-form">
            <TextField
              value={existingPassword}
              onChange={handleExistingPasswordChange}
              autoFocus
              required
              margin="dense"
              id="name"
              name="existing-password"
              label="Current Password"
              type={existingPasswordVisible ? "text" : "password"}
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
                      <IconButton
                        tabIndex={-1}
                        type="button"
                        onClick={toggleExistingPasswordVisible}
                      >
                        {existingPasswordVisible ? (
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
              value={password}
              onChange={handlePasswordChange}
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
                      <IconButton
                        tabIndex={-1}
                        type="button"
                        onClick={togglePasswordVisible}
                      >
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
            {showRules ? (
              <div>
                <div className="px-4 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-2xl my-1">
                  {passwordRules.map(
                    (rule: { label: string; test: (p: string) => boolean }) => {
                      const passing = rule.test(password);
                      return (
                        <Typography
                          sx={{
                            display: "block",
                            color: passing ? "success.main" : "error.main",
                          }}
                          key={rule.label}
                          variant="caption"
                        >
                          {passing ? "✓" : "✗"} {rule.label}
                        </Typography>
                      );
                    },
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <TextField
              value={confirmPassword}
              helperText={passwordMismatch}
              error={passwordMismatch !== ""}
              onChange={handleConfirmPasswordChange}
              required
              margin="dense"
              id="name"
              name="new-password"
              label="Confirm New Password"
              type={confPasswordVisible ? "text" : "password"}
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
                      <IconButton
                        tabIndex={-1}
                        type="button"
                        onClick={toggleConfirmPasswordVisible}
                      >
                        {confPasswordVisible ? (
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
            form="update-password-form"
            disabled={!canSubmit || loading}
            type="submit"
            loading={loading}
            variant="contained"
            sx={{
              marginRight: "1rem",
              marginBottom: "1rem",
            }}
          >
            Update & Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
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
      >
        <Alert
          severity={error ? "error" : "success"}
          variant="filled"
          onClose={handleSnackbarClose}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
