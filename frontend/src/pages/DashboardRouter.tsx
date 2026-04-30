import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  ButtonBase,
  Menu,
  MenuItem,
} from "@mui/material";
import elegantLogo from "@/assets/elegant_logo.png";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import WarningDialog from "@/components/static/WarningDialog";

const navItems = ["Dashboard", "Catalog", "Members", "Circulation"];

type LibraryAppBarProps = {
  activeItem?: string;
  avatarUrl?: string;
};

export default function LibraryAppBar({
  activeItem = "Dashboard",
  avatarUrl,
}: LibraryAppBarProps) {
  const [avatarEl, setAvatarEl] = useState<null | HTMLElement>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const showMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAvatarEl(null);
  };

  const handleLogoutClick = () => {
    closeMenu();
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <WarningDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        title="Log out?"
        message="You will be returned to the login screen."
        actions={[
          {
            label: "Cancel",
            onClick: () => setLogoutDialogOpen(false),
            variant: "outlined",
            color: "inherit",
          },
          {
            label: "Log out",
            onClick: confirmLogout,
            variant: "contained",
            color: "error",
            autoFocus: true,
          },
        ]}
      />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          color: "#213126",
          borderBottom: "1px solid #dfe5e1",
          height: 60,
          justifyContent: "center",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: "60px !important",
            px: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Brand */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ mr: 4, alignItems: "center" }}
          >
            <Box
              component="img"
              src={elegantLogo}
              alt="Between the Lines"
              sx={{ height: 28 }}
            />
            <Typography
              component="div"
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "#08752f",
                whiteSpace: "nowrap",
              }}
            >
              Between the Lines
            </Typography>
          </Stack>

          {/* Navigation */}
          <Stack
            direction="row"
            spacing={3}
            sx={{
              alignItems: "center",
            }}
          >
            {navItems.map((item) => {
              const isActive = item === activeItem;

              return (
                <ButtonBase
                  key={item}
                  sx={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#08752f" : "#233858",
                    borderRadius: 1,
                    px: 0.5,
                    py: 0.5,
                    transition: "0.2s ease",

                    "&:hover": {
                      color: "#08752f",
                    },
                  }}
                >
                  {item}
                </ButtonBase>
              );
            })}
          </Stack>

          {/* Push right section */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          <Box
            sx={{
              width: 240,
              height: 34,
              display: "flex",
              alignItems: "center",
              bgcolor: "#eef1ef",
              borderRadius: "10px",
              px: 1.5,
              mr: 1.5,
            }}
          >
            <SearchRoundedIcon
              sx={{
                fontSize: 22,
                color: "#6f849b",
                mr: 1,
              }}
            />

            <InputBase
              placeholder="Search resources..."
              sx={{
                flex: 1,
                fontSize: 14,
                color: "#213126",

                "& input::placeholder": {
                  color: "#5f6f82",
                  opacity: 1,
                },
              }}
            />
          </Box>

          {/* Actions */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <IconButton
              size="small"
              aria-label="notifications"
              sx={{
                color: "#142a44",
              }}
            >
              <NotificationsNoneRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton
              size="small"
              aria-label="help"
              sx={{
                color: "#142a44",
              }}
            >
              <HelpOutlineRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>
            <IconButton disableRipple onClick={showMenu}>
              <Avatar
                src={avatarUrl}
                alt="User profile"
                sx={{
                  width: 30,
                  height: 30,
                  ml: 0.5,
                  bgcolor: "#0c2b1d",
                  border: "1px solid #dfe5e1",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                LC
              </Avatar>
            </IconButton>
            <Menu
              open={Boolean(avatarEl)}
              onClose={closeMenu}
              anchorEl={avatarEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
