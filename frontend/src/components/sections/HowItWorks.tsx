import { Card } from "@/components/ui/Card";
import { SectionTag } from "@/components/ui/SectionTag";
import { StepConnector } from "@/components/ui/StepConnector";
import { COLORS, RADIUS, SHADOW } from "@/lib/tokens";

const steps = [
  {
    number: "01",
    icon: "📝",
    title: "Fill in details",
    titleFr: "Remplissez les détails",
    desc: "Enter your car's make, model, year, mileage, fuel type, and a few more quick fields.",
    rotate: "rotate-1",
  },
  {
    number: "02",
    icon: "🤖",
    title: "ML crunches the numbers",
    titleFr: "L'IA calcule",
    desc: "A Random Forest model trained on 5 000+ Tunisian listings predicts the fair market value.",
    rotate: "-rotate-1",
  },
  {
    number: "03",
    icon: "💰",
    title: "Get your estimate",
    titleFr: "Recevez votre estimation",
    desc: "Your predicted price appears instantly — in the same currency as the training dataset (TND).",
    rotate: "rotate-1",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-20 px-6"
      aria-labelledby="hiw-heading"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Section header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionTag rotate={1}>How it works</SectionTag>
          <h2
            id="hiw-heading"
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
          >
            Three steps to your price
          </h2>
          <p
            className="text-base md:text-lg opacity-70 max-w-xl"
            style={{ fontFamily: "var(--font-patrick), cursive" }}
          >
            No signup. No nonsense. Just fill → predict → profit.
          </p>
        </div>

        {/* Steps row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-start gap-6 md:gap-0">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="flex flex-col md:flex-row items-start md:items-center flex-1"
            >
              {/* Step card */}
              <div className={`flex-1 ${step.rotate}`}>
                <Card className="p-6 flex flex-col gap-3 h-full" decoration="none">
                  {/* Step number bubble */}
                  <div className="relative self-start">
                    <div
                      className="w-12 h-12 flex items-center justify-center border-2 border-fg font-bold text-lg z-10 relative"
                      style={{
                        fontFamily: "var(--font-kalam), cursive",
                        borderRadius: RADIUS.WOBBLY,
                        backgroundColor: COLORS.POSTIT,
                        boxShadow: SHADOW.SM,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <span className="text-3xl" aria-hidden="true">{step.icon}</span>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold leading-tight"
                    style={{ fontFamily: "var(--font-kalam), cursive", color: COLORS.FG }}
                  >
                    {step.title}
                    <br />
                    <span
                      className="text-base font-normal opacity-60"
                      style={{ fontFamily: "var(--font-patrick), cursive" }}
                    >
                      {step.titleFr}
                    </span>
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm md:text-base leading-relaxed opacity-80"
                    style={{ fontFamily: "var(--font-patrick), cursive" }}
                  >
                    {step.desc}
                  </p>
                </Card>
              </div>

              {/* Connector (not after last step) */}
              {idx < steps.length - 1 && <StepConnector />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
