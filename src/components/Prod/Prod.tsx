import s from './Prod.module.scss'
import { useTelegramWebApp } from '../../hooks/useTelegramWebApp'
import { Button } from '../Button/Button'
import { useState, useEffect } from 'react'

export const Prod = () => {
    useTelegramWebApp()
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
        <div className={s.prodContent}>
            {!hideTitle && (
                <div className={s.titleContainer}>
                    <div className={`${s.mainTitle} ${titleFadeOut ? s.fadeOut : ''}`}>ЧТО ТАКОЕ PROD?</div>
                    <div className={`${s.subtitle} ${titleFadeOut ? s.fadeOut : ''}`}>(это откроет тебе путь к миллионам)</div>
                </div>
            )}
            {showContent && (
                <div className={`${s.content} ${s.fadeIn}`}>
                    <div className={s.section}>
                        <h3>
                            ДЕНЬГИ, ПРОДАЖИ
                        </h3>
                        <p>Навыки, которые принесут тебе ОГРОМНЫЕ бабки, НЕОБХОДИМЫЕ В ЛЮБОЙ НИШЕ:</p>
                        <ul>
                            <li><strong>КАК НАЙТИ И СОЗДАТЬ ТО САМОЕ ДЕЛО/БИЗНЕС НА МИЛЛИОНЫ</strong></li>
                            <li><strong>КАК ПРОДАВАТЬ ЛЮБЫЕ ПРОДУКТЫ ЧАСТЬ 1</strong> — Создание и Подготовка</li>
                            <li><strong>КАК ПРОДАВАТЬ ЛЮБЫЕ ПРОДУКТЫ ЧАСТЬ 2</strong> — Прогрев, Приёмы, Секреты, Тонкости, Продажа</li>
                            <li><strong>ГАЙД НА ЛЁГКИЕ 20 000₽ ЗА НЕДЕЛЮ С ПОЛНОГО НУЛЯ</strong></li>
                            <li><strong>РАЗБОР МОЕГО ПРОГРЕВА НА 350к+ РУБ</strong></li>
                            <li><strong>КАК ВЫЙТИ В ВЫСШИЙ РЫНОК И СДЕЛАТЬ ДОХОД X5 МОМЕНТАЛЬНО</strong></li>
                            <li><strong>КАК ЗАЛЕТАТЬ В "ЛЁГКИЕ НИШИ"</strong> - КОПИРАЙТИНГ/ДИЗАЙН И ТД</li>
                            <li><strong>КАК БОРОТЬСЯ С КОНКУРЕНЦИЕЙ И ПОВТОРЕНИЕ ЧУЖОГО УСПЕХА</strong></li>
                            <li><strong>REALITY CHECK БОЛЬШИХ ДЕНЕГ</strong> (ОЧЕНЬ ВАЖНО)</li>
                            <li><strong>КАК ПРОДАВАТЬ СВОИ НАВЫКИ</strong></li>
                            <li><strong>КАК СДЕЛАТЬ ПРОДАЮЩЕЕ БИО И «О СЕБЕ»</strong></li>
                            <li><strong>ОТКУДА СЕЙЧАС ДЕЛАТЬ МИЛЛИОНЫ</strong></li>
                            <li><strong>ХОЧЕШЬ ВЫЙТИ НА НОВЫЙ УРОВЕНЬ, НО ЧТО ТО МЕШАЕТ</strong></li>
                            <li><strong>17ЛЕТНИЙ МИЛЛИОНЕР У СИМОНА НА КОНСУЛЬТАЦИИ</strong></li>
                        </ul>
                    </div>

                    <div className={s.section}>
                        <h3>
                            MINDSET, LIFESTYLE
                        </h3>
                        <p>Инфа которая моментально изменит жизнь сделает тебя непобедимым:</p>
                        <ul>
                            <li><strong>СИЛЬНЕЙШИЙ REALITY CHECK В ЖИЗНИ</strong></li>
                            <li><strong>КАК ВСЕГДА ТРАХАТЬ В СПОРАХ/КОНФЛИКТАХ/ДЕБАТАХ</strong></li>
                            <li><strong>МАЙНДСЕТ КОТОРЫЙ ПРОСТРОИЛ МНЕ ЖИЗНЬ МЕЧТЫ</strong></li>
                            <li><strong>ИЗ ЗА ЭТОГО ТЕБЯ БУДУТ СЛИВАТЬ ВСЕ ДЕВУШКИ</strong></li>
                            <li><strong>КАК УСПЕВАТЬ ВСЁ И ДОБИВАТЬСЯ РЕЗУЛЬТАТА В РАЗЫ БЫСТРЕЕ</strong></li>
                            <li><strong>ВЫГОРАНИЯ, КРИЗИСЫ, АПАТИЯ</strong></li>
                            <li><strong>ТОЛЬКО ЕДИНИЦЫ ДОЙДУТ ДО РЕЗУЛЬТАТА</strong></li>
                            <li><strong>ТЕБЕ НУЖНО ЭТО УСЛЫШАТЬ</strong></li>
                            <li><strong>КАК СДВИНУТСЯ С МЁРТВОЙ ТОЧКИ</strong></li>
                            <li><strong>КАК ПРОЙТИ ВЫГОРАНИЕ ЗА 1 ДЕНЬ</strong></li>
                            <li><strong>РАЗБОР ВАШИХ ЖИЗНЕЙ</strong> - ОТВЕТЫ НА 99% ТВОИХ ВОПРОСОВ</li>
                            <li><strong>ЭФИР ПРО ЗДОРОВЬЕ feat BIOFUCKER</strong></li>
                            <li><strong>УБИЙСТВО НЕУВЕРЕННОСТИ ЗА 6 МИНУТ</strong></li>
                            <li><strong>ТАБЛЕТКА ОТ НЕПОНИМАНИЯ ЧТО ДЕЛАТЬ, СТРЕССА И АПАТИИ</strong></li>
                            <li><strong>БАЗА ПО ОДЕЖДЕ</strong></li>
                            <li><strong>«У меня ещё много времени»</strong> - ВЕДЁТ ТЕБЯ В ЯМУ</li>
                            <li><strong>СЕКРЕТ МОЕГО УСПЕХА</strong></li>
                            <li><strong>КУЛЬТ ОБСУЖДЕНИЯ</strong></li>
                            <li><strong>ПОДКАСТ С БАДИ</strong></li>
                            <li><strong>ПОДКАСТ С КОЛЫВАНОВЫМ</strong></li>
                        </ul>
                    </div>
                    <Button href="https://t.me/prodreviews" style={{  marginBottom: '2.5rem' }}>
                        <p>РЕЗУЛЬТАТЫ УЧАСТНИКОВ</p>
                    </Button>
                    <div className={s.section}>
                        <h3>
                            МЕДИЙНОСТЬ, ПРОДВИЖЕНИЕ В СОЦСЕТЯХ, ЛИЧНЫЙ БРЕНД
                        </h3>
                        <ul>
                            <li><strong>КАК ЗАПУСТИТЬ ЮТУБ КАНАЛ ОТ "А ДО Я" ЗА 17 МИНУТ</strong></li>
                            <li><strong>ЛУЧШИЙ ГАЙД НА ТИКТОК В СНГ</strong></li>
                            <li><strong>ГАЙД НА ПРЕВЬЮ И НАЗВАНИЯ</strong></li>
                            <li><strong>ГАЙД НА АХ*ЕННЫЕ СЦЕНАРИИ</strong></li>
                            <li><strong>ГАЙД НА УДЕРЖАНИЕ И CTR</strong></li>
                            <li><strong>ЖИЗНЬ ЮТУБЕРА (feat Kolyvanov)</strong></li>
                            <li><strong>КАК ЗАЛИВАТЬ ТЕЛЕГУ С ЮТУБА И ДЕЛАТЬ БАБКИ</strong></li>
                            <li><strong>БОЛЬШОЙ ЭФИР ПРО ИНСТУ И РИЛСЫ</strong> - обязательно к прослушиванию</li>
                            <li><strong>ЭФИР С VOONLY ПРО АРБИТРАЖ</strong></li>
                            <li><strong>КАК СТРЕЛЯТЬ НА ЮТУБЕ В 2025</strong></li>
                            <li><strong>ГАЙД НА ЛИЧНЫЙ БРЕНД</strong></li>
                        </ul>
                    </div>

                    <div className={s.section}>
                        <h3>
                            МОНТАЖ
                        </h3>
                        <ul>
                            <li><strong>БАЗА МОНТАЖА (feat Tenkai)</strong></li>
                            <li><strong>ВСЁ ПРО МОНТАЖ, ОТВЕТЫ НА ВСЕ ВОПРОСЫ</strong></li>
                            <li><strong>ВИДЕОРЯД КАК У ВСЕХ ЮТУБЕРОВ ПО САМОРАЗВИТИЮ</strong></li>
                            <li><strong>МАТЕРИАЛЫ ДЛЯ МОНТАЖА</strong></li>
                            <li><strong>МОИ ФИШКИ ПО МОНТАЖУ</strong></li>
                            <li><strong>ВСЁ ПРО МОНТАЖ НА ЗАКАЗ</strong></li>
                            <li><strong>КАК МОНТИРОВАТЬ ДЛЯ ЮТУБА</strong></li>
                            <li><strong>ТВОЯ ГЛАВНАЯ ПРОБЛЕМА В МОНТАЖЕ (feat Krovo)</strong></li>
                            <li><strong>НАСМОТРЕННОСТЬ + КАК ВЫЙТИ НА ДОХОД С МОНТАЖА</strong></li>
                            <li><strong>ГАЙД НА 100к С МОНТАЖА</strong> - ПОЛНЫЙ ПЛАН</li>
                            <li><strong>КАК НАУЧИТСЯ МОНТИРОВАТЬ С НУЛЯ</strong></li>
                        </ul>
                    </div>

                    <div className={s.section}>
                        <h3>
                            ЭФИРЫ
                        </h3>
                        <ul>
                            <li><strong>ПРО 48 ЗАКОНОВ ВЛАСТИ, МЕДИЙКУ, ДЕНЬГИ, ПРОДАЖИ</strong></li>
                            <li><strong>ИНСАЙТЫ С КОНСУЛЬТАЦИИ ЗА 90к, ИНСТА И ТИКТОК, ГЛАВНЫЕ РЫЧАГИ ПОПУЛЯРНОСТИ, ПОЧЕМУ ТЫ НЕ МОЖЕШЬ ЕБАШИТЬ</strong></li>
                        </ul>
                    </div>

                    <div className={`${s.section} ${s.specialSection}`}>
                        <h3>
                            AWAKE ДОСТУПЕН В PROD
                        </h3>
                        <ul>
                            <li><strong>ЛИЧНАЯ СВЯЗЬ СО МНОЙ:</strong></li>
                            <li>• Сможешь написать мне по любому вопросу, я помогу, объясню и наставлю</li>
                            <li><strong>ДОСТУП В СООБЩЕСТВО МОЛОДЫХ ХАСЛЕРОВ:</strong></li>
                            <li>• Которые УЖЕ делают большие бабки</li>
                            <li>• Всегда помогут, подскажут, вправят мозги на место</li>
                        </ul>
                    </div>

                    <div className={`${s.section} ${s.specialSection}`}>
                        <h3>
                            РЕФЕРАЛЬНАЯ СИСТЕМА в PROD
                        </h3>
                        <p><strong>С каждого приведённого человека - 3500₽ тебе в карман</strong></p>
                        <ul>
                            <li>1. твой человек пишет мне, что он пришёл от тебя и покупает доступ</li>
                            <li>2. ты пишешь мне про него в лс и кидаешь свои реквизиты</li>
                            <li>3. я оплачиваю тебе твою работу</li>
                        </ul>
                        <p><strong>Уникальная возможность заработать бабки здесь и сейчас</strong></p>
                        <p><strong>Важнейшая отработка навыка продаж на практике</strong></p>
                    </div>
                    <Button href="https://t.me/m/JaELhQjZNGM6" style={{  marginBottom: '2.5rem' }}>
                        <p>ВСТУПИТЬ В PROD</p>
                    </Button>
                    <Button href="https://t.me/SIM0Nn" style={{  marginBottom: '2.5rem' }}>
                        <p>ЗАДАТЬ ВОПРОС</p>
                    </Button>
                </div>
            )}
        </div>
    )
} 