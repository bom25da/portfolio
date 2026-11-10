import { projects } from '../data/projects';
import { MotionTitle } from './MotionTitle';
import { ProjectCard } from './ProjectCard';
import type { ProjectId } from '../types/portfolio';

interface WorkProps { onOpen: (id: ProjectId) => void; }

export function Work({ onOpen }: WorkProps) {
  const count = String(projects.length).padStart(2, '0');
  const card = (id: ProjectId) => {
    const project = projects.find(item => item.id === id);
    return project ? <ProjectCard key={project.id} project={project} onOpen={onOpen} /> : null;
  };
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="section-marker mono"><span>(03 / SELECTED WORK)</span><span>A FEW THINGS I'VE BUILT</span><span>SC / 03</span></div>
      <div className="section-heading">
        <MotionTitle id="work-title" className="display-title" lines={[
          { content: 'SELECTED' },
          { className: 'indented', content: <>WORK<span className="small-count">({count})</span></> },
        ]} />
        <p>사용자 경험, 서비스 구조,<br />그리고 그 사이의 연결.</p>
      </div>
      {card('sync')}
      <div className="project-pair">{card('systems')}{card('cross-platform')}</div>
      <div className="project-pair">{card('offline')}{card('motionapp')}</div>
      {card('operations')}
      {card('madi')}
      <p className="visual-note mono">
        SYNC: OFFICIAL PRODUCT IMAGE / SYNC MOBILE: APP STORE SCREENS / MADI: APP SCREENSHOT.<br />
        <span>Sync는 DOF 공식 이미지, Sync Mobile은 공식 앱스토어 스크린샷, 마디는 실제 앱 캡처입니다. 나머지는 구현 경험을 재구성한 개념도입니다.</span>
      </p>
    </section>
  );
}
