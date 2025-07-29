import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useTelegramBackButton = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.Telegram?.WebApp) return

    const webApp = window.Telegram.WebApp
    const backButton = webApp.BackButton

    // Показываем кнопку "Назад" только если мы не на главной странице
    if (location.pathname !== '/') {
      backButton.show()
      
      // Обработчик клика по кнопке "Назад"
      const handleBackClick = () => {
        navigate(-1)
      }
      
      backButton.onClick(handleBackClick)
      
      // Очистка при размонтировании
      return () => {
        backButton.offClick(handleBackClick)
        backButton.hide()
      }
    } else {
      // Скрываем кнопку "Назад" на главной странице
      backButton.hide()
    }
  }, [location.pathname, navigate])
} 