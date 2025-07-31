// Vercel API endpoint для работы с данными Саймона
// Файл должен быть размещен в папке /api в корне проекта

// Простое хранилище в памяти (в продакшене лучше использовать базу данных)
let simonContent = {
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
        // Возвращаем текущие данные
        res.status(200).json(simonContent)
    } else if (req.method === 'POST') {
        try {
            // Обновляем данные
            simonContent = { ...simonContent, ...req.body }
            res.status(200).json({ success: true, message: 'Content updated successfully' })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error updating content' })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
} 