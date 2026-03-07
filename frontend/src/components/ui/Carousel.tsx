import { useEffect, useState, type ReactNode } from "react";

interface CarouselProps<T> {
  items: T[];
  autoSlide?: boolean;
  interval?: number;
  renderItem: (item: T, index: number) => ReactNode;
  bannerHeight?: number;
}

export default function Carousel<T>({
  items,
  autoSlide = true,
  interval = 4000,
  renderItem,
  bannerHeight,
}: CarouselProps<T>) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoSlide || items.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items, autoSlide, interval]);

  if (!items.length) return null;

  return (
    <div
      className={`relative w-full h-[${bannerHeight || 420}px] overflow-hidden rounded-xl`}
    >
      {/* sliding container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
