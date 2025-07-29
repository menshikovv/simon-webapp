import './App.scss'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Loading } from './components/Loading/Loading'
import { Layout } from './components/Layout/Layout'
import { Main } from './components/Main/Main'
import { Simon } from './components/Simon/Simon'
import { Prod } from './components/Prod/Prod'
import { Awake } from './components/Awake/Awake'
import { Socials } from './components/Socials/Socials'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Инициализация Telegram Web App
    if (window.Telegram?.WebApp) {
      const webApp = window.Telegram.WebApp
      webApp.ready()
      
      // Настройка темы
      document.documentElement.style.setProperty('--tg-theme-bg-color', webApp.themeParams.bg_color || '#ffffff')
      document.documentElement.style.setProperty('--tg-theme-text-color', webApp.themeParams.text_color || '#000000')
      
      // Инициализация кнопки "Назад"
      const backButton = webApp.BackButton
      backButton.hide() // Скрываем кнопку при загрузке приложения
    }

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/simon" element={<Simon />} />
          <Route path="/prod" element={<Prod />} />
          <Route path="/awake" element={<Awake />} />
          <Route path="/socials" element={<Socials />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App