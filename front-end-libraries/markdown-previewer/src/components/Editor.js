import React from 'react'
import { MovableWindow } from './MovableWindow'

export const Editor = (props) => (
    <MovableWindow id="editor-window" title="Editor">
      <textarea autoFocus value={props.text} onChange={(e) => props.handleChange(e.target.value)} id="editor"></textarea>
    </MovableWindow>
  )