import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/client/lib/utils";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  tiltLimit?: number;
  scale?: number;
  perspective?: number;
  effect?: "gravitate" | "evade";
  spotlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TiltCard({
  children,
  tiltLimit = 18,
  scale = 1.05,
  perspective = 1000,
  effect = "evade",
  spotlight = true,
  className,
  style,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalizado de -1 a 1
      const normalizedX = (x - centerX) / centerX;
      const normalizedY = (y - centerY) / centerY;

      // Se "evade", o lado onde o cursor está se afasta (inclina para trás)
      // Se "gravitate", o lado onde o cursor está se aproxima
      const multiplier = effect === "gravitate" ? -1 : 1;

      const rotateX = -normalizedY * tiltLimit * multiplier;
      const rotateY = normalizedX * tiltLimit * multiplier;

      setRotate({ x: rotateX, y: rotateY });
      setSpotlightPos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: spotlight ? 1 : 0,
      });
    },
    [effect, tiltLimit, spotlight]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="w-full h-full [transform-style:preserve-3d]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${scale}, ${scale}, ${scale})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.08s ease-out"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `${-rotate.y * 1.5}px ${rotate.x * 1.5}px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(204, 145, 102, 0.15)`
            : "0 10px 30px rgba(0, 0, 0, 0.3)",
          ...style,
        }}
        className={cn(
          "relative rounded-[16px] transition-shadow duration-300 will-change-transform select-none cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Dynamic Spotlight that follows cursor on hover */}
        {spotlight && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[inherit]"
            style={{
              opacity: spotlightPos.opacity,
              background: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 30%, rgba(255, 255, 255, 0) 70%)`,
            }}
          />
        )}

        {/* Card Content with 3D Depth capability */}
        <div className="relative z-10 w-full h-full [transform-style:preserve-3d] pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
