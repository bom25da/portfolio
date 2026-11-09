import { useEffect, useRef } from 'react';
import { Asterisk } from './Asterisk';

const links = [['home', 'HOME'], ['work', 'WORK'], ['about', 'ABOUT'], ['contact', 'CONTACT']];

export function MenuDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} id="menu-dialog" className="menu-dialog" aria-label="사이트 메뉴" onClose={onClose} onCancel={onClose}>
      <div className="menu-inner">
        <div className="menu-top">
          <span className="wordmark">KYUNGWON<br />KWON<Asterisk className="brand-star" /></span>
          <button className="mono dialog-close" id="menu-close" aria-label="메뉴 닫기" onClick={onClose}>CLOSE ×</button>
        </div>
        <nav aria-label="주요 메뉴">
          {links.map(([id, label], index) => (
            <a href={'#' + id} key={id} onClick={onClose}>
              <span className="mono">{'0' + (index + 1)}</span>{label}<span>↗</span>
            </a>
          ))}
        </nav>
        <div className="menu-bottom mono"><span>BASED IN SEOUL, KR</span><a href="mailto:greenish9@naver.com">GREENISH9@NAVER.COM ↗</a></div>
      </div>
    </dialog>
  );
}
