import React from 'react';

/**
 * Reusable presentation Card wrapper.
 * Accepts semantic element override and minimal variants while keeping styling central.
 */
export default function Card({ as: Component = 'div', title, children, className = '', padding = 'pad-24', ...rest }) {
  return (
    <Component className={`card ${padding} ${className}`.trim()} {...rest}>
      {title ? <h3 className="card-title" data-card-title>{title}</h3> : null}
      {children}
    </Component>
  );
}
