import { createTheme } from "react-data-table-component";

let isThemeRegistered = false;

export function ensureDashboardTableTheme() {
  if (isThemeRegistered) {
    return;
  }

  createTheme("dashboard", {
    text: {
      primary: "#16324a",
      secondary: "#5f7689",
    },
    background: {
      default: "transparent",
    },
    context: {
      background: "#e7f4ff",
      text: "#16324a",
    },
    divider: {
      default: "rgba(22, 50, 74, 0.08)",
    },
    action: {
      button: "#0d6efd",
      hover: "rgba(13, 110, 253, 0.08)",
      disabled: "#adc3d4",
    },
    highlight: {
      primary: "#0d6efd",
      secondary: "#1aa7a1",
    },
  });

  isThemeRegistered = true;
}

export const dashboardTableCustomStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      minHeight: "58px",
      borderBottom: "1px solid rgba(22, 50, 74, 0.08)",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.94), rgba(244,248,251,0.92))",
    },
  },
  headCells: {
    style: {
      color: "#16324a",
      fontSize: "0.78rem",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    },
  },
  rows: {
    style: {
      minHeight: "62px",
      backgroundColor: "transparent",
      borderBottom: "1px solid rgba(22, 50, 74, 0.06)",
      fontSize: "0.96rem",
      color: "#28455f",
    },
    highlightOnHoverStyle: {
      backgroundColor: "rgba(13, 110, 253, 0.06)",
      transition: "background-color 0.2s ease",
      outline: "none",
    },
    stripedStyle: {
      backgroundColor: "rgba(240, 247, 251, 0.7)",
    },
  },
  cells: {
    style: {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  },
  pagination: {
    style: {
      minHeight: "64px",
      borderTop: "1px solid rgba(22, 50, 74, 0.08)",
      backgroundColor: "rgba(255, 255, 255, 0.72)",
      color: "#5f7689",
    },
    pageButtonsStyle: {
      borderRadius: "12px",
      height: "34px",
      width: "34px",
      padding: 0,
      margin: "0 2px",
    },
  },
  expanderRow: {
    style: {
      backgroundColor: "rgba(247, 251, 253, 0.95)",
    },
  },
};

