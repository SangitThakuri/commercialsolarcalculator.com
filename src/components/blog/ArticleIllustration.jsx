// Premium flat-vector illustrations standing in for photography until real images exist —
// same approach used for the site's charts: no external image requests, so nothing to
// optimize/lazy-load-fail, and it renders identically regardless of network conditions.
// Each variant is a self-contained <svg> with its own gradient background.

const SCENES = {
  'rooftop-solar': { bg: ['#ecfdf5', '#d1fae5'], render: RooftopSolar },
  'office-building': { bg: ['#eff6ff', '#dbeafe'], render: OfficeBuilding },
  inspection: { bg: ['#f0fdfa', '#ccfbf1'], render: Inspection },
  'financial-dashboard': { bg: ['#faf5ff', '#ede9fe'], render: FinancialDashboard },
  'battery-storage': { bg: ['#ecfeff', '#cffafe'], render: BatteryStorage },
  'electricity-meter': { bg: ['#fffbeb', '#fef3c7'], render: ElectricityMeter },
  'tax-paperwork': { bg: ['#fdf2f8', '#fce7f3'], render: TaxPaperwork },
  'savings-chart': { bg: ['#ecfdf5', '#d1fae5'], render: SavingsChart },
  'solar-farm': { bg: ['#eff6ff', '#e0e7ff'], render: SolarFarm },
  warehouse: { bg: ['#f8fafc', '#e2e8f0'], render: Warehouse },
  'clean-energy': { bg: ['#ecfeff', '#d1fae5'], render: CleanEnergyAbstract },
}

function RooftopSolar() {
  return (
    <>
      <rect x="60" y="120" width="280" height="90" rx="4" fill="#475569" />
      <rect x="80" y="95" width="240" height="30" rx="3" fill="#334155" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={95 + i * 38} y="72" width="30" height="20" rx="2" fill="#10b981" opacity={0.9} />
      ))}
      <circle cx="340" cy="55" r="22" fill="#fbbf24" opacity="0.9" />
    </>
  )
}

function OfficeBuilding() {
  return (
    <>
      <rect x="130" y="40" width="140" height="170" rx="4" fill="#1e3a8a" opacity="0.85" />
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={148 + col * 38}
            y={58 + row * 34}
            width="24"
            height="20"
            rx="2"
            fill="#bfdbfe"
            opacity="0.85"
          />
        )),
      )}
      <rect x="100" y="195" width="200" height="15" rx="3" fill="#0f172a" opacity="0.5" />
      <rect x="140" y="34" width="60" height="10" rx="2" fill="#10b981" />
    </>
  )
}

function Inspection() {
  return (
    <>
      <rect x="70" y="110" width="220" height="130" rx="6" fill="#0f766e" opacity="0.15" />
      <rect x="90" y="130" width="180" height="90" rx="4" fill="#0d9488" />
      <rect x="105" y="142" width="60" height="66" rx="2" fill="#5eead4" opacity="0.6" />
      <rect x="175" y="142" width="60" height="66" rx="2" fill="#5eead4" opacity="0.6" />
      <circle cx="300" cy="90" r="34" fill="none" stroke="#134e4a" strokeWidth="6" />
      <line x1="323" y1="113" x2="345" y2="135" stroke="#134e4a" strokeWidth="7" strokeLinecap="round" />
      <path d="M286 90l10 10 18-20" stroke="#0d9488" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}

function FinancialDashboard() {
  return (
    <>
      <rect x="60" y="55" width="280" height="150" rx="8" fill="#4c1d95" opacity="0.9" />
      <rect x="80" y="75" width="240" height="110" rx="4" fill="#faf5ff" opacity="0.95" />
      {[40, 65, 50, 80, 95, 70].map((h, i) => (
        <rect key={i} x={100 + i * 36} y={165 - h} width="20" height={h} rx="2" fill="#7c3aed" opacity={0.85} />
      ))}
      <path
        d="M100 130 L136 110 L172 118 L208 90 L244 100 L280 70"
        stroke="#10b981"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
    </>
  )
}

function BatteryStorage() {
  return (
    <>
      <rect x="140" y="55" width="120" height="150" rx="14" fill="#155e75" />
      <rect x="172" y="40" width="56" height="18" rx="4" fill="#155e75" />
      <rect x="155" y="150" width="90" height="40" rx="4" fill="#22d3ee" opacity="0.85" />
      <rect x="155" y="105" width="90" height="35" rx="4" fill="#67e8f9" opacity="0.6" />
      <path d="M195 70 L175 110 L195 110 L185 140 L215 100 L197 100 Z" fill="#fbbf24" />
    </>
  )
}

function ElectricityMeter() {
  return (
    <>
      <circle cx="200" cy="125" r="80" fill="#78350f" opacity="0.1" />
      <circle cx="200" cy="125" r="65" fill="#fffbeb" stroke="#d97706" strokeWidth="6" />
      <circle cx="200" cy="125" r="4" fill="#d97706" />
      <line x1="200" y1="125" x2="200" y2="80" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
      <line x1="200" y1="125" x2="232" y2="140" stroke="#b45309" strokeWidth="4" strokeLinecap="round" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x1 = 200 + Math.cos(angle) * 58
        const y1 = 125 + Math.sin(angle) * 58
        const x2 = 200 + Math.cos(angle) * 65
        const y2 = 125 + Math.sin(angle) * 65
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#92400e" strokeWidth="2.5" />
      })}
    </>
  )
}

