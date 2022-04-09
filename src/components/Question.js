import React from 'react'
import escapeHtml from '../utils'
export default function Question(props) {
  let unescapedText = escapeHtml(props.question)
  return (
    <div>{`${unescapedText}`}</div>
  )
}
