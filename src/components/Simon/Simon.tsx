import s from './Simon.module.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../Button/Button'
import { tg, user } from '../../shared/lib/telegram'
import { loadSimonContentLocal, loadSimonContentServer, saveSimonContentServer } from '../../shared/lib/api'
import type { SimonContent } from '../../shared/lib/api'

export const Simon = () => {
    const navigate = useNavigate()
    const [showContent, setShowContent] = useState(false)
    const [hideTitle, setHideTitle] = useState(false)
    const [titleFadeOut, setTitleFadeOut] = useState(false)
    
    // Состояние для редактируемого контента
    const [editableContent, setEditableContent] = useState<SimonContent>(() => loadSimonContentLocal())
    const [isLoading, setIsLoading] = useState(true)
    
    const [isEditing, setIsEditing] = useState(false)
    
    // Проверка прав на редактирование
    const canEdit = user?.id === 748516935
    
    // Функции для редактирования
    const handleEdit = () => {
        setIsEditing(true)
    }
    
    const handleSave = async () => {
        setIsEditing(false)
        
        // Показываем индикатор загрузки
        if (tg?.showPopup) {
            tg.showPopup({
                title: 'Сохранение...',
                message: 'Изменения сохраняются для всех пользователей'
            })
        }
        
        // Сохраняем данные на сервер для всех пользователей
        const success = await saveSimonContentServer(editableContent)
        
        if (success) {
            // Показываем уведомление об успешном сохранении
            if (tg?.showAlert) {
                tg.showAlert('✅ Изменения сохранены для всех пользователей!')
            }
        } else {
            if (tg?.showAlert) {
                tg.showAlert('❌ Ошибка при сохранении изменений')
            }
        }
    }
    
    const handleCancel = () => {
        setIsEditing(false)
        // Восстанавливаем последние сохраненные данные
        setEditableContent(loadSimonContentLocal())
    }
    
    const updateContent = (field: string, value: string | string[]) => {
        setEditableContent(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // Функции для добавления и удаления блоков
    const addBackgroundItem = () => {
        setEditableContent(prev => ({
            ...prev,
            background: [...prev.background, 'Новый пункт']
        }))
    }

    const removeBackgroundItem = (index: number) => {
        setEditableContent(prev => ({
            ...prev,
            background: prev.background.filter((_, i) => i !== index)
        }))
    }

    const addCurrentItem = () => {
        setEditableContent(prev => ({
            ...prev,
            current: [...prev.current, 'Новый пункт']
        }))
    }

    const removeCurrentItem = (index: number) => {
        setEditableContent(prev => ({
            ...prev,
            current: prev.current.filter((_, i) => i !== index)
        }))
    }

    useEffect(() => {
        tg.BackButton.show()
        tg.BackButton.onClick(() => {
            navigate(-1)
            tg.BackButton.hide()
        })
        return () => {
            tg.BackButton.hide()
        }
    }, [])

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
    
    // Загружаем данные с сервера при монтировании
    useEffect(() => {
        const loadServerData = async () => {
            try {
                const serverData = await loadSimonContentServer()
                setEditableContent(serverData)
            } catch (error) {
                console.error('Failed to load server data:', error)
            } finally {
                setIsLoading(false)
            }
        }
        
        loadServerData()
    }, [])

    return (
        <div className={s.simonContent}>
            {!hideTitle && (
                <h2 className={titleFadeOut ? s.fadeOut : ''}>КТО ТАКОЙ СИМОН?</h2>
            )}
            {showContent && !isLoading && (
                <>
                <div className={`${s.content} ${s.fadeIn}`}>
                    {canEdit && (
                        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                            {!isEditing ? (
                                <button 
                                    onClick={handleEdit}
                                    style={{
                                        background: '#007AFF',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Редактировать
                                </button>
                            ) : (
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                    <button 
                                        onClick={handleSave}
                                        style={{
                                            background: '#34C759',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Сохранить
                                    </button>
                                    <button 
                                        onClick={handleCancel}
                                        style={{
                                            background: '#FF3B30',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Отмена
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div className={s.mainInfo}>
                        <div className={s.stats}>
                            <div className={s.stat}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editableContent.age}
                                        onChange={(e) => updateContent('age', e.target.value)}
                                        style={{
                                            border: '1px solid #007AFF',
                                            borderRadius: '4px',
                                            padding: '4px',
                                            fontSize: 'inherit',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                ) : (
                                    <span className={s.number}>{editableContent.age}</span>
                                )}
                                <span className={s.label}>лет</span>
                            </div>
                            <div className={s.stat}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editableContent.income}
                                        onChange={(e) => updateContent('income', e.target.value)}
                                        style={{
                                            border: '1px solid #007AFF',
                                            borderRadius: '4px',
                                            padding: '4px',
                                            fontSize: 'inherit',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                ) : (
                                    <span className={s.number}>{editableContent.income}</span>
                                )}
                                <span className={s.label}>в месяц</span>
                            </div>
                        </div>
                        
                        <div className={s.description}>
                            {isEditing ? (
                                <textarea
                                    value={editableContent.description}
                                    onChange={(e) => updateContent('description', e.target.value)}
                                    style={{
                                        border: '1px solid #007AFF',
                                        borderRadius: '4px',
                                        padding: '4px',
                                        fontSize: 'inherit',
                                        width: '100%',
                                        minHeight: '60px',
                                        resize: 'vertical'
                                    }}
                                />
                            ) : (
                                <p>{editableContent.description}</p>
                            )}
                            {isEditing ? (
                                <textarea
                                    value={editableContent.genius}
                                    onChange={(e) => updateContent('genius', e.target.value)}
                                    style={{
                                        border: '1px solid #007AFF',
                                        borderRadius: '4px',
                                        padding: '4px',
                                        fontSize: 'inherit',
                                        width: '100%',
                                        minHeight: '40px',
                                        resize: 'vertical',
                                        fontWeight: 'bold'
                                    }}
                                />
                            ) : (
                                <p className={s.genius}>{editableContent.genius}</p>
                            )}
                        </div>
                    </div>

                    <div className={s.section}>
                        <h3>Бэкграунд</h3>
                        {isEditing && (
                            <button 
                                onClick={addBackgroundItem}
                                style={{
                                    background: '#007AFF',
                                    color: 'white',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    marginBottom: '10px'
                                }}
                            >
                                + Добавить пункт
                            </button>
                        )}
                        <ul>
                            {isEditing ? (
                                editableContent.background.map((item, index) => (
                                    <li key={index} style={{ position: 'relative' }}>
                                        <textarea
                                            value={item}
                                            onChange={(e) => {
                                                const newBackground = [...editableContent.background]
                                                newBackground[index] = e.target.value
                                                updateContent('background', newBackground)
                                            }}
                                            style={{
                                                border: '1px solid #007AFF',
                                                borderRadius: '4px',
                                                padding: '4px',
                                                fontSize: 'inherit',
                                                width: '100%',
                                                minHeight: '40px',
                                                resize: 'vertical'
                                            }}
                                        />
                                        <button 
                                            onClick={() => removeBackgroundItem(index)}
                                            style={{
                                                position: 'absolute',
                                                right: '-30px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: '#FF3B30',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))
                            ) : (
                                editableContent.background.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className={s.section}>
                        <h3>СЕЙЧАС</h3>
                        {isEditing && (
                            <button 
                                onClick={addCurrentItem}
                                style={{
                                    background: '#007AFF',
                                    color: 'white',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    marginBottom: '10px'
                                }}
                            >
                                + Добавить пункт
                            </button>
                        )}
                        <ul>
                            {isEditing ? (
                                editableContent.current.map((item, index) => (
                                    <li key={index} style={{ position: 'relative' }}>
                                        <textarea
                                            value={item}
                                            onChange={(e) => {
                                                const newCurrent = [...editableContent.current]
                                                newCurrent[index] = e.target.value
                                                updateContent('current', newCurrent)
                                            }}
                                            style={{
                                                border: '1px solid #007AFF',
                                                borderRadius: '4px',
                                                padding: '4px',
                                                fontSize: 'inherit',
                                                width: '100%',
                                                minHeight: '40px',
                                                resize: 'vertical'
                                            }}
                                        />
                                        <button 
                                            onClick={() => removeCurrentItem(index)}
                                            style={{
                                                position: 'absolute',
                                                right: '-30px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: '#FF3B30',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))
                            ) : (
                                editableContent.current.map((item, index) => (
                                    <li key={index}>
                                        {item.includes('PROD') ? (
                                            <>
                                                <strong className={s.prodLink} onClick={() => navigate('/prod')}>PROD</strong> 
                                                {item.replace('PROD', '')}
                                            </>
                                        ) : (
                                            item
                                        )}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                <div className={s.buttonContainer}>
                    <Button href="https://t.me/SIM0Nn" style={{  marginBottom: '2.5rem' }}>
                        <p>КОНСУЛЬТАЦИЯ</p>
                    </Button>
                </div>
                </>
            )}
        </div>
    )
} 