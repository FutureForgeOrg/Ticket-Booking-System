import { useShowDateStore, type Tab } from "../../store/ShowsDateStore";

export interface DateTabsProp {
  tabs: Tab[];
}

export const DateTabs = ({ tabs }: DateTabsProp) => {
  const { selectedDayKey, setSelectedDayKey } = useShowDateStore();
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((t) => {
        const active = t.key === selectedDayKey;

        return (
          <button
            key={t.key}
            onClick={() => setSelectedDayKey(t.key)}
            className={[
              "min-w-[78px] rounded-xl border px-3 py-2 text-center transition",
              "focus:outline-none focus:shadow-focus",
              active
                ? "border-primary bg-primary-soft text-text-primary"
                : "border-border bg-surface text-text-secondary hover:border-primary/40",
            ].join(" ")}
          >
            <div className="text-[11px] font-semibold tracking-wide opacity-90">
              {t.dow}
            </div>
            <div className="text-lg font-bold leading-5">{t.day}</div>
            <div className="text-[11px] font-semibold tracking-wide opacity-90">
              {t.mon}
            </div>
          </button>
        );
      })}
    </div>
  );
};
