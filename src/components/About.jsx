import { MotionTitle } from './MotionTitle';
import { TechnologyStack } from './TechnologyStack';

export function About() {
  return (
    <section className="about-section dark-section" id="about" aria-labelledby="about-title">
      <div className="section-marker mono"><span>(04 / ABOUT ME)</span><span>THE PERSON BEHIND THE CODE</span><span>SC / 04</span></div>
      <div className="about-intro"><MotionTitle id="about-title" className="display-title" lines={[{ content: 'ALWAYS' }, { content: 'CONNECTING' }, { className: 'outline-text', content: 'THE DOTS.' }]} /><div className="about-copy"><span className="mono">권경원 / KYUNGWON KWON</span><p>업무를 이해하는 개발자에서,<br />제품 전체를 연결하는 엔지니어로.</p><div>2014년 ERP와 그룹웨어 개발로 시작해, 디지털 덴티스트리 플랫폼의 웹·모바일·데스크톱과 서버 개발로 경험을 넓혀 왔습니다.</div><div>현재 디오에프 웹팀을 이끌며, 복잡한 요구사항을 명확한 API 계약과 사용자 경험으로 바꾸고 있습니다. 기술의 이름보다 문제에 맞는 선택을, 구현만큼 검증과 운영을 중요하게 생각합니다.</div><a href="https://github.com/bom25da" target="_blank" rel="noopener noreferrer" className="text-link mono">FIND ME ON GITHUB <span aria-hidden="true">↗</span></a></div></div>
      <div className="experience">
        <p className="mono row-label">EXPERIENCE / A CONTINUOUS JOURNEY</p>
        <div className="experience-row"><span className="mono">2022.07 — PRESENT</span><h3>DOF<span>디오에프</span></h3><p>웹팀 책임연구원 · 팀장<span>의료 B2B 플랫폼 / Full-stack Development</span></p><span className="experience-arrow" aria-hidden="true">↗</span></div>
        <div className="experience-row"><span className="mono">2014.03 — 2022.07</span><h3>MUNHWA ILBO<span>문화일보</span></h3><p>개발팀<span>ERP · 그룹웨어 / Business Systems</span></p><span className="experience-arrow" aria-hidden="true">↗</span></div>
      </div>
      <TechnologyStack />
      <div className="about-footnote mono"><span>B.S. COMPUTER ENGINEERING / KOOKMIN UNIVERSITY</span><span>ENGINEER INFORMATION PROCESSING / 2013</span></div>
    </section>
  );
}
