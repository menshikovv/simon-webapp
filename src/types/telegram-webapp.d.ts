declare global {
    interface Window {
        Telegram?: {
            WebApp: {
                ready(): void
                close(): void
                expand(): void
                isExpanded: boolean
                viewportHeight: number
                viewportStableHeight: number
                headerColor: string
                backgroundColor: string
                BackButton: {
                    isVisible: boolean
                    show(): void
                    hide(): void
                    onClick(callback: () => void): void
                    offClick(callback: () => void): void
                }
                MainButton: {
                    text: string
                    color: string
                    textColor: string
                    isVisible: boolean
                    isProgressVisible: boolean
                    isActive: boolean
                    show(): void
                    hide(): void
                    enable(): void
                    disable(): void
                    showProgress(leaveActive?: boolean): void
                    hideProgress(): void
                    onClick(callback: () => void): void
                    offClick(callback: () => void): void
                }
                HapticFeedback: {
                    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void
                    notificationOccurred(type: 'error' | 'success' | 'warning'): void
                    selectionChanged(): void
                }
                themeParams: {
                    bg_color?: string
                    text_color?: string
                    hint_color?: string
                    link_color?: string
                    button_color?: string
                    button_text_color?: string
                }
                colorScheme: 'light' | 'dark'
                themeParams: {
                    bg_color?: string
                    text_color?: string
                    hint_color?: string
                    link_color?: string
                    button_color?: string
                    button_text_color?: string
                }
            }
        }
    }
}

export {} 