function TaxPaperwork() {
  return (
    <>
      <rect x="115" y="45" width="130" height="165" rx="6" fill="#fbcfe8" opacity="0.5" />
      <rect x="130" y="35" width="130" height="165" rx="6" fill="#ffffff" stroke="#db2777" strokeWidth="3" />
      {[60, 80, 100, 120].map((y, i) => (
        <rect key={i} x="148" y={y} width={i === 0 ? 70 : 94} height="8" rx="3" fill="#f9a8d4" />
      ))}
      <circle cx="230" cy="165" r="26" fill="#db2777" opacity="0.15" />
      <text x="230" y="172" textAnchor="middle" fontSize="22" fontWeight="700" fill="#be185d">
        %
      </text>
    </>
  )
}

function SavingsChart() {
  return (
    <>
      <rect x="70" y="60" width="260" height="140" rx="8" fill="#ffffff" stroke="#a7f3d0" strokeWidth="3" />
      <path
        d="M95 175 L140 150 L185 160 L230 110 L275 120 L305 75"
        stroke="#059669"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="305" cy="75" r="7" fill="#10b981" />
      {[95, 140, 185, 230, 275].map((x, i) => (
        <circle key={i} cx={x} cy={[175, 150, 160, 110, 120][i]} r="4" fill="#34d399" />
      ))}
    </>
  )
}

function SolarFarm() {
  return (
    <>
      <rect x="40" y="150" width="320" height="60" fill="#c7d2fe" opacity="0.4" />
      {[0, 1, 2].map((row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={55 + col * 62}
            y={95 + row * 30}
            width="48"
            height="20"
            rx="2"
            fill="#4338ca"
            opacity={0.55 + row * 0.15}
            transform={`skewY(-6)`}
          />
        )),
      )}
      <circle cx="330" cy="55" r="20" fill="#fbbf24" />
    </>
  )
}

function Warehouse() {
  return (
    <>
      <rect x="55" y="130" width="290" height="80" rx="4" fill="#334155" />
      <polygon points="55,130 200,90 345,130" fill="#1e293b" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={75 + i * 40} y="100" width="26" height="16" rx="2" fill="#10b981" opacity="0.9" />
      ))}
      <rect x="180" y="160" width="40" height="50" fill="#0f172a" />
    </>
  )
}

function CleanEnergyAbstract() {
  return (
    <>
      <circle cx="200" cy="125" r="55" fill="#10b981" opacity="0.15" />
      <circle cx="200" cy="125" r="34" fill="#10b981" opacity="0.9" />
      <path
        d="M200 60 C150 90 150 160 200 190 C250 160 250 90 200 60Z"
        fill="none"
        stroke="#059669"
        strokeWidth="3"
        opacity="0.4"
      />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1={200 + Math.cos((deg * Math.PI) / 180) * 70}
          y1={125 + Math.sin((deg * Math.PI) / 180) * 70}
          x2={200 + Math.cos((deg * Math.PI) / 180) * 90}
          y2={125 + Math.sin((deg * Math.PI) / 180) * 90}
          stroke="#34d399"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
    </>
  )
}

function ArticleIllustration({ variant, className = '' }) {
  const scene = SCENES[variant] ?? SCENES['clean-energy']
  const gradientId = `blog-illustration-${variant}`
  const Render = scene.render

  return (
    <svg
      viewBox="0 0 400 240"
      className={`h-full w-full ${className}`}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={scene.bg[0]} />
          <stop offset="100%" stopColor={scene.bg[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${gradientId})`} />
      <Render />
    </svg>
  )
}

export default ArticleIllustration
