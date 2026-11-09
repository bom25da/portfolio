import { Fragment } from 'react';

export function MotionTitle({ as: Tag = 'h2', id, className, lines, href, children }) {
  const content = lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? ' ' : null}
      <span className={'motion-line' + (line.className ? ' ' + line.className : '')}>
        <span className="motion-line-inner">{line.content}</span>
      </span>
    </Fragment>
  ));

  return (
    <Tag id={id} className={className + ' motion-title'}>
      {href ? <a href={href}>{content}</a> : content}
      {children}
    </Tag>
  );
}
