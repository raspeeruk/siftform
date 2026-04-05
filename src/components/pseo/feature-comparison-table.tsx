export function FeatureComparisonTable({
  siftName = "Sift",
  competitorName,
  features,
}: {
  siftName?: string;
  competitorName: string;
  features: {
    name: string;
    sift: boolean | string;
    competitor: boolean | string;
  }[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-polar/50">
            <th className="px-4 py-3 font-medium text-slate-muted">Feature</th>
            <th className="px-4 py-3 font-bold text-signal">{siftName}</th>
            <th className="px-4 py-3 font-medium text-graphite">
              {competitorName}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr
              key={f.name}
              className={`border-b border-border ${
                i % 2 === 0 ? "bg-ice" : "bg-white"
              }`}
            >
              <td className="px-4 py-3 text-graphite">{f.name}</td>
              <td className="px-4 py-3">
                <FeatureValue value={f.sift} />
              </td>
              <td className="px-4 py-3">
                <FeatureValue value={f.competitor} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <svg
        className="h-5 w-5 text-verified"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    );
  }
  if (value === false) {
    return (
      <svg
        className="h-5 w-5 text-alert/40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    );
  }
  return <span className="text-sm text-graphite">{value}</span>;
}
