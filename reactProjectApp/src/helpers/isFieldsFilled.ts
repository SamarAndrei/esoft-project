export const isFieldsFilled = (address: string, date: string) => {
    return address.trim() !== '' && date !== '';
};
