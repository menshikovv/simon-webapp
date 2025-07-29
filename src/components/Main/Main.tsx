import s from './Main.module.scss'
import { Link } from 'react-router-dom'

export const Main = () => {
    return (
        <div className={s.mainContent}>
            <Link to="/simon" className={s.navLink}>
                <h2>КТО ТАКОЙ СИМОН</h2>
            </Link>
            <Link to="/prod" className={s.navLink}>
                <h2>PROD</h2>
            </Link>
            <Link to="/awake" className={s.navLink}>
                <h2>ФИЛЬМ AWAKE</h2>
            </Link>
            <Link to="/socials" className={s.navLink}>
                <h2>MY SOCIALS</h2>
            </Link>
        </div>
    )
}