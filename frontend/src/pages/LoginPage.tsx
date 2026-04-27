import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import myImage from "../assets/descriptive_logo.png";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import isValidEmail from "@/utils/validationUtils";
import { Link as RouterLink } from "react-router-dom";
export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { error, loading, handleLogin } = useLogin();
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errorFlag = false;
    const emailInProcess = email.trim();
    const passwordInProcess = password.trim();
    if (!emailInProcess) {
      setEmailError("Required");
      errorFlag = true;
    } else {
      setEmailError("");
    }
    if (!passwordInProcess) {
      setPasswordError(true);
      errorFlag = true;
    } else {
      setPasswordError(false);
    }

    if (!errorFlag) handleLogin(emailInProcess, passwordInProcess);
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailUnderTest = event.target.value;
    setEmail(emailUnderTest);
    if (emailUnderTest.trim() && !isValidEmail(emailUnderTest)) {
      setEmailError("Invalid Email Address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "420px",
          pb: 5,
          mx: "auto",
          bgcolor: "background.paper",
        }}
      >
        <Box
          component="img"
          src={myImage}
          alt="logo"
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            my: 2.5,
            mx: { xs: 3, sm: 5 },
            gap: 2.5,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                color: "text.secondary",
                fontSize: "1.125rem",
                fontWeight: "bolder",
              }}
            >
              Archival System Portal
            </Typography>
          </Box>

          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          <TextField
            helperText={emailError}
            error={emailError !== ""}
            value={email}
            autoComplete="email"
            onChange={handleEmailChange}
            fullWidth
            label="Librarian Email"
            type="email"
            variant="outlined"
            placeholder="vikram.bhat@edu.co.in"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Box>
            <TextField
              helperText={passwordError ? "Required" : ""}
              error={passwordError}
              value={password}
              autoComplete="current-password"
              onChange={handlePasswordChange}
              fullWidth
              label="Password"
              type={passwordVisible ? "text" : "password"}
              variant="outlined"
              placeholder="**********"
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
            <Link
              component={RouterLink}
              to="/forgot-password"
              sx={{
                mt: 1,
                display: "block",
                textAlign: "right",
              }}
            >
              Forgot Passkey?
            </Link>
          </Box>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Accessing..." : "Access Archives"}
          </Button>
        </Box>

        <Box>
          <Divider>
            <Chip label="Restricted Access" size="small" />
          </Divider>
          <Box
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              gutterBottom
              sx={{ color: "text.secondary" }}
            >
              Restricted access. Authorized personnel only.
            </Typography>
            <Link
              component={RouterLink}
              to="/request-access"
              sx={{
                mt: 1,
                display: "block",
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "#001F3F" }}
              >
                Request Entry Permissions
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
