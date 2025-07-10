import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { reorderFeed, ContentItem } from "../store/slices/contentSlice";
import ContentCard from "./ContentCard";
import { motion, AnimatePresence } from "framer-motion";

interface ContentGridProps {
  items: ContentItem[];
  title: string;
  isDraggable?: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  items,
  title,
  isDraggable = false,
}) => {
  const dispatch = useDispatch();
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const handleDragEnd = (result: any) => {
    setDraggedItemId(null);
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    if (isDraggable) {
      dispatch(reorderFeed(newItems));
    }
  };

  const handleDragStart = (start: any) => {
    setDraggedItemId(start.draggableId);
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {items.length} {items.length === 1 ? "item" : "items"} available
          </p>
        </div>
        {isDraggable && (
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-full">
            <span className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              Drag to reorder
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-80"></div>
              <div className="absolute inset-0 bg-grid-gray-100/[0.025] bg-[size:20px_20px]"></div>
            </div>
            <div className="relative text-center py-16">
              <div className="space-y-6">
                <div className="text-gray-400 text-6xl mb-4 animate-bounce">
                  🗂️
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    No content available
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Content will appear here once it's added to your feed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : isDraggable ? (
          <DragDropContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <Droppable droppableId="content-grid">
              {(provided) => (
                <motion.div
                  variants={gridVariants}
                  initial="hidden"
                  animate="show"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <motion.div
                          variants={itemVariants}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${
                            snapshot.isDragging
                              ? "z-50 shadow-2xl scale-105"
                              : "z-0"
                          } transition-all duration-300`}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div
                            className={`${
                              draggedItemId === item.id
                                ? "opacity-50 transform scale-95"
                                : ""
                            }`}
                          >
                            <ContentCard item={item} index={index} />
                          </div>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </motion.div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item, index) => (
              <motion.div key={item.id} variants={itemVariants}>
                <ContentCard item={item} index={index} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentGrid;
