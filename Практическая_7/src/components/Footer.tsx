import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";

function Footer() {
    return (
        <AppBar position='static'
                sx={{boxShadow: 0,
                    bgcolor: 'transparent',
                    m: '28px',
                }}
        >
            <Typography variant="h6" sx={{color: '#5d8aa8'}}>
                Павлова Диана
            </Typography>
            <Typography variant="h6" sx={{color: '#5d8aa8'}}>
                Б9123-09.03.04 (2пг)
            </Typography>
        </AppBar>
    );
}

export default Footer;