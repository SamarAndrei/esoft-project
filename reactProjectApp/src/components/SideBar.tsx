import { MouseEventHandler } from 'react';
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
import { useSearchParams } from 'react-router-dom';

const types = ['Верхняя одежда', 'Штаны', 'Обувь', 'Аксессуары'];

const SideBar = (props: {
    onClick: MouseEventHandler<HTMLDivElement> | undefined;
    open: any;
    onClose: any;
}) => {
    const [, setSearchParams] = useSearchParams();

    const handleClickMaleTypes = (text: string) => {
        const params = { gender: 'Мужское', type: text };
        setSearchParams(params);
    };

    const handleClickFemaleTypes = (text: string) => {
        const params = { gender: 'Женское', type: text };
        setSearchParams(params);
    };

    return (
        <Drawer open={props.open} onClose={props.onClose}>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={props.onClick}
            >
                <List>
                    <Typography sx={{ margin: 1 }}>Мужское</Typography>
                    {types.map(text => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => handleClickMaleTypes(text)}
                            >
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <Typography sx={{ margin: 1 }}>Женская одежда</Typography>
                    {types.map(text => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => handleClickFemaleTypes(text)}
                            >
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default SideBar;
