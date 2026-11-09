import { MotionTitle } from './MotionTitle';
import { Asterisk } from './Asterisk';

export function Statement() {
  return (
    <section className="statement dark-section" aria-labelledby="statement-title">
      <div className="section-marker mono"><span>(02 / APPROACH)</span><span>BEYOND THE INTERFACE</span><span>SC / 02</span></div>
      <MotionTitle id="statement-title" className="statement-title" lines={[{ content: 'THE WHOLE' }, { className: 'outline-text', content: 'PICTURE.' }]}><Asterisk className="statement-asterisk" /></MotionTitle>
      <div className="statement-bottom"><p className="statement-caption mono">GOOD SOFTWARE CONNECTS<br />WHAT PEOPLE SEE<br />WITH WHAT SYSTEMS DO.</p><div className="statement-copy"><p>좋은 서비스는<br />보이는 곳과 보이지 않는 곳이<br />함께 설계될 때 완성됩니다.</p><span>사용자의 한 번의 클릭이 데이터의 저장과 운영까지 이어지도록.<br />성공하는 흐름뿐 아니라 실패한 다음의 흐름도 고민합니다.</span></div></div>
    </section>
  );
}
