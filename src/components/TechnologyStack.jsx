import { technologyGroups } from '../data/technologies';

export function TechnologyStack() {
  return (
    <div className="capabilities" aria-label="기술 스택">
      <p className="mono row-label">MY TOOLBOX / THE RIGHT TOOL FOR THE PROBLEM</p>
      {technologyGroups.map(group => (
        <div className="capability-row" key={group.id}>
          <h3 className="mono" id={group.id}>{group.title}</h3>
          <ul className="stack-list" aria-labelledby={group.id}>
            {group.items.map(item => (
              <li key={item.name}>
                <span className="stack-icon-frame" aria-hidden="true">
                  <img className="stack-icon" src={item.icon} width="24" height="24" alt="" loading="lazy" />
                </span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
