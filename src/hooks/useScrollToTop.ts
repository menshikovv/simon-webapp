import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Небольшая задержка для гарантии загрузки компонента
    const timer = setTimeout(() => {
      // Прокручиваем main элемент наверх
      const mainElement = document.querySelector('main')
      if (mainElement) {
        mainElement.scrollTo(0, 0)
      }
      // Также прокручиваем window на всякий случай
      window.scrollTo(0, 0)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])
} 