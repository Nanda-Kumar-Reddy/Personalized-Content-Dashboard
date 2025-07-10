import React from "react";
import { useDispatch } from "react-redux";
import { toggleFavorite, ContentItem } from "../store/slices/contentSlice";
import { motion } from "framer-motion";

interface ContentCardProps {
  item: ContentItem;
  index: number;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, index }) => {
  const dispatch = useDispatch();

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(item.id));
  };

  const getTypeStyles = (type: string) => {
    const styles = {
      news: {
        badge:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200",
        icon: "📰",
      },
      movie: {
        badge:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200",
        icon: "🎬",
      },
      music: {
        badge:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200",
        icon: "🎵",
      },
      default: {
        badge:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200",
        icon: "📌",
      },
    };
    return styles[type as keyof typeof styles] || styles.default;
  };

  const typeStyles = getTypeStyles(item.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-black/20 group-hover:opacity-100 transition-opacity" />

      {/* Favorite Button - Moved to top right corner */}
      <button
        onClick={handleFavoriteToggle}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md bg-white/80 dark:bg-gray-800/80 shadow-lg transform transition-all duration-300 ${
          item.isFavorite
            ? "text-yellow-500 hover:scale-110 hover:text-yellow-600"
            : "text-gray-400 hover:scale-110 hover:text-yellow-500"
        }`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>

      {/* Image Section with Gradient Overlay */}
      {item.image && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Type Badge - Moved to bottom left of image */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${typeStyles.badge} backdrop-blur-md`}
            >
              {typeStyles.icon} {item.type}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Title and Description */}
        <div className="space-y-3 mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
            {item.category}
          </span>

          <button className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-full hover:bg-primary-600 transform hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none">
            {item.type === "news"
              ? "Read More"
              : item.type === "movie"
              ? "Watch Now"
              : item.type === "music"
              ? "Play Now"
              : "View"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;
