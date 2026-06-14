"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useVolumetric } from "./context";
import { Poster } from "./poster";

const Canvas = dynamic(() => import("./canvas"), {
  ssr: false,
  loading: () => null,
});

export function CanvasMount() {
  const { reducedMotion } = useVolumetric();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => setMounted(true), []);
  const handleReady = useCallback(() => setReady(true), []);

  const show = mounted && !reducedMotion;

  return (
    <div aria-hidden className="fixed inset-0 z-0">
      <Poster />
      {show && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Canvas onReady={handleReady} />
        </motion.div>
      )}
    </div>
  );
}
