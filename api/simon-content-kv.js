// Vercel API endpoint с использованием Vercel KV для надежного хранения данных
// Требует настройки Vercel KV в проекте

import { kv } from '@vercel/kv'

const DATA_KEY = 'simon-content'

// Дефолтные данные
const defaultData = {
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

export default async function handler(req, res) {
    try {
        // Настройка CORS
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }

        if (req.method === 'GET') {
            try {
                // Получаем данные из KV
                let data = await kv.get(DATA_KEY)
                
                // Если данных нет, используем дефолтные
                if (!data) {
                    data = defaultData
                    // Сохраняем дефолтные данные
                    await kv.set(DATA_KEY, data)
                }
                
                res.status(200).json(data)
            } catch (error) {
                console.error('Error getting data from KV:', error)
                // Fallback к дефолтным данным
                res.status(200).json(defaultData)
            }
        } else if (req.method === 'POST') {
            try {
                // Проверяем, что тело запроса существует
                if (!req.body) {
                    return res.status(400).json({ 
                        success: false, 
                        message: 'Request body is required' 
                    })
                }

                // Получаем текущие данные
                let currentData = await kv.get(DATA_KEY)
                if (!currentData) {
                    currentData = defaultData
                }
                
                // Обновляем данные
                const updatedData = { ...currentData, ...req.body }
                
                // Сохраняем в KV
                await kv.set(DATA_KEY, updatedData)
                
                res.status(200).json({ 
                    success: true, 
                    message: 'Content updated successfully',
                    data: updatedData
                })
            } catch (error) {
                console.error('Error updating content in KV:', error)
                res.status(500).json({ 
                    success: false, 
                    message: 'Error updating content',
                    error: error.message 
                })
            }
        } else {
            res.status(405).json({ 
                success: false,
                message: 'Method not allowed' 
            })
        }
    } catch (error) {
        console.error('Unexpected error in API:', error)
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message 
        })
    }
} 