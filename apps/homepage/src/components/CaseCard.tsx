import type { CaseStudy } from "../content";

type CaseCardProps = {
  item: CaseStudy;
  onOpenCase: (slug: string) => void;
};

export function CaseCard({ item, onOpenCase }: CaseCardProps) {
  const imagePosition = item.imagePosition ?? "center";
  const statusLabel = item.statusLabel;

  const handleOpen = () => {
    const selectedText = window.getSelection()?.toString().trim();

    if (selectedText) {
      return;
    }

    onOpenCase(item.slug);
  };

  return (
    <article
      className={`case-card case-card-${item.accent}`}
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpen();
        }
      }}
      aria-label={item.title}
    >
      <div className="case-stage">
        <img
          src={item.image}
          alt={`${item.title} demo`}
          className="h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,17,31,0.02),rgba(8,17,31,0.12))]" />
        <div className="absolute left-4 top-4 rounded-lg border border-white/30 bg-white/75 px-3 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-xl">
          {item.categoryLabel}
        </div>
        {statusLabel ? (
          <div className="absolute right-4 top-4 rounded-lg border border-white/30 bg-white/75 px-3 py-1 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-xl">
            {statusLabel}
          </div>
        ) : null}
      </div>
      <div className="case-card-copy p-5">
        <h3 className="text-lg font-semibold tracking-normal text-ink">{item.title}</h3>
        <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyanline">
          {item.eyebrow}
        </p>
        <p className="text-sm leading-7 text-slate-600">{item.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.features.map((feature) => (
            <span key={feature} className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
