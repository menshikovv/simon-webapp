// API функции для работы с данными Саймона (только localStorage)

export interface SimonContent {
    age: string
    income: string
    description: string
    genius: string
    background: string[]
    current: string[]
}

// Дефолтные данные
const defaultData: SimonContent = {
    age: '16',
    income: '1 000 000₽',
    description: 'Делаю людей из любых сфер медийными и богатыми',
    genius: 'Гений продаж и маркетинга',
    background: [
        'В 15 лет начал активно стрелять на ютубе',
        'В 2024 делал монтаж на заказ и вышел на 150к+/мес',
        'Поработал со всеми топами рынка, делая не сложные, но очень уникальные и виральные видосы',
        'Заработал хорошие деньги с ютуба на рекламе',
        'К концу 2024 полноценно продюсировал каналы, консультировал ютуберов и больших дядей, вышел на 200к+/мес'
    ],
    current: [
        'PROD на 450+ участников',
        'Продюсирую проекты, набирая аудиторию и продавая продукты/услуги на миллионы₽',
        '1 000 000₽/мес',
        'Живу один в дорогущей хате в центре Москвы',
        'Ушёл после 9 класса, живу как хочу'
    ]
}

// Загрузка данных из localStorage
export const loadSimonContentLocal = (): SimonContent => {
    const saved = localStorage.getItem('simonContent')
    if (saved) {
        try {
            return JSON.parse(saved)
        } catch (error) {
            console.error('Error parsing saved content:', error)
        }
    }
    
    // Возвращаем дефолтные данные если ничего не сохранено
    return defaultData
}

// Сохранение данных в localStorage
export const saveSimonContentLocal = (content: SimonContent): boolean => {
    try {
        localStorage.setItem('simonContent', JSON.stringify(content))
        return true
    } catch (error) {
        console.error('Error saving content locally:', error)
        return false
    }
}

// Основные функции (используют localStorage)
export const loadSimonContentServer = async (): Promise<SimonContent> => {
    return loadSimonContentLocal()
}

export const saveSimonContentServer = async (content: SimonContent): Promise<boolean> => {
    return saveSimonContentLocal(content)
}

// Обратная совместимость
export const loadSimonContent = async (): Promise<SimonContent> => {
    return loadSimonContentLocal()
}

export const saveSimonContent = async (content: SimonContent): Promise<boolean> => {
    return saveSimonContentLocal(content)
} 