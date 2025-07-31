# Настройка Vercel для работы с API

## Проблема
При деплое на Vercel API endpoint возвращает ошибку 500. Это происходит потому, что Vercel не поддерживает файловую систему для записи в продакшене.

## Решения

### Решение 1: Использование памяти (текущее)
- ✅ Работает сразу без дополнительной настройки
- ❌ Данные сбрасываются при перезапуске сервера
- ❌ Не подходит для продакшена с множественными пользователями

### Решение 2: Vercel KV (рекомендуется для продакшена)

#### Шаг 1: Установка Vercel CLI
```bash
npm i -g vercel
```

#### Шаг 2: Логин в Vercel
```bash
vercel login
```

#### Шаг 3: Создание KV базы данных
```bash
vercel kv create
```

#### Шаг 4: Получение переменных окружения
После создания KV, Vercel покажет переменные окружения. Добавьте их в файл `.env.local`:

```env
KV_URL=your_kv_url
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_kv_read_only_token
```

#### Шаг 5: Переключение на KV endpoint
В файле `src/shared/lib/api.ts` измените:

```typescript
const USE_KV_ENDPOINT = true
```

#### Шаг 6: Деплой
```bash
vercel --prod
```

### Решение 3: Supabase (альтернатива)

Если не хотите использовать Vercel KV, можно настроить Supabase:

1. Создайте проект на [supabase.com](https://supabase.com)
2. Создайте таблицу `simon_content` с полями:
   - `id` (int, primary key)
   - `data` (jsonb)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

3. Создайте API endpoint для работы с Supabase

## Текущее состояние
- ✅ API работает в памяти
- ✅ Данные сохраняются между запросами в рамках одной сессии
- ❌ Данные сбрасываются при перезапуске сервера

## Рекомендации
1. Для разработки: используйте текущее решение
2. Для продакшена: настройте Vercel KV или Supabase
3. Для тестирования: используйте localStorage как fallback 