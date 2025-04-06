import React, { useEffect, useRef } from 'react';

interface CursorProps {
    type?: string;
    size?: number;
    imageUrl?: string;
    targetElement?: React.RefObject<HTMLElement> | string;
}

const isValidUrl = (url: string): boolean => {
    try {
        new URL(url, window.location.origin);
        return true;
    } catch (e) {
        console.warn('Invalid imageUrl provided:', url);
        return false;
    }
};

const Cursor: React.FC<CursorProps> = ({ type = 'default', size = 20, imageUrl, targetElement }) => {
    const defaultRef = useRef(document.body);
    const previousStyle = useRef<string>(''); // Armazena o estilo original do elemento

    useEffect(() => {
        let target: HTMLElement | null = null;

        // Determina o elemento alvos
        if (targetElement) {
            if (typeof targetElement === 'string') {
                target = document.querySelector(targetElement) as HTMLElement | null;
            } else if (targetElement.current) {
                target = targetElement.current;
            }
        } else {
            target = defaultRef.current; // Usa document.body como padrão
        }

        if (!target) {
            console.warn('Target element not found, skipping cursor application');
            return;
        }

        // Salva o estilo original do elemento antes de alterá-lo
        previousStyle.current = target.style.cursor || 'auto';

        let cursorStyle = type;
        if (type === 'custom' && imageUrl) {
            if (isValidUrl(imageUrl)) {
                const resolvedUrl = new URL(imageUrl, window.location.origin).href;
                cursorStyle = `url(${resolvedUrl}) ${size / 2} ${size / 2}, auto`;
            } else {
                console.warn('Falling back to default cursor due to invalid imageUrl');
                cursorStyle = 'auto';
            }
        }

        console.log('Applying cursor to:', target, 'Style:', cursorStyle);
        target.style.cursor = cursorStyle;

        // Cleanup: Restaura o estilo original do elemento
        return () => {
            target.style.cursor = previousStyle.current;
        };
    }, [type, size, imageUrl, targetElement]);

    return null;
};

export default Cursor;
