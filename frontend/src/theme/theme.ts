import { createTheme, type ThemeOptions } from "@mui/material/styles";

const shadows = [
  "none",
  "0px 2px 1px -1px rgba(0, 0, 0, 0.109),0px 1px 1px 0px rgba(0, 0, 0, 0.076),0px 1px 3px 0px rgba(0, 0, 0, 0.066)",
  "0px 3px 1px -2px rgba(0, 0, 0, 0.109),0px 2px 2px 0px rgba(0, 0, 0, 0.076),0px 1px 5px 0px rgba(0, 0, 0, 0.066)",
  "0px 3px 3px -2px rgba(0, 0, 0, 0.109),0px 3px 4px 0px rgba(0, 0, 0, 0.076),0px 1px 8px 0px rgba(0, 0, 0, 0.066)",
  "0px 2px 4px -1px rgba(0, 0, 0, 0.109),0px 4px 5px 0px rgba(0, 0, 0, 0.076),0px 1px 10px 0px rgba(0, 0, 0, 0.066)",
  "0px 3px 5px -1px rgba(0, 0, 0, 0.109),0px 5px 8px 0px rgba(0, 0, 0, 0.076),0px 1px 14px 0px rgba(0, 0, 0, 0.066)",
  "0px 3px 5px -1px rgba(0, 0, 0, 0.109),0px 6px 10px 0px rgba(0, 0, 0, 0.076),0px 1px 18px 0px rgba(0, 0, 0, 0.066)",
  "0px 4px 5px -2px rgba(0, 0, 0, 0.109),0px 7px 10px 1px rgba(0, 0, 0, 0.076),0px 2px 16px 1px rgba(0, 0, 0, 0.066)",
  "0px 5px 5px -3px rgba(0, 0, 0, 0.109),0px 8px 10px 1px rgba(0, 0, 0, 0.076),0px 3px 14px 2px rgba(0, 0, 0, 0.066)",
  "0px 5px 6px -3px rgba(0, 0, 0, 0.109),0px 9px 12px 1px rgba(0, 0, 0, 0.076),0px 3px 16px 2px rgba(0, 0, 0, 0.066)",
  "0px 6px 6px -3px rgba(0, 0, 0, 0.109),0px 10px 14px 1px rgba(0, 0, 0, 0.076),0px 4px 18px 3px rgba(0, 0, 0, 0.066)",
  "0px 6px 7px -4px rgba(0, 0, 0, 0.109),0px 11px 15px 1px rgba(0, 0, 0, 0.076),0px 4px 20px 3px rgba(0, 0, 0, 0.066)",
  "0px 7px 8px -4px rgba(0, 0, 0, 0.109),0px 12px 17px 2px rgba(0, 0, 0, 0.076),0px 5px 22px 4px rgba(0, 0, 0, 0.066)",
  "0px 7px 8px -4px rgba(0, 0, 0, 0.109),0px 13px 19px 2px rgba(0, 0, 0, 0.076),0px 5px 24px 4px rgba(0, 0, 0, 0.066)",
  "0px 7px 9px -4px rgba(0, 0, 0, 0.109),0px 14px 21px 2px rgba(0, 0, 0, 0.076),0px 5px 26px 4px rgba(0, 0, 0, 0.066)",
  "0px 8px 9px -5px rgba(0, 0, 0, 0.109),0px 15px 22px 2px rgba(0, 0, 0, 0.076),0px 6px 28px 5px rgba(0, 0, 0, 0.066)",
  "0px 8px 10px -5px rgba(0, 0, 0, 0.109),0px 16px 24px 2px rgba(0, 0, 0, 0.076),0px 6px 30px 5px rgba(0, 0, 0, 0.066)",
  "0px 8px 11px -5px rgba(0, 0, 0, 0.109),0px 17px 26px 2px rgba(0, 0, 0, 0.076),0px 6px 32px 5px rgba(0, 0, 0, 0.066)",
  "0px 9px 11px -5px rgba(0, 0, 0, 0.109),0px 18px 28px 2px rgba(0, 0, 0, 0.076),0px 7px 34px 6px rgba(0, 0, 0, 0.066)",
  "0px 9px 12px -6px rgba(0, 0, 0, 0.109),0px 19px 29px 2px rgba(0, 0, 0, 0.076),0px 7px 36px 6px rgba(0, 0, 0, 0.066)",
  "0px 10px 13px -6px rgba(0, 0, 0, 0.109),0px 20px 31px 3px rgba(0, 0, 0, 0.076),0px 8px 38px 7px rgba(0, 0, 0, 0.066)",
  "0px 10px 13px -6px rgba(0, 0, 0, 0.109),0px 21px 33px 3px rgba(0, 0, 0, 0.076),0px 8px 40px 7px rgba(0, 0, 0, 0.066)",
  "0px 10px 14px -6px rgba(0, 0, 0, 0.109),0px 22px 35px 3px rgba(0, 0, 0, 0.076),0px 8px 42px 7px rgba(0, 0, 0, 0.066)",
  "0px 11px 14px -7px rgba(0, 0, 0, 0.109),0px 23px 36px 3px rgba(0, 0, 0, 0.076),0px 9px 44px 8px rgba(0, 0, 0, 0.066)",
  "0px 11px 15px -7px rgba(0, 0, 0, 0.109),0px 24px 38px 3px rgba(0, 0, 0, 0.076),0px 9px 46px 8px rgba(0, 0, 0, 0.066)",
] as ThemeOptions["shadows"];

export const appThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",

    primary: {
      main: "#158037",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#be198a",
      contrastText: "#ffffff",
    },

    success: {
      main: "#30a660",
      contrastText: "#000000",
    },

    warning: {
      main: "#a08f08",
      contrastText: "#000000",
    },

    error: {
      main: "#bb5e1b",
      contrastText: "#000000",
    },

    info: {
      main: "#2086b6",
      contrastText: "#000000",
    },

    background: {
      default: "#fafbfb",
      paper: "#f0f2f1",
    },

    text: {
      primary: "#213126",
      secondary: "#576f5f",
    },

    divider: "#e6eae7",
  },

  spacing: 7,

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily:
      '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

    h1: {
      fontWeight: 700,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.035em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.015em",
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shadows,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#fafbfb",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: "none",
          border: "1px solid #e6eae7",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
};

export const theme = createTheme(appThemeOptions);
