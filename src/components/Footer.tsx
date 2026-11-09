import { Asterisk } from './Asterisk';
import { CopyrightYear } from './LocalTime';

export function Footer() {
  return (
    <footer className="site-footer"><a className="footer-name" href="#home">KYUNGWON KWON<Asterisk /></a><div className="footer-bottom mono"><span>© <CopyrightYear /> KYUNGWON KWON</span><span>CRAFTED WITH INTENTION.</span><a href="#home">BACK TO TOP ↑</a></div></footer>
  );
}
