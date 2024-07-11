import { renderHook, act } from '@testing-library/react';
import { useAnyFieldsFilled } from '../hooks/useAnyFieldsFilled';

describe('useAnyFieldsFilled hook', () => {
    it('should return false when no fields are filled', () => {
        const { result, rerender } = renderHook(
            ({ email, password, name }) =>
                useAnyFieldsFilled(email, password, name),
            {
                initialProps: {
                    email: '',
                    password: '',
                    name: '',
                },
            },
        );

        expect(result.current).toBe(false);

        rerender({
            email: '',
            password: '',
            name: '',
        });

        expect(result.current).toBe(false);
    });

    it('should return true when any field is filled and valid', () => {
        const { result, rerender } = renderHook(
            ({ email, password, name }) =>
                useAnyFieldsFilled(email, password, name),
            {
                initialProps: {
                    email: '',
                    password: '',
                    name: '',
                },
            },
        );

        act(() => {
            rerender({
                email: 'test@example.com',
                password: 'validpassword',
                name: 'John',
            });
        });

        expect(result.current).toBe(true);

        act(() => {
            rerender({
                email: '',
                password: 'validpassword',
                name: '',
            });
        });

        expect(result.current).toBe(true);
    });

    it('should return false when any field is filled but invalid', () => {
        const { result, rerender } = renderHook(
            ({ email, password, name }) =>
                useAnyFieldsFilled(email, password, name),
            {
                initialProps: {
                    email: '',
                    password: '',
                    name: '',
                },
            },
        );

        act(() => {
            rerender({
                email: 'invalidemail',
                password: 'invalid',
                name: 'Name with space',
            });
        });

        expect(result.current).toBe(false);

        act(() => {
            rerender({
                email: '',
                password: 'short',
                name: '',
            });
        });

        expect(result.current).toBe(false);
    });
});
