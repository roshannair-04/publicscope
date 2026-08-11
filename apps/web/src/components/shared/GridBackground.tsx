export function GridBackground() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        opacity-[0.06]
        [background-image:radial-gradient(#ffffff_1px,transparent_1px)]
        [background-size:32px_32px]
      "
    />
  );
}