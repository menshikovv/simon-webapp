import s from './Awake.module.scss'
import { useState, useEffect } from 'react'
import { Button } from '../Button/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { tg } from '../../shared/lib/telegram'

export const Awake = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [showNewText, setShowNewText] = useState(false)
    const [showVideoBlock, setShowVideoBlock] = useState(false)
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        tg.BackButton.show()
        tg.BackButton.onClick(() => {
            navigate(-1)
            tg.BackButton.hide()
        })
        return () => {
            tg.BackButton.hide()
        }
    }, [])

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setShowNewText(true)
        }, 4000)

        const timer2 = setTimeout(() => {
            setShowVideoBlock(true)
        }, 4000)

        const timer3 = setTimeout(() => {
            setShowButton(true)
        }, 10000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [])

    // Прокрутка наверх при загрузке страницы
    useEffect(() => {
        const mainElement = document.querySelector('main')
        if (mainElement) {
            mainElement.scrollTo(0, 0)
        }
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <div className={s.awakeContent}>
            {showVideoBlock && (
                <>
                    <div className={s.videoBlock}>
                        <h2>ПРОСНИСЬ.</h2>
                        <video 
                            className={s.trailerVideo}
                            autoPlay
                            muted
                            loop
                            controls={true}
                        >
                            <source src='https://pouch.jumpshare.com/preview/Ob5AiPWA2fMKzv1QJ4-zLt_z8egd0abQYFB_P1CVQR-OuS6WPDhEEpeRaF7ATZmw1BUGfu0n6VGn3HN23pW0L-RhzV_hbR0XxweVJJGt8zs8qvKxD3f3HIm_5Gi6BI-KxEs5AzQoPeimaRJAbAy1EG6yjbN-I2pg_cnoHs_AmgI.mp4' type="video/mp4" />
                        </video>
                        <p>AWAKE TRAILER</p>
                    </div>
                    {showButton && (
                        <div className={s.buttonContainer}>
                            <Button href="https://t.me/projectawakebot" style={{ marginBottom: '2rem' }}>
                                <p>Полная версия</p>
                            </Button>
                        </div>
                    )}
                </>
            )}
            {!showNewText ? (
                <h2 className={s.newText}>
                    СТАНЬ БОЛЬШЕ<br />
                    ЧЕМ НЕВОЗМОЖНОЕ
                </h2>
            ) : null}
        </div>
    )
} 