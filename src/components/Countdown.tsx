import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export interface CountdownProps {
  targetDate: string; // ISO string
  title?: string;
  theme?: "light" | "dark" | "custom" | "transparent";
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  showSeconds?: boolean;
  titleSize?: string;
  numberSize?: string;
  labelSize?: string;
  fontFamily?: string;
  titleFontFamily?: string;
  titleGap?: string;
  timeGap?: string;
  blockPadding?: string;
}

export function Countdown({
  targetDate,
  title,
  theme = "light",
  backgroundColor,
  textColor,
  className,
  showSeconds = true,
  titleSize,
  numberSize,
  labelSize,
  fontFamily = "'Inter', sans-serif",
  titleFontFamily,
  titleGap,
  timeGap,
  blockPadding,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPassed: boolean;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  const resolvedBg =
    theme === "custom"
      ? backgroundColor
      : theme === "transparent"
      ? "transparent"
      : theme === "dark"
      ? "#1a1a1a"
      : "#ffffff";
  const resolvedText =
    (theme === "custom" || theme === "transparent")
      ? (textColor || "#1a1a1a")
      : theme === "dark"
      ? "#ffffff"
      : "#1a1a1a";

  const numBlockClass =
    "flex flex-col items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 shadow-sm";
  const numTextClass = "font-bold tracking-tighter leading-none tabular-nums";
  const labelClass = "uppercase tracking-widest font-medium opacity-60 mt-1 sm:mt-2 leading-none";

  const tSize = titleSize ? `${titleSize}pt` : "clamp(1.25rem, 4vw, 1.875rem)";
  const nSize = numberSize ? `${numberSize}pt` : "clamp(1.875rem, 8vw, 3rem)";
  const lSize = labelSize ? `${labelSize}pt` : "clamp(0.75rem, 2vw, 0.875rem)";

  const paddingNum = blockPadding !== undefined ? Number(blockPadding) : 16;
  const paddingOffset = paddingNum * 2;

  // The box should keep a fixed size relative to the font so it doesn't jump.
  // Using max() to ensure both number and label fit properly even if font size changes drastically.
  const blockWidth = numberSize || labelSize ? `calc(max(${nSize} * 1.1, ${lSize} * 2) + ${paddingOffset}px)` : `calc(2.5rem + ${paddingOffset}px)`;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 sm:p-10 w-full h-full transition-colors duration-300 relative",
        className
      )}
      style={{
        backgroundColor: resolvedBg,
        color: resolvedText,
        fontFamily: fontFamily,
      }}
    >
      {title && (
        <h2 
          className="font-semibold text-center text-balance"
          style={{ 
            fontSize: tSize, 
            fontFamily: titleFontFamily || fontFamily,
            marginBottom: titleGap ? `${titleGap}px` : "2rem"
          }}
        >
          {title}
        </h2>
      )}

      {timeLeft.isPassed ? (
        <div className="font-bold opacity-80 uppercase tracking-widest" style={{ fontSize: tSize }}>
          活動已結束
        </div>
      ) : (
        <div 
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-6"
          style={{ gap: timeGap ? `${timeGap}px` : undefined }}
        >
          <div className={numBlockClass} style={{ width: blockWidth, minWidth: blockWidth, padding: `${paddingNum}px` }}>
            <span className={numTextClass} style={{ fontSize: nSize }}>
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className={labelClass} style={{ fontSize: lSize }}>天</span>
          </div>
          <div className="font-light opacity-50 pb-6 hidden sm:block" style={{ fontSize: nSize }}>:</div>
          <div className={numBlockClass} style={{ width: blockWidth, minWidth: blockWidth, padding: `${paddingNum}px` }}>
            <span className={numTextClass} style={{ fontSize: nSize }}>
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className={labelClass} style={{ fontSize: lSize }}>小時</span>
          </div>
          <div className="font-light opacity-50 pb-6 hidden sm:block" style={{ fontSize: nSize }}>:</div>
          <div className={numBlockClass} style={{ width: blockWidth, minWidth: blockWidth, padding: `${paddingNum}px` }}>
            <span className={numTextClass} style={{ fontSize: nSize }}>
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className={labelClass} style={{ fontSize: lSize }}>分鐘</span>
          </div>
          {showSeconds && (
            <>
              <div className="font-light opacity-50 pb-6 hidden sm:block" style={{ fontSize: nSize }}>:</div>
              <div className={numBlockClass} style={{ width: blockWidth, minWidth: blockWidth, padding: `${paddingNum}px` }}>
                <span className={numTextClass} style={{ fontSize: nSize }}>
                   {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className={labelClass} style={{ fontSize: lSize }}>秒</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
