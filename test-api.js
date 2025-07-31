// Тестовый скрипт для проверки API
const API_BASE_URL = 'http://localhost:5173/api'

async function testAPI() {
    console.log('🧪 Тестирование API...')
    
    try {
        // Тест 1: Получение данных
        console.log('\n1. Получение данных...')
        const getResponse = await fetch(`${API_BASE_URL}/simon-content`)
        const getData = await getResponse.json()
        console.log('✅ Данные получены:', getData)
        
        // Тест 2: Обновление данных
        console.log('\n2. Обновление данных...')
        const testData = {
            ...getData,
            age: '17',
            description: 'Тестовое обновление - ' + new Date().toLocaleString()
        }
        
        const postResponse = await fetch(`${API_BASE_URL}/simon-content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        })
        
        const postResult = await postResponse.json()
        console.log('✅ Данные обновлены:', postResult)
        
        // Тест 3: Проверка сохранения
        console.log('\n3. Проверка сохранения...')
        const getResponse2 = await fetch(`${API_BASE_URL}/simon-content`)
        const getData2 = await getResponse2.json()
        console.log('✅ Проверка сохранения:', getData2.age === '17' ? '✅ Успешно' : '❌ Не сохранилось')
        
    } catch (error) {
        console.error('❌ Ошибка тестирования:', error)
    }
}

// Запускаем тест через 3 секунды, чтобы сервер успел запуститься
setTimeout(testAPI, 3000) 