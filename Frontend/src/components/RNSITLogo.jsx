// RNSIT Logo Component — matches the official logo style
export default function RNSITLogo({ className = '', height = 48 }) {
  return (
    <svg
      height={height}
      viewBox="0 0 220 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield/Crest circle */}
      <circle cx="28" cy="30" r="26" fill="#1a237e" stroke="#ffa000" strokeWidth="2" />
      <circle cx="28" cy="30" r="20" fill="none" stroke="#ffa000" strokeWidth="1" />
      {/* Book symbol inside shield */}
      <rect x="20" y="24" width="16" height="12" rx="1" fill="none" stroke="#fff" strokeWidth="1.2" />
      <line x1="28" y1="24" x2="28" y2="36" stroke="#fff" strokeWidth="1" />
      <line x1="20" y1="28" x2="28" y2="28" stroke="#fff" strokeWidth="0.8" />
      <line x1="28" y1="28" x2="36" y2="28" stroke="#fff" strokeWidth="0.8" />
      {/* ESTD text */}
      <text x="28" y="44" textAnchor="middle" fill="#ffa000" fontSize="5" fontFamily="serif" fontWeight="bold">ESTD.2001</text>

      {/* RNS text */}
      <text x="62" y="26" fill="#1a237e" fontSize="22" fontFamily="Arial Black, sans-serif" fontWeight="900" letterSpacing="1">RNS</text>

      {/* INSTITUTE OF TECHNOLOGY */}
      <text x="62" y="38" fill="#1a237e" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="0.5">INSTITUTE OF</text>
      <text x="62" y="50" fill="#1a237e" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="700" letterSpacing="0.5">TECHNOLOGY</text>

      {/* Orange underline accent */}
      <rect x="62" y="40" width="155" height="2" fill="#ffa000" />

      {/* Tagline */}
      <text x="62" y="58" fill="#ffa000" fontSize="7" fontFamily="Arial, sans-serif" fontStyle="italic">An Institute with a Difference</text>
    </svg>
  )
}
