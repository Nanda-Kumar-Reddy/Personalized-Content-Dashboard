import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  activeSection: "feed" | "trending" | "favorites" | "search";
}

const initialState: UIState = {
  darkMode: false,
  sidebarOpen: true,
  activeSection: "feed",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setActiveSection: (
      state,
      action: PayloadAction<UIState["activeSection"]>
    ) => {
      state.activeSection = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleSidebar, setActiveSection } =
  uiSlice.actions;
export default uiSlice.reducer;
