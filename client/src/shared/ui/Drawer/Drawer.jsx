import { motion } from "framer-motion";

import { cn } from "@/shared/integrations";

const variants = {
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },

  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },

  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
  },

  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
  },
};

export function Drawer({
  side = "left",
  onClose,
  children,
  className,
  overlayClassName,
  contentClassName,
}) {
  const positions = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  };

  return (
    <motion.div
      className={cn("fixed inset-0 z-50", className)}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className={cn("absolute inset-0 bg-black/50", overlayClassName)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.aside
        className={cn(
          "absolute bg-app-bg shadow-xl",
          positions[side],
          contentClassName,
        )}
        variants={variants[side]}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 30,
        }}
      >
        {children}
      </motion.aside>
    </motion.div>
  );
}
