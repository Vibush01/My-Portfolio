import { useState, useEffect } from 'react'

export function useTypingEffect(phrases, typingSpeed = 100, deletingSpeed = 50, delayBetweenPhrases = 2000) {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  useEffect(() => {
    let timer

    const handleTyping = () => {
      const i = loopNum % phrases.length
      const fullText = phrases[i]

      setText(
        isDeleting 
          ? fullText.substring(0, text.length - 1) 
          : fullText.substring(0, text.length + 1)
      )

      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed

      if (!isDeleting && text === fullText) {
        typeSpeed = delayBetweenPhrases
        setIsDeleting(true)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        typeSpeed = 500 // Pause before typing next phrase
      }

      timer = setTimeout(handleTyping, typeSpeed)
    }

    timer = setTimeout(handleTyping, typingSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases])

  return text
}

export default useTypingEffect
