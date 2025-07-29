import s from './Socials.module.scss'
import { YouTubeIcon, TikTokIcon, InstagramIcon, TelegramIcon } from './SocialIcons'
import { useState, useEffect } from 'react'

export const Socials = () => {
    const [showContent, setShowContent] = useState(false)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    const socialLinks = [
        {
            name: 'YOUTUBE',
            url: 'https://www.youtube.com/@prodsimon.',
            icon: <YouTubeIcon />
        },
        {
            name: 'TIKTOK',
            url: 'https://vt.tiktok.com/ZS6QHy16k/',
            icon: <TikTokIcon />
        },
        {
            name: 'INSTAGRAM',
            url: 'https://www.instagram.com/simongelf?igsh=MXV6d2hqcXU0eDZkZg%3D%3D&utm_source=qr',
            icon: <InstagramIcon />
        },
        {
            name: 'TELEGRAM',
            url: 'https://t.me/SIM0Nn',
            icon: <TelegramIcon />
        }
    ]

    const handleSocialClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className={s.socials}>
            {showContent && (
                <div className={`${s.content} ${s.fadeIn}`}>
                    <h2>MY SOCIALS</h2>
                    <div className={s.socialLinks}>
                        {socialLinks.map((social, index) => (
                            <div 
                                key={index}
                                className={s.socialItem}
                                onClick={() => handleSocialClick(social.url)}
                            >
                                <span className={s.icon}>{social.icon}</span>
                                <span className={s.name}>{social.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}