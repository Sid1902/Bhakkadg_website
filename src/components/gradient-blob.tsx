export function GradientBlob({
  className = "",
  colors = ["#E2AA4E", "#E2AA4E"],
}: {
  className?: string;
  colors?: [string, string];
}) {
  return (
    <div
      aria-hidden
      className={`animate-blob pointer-events-none absolute rounded-full blur-[90px] ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${colors[0]}55, ${colors[1]}00 70%)`,
      }}
    />
  );
}
