import type { NutritionFacts as NutritionFactsData } from "./data";

export function NutritionFacts({
  nutrition,
  accent = "var(--accent-primary)",
  className = "",
}: {
  nutrition: NutritionFactsData;
  accent?: string;
  className?: string;
}) {
  const servingColumnLabel = nutrition.servingSize.replace(/\s+/g, "");

  return (
    <section className={`mt-5 ${className}`} aria-label="Nutritional facts">
      <div
        className="overflow-hidden rounded-[3px] border-2 border-text-primary/30 bg-bg-surface/75"
        style={{ borderTopColor: accent }}
      >
        <header className="border-b-2 border-text-primary/30 px-3 py-3 sm:px-4 lg:px-5 lg:py-1">
          <h4 className="flex flex-wrap items-baseline gap-x-1.5 font-display text-xl font-bold leading-none tracking-[-0.01em] text-text-primary uppercase sm:text-2xl">
            <span>Nutritional Facts</span>
            <span className="text-[0.55em] tracking-normal">[Typical Values]*</span>
          </h4>
          <p className="mt-2 text-[11px] font-semibold leading-tight text-text-primary sm:text-xs">
            Serving Size - {nutrition.servingSize}, {nutrition.servingsPerPack}
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-[10px] leading-tight text-text-primary sm:text-xs">
            <colgroup>
              <col className="w-[43%]" />
              <col className="w-[19%]" />
              <col className="w-[20%]" />
              <col className="w-[18%]" />
            </colgroup>
            <thead>
              <tr className="bg-bg-muted/55">
                <th scope="col" className="px-2 py-2 text-left font-semibold sm:px-3">
                  Nutrient
                </th>
                <th
                  scope="col"
                  className="border-l-2 border-text-primary/25 px-1 py-2 text-center font-bold sm:px-2"
                >
                  *Per 100ml
                </th>
                <th
                  scope="col"
                  className="border-l-2 border-text-primary/25 px-1 py-2 text-center font-bold sm:px-2"
                >
                  *Per {servingColumnLabel}
                </th>
                <th
                  scope="col"
                  className="border-l-2 border-text-primary/25 px-1 py-2 text-center font-bold sm:px-2"
                >
                  **%RDA
                </th>
              </tr>
            </thead>
            <tbody>
              {nutrition.rows.map((row) => (
                <tr key={row.label} className="border-t-2 border-text-primary/25">
                  <th
                    scope="row"
                    className="h-11 px-2 py-2 text-left text-[11px] font-bold sm:h-12 sm:px-3 sm:text-xs lg:h-7 lg:py-1"
                  >
                    {row.label}
                  </th>
                  <td className="h-11 border-l-2 border-text-primary/25 px-1 py-2 text-center font-bold tabular-nums sm:h-12 sm:px-2 sm:text-sm lg:h-7 lg:py-1">
                    {row.per100ml}
                  </td>
                  <td className="h-11 border-l-2 border-text-primary/25 px-1 py-2 text-center font-bold tabular-nums sm:h-12 sm:px-2 sm:text-sm lg:h-7 lg:py-1">
                    {row.perServing}
                  </td>
                  <td className="h-11 border-l-2 border-text-primary/25 px-1 py-2 text-center font-bold tabular-nums sm:h-12 sm:px-2 sm:text-sm lg:h-7 lg:py-1">
                    {row.rda}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {nutrition.statements && nutrition.statements.length > 0 && (
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {nutrition.statements.map((statement) => (
            <p
              key={statement}
              className="rounded-md border border-border-theme bg-bg-surface px-2 py-2 text-center text-[9px] font-bold tracking-[0.025em] text-text-primary uppercase sm:text-[10px]"
            >
              {statement}
            </p>
          ))}
        </div>
      )}

      <p className="mt-2 text-[9px] font-semibold leading-relaxed tracking-[0.025em] text-text-muted uppercase sm:text-[10px]">
        ** Percent daily values are based on a 2000 kcal diet as per ICMR-NIN 2020 guidelines.
        Individual calorie needs may vary.
      </p>
    </section>
  );
}
