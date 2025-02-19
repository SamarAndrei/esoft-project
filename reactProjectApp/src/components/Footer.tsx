import {
    Container,
    Divider,
    Grid,
    Link,
    Typography,
    styled,
} from '@mui/material';
import Socials from './Socials';
import React from 'react';
const GridContent = styled('div')(({ theme }) => ({
    position: 'relative',
    marginBottom: theme.spacing(5),
}));

const linksAbout = [
    { path: '#', name: 'Ссылка' },
    { path: '#', name: 'Ссылка' },
];
const linksHelp = [
    { path: '#', name: 'Ссылка' },
    { path: '#', name: 'Ссылка' },
    { path: '#', name: 'Ссылка' },
];

const Footer = React.memo(() => {
    return (
        <footer>
            <Divider sx={{ marginTop: 4 }} />
            <Container fixed sx={{ marginTop: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <GridContent>
                            <Typography variant="h6">О нас</Typography>
                            {linksAbout.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.path}
                                    underline="hover"
                                    color="inherit"
                                >
                                    <Typography>{link.name}</Typography>
                                </Link>
                            ))}
                        </GridContent>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <GridContent>
                            <Typography variant="h6">Помощь</Typography>
                            {linksHelp.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.path}
                                    underline="hover"
                                    color="inherit"
                                >
                                    <Typography>{link.name}</Typography>
                                </Link>
                            ))}
                        </GridContent>
                    </Grid>
                </Grid>
                <Socials />
            </Container>
        </footer>
    );
});

export default Footer;
