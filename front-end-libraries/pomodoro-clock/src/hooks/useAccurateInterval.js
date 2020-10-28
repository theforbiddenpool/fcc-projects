import { useState, useEffect, useRef } from 'react'

export const useAccurateInterval = (fn, interval = 1000) => {
  const [ isRunning, setIsRunning ] = useState(false)
  const savedCallback = useRef()
  const timeout = useRef()
  const expected = useRef()
  
  useEffect(() => {
    savedCallback.current = fn
  })

  useEffect(() => {
    function tick() {
      const drift = Date.now() - expected.current

      savedCallback.current()

      expected.current += interval
      timeout.current = setTimeout(tick, Math.max(0, interval-drift))
    }

    if(isRunning) {
      expected.current = Date.now() + interval

      timeout.current = setTimeout(tick, interval)
    }

    return () => clearTimeout(timeout.current)
  }, [isRunning, interval])

  return { 
    startInterval: () => setIsRunning(true),
    stopInterval: () => setIsRunning(false)
  }
}
