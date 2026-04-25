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
import { useEffect, useRef, useState } from "react";
import { useLogin } from "@/hooks/useLogin";
export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { error, loading, handleLogin } = useLogin();

  const [visible, setVisible] = useState<boolean>(false);

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    handleLogin(email, password);
  };
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (visible) {
      timeout = setTimeout(() => {
        setVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [visible]);

  const toggleVisible = () => {
    setVisible((show) => !show);
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
            autoComplete="email"
            inputRef={emailRef}
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
              autoComplete="current-password"
              inputRef={passwordRef}
              fullWidth
              label="Password"
              type={visible ? "text" : "password"}
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
                      <IconButton type="button" onClick={toggleVisible}>
                        {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Link
              href="#"
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
              href="#"
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
