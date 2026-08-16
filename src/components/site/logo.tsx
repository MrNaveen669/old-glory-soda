type LogoProps = {
  className?: string;
  title?: string;
};

/**
 * Heritage soda script wordmark: "Old Glory".
 * Uses CSS mask-image with background-color: currentColor so it is 100% reliable
 * across all browsers while inheriting theme text color seamlessly.
 */
export function OldGloryLogo({ className, title = "Old Glory Soda" }: LogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-block bg-current ${className || ""}`}
      style={{
        WebkitMaskImage: "url(/logo-mark.png)",
        maskImage: "url(/logo-mark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
        aspectRatio: "2042 / 1036",
      }}
    />
  );
}
