import { MotionTitle } from './MotionTitle';
import { SeoulTime } from './LocalTime';

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-topline mono"><span>SOFTWARE ENGINEER / TEAM LEAD</span><span>SEOUL, KR <span className="live-dot" aria-hidden="true"></span> <SeoulTime /></span></div>
      <MotionTitle as="h1" id="hero-title" className="hero-title" lines={[{ content: 'FULL-STACK' }, { className: 'hero-title-last', content: <>ENGINEER<span className="title-mark" aria-hidden="true">↗</span></> }]} />
      <div className="hero-middle">
        <div className="hero-index mono"><span>(01 — 05)</span><span>IDEAS INTO<br />WORKING SYSTEMS.</span></div>
        <figure className="hero-sculpture">
          <img src="/assets/knot-3d-balanced.png" width="520" height="520" alt="파비콘과 같은 정면 시점으로 세 고리가 균형 있게 이어지는 입체 매듭" fetchPriority="high" />
          <figcaption className="mono">CONNECTED BY DESIGN. <span>FIG. 001</span></figcaption>
        </figure>
        <div className="hero-intro">
          <p className="hero-name mono">HELLO, I'M KYUNGWON KWON.</p>
          <p className="hero-korean">화면부터 데이터까지,<br />하나의 서비스로 연결합니다.</p>
          <p className="hero-description">복잡한 업무를 명확한 흐름으로.<br />웹·앱과 서버의 경계를 넘나들며<br />실제로 작동하는 제품을 만듭니다.</p>
          <a className="text-link mono" href="#work">EXPLORE MY WORK <span aria-hidden="true">↘</span></a>
        </div>
      </div>
      <div className="hero-bottom mono"><a href="#about">12+ YEARS OF BUILDING <span aria-hidden="true">↗</span></a><span className="hero-bottom-center">SELECTED WORK / 2014—2026</span><a href="#contact">LET'S CONNECT <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
