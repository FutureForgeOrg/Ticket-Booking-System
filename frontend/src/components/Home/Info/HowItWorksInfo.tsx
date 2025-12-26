import Card from "../../ui/Card";
import { steps, perks } from "./data";

export default function HowItWorks() {
  return (
    <section className="bg-canvas">
      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-text-primary">
            How <span className="text-[#F4C430]">Go</span><span className="text-[#16A34A]">BookIt</span> Works
          </h2>
          <p className="mt-3 text-text-secondary">
            Book tickets in just a few simple steps.
          </p>
        </div>

        {/* STEPS */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={step.title} className="p-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center text-xl">
                {step.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {index + 1}. {step.title}
              </h3>

              <p className="mt-2 text-sm text-text-secondary">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        {/* PERKS */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {perks.map((perk) => (
            <div
              key={perk.label}
              className="flex items-center gap-2 text-sm text-text-secondary"
            >
              <span className="text-secondary">✔</span>
              <span>{perk.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
