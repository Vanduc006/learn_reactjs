import React, { useState } from "react";
import { motion } from "framer-motion";

const BottomSheet = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg"
      animate={{
        y: isActive ? "10%" : 0, // Move to 10% from the top if active, otherwise bottom
      }}
      initial={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag="y"
      dragConstraints={{ top: -window.innerHeight * 0.9, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, info) => {
        if (info.point.y < window.innerHeight * 0.5) {
          setIsActive(true); // Snap to expanded state
        } else {
          setIsActive(false); // Snap to collapsed state
        }
      }}
    >
      <div className="flex flex-col items-center p-4">
        {/* Top drag handle */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mb-3"></div>

        {/* Content */}
        {isActive ? (
          <div className="w-full">
            <h2 className="text-center text-lg font-bold mb-4">Bottom Sheet</h2>
            <p className="text-sm text-gray-600 text-center">
              Swipe down to close this sheet or drag up further to see more.
            </p>
          </div>
        ) : (
          // Navigation Bar
          <div className="w-full flex justify-around items-center">
            <button className="text-gray-600">Home</button>
            <button className="text-gray-600">Search</button>
            <button className="text-gray-600">Profile</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BottomSheet;
