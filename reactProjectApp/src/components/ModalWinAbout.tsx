import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

const ModalWinAbout = (props: {
    id: string | undefined;
    open: boolean;
    onClose:
        | ((event: object, reason: 'backdropClick' | 'escapeKeyDown') => void)
        | undefined;
    aria: string | undefined;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-label={props.aria}
        >
            <DialogTitle id={props.id}>О нас</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Добро пожаловать в ХасбикМегаМаркет магазин уникальных
                    находок и неповторимых впечатлений! Наш веб-магазин - это
                    оазис стиля и креатива, где каждый найдет что-то особенное
                    для себя. Погрузитесь в море вдохновения, перелистывая
                    страницы нашего сайта, где царит атмосфера уюта и удивления.
                    От модных трендов до редких эксклюзивов - мы собрали все
                    самое интересное и необычное на наших виртуальных полках.
                    Наши цены приятно удивят, а качество товаров порадует ваш
                    взор и душу. Доверьтесь нашему опыту и стильному вкусу - мы
                    знаем, как сделать вашу покупку поистине незабываемой!
                    Загляните к нам снова и снова - ведь каждый раз мы готовы
                    удивлять и вдохновлять вас новыми сокровищами!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.onClick}
                    variant="outlined"
                    color="primary"
                >
                    Ок
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalWinAbout;
