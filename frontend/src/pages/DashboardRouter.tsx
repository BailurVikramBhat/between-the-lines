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
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Button,
  Alert,
} from "@mui/material";
import elegantLogo from "@/assets/elegant_logo.png";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import { CircularProgress } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import WarningDialog from "@/components/static/WarningDialog";
import { useNotification } from "@/hooks/useNotification";

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
  const [notificationDrawerOpen, setNotificationDrawerOpen] =
    useState<boolean>(false);
  const {
    notifications,
    unreadCount,
    loading: notificationsLoading,
    error: notificationsError,
    loadNotifications,
    dismissNotification,
  } = useNotification();
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
              onClick={() => {
                setNotificationDrawerOpen(true);
                loadNotifications();
              }}
              size="small"
              aria-label="notifications"
              sx={{
                color: "#142a44",
              }}
            >
              <Badge badgeContent={unreadCount} color="primary">
                <NotificationsNoneRoundedIcon sx={{ fontSize: 22 }} />
              </Badge>
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
      <Drawer
        open={notificationDrawerOpen}
        anchor="right"
        onClose={() => setNotificationDrawerOpen(false)}
        sx={{}}
      >
        <Box
          sx={{
            width: 300,
            pb: 2,
            backgroundColor: "#f1fbf1",
            minHeight: "100vh",
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              px: 2,
              py: 1,
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <Typography variant="h6">All Notifications</Typography>
            <IconButton onClick={() => setNotificationDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              px: 2,
              py: 1,
            }}
          >
            <List>
              {notificationsLoading && (
                <ListItem>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                          minHeight: "150px",
                          padding: 3,
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    }
                  />
                </ListItem>
              )}
              {notificationsError && (
                <Alert variant="filled" severity="error">
                  {notificationsError}
                </Alert>
              )}
              {!notificationsLoading &&
                !notificationsError &&
                notifications.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No notifications" />
                  </ListItem>
                )}
              {!notificationsLoading &&
                !notificationsError &&
                notifications.map((notification) => (
                  <ListItem
                    key={notification.id}
                    alignItems="flex-start"
                    sx={{
                      mb: 2,
                      borderRadius: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          <PrivacyTipIcon
                            sx={{
                              fontSize: "3rem",
                              backgroundColor: "#be198a",
                              color: "white",
                              borderRadius: "4rem",
                              p: 1,
                            }}
                          />
                          <span>{notification.title}</span>
                        </Stack>
                      }
                      secondary={
                        <Stack
                          direction="column"
                          sx={{
                            gap: 2,
                          }}
                        >
                          <span>{notification.description}</span>
                          {notification.primaryActionLabel && (
                            <Stack
                              direction="column"
                              sx={{
                                gap: 2,
                              }}
                            >
                              <Button
                                variant="contained"
                                onClick={() =>
                                  navigate(notification.primaryActionUrl)
                                }
                              >
                                {notification.primaryActionLabel}
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  dismissNotification(notification.id);
                                  setNotificationDrawerOpen(false);
                                }}
                              >
                                Dismiss
                              </Button>
                            </Stack>
                          )}
                        </Stack>
                      }
                      sx={[
                        !notification.read && {
                          "& .MuiListItemText-primary": { fontWeight: 900 },
                        },
                      ]}
                    />
                  </ListItem>
                ))}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
