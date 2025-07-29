import s from './Button.module.scss'

export const Button = ({ 
    children, 
    style,
    href
}: { 
    children: React.ReactNode, 
    style?: string | React.CSSProperties,
    href?: string
}) => {
    const className = typeof style === 'string' ? `${s.button} ${style}` : s.button;
    const inlineStyle = typeof style === 'object' ? style : undefined;

    const handleClick = () => {
        if (href) {
            window.open(href, '_blank');
        }
    };

    return (
        <button 
            className={className}
            style={inlineStyle}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}