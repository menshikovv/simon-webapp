// Vercel API endpoint для работы с данными Саймона
// Файл должен быть размещен в папке /api в корне проекта

import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'simon-content.json')

// Создаем папку data если её нет
const dataDir = path.dirname(DATA_FILE)
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
}

// Функция для загрузки данных из файла
function loadData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8')
            return JSON.parse(data)
        }
    } catch (error) {
        console.error('Error loading data:', error)
    }
    
    // Дефолтные данные если файл не существует
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

// Функция для сохранения данных в файл
function saveData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
        return true
    } catch (error) {
        console.error('Error saving data:', error)
        return false
    }
}

export default function handler(req, res) {
    // Настройка CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method === 'GET') {
        // Возвращаем данные из файла
        const data = loadData()
        res.status(200).json(data)
    } else if (req.method === 'POST') {
        try {
            // Загружаем текущие данные
            const currentData = loadData()
            
            // Обновляем данные
            const updatedData = { ...currentData, ...req.body }
            
            // Сохраняем в файл
            const success = saveData(updatedData)
            
            if (success) {
                res.status(200).json({ success: true, message: 'Content updated successfully' })
            } else {
                res.status(500).json({ success: false, message: 'Error saving content' })
            }
        } catch (error) {
            console.error('Error updating content:', error)
            res.status(500).json({ success: false, message: 'Error updating content' })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
} 