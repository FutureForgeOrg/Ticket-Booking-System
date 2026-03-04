import { ArrowLeft, ArrowRight } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface HorizontalCardListProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  scrollAmount?: number;
  loading?: boolean;
  error?: Error | null;
  showAllLink?: string; // URL path for "All" link
}

export default function HorizontalCardList<T>({
  title,
  items,
  renderItem,
  scrollAmount = 500,
  loading = false,
  error = null,
  showAllLink,
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

  // ERROR UI
  if (error) {
    return (
      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h2 className="mb-4 text-2xl font-semibold">{title}</h2>

          <div className="rounded-xl border border-red-400/30 bg-red-500/10 p-6 text-red-400">
            <p>{error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  // LOADING UI
  if (loading) {
    return (
      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h2 className="mb-6 text-2xl font-semibold">{title}</h2>

          <div className="grid grid-rows-1 grid-flow-col gap-6 overflow-hidden pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 w-40 animate-pulse rounded-xl bg-neutral-400"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // nothing to show
  if (!items.length) return null;

  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {showAllLink && (
            <a
              href={showAllLink}
              className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
            >
              All →
            </a>
          )}
        </div>

        <div className="relative">
          {showLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80"
            >
              <ArrowLeft size={14} />
            </button>
          )}

          {showRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80"
            >
              <ArrowRight size={14} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="grid grid-rows-1 grid-flow-col gap-6 overflow-x-auto pb-4 scrollbar-hide"
          >
            {items.map(renderItem)}
          </div>
        </div>
      </div>
    </section>
  );
}
