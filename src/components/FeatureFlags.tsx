import React from 'react'
interface FeatureFlagsProps {
    children: React.ReactNode,
    flag : boolean
}
const FeatureFlags = ({children, flag}: FeatureFlagsProps) => {
  return (
    <div>
      {flag && children}
    </div>
  )
}

export default FeatureFlags
