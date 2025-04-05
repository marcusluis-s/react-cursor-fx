import React, { useEffect } from "react"

interface CursorProps {
    type?: "default" | "pointer" | "crosshair" | "custom" | string;
    size?: number;
    imageUrl?: string;
}

const Cursor: React.FC<CursorProps> = ({ type = "default", size = 20, imageUrl }) => {
    useEffect(() => {
        let cursorStyle = type;
        if (type === 'custom' && imageUrl) {
            const resolvedUrl = new URL(imageUrl, window.location.origin).href;
            cursorStyle = `url(${resolvedUrl}) ${size / 2} ${size / 2}, auto`;
        }
        console.log('Cursor style:', cursorStyle);
        document.body.style.cursor = cursorStyle;

        return () => {
            document.body.style.cursor = "auto";
        };
    }, [type, size, imageUrl]);

    return null;
}

export default Cursor;
