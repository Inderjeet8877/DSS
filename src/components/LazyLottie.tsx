"use client";

import { useEffect, useRef, useState } from "react";

const DotLottieWC = "dotlottie-wc" as any;

interface LazyLottieProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function LazyLottie({
  src,
  autoplay = true,
  loop = true,
  style = { width: "100%", height: "100%" },
  className = "",
}: LazyLottieProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: "200px" } // Preload 200px before entering viewport
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Dynamically load the Web Component script once a Lottie enters view
  useEffect(() => {
    if (!inView) return;

    const scriptId = "dotlottie-wc-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.9.14/dist/dotlottie-wc.js";
      script.type = "module";
      script.async = true;
      document.head.appendChild(script);
    }
  }, [inView]);

  return (
    <div ref={ref} className={`w-full h-full ${className}`} style={style}>
      {inView ? (
        <DotLottieWC
          src={src}
          autoplay={autoplay}
          loop={loop}
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div className="w-full h-full bg-navy-950/5 animate-pulse rounded" />
      )}
    </div>
  );
}
