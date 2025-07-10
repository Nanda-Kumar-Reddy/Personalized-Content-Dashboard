import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode, sidebarOpen } = useSelector((state: RootState) => state.ui);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="flex">
          <Sidebar />
          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              sidebarOpen ? "ml-64" : "ml-16"
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
