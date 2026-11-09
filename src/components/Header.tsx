import { Asterisk } from './Asterisk';

interface HeaderProps { onMenuOpen: () => void; }

export function Header({ onMenuOpen }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="권경원 포트폴리오 처음으로">
        KYUNGWON<br />KWON<Asterisk className="brand-star" />
      </a>
      <span className="header-center mono">INDEPENDENT MIND. CONNECTED SYSTEMS.</span>
      <button className="menu-toggle mono" id="menu-open" aria-haspopup="dialog" aria-controls="menu-dialog" onClick={onMenuOpen}>
        MENU <span aria-hidden="true">+</span>
      </button>
    </header>
  );
}
