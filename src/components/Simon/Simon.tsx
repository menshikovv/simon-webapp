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

    // Функции для больших блоков
    const addBigBlock = () => {
        setEditableContent(prev => ({
            ...prev,
            bigBlocks: [...prev.bigBlocks, { title: 'Новый блок', content: 'Содержимое нового блока' }]
        }))
    }

    const removeBigBlock = (index: number) => {
        setEditableContent(prev => ({
            ...prev,
            bigBlocks: prev.bigBlocks.filter((_, i) => i !== index)
        }))
    }

    const updateBigBlock = (index: number, field: 'title' | 'content', value: string) => {
        setEditableContent(prev => ({
            ...prev,
            bigBlocks: prev.bigBlocks.map((block, i) => 
                i === index ? { ...block, [field]: value } : block
            )
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
                        <div className={s.editControls}>
                            {!isEditing ? (
                                <button 
                                    onClick={handleEdit}
                                    className={s.editButton}
                                >
                                    Редактировать
                                </button>
                            ) : (
                                <div className={s.buttonGroup}>
                                    <button 
                                        onClick={handleSave}
                                        className={s.saveButton}
                                    >
                                        Сохранить
                                    </button>
                                    <button 
                                        onClick={handleCancel}
                                        className={s.cancelButton}
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
                                        className={s.editInput}
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
                                        className={s.editInput}
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
                                    className={s.editTextarea}
                                />
                            ) : (
                                <p>{editableContent.description}</p>
                            )}
                            {isEditing ? (
                                <textarea
                                    value={editableContent.genius}
                                    onChange={(e) => updateContent('genius', e.target.value)}
                                    className={`${s.editTextarea} ${s.genius}`}
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
                                className={s.addButton}
                            >
                                + Добавить пункт
                            </button>
                        )}
                        <ul>
                            {isEditing ? (
                                editableContent.background.map((item, index) => (
                                    <li key={index} className={s.editing}>
                                        <textarea
                                            value={item}
                                            onChange={(e) => {
                                                const newBackground = [...editableContent.background]
                                                newBackground[index] = e.target.value
                                                updateContent('background', newBackground)
                                            }}
                                            className={s.editTextarea}
                                        />
                                        <button 
                                            onClick={() => removeBackgroundItem(index)}
                                            className={s.removeButton}
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
                                className={s.addButton}
                            >
                                + Добавить пункт
                            </button>
                        )}
                        <ul>
                            {isEditing ? (
                                editableContent.current.map((item, index) => (
                                    <li key={index} className={s.editing}>
                                        <textarea
                                            value={item}
                                            onChange={(e) => {
                                                const newCurrent = [...editableContent.current]
                                                newCurrent[index] = e.target.value
                                                updateContent('current', newCurrent)
                                            }}
                                            className={s.editTextarea}
                                        />
                                        <button 
                                            onClick={() => removeCurrentItem(index)}
                                            className={s.removeButton}
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

                    {/* Большие блоки */}
                    {editableContent.bigBlocks.map((block, index) => (
                        <div key={index} className={s.bigBlock}>
                            {isEditing && (
                                <button 
                                    onClick={() => removeBigBlock(index)}
                                    className={s.removeButton}
                                    style={{ position: 'absolute', right: '10px', top: '10px' }}
                                >
                                    ×
                                </button>
                            )}
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={block.title}
                                        onChange={(e) => updateBigBlock(index, 'title', e.target.value)}
                                        className={s.editInput}
                                        style={{ marginBottom: '15px', fontSize: '1.4rem', fontWeight: 'bold' }}
                                    />
                                    <div className={s.bigContent}>
                                        <textarea
                                            value={block.content}
                                            onChange={(e) => updateBigBlock(index, 'content', e.target.value)}
                                            className={s.editTextarea}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3>{block.title}</h3>
                                    <div className={s.bigContent}>
                                        <p>{block.content}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                    {isEditing && (
                        <div className={s.bigBlock}>
                            <button 
                                onClick={addBigBlock}
                                className={s.addButton}
                                style={{ fontSize: '14px', padding: '8px 16px' }}
                            >
                                + Добавить большой блок
                            </button>
                        </div>
                    )}
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