type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <div className="mb-5 h-px w-full bg-line" />
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
        {eyebrow}
      </p>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-black/60">
          {description}
        </p>
      ) : null}
    </div>
  );
}
