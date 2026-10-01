import type { LandingCopy } from "./copy";
/** A deterministic illustration, never a live result or an invitation to scan. */
export function VitralArtwork({ t }: { t: LandingCopy }) {
  return (
    <figure className="landing-art" aria-label={t.artLabel}>
      <div className="landing-art-label">
        <span />
        {t.artTitle}
      </div>
      <svg
        className="landing-window"
        viewBox="0 0 560 620"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="pane-blue"
            x1="60"
            y1="120"
            x2="470"
            y2="580"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#92d5f1" stopOpacity=".65" />
            <stop offset=".44" stopColor="#386897" stopOpacity=".38" />
            <stop offset="1" stopColor="#091b35" stopOpacity=".12" />
          </linearGradient>
          <linearGradient
            id="pane-ice"
            x1="450"
            y1="0"
            x2="260"
            y2="590"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#d8faff" stopOpacity=".88" />
            <stop offset=".48" stopColor="#6bb4c7" stopOpacity=".45" />
            <stop offset="1" stopColor="#263d69" stopOpacity=".2" />
          </linearGradient>
          <linearGradient
            id="pane-violet"
            x1="120"
            y1="80"
            x2="490"
            y2="500"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#567caf" stopOpacity=".35" />
            <stop offset="1" stopColor="#aca2ed" stopOpacity=".5" />
          </linearGradient>
          <linearGradient
            id="window-edge"
            x1="100"
            y1="500"
            x2="440"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#76b7d4" stopOpacity=".1" />
            <stop offset=".65" stopColor="#99dbef" stopOpacity=".6" />
            <stop offset="1" stopColor="#d9f5ff" />
          </linearGradient>
          <radialGradient id="node-glow">
            <stop stopColor="#bdf7ed" stopOpacity=".3" />
            <stop offset="1" stopColor="#8dd6e1" stopOpacity="0" />
          </radialGradient>
          <clipPath id="glass-arch">
            <path d="M86 560V259C86 157 167 90 280 36c113 54 194 121 194 223v301Z" />
          </clipPath>
        </defs>
        <g
          className="landing-glass"
          clipPath="url(#glass-arch)"
          stroke="var(--hs-lead)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        >
          <path d="M86 36H280L177 190 86 259Z" fill="url(#pane-blue)" />
          <path d="M280 36 177 190 310 227 378 154Z" fill="url(#pane-ice)" />
          <path d="m280 36 98 118 96 105V36Z" fill="url(#pane-violet)" />
          <path d="m86 259 91-69 59 141-150 93Z" fill="url(#pane-violet)" />
          <path d="m177 190 133 37-74 104Z" fill="url(#pane-blue)" />
          <path d="m378 154-68 73 105 129 59-97Z" fill="url(#pane-ice)" />
          <path d="m310 227-74 104 61 82 118-57Z" fill="url(#pane-ice)" />
          <path d="m474 259-59 97 59 97Z" fill="url(#pane-violet)" />
          <path d="m86 424 150-93-25 163L86 560Z" fill="url(#pane-blue)" />
          <path d="m236 331 61 82-86 81Z" fill="url(#pane-violet)" />
          <path d="m297 413 118-57-24 161-180-23Z" fill="url(#pane-blue)" />
          <path d="m415 356 59 97v107l-83-43Z" fill="url(#pane-ice)" />
          <path d="m86 560 125-66 180 23 83 43Z" fill="url(#pane-violet)" />
        </g>
        <path
          d="M86 560V259C86 157 167 90 280 36c113 54 194 121 194 223v301"
          stroke="url(#window-edge)"
          strokeWidth="1.6"
        />
        <path
          d="M70 550V255C70 145 162 70 280 18c118 52 210 127 210 237v295"
          stroke="var(--hs-graph-edge)"
          strokeOpacity=".18"
        />
        <path
          d="M280 36v527M86 560h388"
          stroke="var(--hs-glass-ice)"
          strokeOpacity=".13"
        />
        <ellipse cx="286" cy="562" rx="212" ry="23" fill="url(#node-glow)" />
        <g
          className="landing-network"
          stroke="var(--hs-graph-edge)"
          strokeWidth="1.2"
        >
          <path d="m123 343 114-55 94 27 72-104M237 288l24-99 142 22M237 288l-12 143 125 39 77-95-96-60M123 343l36 99 66-11M261 189l-84-43M350 470l55 51M403 211l59-48" />
          <path
            d="m261 189 70 126 19 155M123 343l208-28M159 442l172-127"
            strokeDasharray="3 6"
            strokeOpacity=".65"
          />
        </g>
        <circle cx="237" cy="288" r="64" fill="url(#node-glow)" />
        <circle
          cx="237"
          cy="288"
          r="20"
          stroke="var(--hs-graph-ip)"
          strokeOpacity=".45"
        />
        {[
          [123, 343, 4],
          [261, 189, 5],
          [331, 315, 7],
          [403, 211, 5],
          [225, 431, 6],
          [350, 470, 4],
          [427, 375, 4],
          [159, 442, 3],
          [177, 146, 3],
          [405, 521, 3],
          [462, 163, 3],
        ].map(([cx, cy, r]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={r}
            fill="var(--hs-glass-ice)"
            stroke="var(--hs-canvas)"
            strokeWidth="2"
          />
        ))}
        <circle
          cx="237"
          cy="288"
          r="8"
          fill="var(--hs-graph-ip)"
          stroke="var(--hs-canvas)"
          strokeWidth="2"
        />
        <g
          className="landing-node-label"
          fill="var(--hs-text)"
          fontSize="11"
          fontFamily="var(--hydra-font-mono)"
        >
          <text x="254" y="285">
            example.com
          </text>
          <text x="272" y="177">
            TLS
          </text>
          <text x="345" y="311">
            api.example.com
          </text>
          <text x="82" y="365">
            DNS
          </text>
          <text x="240" y="449">
            HTTPS
          </text>
        </g>
      </svg>
      <div className="landing-scope-chip">
        <span className="landing-scope-symbol" aria-hidden="true">
          ◈
        </span>
        <div>
          <small>{t.artScope}</small>
          <strong>example.com</strong>
        </div>
        <span className="landing-check" aria-hidden="true">
          ✓
        </span>
      </div>
      <div className="landing-evidence-chip">
        <span />
        {t.artSignal}
      </div>
      <figcaption>{t.artCaption}</figcaption>
    </figure>
  );
}
export function CapabilityIcon({ index }: { index: number }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      {index === 0 ? (
        <>
          <circle cx="12" cy="12" r="7" />
          <path d="m17 17 7 7M12 8v8M8 12h8" />
        </>
      ) : index === 1 ? (
        <>
          <path d="m8 8 12 12M8 20 20 8M8 8h12v12H8Z" />
          <circle cx="8" cy="8" r="3" />
          <circle cx="20" cy="20" r="3" />
          <circle cx="8" cy="20" r="3" />
          <circle cx="20" cy="8" r="3" />
        </>
      ) : (
        <>
          <path d="M8 3h10l5 5v17H5V3h3Zm10 0v6h5M9 14h10M9 19h7" />
        </>
      )}
    </svg>
  );
}
