// API функции для работы с данными Саймона

const API_BASE_URL = '/api' // Для Vercel используем относительный путь

// Можно переключить на KV endpoint для более надежного хранения
const USE_KV_ENDPOINT = false

export interface SimonContent {
    age: string
    income: string
    description: string
    genius: string
    background: string[]
    current: string[]
}

// Загрузка данных с сервера
export const loadSimonContent = async (): Promise<SimonContent> => {
    try {
        const response = await fetch(`${API_BASE_URL}/simon-content`)
        if (!response.ok) {
            throw new Error('Failed to load content')
        }
        return await response.json()
    } catch (error) {
        console.error('Error loading content:', error)
        // Возвращаем дефолтные данные при ошибке
        return {
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
    }
}

// Сохранение данных на сервер
export const saveSimonContent = async (content: SimonContent): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/simon-content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content)
        })
        
        if (!response.ok) {
            throw new Error('Failed to save content')
        }
        
        return true
    } catch (error) {
        console.error('Error saving content:', error)
        return false
    }
}

// Функции для работы с сервером (основные)
export const loadSimonContentServer = async (): Promise<SimonContent> => {
    try {
        const endpoint = USE_KV_ENDPOINT ? 'simon-content-kv' : 'simon-content'
        const response = await fetch(`${API_BASE_URL}/${endpoint}`)
        if (!response.ok) {
            throw new Error('Failed to load content from server')
        }
        return await response.json()
    } catch (error) {
        console.error('Error loading content from server:', error)
        // Fallback к localStorage
        return loadSimonContentLocal()
    }
}

export const saveSimonContentServer = async (content: SimonContent): Promise<boolean> => {
    try {
        const endpoint = USE_KV_ENDPOINT ? 'simon-content-kv' : 'simon-content'
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content)
        })
        
        if (!response.ok) {
            const errorText = await response.text()
            console.error('Server error:', response.status, errorText)
            throw new Error(`Failed to save content to server: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Save result:', result)
        
        // Также сохраняем локально как backup
        saveSimonContentLocal(content)
        return true
    } catch (error) {
        console.error('Error saving content to server:', error)
        // Fallback к localStorage
        const localSuccess = saveSimonContentLocal(content)
        console.log('Local backup save result:', localSuccess)
        return localSuccess
    }
}

// Функции для работы с localStorage (fallback)
export const loadSimonContentLocal = (): SimonContent => {
    const saved = localStorage.getItem('simonContent')
    if (saved) {
        try {
            return JSON.parse(saved)
        } catch (error) {
            console.error('Error parsing saved content:', error)
        }
    }
    
    // Дефолтные данные
    return {
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
}

export const saveSimonContentLocal = (content: SimonContent): boolean => {
    try {
        localStorage.setItem('simonContent', JSON.stringify(content))
        return true
    } catch (error) {
        console.error('Error saving content locally:', error)
        return false
    }
} 