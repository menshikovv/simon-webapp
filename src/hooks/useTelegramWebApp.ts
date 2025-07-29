import { useEffect } from 'react'

export const useTelegramWebApp = () => {
    useEffect(() => {
        // Проверяем, что мы в Telegram Web App
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp
            
            // Показываем кнопку "Назад"
            webApp.BackButton.show()
            
            // Обработчик для кнопки "Назад"
            const handleBackButton = () => {
                webApp.BackButton.hide()
                window.history.back()
            }
            
            webApp.BackButton.onClick(handleBackButton)
            
            // Скрываем кнопку при размонтировании компонента
            return () => {
                webApp.BackButton.offClick(handleBackButton)
                webApp.BackButton.hide()
            }
        }
    }, [])

    return window.Telegram?.WebApp || null
} 