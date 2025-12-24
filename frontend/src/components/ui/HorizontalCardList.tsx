import { ArrowLeft, ArrowRight } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface HorizontalCardListProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  scrollAmount?: number;
}

export default function HorizontalCardList<T>({
  title,
  items,
  renderItem,
  scrollAmount = 500,
}: HorizontalCardListProps<T>) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateButtons();
    const el = scrollRef.current;

    if (!el) return;

    el.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  if (!items.length) return null;

  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <h2 className="mb-6 text-2xl font-semibold">{title}</h2>

        <div className="relative">
          {/* LEFT ARROW */}
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              className="
                absolute left-0 top-1/2 z-10
                -translate-y-1/2
                rounded-full bg-black/60 p-3
                text-white
                hover:bg-black/80
              "
            >
              <ArrowLeft size={14} />
            </button>
          )}

          {/* RIGHT ARROW */}
          {showRight && (
            <button
              onClick={() => scroll("right")}
              className="
                absolute right-0 top-1/2 z-10
                -translate-y-1/2
                rounded-full bg-black/60 p-3
                text-white
                hover:bg-black/80
              "
            >
              <ArrowRight size={14} />
            </button>
          )}

          {/* SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            className="
              grid grid-rows-1 grid-flow-col
              gap-6
              overflow-x-auto
              pb-4
              scrollbar-hide
            "
          >
            {items.map(renderItem)}
          </div>
        </div>
      </div>
    </section>
  );
}
