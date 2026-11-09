export function ProjectCard({ project, onOpen }) {
  const { card } = project;
  const open = () => onOpen(project.id);
  const images = card.screens.map(image => <img key={image.src} {...image} loading="lazy" />);

  return (
    <article className={'project ' + card.className + ' reveal'} id={card.id || undefined}>
      {card.sideProject && (
        <div className="side-project-heading">
          <span className="mono">SIDE PROJECT / MADE FOR THE MUSIC</span>
          <span className="mono">DESIGNED, BUILT &amp; MAINTAINED</span>
        </div>
      )}
      <button className="project-image" data-case={project.id} aria-label={card.buttonLabel} onClick={open}>
        {card.screens.length > 1 ? <span className="sync-mobile-preview">{images}</span> : images}
        <span className="project-visual-label mono">{card.visualLabel}</span>
        <span className="project-open" aria-hidden="true">↗</span>
      </button>
      <div className="project-meta">
        <div>
          <span className="project-number mono">{card.number}</span>
          <h3><button data-case={project.id} onClick={open}>{project.title} <span aria-hidden="true">↗</span></button></h3>
          <p>{card.description}</p>
        </div>
        <div className="project-tags mono">
          {card.tags.map(tag => <span key={tag}>{tag}</span>)}
          {card.link && (
            <a className="project-visit" href={card.link.url} target="_blank" rel="noopener noreferrer">
              {card.link.label} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
