import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setActiveSection } from "../store/slices/uiSlice";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, activeSection } = useSelector(
    (state: RootState) => state.ui
  );

  const menuItems = [
    { id: "feed", label: "Feed", icon: "📰" },
    { id: "trending", label: "Trending", icon: "🔥" },
    { id: "favorites", label: "Favorites", icon: "⭐" },
    { id: "search", label: "Search", icon: "🔍" },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-16 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => dispatch(setActiveSection(item.id as any))}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-primary-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
