import { renderHook } from '@testing-library/react';
import useValidateFields from '../hooks/useValidateFields';

describe('useValidateFields hook', () => {
    it('returns true when all fields are valid', () => {
        const { result } = renderHook(() =>
            useValidateFields('test@example.com', 'password123'),
        );
        expect(result.current).toBe(true);
    });

    it('returns false if email is invalid', () => {
        const { result, rerender } = renderHook(
            ({ email }) => useValidateFields(email, 'password123'),
            {
                initialProps: { email: 'invalid-email' },
            },
        );
        expect(result.current).toBe(false);

        rerender({ email: 'valid@example.com' });
        expect(result.current).toBe(true);
    });

    it('returns false if password is too short', () => {
        const { result, rerender } = renderHook(
            ({ password }) => useValidateFields('test@example.com', password),
            {
                initialProps: { password: 'short' },
            },
        );
        expect(result.current).toBe(false);

        rerender({ password: 'password123' });
        expect(result.current).toBe(true);
    });

    it('handles optional name field correctly', () => {
        const { result, rerender } = renderHook(
            ({ name }) =>
                useValidateFields('test@example.com', 'password123', name),
            {
                initialProps: { name: 'John' },
            },
        );
        expect(result.current).toBe(true);

        rerender({ name: '' });
        expect(result.current).toBe(true);
    });
});
