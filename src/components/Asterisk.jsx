export function Asterisk({ className }) {
  return (
    <span className={className} aria-hidden="true">
      <svg className="asterisk-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path d="M32 4v56M4 32h56M12.2 12.2l39.6 39.6m0-39.6L12.2 51.8" />
      </svg>
    </span>
  );
}
