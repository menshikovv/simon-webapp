import s from './Awake.module.scss'
import { useTelegramWebApp } from '../../hooks/useTelegramWebApp'
import { useState, useEffect } from 'react'
import trailerVideo from '../../assets/trailer.mp4'
import { Button } from '../Button/Button'

export const Awake = () => {
    useTelegramWebApp()
    const [showNewText, setShowNewText] = useState(false)
    const [showVideoBlock, setShowVideoBlock] = useState(false)
    const [showButton, setShowButton] = useState(false)

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
                            <source src={trailerVideo} type="video/mp4" />
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