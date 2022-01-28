import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function LastSeen({ date, classnames }) {
  return (
    <div className={classnames}>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="twitter"/>
    </div>
  )
}