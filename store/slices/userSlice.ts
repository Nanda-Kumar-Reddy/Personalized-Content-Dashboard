import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  preferences: {
    categories: string[];
    language: string;
  };
  isAuthenticated: boolean;
  profile: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
}

const initialState: UserState = {
  preferences: {
    categories: ["technology", "sports", "entertainment"],
    language: "en",
  },
  isAuthenticated: false,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updatePreferences: (
      state,
      action: PayloadAction<Partial<UserState["preferences"]>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    login: (state, action: PayloadAction<UserState["profile"]>) => {
      state.isAuthenticated = true;
      state.profile = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
    },
  },
});

export const { updatePreferences, login, logout } = userSlice.actions;
export default userSlice.reducer;
