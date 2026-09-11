"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  name: string;
  text: string;
  avatar: string;
  role?: string;
  username?: string;
  profileLink?: string;
  company?: string;
  rating?: number;
}

export interface TestimonialMarqueeProps {
  items: Testimonial[];
  variant?: "default" | "stacked" | "dual" | "flush" | "flush-dual";
  className?: string;
  speed?: number;
  containerClassName?: string;
}

const MarqueeStyles = React.memo(() => (
  <style>
    {`
        @keyframes marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marquee-right {
          from { transform: translate3d(-100%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
           animation: marquee-left var(--duration) linear infinite;
        }
        .animate-marquee-right {
           animation: marquee-right var(--duration) linear infinite;
        }
        `}
  </style>
));
MarqueeStyles.displayName = "MarqueeStyles";

const MarqueeRow = React.memo(
  ({
    children,
    direction = "left",
    speed = 40,
    className,
    pauseOnHover = true,
  }: {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
    pauseOnHover?: boolean;
  }) => {
    return (
      <div
        className={cn("group flex overflow-hidden py-4 px-2 [--gap:1.5rem]", className)}
      >
        <div
          className={cn(
            "flex shrink-0 justify-start [gap:var(--gap)] min-w-full pr-[var(--gap)] will-change-transform [backface-visibility:hidden]",
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={
            {
              "--duration": `${speed}s`,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "flex shrink-0 justify-start [gap:var(--gap)] min-w-full pr-[var(--gap)] will-change-transform [backface-visibility:hidden]",
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={
            {
              "--duration": `${speed}s`,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>
    );
  },
);
MarqueeRow.displayName = "MarqueeRow";

const TestimonialCard = React.memo(
  ({
    item,
    variant = "default",
  }: {
    item: Testimonial;
    variant?: "default" | "flush";
  }) => {
    if (variant === "flush") {
      return (
        <div className="relative group flex h-auto w-[350px] shrink-0 flex-col justify-between overflow-hidden rounded-none border-r border-white/10 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.06] transform-gpu [backface-visibility:hidden]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4">
            {item.rating && (
              <div className="flex text-[#FFD700] gap-0.5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <span key={j} className="material-symbols-outlined fill-1 text-base select-none">
                    star
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm leading-relaxed text-secondary/90 line-clamp-4 italic">
              &quot;{item.text}&quot;
            </p>

            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-secondary text-sm">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <span>{item.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {item.name}
                </span>
                <span className="text-xs text-secondary/60">
                  {item.role || (item.username ? `@${item.username}` : (item.company || ""))}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative group flex h-auto w-[360px] md:w-[400px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-7 transition-all duration-300 testimonial-card-glass card-hover card-hover-103 transform-gpu [backface-visibility:hidden]">
        <div className="quote-bg select-none">&quot;</div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          {item.rating && (
            <div className="flex text-[#FFD700] gap-0.5">
              {Array.from({ length: item.rating }).map((_, j) => (
                <span key={j} className="material-symbols-outlined fill-1 text-base select-none">
                  star
                </span>
              ))}
            </div>
          )}

          <p className="text-sm leading-relaxed text-secondary/90 line-clamp-4 italic relative z-10">
            &quot;{item.text}&quot;
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-secondary text-sm">
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              ) : (
                <span>{item.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                {item.name}
              </span>
              <span className="text-xs text-secondary/60">
                {item.role || (item.username ? `@${item.username}` : (item.company || ""))}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
TestimonialCard.displayName = "TestimonialCard";

export function TestimonialMarquee({
  items,
  variant = "default",
  className,
  speed = 30,
  containerClassName,
}: TestimonialMarqueeProps) {
  // Combine custom className with container styling if needed
  const cnContainer = cn(containerClassName, className);

  const itemsToDisplay = React.useMemo(() => {
    let result = [...items];
    // Ensure we have enough items to fill the width for smooth animation
    // 10 items is a safe heuristic for most screen sizes with 350px cards
    while (result.length < 10) {
      result = [...result, ...items];
    }
    return result;
  }, [items]);

  return (
    <React.Fragment>
      <MarqueeStyles />
      {variant === "dual" ? (
        <div
          className={cn(
            "flex flex-col gap-4 py-8 overflow-hidden",
            containerClassName,
          )}
        >
          <MarqueeRow speed={speed} direction="left">
            {itemsToDisplay
              .slice(0, Math.ceil(itemsToDisplay.length / 2))
              .map((item, i) => (
                <TestimonialCard key={`row1-${i}`} item={item} />
              ))}
          </MarqueeRow>
          <MarqueeRow speed={speed} direction="right">
            {itemsToDisplay
              .slice(Math.ceil(itemsToDisplay.length / 2))
              .map((item, i) => (
                <TestimonialCard key={`row2-${i}`} item={item} />
              ))}
          </MarqueeRow>
        </div>
      ) : variant === "stacked" ? (
        <div
          className={cn(
            "flex flex-col gap-2 py-8 overflow-hidden h-[600px] justify-center rotate-[-2deg] scale-110",
            containerClassName,
          )}
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
          <MarqueeRow
            speed={speed * 1.5}
            direction="left"
            className="[--gap:0.75rem]"
          >
            {itemsToDisplay
              .slice(0, Math.ceil(itemsToDisplay.length / 3))
              .map((item, i) => (
                <TestimonialCard key={`s-row1-${i}`} item={item} />
              ))}
          </MarqueeRow>
          <MarqueeRow
            speed={speed * 1.2}
            direction="right"
            className="[--gap:0.75rem]"
          >
            {itemsToDisplay
              .slice(
                Math.ceil(itemsToDisplay.length / 3),
                Math.ceil(itemsToDisplay.length / 3) * 2,
              )
              .map((item, i) => (
                <TestimonialCard key={`s-row2-${i}`} item={item} />
              ))}
          </MarqueeRow>
          <MarqueeRow
            speed={speed * 1.5}
            direction="left"
            className="[--gap:0.75rem]"
          >
            {itemsToDisplay
              .slice(Math.ceil(itemsToDisplay.length / 3) * 2)
              .map((item, i) => (
                <TestimonialCard key={`s-row3-${i}`} item={item} />
              ))}
          </MarqueeRow>
        </div>
      ) : variant === "flush" ? (
        <div
          className={cn(
            "overflow-hidden border-y border-border bg-background relative",
            cnContainer,
          )}
        >
          <MarqueeRow
            speed={speed}
            direction="left"
            className="[--gap:0rem] p-0"
          >
            {itemsToDisplay.map((item, i) => (
              <TestimonialCard key={`flush-${i}`} item={item} variant="flush" />
            ))}
          </MarqueeRow>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      ) : variant === "flush-dual" ? (
        <div
          className={cn(
            "flex flex-col overflow-hidden border-y border-border bg-background relative",
            containerClassName,
          )}
        >
          <MarqueeRow
            speed={speed}
            direction="left"
            className="[--gap:0rem] p-0 border-b border-border"
          >
            {itemsToDisplay
              .slice(0, Math.ceil(itemsToDisplay.length / 2))
              .map((item, i) => (
                <TestimonialCard
                  key={`fd-row1-${i}`}
                  item={item}
                  variant="flush"
                />
              ))}
          </MarqueeRow>
          <MarqueeRow
            speed={speed}
            direction="right"
            className="[--gap:0rem] p-0"
          >
            {itemsToDisplay
              .slice(Math.ceil(itemsToDisplay.length / 2))
              .map((item, i) => (
                <TestimonialCard
                  key={`fd-row2-${i}`}
                  item={item}
                  variant="flush"
                />
              ))}
          </MarqueeRow>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      ) : (
        <div className={cn("py-4 overflow-hidden", cnContainer)}>
          <MarqueeRow speed={speed} direction="left">
            {itemsToDisplay.map((item, i) => (
              <TestimonialCard key={`default-${i}`} item={item} />
            ))}
          </MarqueeRow>
        </div>
      )}
    </React.Fragment>
  );
}

export default TestimonialMarquee;
