import React from 'react';
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {Link} from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

interface ComponentPage {
    active: string;
}

function Navbar({active} : ComponentPage) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar position='static'
                sx={{boxShadow: 0,
                    bgcolor: 'transparent',
                    mt: '28px',
                }}
        >
            <Container maxWidth='xl'>
                <StyledToolbar>
                    <Typography variant="h6" sx={{color: '#5d8aa8'}}>
                        Легенды авиации
                    </Typography>

                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <Link to='/'>
                            <Button variant={active === '1' ? 'contained' : 'text'} color="info" size="medium">Главная</Button>
                        </Link>
                        <Link to='/list'>
                            <Button variant={active === '2' ? 'contained' : 'text'} color="info" size="medium">Список самолетов</Button>
                        </Link>
                        <Link to='/chart'>
                            <Button variant={active === '3' ? 'contained' : 'text'} color="info" size="medium">Диаграммы</Button>
                        </Link>
                        <Link to='/testing'>
                            <Button variant={active === '4' ? 'contained' : 'text'} color="info" size="medium">Проверь себя</Button>
                        </Link>
                    </Box>

                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>

                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end',}}>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>

                                <MenuList>
                                    <Link to='/'>
                                        <MenuItem sx={ active === '1' ? { bgcolor: 'info.main', '&:hover' : {bgcolor: 'info.dark'}} : {'&:hover' : {bgcolor: 'lightblue'}}}> Главная </MenuItem>
                                    </Link>
                                    <Link to='/list'>
                                        <MenuItem sx={ active === '2' ? { bgcolor: 'info.main', '&:hover' : {bgcolor: 'info.dark'}} : {'&:hover' : {bgcolor: 'lightblue'}}}>Список самолетов</MenuItem>
                                    </Link>
                                    <Link to='/chart'>
                                        <MenuItem sx={ active === '3' ? { bgcolor: 'info.main', '&:hover' : {bgcolor: 'info.dark'}} : {'&:hover' : {bgcolor: 'lightblue'}}}>Диаграммы</MenuItem>
                                    </Link>
                                    <Link to='/testing'>
                                        <MenuItem sx={ active === '4' ? { bgcolor: 'info.main', '&:hover' : {bgcolor: 'info.dark'}} : {'&:hover' : {bgcolor: 'lightblue'}}}>Проверь себя</MenuItem>
                                    </Link>
                                </MenuList>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;