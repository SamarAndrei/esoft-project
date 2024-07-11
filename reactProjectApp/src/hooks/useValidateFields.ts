import { useEffect, useState } from 'react';
import validator from 'validator';

const useValidateFields = (email: string, password: string, name?: string) => {
    const [fieldsIsFilled, setFieldsIsFilled] = useState(false);

    useEffect(() => {
        const isValidEmail = validator.isEmail(email);
        const isPasswordValid = password.length >= 8 && !password.includes(' ');

        if (name) {
            setFieldsIsFilled(name && email && isValidEmail && isPasswordValid);
        } else {
            setFieldsIsFilled(email && isValidEmail && isPasswordValid);
        }
    }, [email, password, name]);
    return fieldsIsFilled;
};

export default useValidateFields;
