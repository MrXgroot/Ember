import { motion } from "framer-motion";

import { cn } from "@/shared/integrations/cn";

export function Modal({ children, onClose, className }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.article
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-lg flex flex-col gap-4 p-5",

          "bg-app-surface border border-app-border",

          "rounded-app-lg shadow-xl",

          className,
        )}
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.article>
    </motion.div>
  );
}
