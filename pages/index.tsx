import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  fetchNews,
  fetchMovies,
  fetchSocialPosts,
} from "../store/slices/contentSlice";
import Layout from "../components/Layout";
import ContentGrid from "../components/ContentGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import SettingsModal from "../components/SettingsModal";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { activeSection } = useSelector((state: RootState) => state.ui);
  const { feed, trending, favorites, searchResults, loading, searchQuery } =
    useSelector((state: RootState) => state.content);
  const { preferences } = useSelector((state: RootState) => state.user);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    // Fetch initial content
    dispatch(fetchNews(preferences.categories));
    dispatch(fetchMovies());
    dispatch(fetchSocialPosts());
  }, [dispatch, preferences.categories]);

  const renderContent = () => {
    if (loading) return <LoadingSpinner />;

    switch (activeSection) {
      case "feed":
        return (
          <ContentGrid
            items={feed}
            title="Your Personalized Feed"
            isDraggable
          />
        );
      case "trending":
        return <ContentGrid items={trending} title="Trending Content" />;
      case "favorites":
        return <ContentGrid items={favorites} title="Your Favorites" />;
      case "search":
        return (
          <div>
            {searchQuery ? (
              <ContentGrid
                items={searchResults}
                title={`Search Results for "${searchQuery}"`}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Use the search bar to find content
                </p>
              </div>
            )}
          </div>
        );
      default:
        return (
          <ContentGrid
            items={feed}
            title="Your Personalized Feed"
            isDraggable
          />
        );
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Discover content tailored just for you
            </p>
          </div>
          <button
            onClick={() => setSettingsOpen(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Settings</span>
          </button>
        </div>

        {renderContent()}
      </motion.div>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </Layout>
  );
};

export default Home;
