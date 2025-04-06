import { render, screen } from '@testing-library/react';
import Cursor from '../src/Cursor';
import React from 'react';

describe('Cursor', () => {
    it('applies the correct cursor style', () => {
        render(<Cursor />);
        expect(document.body.style.cursor).toBe('pointer');
    });

    it('resets cursor on unmount', () => {
        const { unmount } = render(<Cursor type="crosshair" />);
        unmount();
        expect(document.body.style.cursor).toBe('auto');
    });
});
