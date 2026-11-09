import { useState } from 'react';
import { MotionTitle } from './MotionTitle';

export function Contact() {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('greenish9@naver.com');
      setCopyStatus('이메일 주소를 복사했습니다.');
    } catch {
      setCopyStatus('greenish9@naver.com — 주소를 선택해 복사하거나 이메일 링크를 눌러 주세요.');
    }
  }

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-marker mono"><span>(05 / GET IN TOUCH)</span><span>IT STARTS WITH A CONVERSATION</span><span>SC / 05</span></div>
      <p className="contact-prelude">함께 풀어볼 문제가 있다면.</p>
      <MotionTitle id="contact-title" className="contact-title" href="mailto:greenish9@naver.com" lines={[{ content: "LET'S" }, { content: <>TALK<span className="contact-arrow" aria-hidden="true">↗</span></> }]} />
      <div className="contact-bottom"><div><span className="mono">DROP ME A LINE</span><a className="email-link" href="mailto:greenish9@naver.com">greenish9@naver.com</a></div><button className="copy-email mono" id="copy-email" aria-label="이메일 주소 복사" onClick={copyEmail}>COPY EMAIL <span aria-hidden="true">⧉</span></button><a className="github-link mono" href="https://github.com/bom25da" target="_blank" rel="noopener noreferrer">GITHUB <span aria-hidden="true">↗</span></a></div>
      <p className="copy-status mono" id="copy-status" aria-live="polite">{copyStatus}</p>
    </section>
  );
}
