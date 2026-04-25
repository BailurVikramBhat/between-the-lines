import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";

const palette = {
  parchment: "#FAF6F0",
  parchmentDark: "#F2EBE0",
  linen: "#EDE7DB",
  walnut: "#3B2F2F",
  mahogany: "#5C3D2E",
  espresso: "#2A1F1F",

  brass: "#B08D57",
  brassLight: "#C9A96E",
  brassMuted: "rgba(176, 141, 87, 0.08)",

  sage: "#6B8F71",
  sageBg: "rgba(107, 143, 113, 0.08)",
  dustyRose: "#B85C5C",
  dustyRoseBg: "rgba(184, 92, 92, 0.08)",
  amber: "#C48F3F",
  amberBg: "rgba(196, 143, 63, 0.08)",
  slate: "#6E7B8B",
  slateBg: "rgba(110, 123, 139, 0.06)",

  inkPrimary: "#2A1F1F",
  inkSecondary: "#5E524A",
  inkDisabled: "#A69E96",
  divider: "rgba(59, 47, 47, 0.10)",
};

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: palette.brass,
      light: palette.brassLight,
      dark: "#8C6F3E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: palette.mahogany,
      light: "#7A5544",
      dark: palette.espresso,
      contrastText: "#FFFFFF",
    },
    background: {
      default: palette.parchment,
      paper: "#FFFFFF",
    },
    text: {
      primary: palette.inkPrimary,
      secondary: palette.inkSecondary,
      disabled: palette.inkDisabled,
    },
    divider: palette.divider,
  },

  typography: {
    fontFamily: '"Public Sans", sans-serif',
    h1: {
      fontFamily: '"Newsreader", serif',
      fontSize: "3rem",
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily: '"Newsreader", serif',
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontFamily: '"Newsreader", serif',
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.3,
    },
    subtitle1: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0.02em",
    },
    body1: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    button: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0.02em",
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 6,
  },

  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Public Sans", sans-serif',
          fontSize: "0.875rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: palette.inkSecondary,
          "&.Mui-focused": {
            color: palette.brass,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: '"Public Sans", sans-serif',
          fontSize: "1rem",
          backgroundColor: "#FFFFFF",
          borderRadius: 6,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(59, 47, 47, 0.18)",
            transition: "border-color 200ms ease",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(176, 141, 87, 0.45)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.brass,
            borderWidth: 1.5,
          },
          "& input::placeholder": {
            color: palette.inkDisabled,
            opacity: 1,
          },
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
