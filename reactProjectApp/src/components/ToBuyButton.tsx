import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import React from 'react';
import { getPayment } from '../helpers/getPayment';
import {
    useDeleteCartItemMutation,
    useGetCartItemsQuery,
} from '../store/cartApi';
import Spinner from './Spinner';
import { isFieldsFilled } from '../helpers/isFieldsFilled';
import OrderService from '../service/orderService';
import { CardType } from './TCard';

const ToBuyButton = () => {
    const { data = [] } = useGetCartItemsQuery();
    const [deleteCartItem] = useDeleteCartItemMutation();

    const [openWinOrder, setOpenWinOrder] = React.useState(false);
    const [address, setAddress] = React.useState('');
    const [date, setDate] = React.useState('');

    const [isLoading, setIsLoading] = React.useState(false);
    const [errors, setErrors] = React.useState(false);

    const handleCloseDialogLoading = () => {
        setIsLoading(false);
    };

    const handleCloseDialogError = () => {
        setErrors(false);
    };

    const handleClickWinOrder = () => {
        setOpenWinOrder(true);
    };

    const handleCloseDialog = () => {
        setAddress('');
        setDate('');
        setOpenWinOrder(false);
    };

    const handleConfirmOrder = async () => {
        setIsLoading(true);
        await getPayment()
            .then(async () => {
                await OrderService.createOrder(data);
                data.map(
                    async (item: CardType) => await deleteCartItem(item.id),
                );
                setAddress('');
                setDate('');
                handleCloseDialog();
                setIsLoading(false);
            })
            .catch(res => {
                console.log(res);
                setIsLoading(false);
                setErrors(true);
            });
    };

    const fieldsFilled = isFieldsFilled(address, date);

    return (
        <>
            <Button
                disabled={data.length <= 0}
                size="large"
                color="secondary"
                variant="contained"
                onClick={handleClickWinOrder}
            >
                Перейти к оплате
            </Button>
            <Dialog open={errors} onClose={handleCloseDialogError}>
                <DialogContent>
                    <DialogContentText>
                        Ошибка. Заказ не оплачен. Отмена заказа
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog open={isLoading} onClose={handleCloseDialogLoading}>
                <DialogContent
                    sx={{
                        minHeight: 200,
                        minWidth: 160,
                        textAlign: 'center',
                    }}
                >
                    <Spinner />
                </DialogContent>
            </Dialog>
            <Dialog
                open={openWinOrder}
                onClose={handleCloseDialog}
                aria-labelledby="form-dialog-order"
            >
                <DialogTitle id="form-dialog-order">Оплата</DialogTitle>
                <DialogContent>
                    <DialogContentText>Введите адрес и дату</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Ваш адрес"
                        type="text"
                        fullWidth
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        type="date"
                        fullWidth
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Отмена
                    </Button>
                    <Button
                        disabled={!fieldsFilled}
                        onClick={handleConfirmOrder}
                        color="secondary"
                    >
                        Оплатить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ToBuyButton;
