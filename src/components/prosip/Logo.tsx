import logoAsset from "@/assets/prosip-logo.jpeg";

export function ProsipLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logo}
        alt="PrOsip logo"
        className="h-10 w-10 rounded-full object-cover ring-1 ring-yellow-500/40"
      />
      <span
        aria-label="PrOsip"
        className="inline-flex items-baseline text-white text-xl font-extrabold italic leading-none select-none"
        style={{
          fontFamily: 'var(--font-brand)',
          fontStretch: '125%',
          letterSpacing: '-0.04em',
        }}
      >
        <span>Pr</span>
        <span
          aria-hidden="true"
          className="relative mx-[0.06em] inline-block align-baseline"
          style={{
            width: '0.78em',
            height: '0.82em',
            transform: 'skewX(-10deg) translateY(0.02em)',
          }}
        >
          <span
            className="absolute inset-0"
            style={{
              borderRadius: '0.28em',
              background: 'linear-gradient(135deg, #fde047 0%, #eab308 50%, #a16207 100%)',
              boxShadow: '0 0 12px rgba(234,179,8,0.45)',
            }}
          />
          <span
            className="absolute"
            style={{
              inset: '22%',
              borderRadius: '0.18em',
              background: '#000',
            }}
          />
        </span>
        <span>sip</span>
      </span>
    </div>
  );
}
