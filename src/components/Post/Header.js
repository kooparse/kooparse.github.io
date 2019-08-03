import React from 'react'

export default ({ date, title, size = 26 }) => (
  <div className="posts__header">
    <h3 className="posts__title" style={{ fontSize: size }}>
      {title}
    </h3>
    {!!date && <div className="posts__date">{date}</div>}
  </div>
)
