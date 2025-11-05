"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import tableReducer from "./tableSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Redux Provider Wrapper for Next.js App Router
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
