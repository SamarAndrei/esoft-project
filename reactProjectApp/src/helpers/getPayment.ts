export const getPayment = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 2000);
    });
};
