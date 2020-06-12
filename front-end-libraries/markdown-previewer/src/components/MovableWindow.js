import React, { useState } from 'react'
import { FaWindowMaximize, FaWindowMinimize } from 'react-icons/fa'

export const MovableWindow = (props) => {
  const [isWindowMaximized, setIsWindowMaximized] = useState(false)

  let parentContainer
  let isMouseDown = false
  let initialMouseX
  let initialMouseY

  const setContainer = (el) => parentContainer = el
  
  const setInitialMousePosition = (x, y) => {
    initialMouseX = x
    initialMouseY = y
  }

  const handleMouseUp = () => { 
    isMouseDown = false
    parentContainer.classList.remove('active')
  }

  const handleMouseDown = (e) => {
    isMouseDown = true
    setInitialMousePosition(e.clientX, e.clientY)
  }

  const moveWindow = (e) => {
    if(!isMouseDown) return

    const x = initialMouseX - e.clientX
    const y = initialMouseY - e.clientY

    parentContainer.style.left = (parentContainer.offsetLeft - x) + 'px'
    parentContainer.style.top = (parentContainer.offsetTop - y) + 'px'

    setInitialMousePosition(e.clientX, e.clientY)
  }

  const handleFocus = () => {
    parentContainer.classList.add('active')
  }

  const maximizeWindow = (e) => {
    setIsWindowMaximized(!isWindowMaximized)
    parentContainer.classList.toggle('maximize')

    if((parentContainer.offsetWidth + parentContainer.offsetLeft) > window.innerWidth) {
      parentContainer.style.left = window.innerWidth - parentContainer.offsetWidth + 'px'
    }

  }

  return (
    <div ref={setContainer} className="window" id={props.id} onMouseMove={moveWindow} onMouseLeave={handleMouseUp} onMouseEnter={handleFocus}>
      <header onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <h1 className="window-title">{props.title}</h1>
        <section className="window-actions">
          <button onClick={maximizeWindow}>
            {isWindowMaximized ? <FaWindowMinimize /> : <FaWindowMaximize />}
          </button>
        </section>
      </header>
      { props.children }
    </div>
  )
}