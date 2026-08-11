interface BrandMarkProps {
  className?: string;
  active?: boolean;
}

export function BrandMark({
  className = "",
  active = false,
}: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PublicScope Brand Mark"
      role="img"
    >
      {/* Outer Diamond */}
      <polygon
        points="120,24 216,120 120,216 24,120"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.84"
      />

      {/* Middle Diamond */}
      <polygon
        points="120,54 186,120 120,186 54,120"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.84"
        transform="rotate(-7 120 120)"
      />

      {/* Inner Diamond */}
      <polygon
        points="120,84 156,120 120,156 84,120"
        fill={active ? "var(--accent)" : "currentColor"}
        transform="rotate(6 120 120)"
      />
    </svg>
  );
}