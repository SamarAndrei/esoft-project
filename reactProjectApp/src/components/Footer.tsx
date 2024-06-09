import { Box, Container, Divider, Grid, IconButton, Link, Typography, styled } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React from 'react';

const GridContent = styled("div")(({ theme }) => ({
    position: "relative",
    marginBottom: theme.spacing(5)
}));


const Footer = () => {
    return (
        <main>
            <Divider sx={{marginTop: 4}}/>
            <Container fixed sx={{marginTop: 4}}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <GridContent>
                            <Typography variant="h6">О нас</Typography>
                            <Link href="#" underline="hover" color="inherit">
                                <Typography>
                                    Ссылка
                                </Typography>
                            </Link>
                        </GridContent>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GridContent>
                            <Typography variant="h6">Помощь</Typography>
                            <Link href="#" underline="hover" color="inherit">
                                <Typography>
                                    Ссылка
                                </Typography>
                            </Link>
                            <Link href="#" underline="hover" color="inherit">
                                <Typography>
                                    Ссылка
                                </Typography>
                            </Link>
                            <Link href="#" underline="hover" color="inherit">
                                <Typography>
                                    Ссылка
                                </Typography>
                            </Link>
                        </GridContent>
                    </Grid>
                    
                </Grid>
                <Box sx={{marginBottom: 1}}>
                    <Link href="https://web.telegram.org/" color="inherit">
                        <IconButton
                        size="large"
                        aria-label="telegram"
                        aria-haspopup="false"
                        color="inherit"
                        >
                            <TelegramIcon/>
                        </IconButton>
                    </Link>
                    <Link href="https://www.youtube.com/" color="inherit">
                        <IconButton
                        size="large"
                        aria-label="youtube"
                        aria-haspopup="false"
                        color="inherit"
                        >
                            <YouTubeIcon/>
                        </IconButton>
                    </Link>
                </Box>
            </Container>
        </main>
    );
};

export default Footer;