"use client";

import styles from "./Container.module.scss";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { FaChevronUp } from "react-icons/fa6";
import { LocalLenisContext } from "@/context/LocalLenisContext";
import NavBar from "../NavBar/NavBar";

const Container = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const localLenis = new Lenis({
      wrapper: container,
      content: container,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenisRef.current = localLenis;

    function animate(time: number) {
      localLenis.raf(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    const handleScroll = () => {
      if (container.scrollTop > 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      localLenis.destroy();
      lenisRef.current = null;
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <LocalLenisContext.Provider value={{ lenis: lenisRef.current }}>
      <div ref={containerRef} className="main">
        <NavBar />
        {children}
        <div
          onClick={() => lenisRef.current?.scrollTo(0, { duration: 1.5 })}
          style={{
            opacity: showBackToTop ? 1 : 0,
            scale: showBackToTop ? 1 : 0.5,
            pointerEvents: showBackToTop ? "auto" : "none",
            transition: "opacity 0.5s ease-in-out, scale 0.5s ease-in-out",
          }}
          className={styles.scrollToTop}
        >
          <FaChevronUp />
        </div>
      </div>
    </LocalLenisContext.Provider>
  );
};

export default Container;
