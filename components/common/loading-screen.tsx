"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesText } from "../ui/sparkles-text";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const languages = [
    { text: "“Every line of code is a small act of problem-solving", lang: "English" },
  ];

  useEffect(() => {
    if (currentLanguageIndex < languages.length) {
      const timer = setTimeout(() => {
        setCurrentLanguageIndex(currentLanguageIndex + 1);
      }, 3000);

      return () => clearTimeout(timer);
    } else {

      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(onLoadingComplete, 500);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentLanguageIndex, languages.length, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "linear-gradient(to right, #159B50 0%, 26.010716025328787%, #5c5152 56.35359287261963%, 78.17679643630981%, #74d1a3 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {languages.map(
              (item, index) =>
                currentLanguageIndex === index && (
                  <motion.div
                    key={item.lang}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.5,
                    }}
                  >
                    <SparklesText
                      colors={{ first: "white", second: "white" }}
                      className="text-3xl md:text-6xl leading-none"
                      text={item.text}
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
