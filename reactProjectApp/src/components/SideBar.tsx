import React, { MouseEventHandler } from 'react';
import {
    Box,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
} from '@mui/material';

const SideBar = (props: {
    onClick: MouseEventHandler<HTMLDivElement> | undefined;
    open: any;
    onClose: any;
}) => {
    return (
        <Drawer open={props.open} onClose={props.onClose}>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={props.onClick}
            >
                <List>
                    <Typography sx={{ margin: 1 }}>Мужское</Typography>
                    {['Верхняя одежда', 'Штаны', 'Обувь', 'Аксессуары'].map(
                        text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ),
                    )}
                </List>
                <Divider />
                <List>
                    <Typography sx={{ margin: 1 }}>Женская одежда</Typography>
                    {['Верхняя одежда', 'Штаны', 'Обувь', 'Аксессуары'].map(
                        text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ),
                    )}
                </List>
            </Box>
        </Drawer>
    );
};

export default SideBar;
