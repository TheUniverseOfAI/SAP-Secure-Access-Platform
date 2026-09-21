/**
 * A clean PDF document icon (red page, folded corner, "PDF" label) drawn for
 * this app. It deliberately isn't Adobe's Acrobat logo, which is a trademark.
 */
export default function PdfIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pdfIconPage" x1="10" y1="4" x2="54" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F04B45" />
          <stop offset="1" stopColor="#C4211C" />
        </linearGradient>
        <linearGradient id="pdfIconFold" x1="38" y1="4" x2="54" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB4AF" />
          <stop offset="1" stopColor="#E0605A" />
        </linearGradient>
      </defs>
      <path d="M14 4h26l14 14v38a4 4 0 01-4 4H14a4 4 0 01-4-4V8a4 4 0 014-4z" fill="url(#pdfIconPage)" />
      <path d="M40 4l14 14H44a4 4 0 01-4-4V4z" fill="url(#pdfIconFold)" />
      <path d="M40 4l14 14H44a4 4 0 01-4-4V4z" fill="#000" fillOpacity=".08" />
      <rect x="15" y="31" width="34" height="15" rx="3" fill="#fff" />
      <text
        x="32"
        y="42.6"
        textAnchor="middle"
        fontFamily="'DM Sans', Arial, sans-serif"
        fontSize="11.5"
        fontWeight="800"
        fill="#C4211C"
        letterSpacing=".4"
      >
        PDF
      </text>
      <path
        d="M20 21c4-6 7-6 5-1-1.6 3.6-5 6-8 7 3-1 8-1.6 13-.4 4 .9 6 2.2 4.6 3.6-1.6 1.6-6-1.6-9.2-8"
        stroke="#fff"
        strokeOpacity=".9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
