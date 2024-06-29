import { Container, Typography } from '@mui/material';

const BlockDescription = () => {
    return (
        <Container maxWidth="xl">
            <Typography
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
            >
                ХасбикМегаМаркет
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
            >
                Добро пожаловать в наш магазин одежды, где каждая штука — это
                история стиля и комфорта. Мы предлагаем широкий выбор моделей,
                от классики до современных трендов, чтобы каждый клиент мог
                найти идеальное сочетание для своего стиля. Наша цель — не
                просто продать одежду, а помочь каждому человеку выразить свою
                уникальность через моду и создать неповторимый образ. Здесь вы
                найдете не только качественные материалы и стильные дизайны, но
                и внимательное обслуживание, которое поможет вам сделать
                правильный выбор. Добро пожаловать в мир стиля и элегантности!
            </Typography>
        </Container>
    );
};

export default BlockDescription;
