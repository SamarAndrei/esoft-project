import { Box, IconButton, Link } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Socials = () => {
    return (
        <Box sx={{ marginBottom: 1 }}>
            <Link href="https://web.telegram.org/" color="inherit">
                <IconButton
                    size="large"
                    aria-label="telegram"
                    aria-haspopup="false"
                    color="inherit"
                >
                    <TelegramIcon />
                </IconButton>
            </Link>
            <Link href="https://www.youtube.com/" color="inherit">
                <IconButton
                    size="large"
                    aria-label="youtube"
                    aria-haspopup="false"
                    color="inherit"
                >
                    <YouTubeIcon />
                </IconButton>
            </Link>
        </Box>
    );
};

export default Socials;
