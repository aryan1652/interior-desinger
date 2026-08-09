import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export type LightboxItem = { src: string; label?: string; category?: string };

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, next, prev]);

  const current = index !== null ? items[index] : undefined;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/92 backdrop-blur-xl"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-5 top-5 rounded-full border border-border bg-card p-3 text-foreground transition-colors hover:text-primary"
          >
            <FiX />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-3 z-10 rounded-full border border-border bg-card p-3 text-foreground transition-colors hover:text-primary sm:left-8"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-3 z-10 rounded-full border border-border bg-card p-3 text-foreground transition-colors hover:text-primary sm:right-8"
          >
            <FiChevronRight />
          </button>

          <motion.figure
            key={current.src}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-[min(1100px,88vw)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.label ?? ""}
              className="max-h-[74vh] w-full rounded-[1.75rem] object-cover shadow-luxe"
            />
            {(current.label || current.category) && (
              <figcaption className="mt-5 flex items-center justify-between gap-4">
                <span className="font-display text-2xl">{current.label}</span>
                <span className="eyebrow">{current.category}</span>
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
