// Hand-drawn decorative pieces. Inline SVG rather than images: they inherit
// currentColor, scale cleanly, and cost nothing to load.

/** Interlocking U & P monogram inside a gold ring. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
      <circle cx="60" cy="60" r="49" fill="none" stroke="currentColor" strokeWidth=".6" opacity=".35" />
      {[...Array(24)].map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return <circle key={i} cx={60 + Math.cos(a) * 52} cy={60 + Math.sin(a) * 52} r="1" fill="currentColor" opacity=".5" />;
      })}
      <text x="44" y="76" fontFamily="Playfair Display, Georgia, serif" fontSize="46" fill="currentColor" textAnchor="middle">U</text>
      <text x="76" y="76" fontFamily="Playfair Display, Georgia, serif" fontSize="46" fill="currentColor" textAnchor="middle">P</text>
    </svg>
  );
}

/** Marigold-and-leaf rule used between sections instead of a plain border. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A55C]/70 sm:w-28" />
      <svg viewBox="0 0 60 24" className="h-5 w-14 fill-[#C9A55C]">
        <circle cx="30" cy="12" r="4.5" />
        <circle cx="30" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1" className="stroke-[#E0932F]" />
        <circle cx="14" cy="12" r="2.5" opacity=".8" />
        <circle cx="46" cy="12" r="2.5" opacity=".8" />
        <circle cx="4" cy="12" r="1.4" opacity=".5" />
        <circle cx="56" cy="12" r="1.4" opacity=".5" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A55C]/70 sm:w-28" />
    </div>
  );
}

/** Scattered marigold petals, used as a soft backdrop behind the hero. */
export function Petals({ className = "" }: { className?: string }) {
  const pts = [
    [8, 14, 7], [22, 6, 5], [88, 10, 8], [76, 26, 5], [94, 44, 6],
    [5, 52, 6], [16, 78, 7], [90, 76, 6], [70, 90, 5], [30, 94, 6], [50, 4, 4], [42, 88, 4],
  ];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r as number / 2}
          fill={i % 3 === 0 ? "#E0932F" : i % 3 === 1 ? "#F3CDD3" : "#C9A55C"} opacity={0.22} />
      ))}
    </svg>
  );
}
