import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useScrollToTop } from '../../hooks/useScrollToTop'
import s from './Layout.module.scss'

export const Layout = () => {
    const navigate = useNavigate()
    const [displayText, setDisplayText] = useState('')
    const fullText = 'ВЫБОР ЗА ТОБОЙ'
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    const [isOverflowHidden, setIsOverflowHidden] = useState(false)
    
    useScrollToTop()

    useEffect(() => {
        if (isTypingComplete) return

        const typingSpeed = 200

        const timer = setTimeout(() => {
            if (currentIndex < fullText.length) {
                setDisplayText(fullText.slice(0, currentIndex + 1))
                setCurrentIndex(currentIndex + 1)
            } else {
                setIsTypingComplete(true)
            }
        }, typingSpeed)

        return () => clearTimeout(timer)
    }, [currentIndex, isTypingComplete, fullText])

    useEffect(() => {
        const handleOverflowChange = (event: CustomEvent) => {
            setIsOverflowHidden(event.detail.hidden)
        }

        window.addEventListener('overflowChange', handleOverflowChange as EventListener)
        
        return () => {
            window.removeEventListener('overflowChange', handleOverflowChange as EventListener)
        }
    }, [])

    const handleTitleClick = () => {
        navigate('/')
    }

    return (
        <div className={s.layout}>
            <header className={s.header}>
                <h1 
                    className={s.title}
                    onClick={handleTitleClick}
                    style={{ cursor: 'pointer' }}
                >
                    {displayText}
                    {!isTypingComplete && <span className={s.cursor}>|</span>}
                </h1>
            </header>
            <main 
                className={s.main}
                style={{ overflow: isOverflowHidden ? 'hidden' : 'auto' }}
            >
                <Outlet />
            </main>
            <footer className={s.footer}>
                <a 
                    href="https://t.me/menshikovv1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={s.footerLink}
                >
                    THIS IS TEST MODE
                </a>
            </footer>
        </div>
    )
} 