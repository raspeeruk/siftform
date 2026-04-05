"use client";

import { useState } from "react";
import { ExtractionDemo } from "@/components/pseo/extraction-demo";

type Tab = {
  id: string;
  label: string;
  input: string;
  output: { label: string; value: string; confidence: number }[];
};

export function UseCaseTabsClient({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className="mt-10">
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              i === active
                ? "bg-signal text-white"
                : "bg-ice text-slate-muted hover:text-graphite border border-border"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ExtractionDemo inputText={tab.input} outputFields={tab.output} />
    </div>
  );
}
