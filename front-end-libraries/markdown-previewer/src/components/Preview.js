import React from 'react'
import marked from 'marked'
import { MovableWindow } from './MovableWindow'

export const Preview = (props) => (
    <MovableWindow id="preview-window" title="Previewer">
      <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.text)}}></div>
    </MovableWindow>
  )