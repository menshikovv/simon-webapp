import s from './Loading.module.scss'
import awake from '../../assets/awake.jpg'

export const Loading = () => {
    return (
        <div className={s.container}>
            <img src={awake} alt="awake" className={s.image} />
        </div>
    )
}