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
                            <source src='https://storage.yandexcloud.net/files-talentio/trailer.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJENPFm4M3Rmxv3z76pChWe%2F20250729%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20250729T112110Z&X-Amz-Expires=2592000&X-Amz-Signature=5a577e5aff37a43912d24e532c89cb1d1362f5c508dfd117f1f562d1f7a643a4&X-Amz-SignedHeaders=host' type="video/mp4" />
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