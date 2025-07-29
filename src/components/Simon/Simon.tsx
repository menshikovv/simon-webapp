import s from './Simon.module.scss'
import { useTelegramWebApp } from '../../hooks/useTelegramWebApp'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'

export const Simon = () => {
    useTelegramWebApp()
    const navigate = useNavigate()
    const [showContent, setShowContent] = useState(false)
    const [hideTitle, setHideTitle] = useState(false)
    const [titleFadeOut, setTitleFadeOut] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleFadeOut(true)
            
            const contentTimer = setTimeout(() => {
                setShowContent(true)
                setHideTitle(true)
            }, 500)

            return () => clearTimeout(contentTimer)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    // Управление overflow через события
    useEffect(() => {
        const event = new CustomEvent('overflowChange', {
            detail: { hidden: !hideTitle }
        })
        window.dispatchEvent(event)

        return () => {
            const cleanupEvent = new CustomEvent('overflowChange', {
                detail: { hidden: false }
            })
            window.dispatchEvent(cleanupEvent)
        }
    }, [hideTitle])

    return (
        <div className={s.simonContent}>
            {!hideTitle && (
                <h2 className={titleFadeOut ? s.fadeOut : ''}>КТО ТАКОЙ СИМОН?</h2>
            )}
            {showContent && (
                <>
                <div className={`${s.content} ${s.fadeIn}`}>
                    <div className={s.mainInfo}>
                        <div className={s.stats}>
                            <div className={s.stat}>
                                <span className={s.number}>16</span>
                                <span className={s.label}>лет</span>
                            </div>
                            <div className={s.stat}>
                                <span className={s.number}>1 000 000₽</span>
                                <span className={s.label}>в месяц</span>
                            </div>
                        </div>
                        
                        <div className={s.description}>
                            <p>Делаю людей из любых сфер медийными и богатыми</p>
                            <p className={s.genius}>Гений продаж и маркетинга</p>
                        </div>
                    </div>

                    <div className={s.section}>
                        <h3>Бэкграунд</h3>
                        <ul>
                            <li>В 15 лет начал активно стрелять на ютубе</li>
                            <li>В 2024 делал монтаж на заказ и вышел на 150к+/мес</li>
                            <li>Поработал со всеми топами рынка, делая не сложные, но очень уникальные и виральные видосы</li>
                            <li>Заработал хорошие деньги с ютуба на рекламе</li>
                            <li>К концу 2024 полноценно продюсировал каналы, консультировал ютуберов и больших дядей, вышел на 200к+/мес</li>
                        </ul>
                    </div>

                    <div className={s.section}>
                        <h3>СЕЙЧАС</h3>
                        <ul>
                            <li><strong className={s.prodLink} onClick={() => navigate('/prod')}>PROD</strong> на 450+ участников</li>
                            <li>Продюсирую проекты, набирая аудиторию и продавая продукты/услуги на миллионы₽</li>
                            <li><strong>1 000 000₽/мес</strong></li>
                            <li>Живу один в дорогущей хате в центре Москвы</li>
                            <li>Ушёл после 9 класса, живу как хочу</li>
                        </ul>
                    </div>
                </div>

                <div className={s.buttonContainer}>
                    <Button href="https://t.me/SIM0Nn" style={{  marginBottom: '2.5rem' }}>
                        <p>КОНСУЛЬТАЦИЯ</p>
                    </Button>
                </div>
                </>
            )}
        </div>
    )
} 