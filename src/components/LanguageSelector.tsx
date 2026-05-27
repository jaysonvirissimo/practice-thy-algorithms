// JavaScript is the only runnable language in M1; Ruby arrives in M2.
export default function LanguageSelector() {
  return (
    <div className="lang-selector" role="group" aria-label="Language">
      <button className="lang-option active" aria-pressed="true">
        JavaScript
      </button>
      <button
        className="lang-option disabled"
        disabled
        title="Ruby support is coming soon"
      >
        Ruby (soon)
      </button>
    </div>
  );
}
