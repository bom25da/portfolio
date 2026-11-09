import { useEffect, useRef } from 'react';
import { projects } from '../data/projects';

function ProjectVisual({ project }) {
  if (project.images) {
    return (
      <div className="case-mobile-gallery">
        {project.images.map(shot => <img key={shot.file} src={'/assets/' + shot.file} alt={shot.alt} width="392" height="696" />)}
      </div>
    );
  }
  const contain = project.url || project.imageFit === 'contain';
  return <img className={'case-image' + (contain ? ' case-image-app' : '')} src={'/assets/' + project.image} alt={project.imageAlt || project.title + ' 프로젝트 개념도'} />;
}

export function ProjectDialog({ activeIndex, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const project = activeIndex === null ? null : projects[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeIndex === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    closeRef.current.focus({ preventScroll: true });
  }, [activeIndex]);

  function closeOnBackdrop(event) {
    if (event.target !== dialogRef.current) return;
    const bounds = dialogRef.current.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }

  return (
    <dialog ref={dialogRef} id="case-dialog" className="case-dialog" aria-labelledby="case-title" onClose={onClose} onCancel={onClose} onClick={closeOnBackdrop}>
      <div className="case-topbar">
        <span className="mono" id="case-index">{project && 'PROJECT / ' + String(activeIndex + 1).padStart(2, '0') + ' — ' + String(projects.length).padStart(2, '0')}</span>
        <button ref={closeRef} className="mono dialog-close" id="case-close" aria-label="프로젝트 상세 닫기" onClick={onClose}>CLOSE ×</button>
      </div>
      <div id="case-content">
        {project && <>
          <header className="case-header">
            <p className="case-eyebrow mono">{project.category}</p>
            <h2 id="case-title">{project.title}</h2>
            <p className="case-subtitle">{project.subtitle}</p>
            {project.url && <a className="text-link mono case-visit" href={project.url} target="_blank" rel="noopener noreferrer">{project.urlLabel || 'VISIT MADI ↗'}</a>}
            <div className="case-facts">
              {[['PERIOD', project.period], ['MY ROLE', project.role], ['TECHNOLOGIES', project.stack]].map(([label, value]) => (
                <div key={label}><span className="mono">{label}</span><p>{value}</p></div>
              ))}
            </div>
          </header>
          <ProjectVisual project={project} />
          <p className="case-image-note">
            {project.imageNote || '프로젝트 내용을 재구성한 개념도 · 실제 제품 화면이 아닙니다.'}
            {project.imageSource && <> <a href={project.imageSource} target="_blank" rel="noopener noreferrer" className="image-source-link">{project.imageSourceLabel || 'DOF 공식 페이지 ↗'}</a></>}
          </p>
          {project.blocks.map(([label, heading, body]) => (
            <section className="case-block" key={label}>
              <h3><span className="mono">{label}</span>{heading}</h3><p>{body}</p>
            </section>
          ))}
          <p className="case-scope">{project.scope}</p>
        </>}
      </div>
      <div className="case-pagination">
        <button id="case-prev" className="mono" onClick={() => onNavigate(-1)}>← PREVIOUS</button>
        <span className="mono">SELECTED WORK</span>
        <button id="case-next" className="mono" onClick={() => onNavigate(1)}>NEXT PROJECT →</button>
      </div>
    </dialog>
  );
}
