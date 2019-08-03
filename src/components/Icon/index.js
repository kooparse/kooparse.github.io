import React from 'react'

const Icon = ({ icon, size }) => {
  return <span className={`icon icon-${icon}`} style={{ fontSize: size }} />
}

export default Icon
