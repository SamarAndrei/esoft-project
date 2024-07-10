import { useEffect, useState } from 'react';
import validator from 'validator';

export const useAnyFieldsFilled = (
    email: string,
    password: string,
    name: string,
) => {
    const [fieldsIsFilled, setFieldsIsFilled] = useState(false);

    useEffect(() => {
        let isEmailValid = true;
        let isPasswordValid = true;
        let isNameValid = true;

        if (email.trim() !== '') {
            isEmailValid = validator.isEmail(email);
        }

        if (password.trim() !== '') {
            isPasswordValid = password.length >= 8 && !password.includes(' ');
        }

        if (name.trim() !== '') {
            isNameValid = !name.includes(' ');
        }

        if (
            (email.trim() !== '' && !isEmailValid) ||
            (password.trim() !== '' && !isPasswordValid) ||
            (name.trim() !== '' && !isNameValid)
        ) {
            setFieldsIsFilled(false);
        } else {
            setFieldsIsFilled(
                email.trim() !== '' ||
                    password.trim() !== '' ||
                    name.trim() !== '',
            );
        }
    }, [email, password, name]);

    return fieldsIsFilled;
};
