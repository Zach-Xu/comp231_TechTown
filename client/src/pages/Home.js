import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import { Routes, Route } from 'react-router-dom'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import NavBar from '../components/miscellaneous/NavBar';
import Chat from '../pages/Chat'
import Questions from '../pages/Question/Questions'
import Question from '../pages/Question/Question'
import Auth from '../pages/Auth'
import Landing from '../pages/Landing'
import MyQuestions from '../pages/Question/MyQuestions'
import AddFriend from './friend/AddFriend';

import { GlobalState } from '../context/GlobalProvider'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, user }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: user ? `-${drawerWidth}px` : '0px',
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Home() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const { user } = GlobalState()

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ bgcolor: '#343a40', borderBottom: '1px solid #17a2b8' }}>
                <Toolbar>
                    <NavBar handleDrawerOpen={handleDrawerOpen} open={open} />
                </Toolbar>
            </AppBar>
            {
                user && <SideDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
            }
            <Main open={open} user={user}>
                <DrawerHeader />
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/questions' element={<Questions />} />
                    <Route path='/chat/:chatId' element={<Chat />} />
                    <Route path='/question' element={<Question />} />
                    <Route path='/myquestions' element={<MyQuestions />} />
                    <Route path='/addfriend' element={<AddFriend />} />
                    <Route path='*' element={<Auth />} />
                </Routes>
            </Main>
        </Box>
    );
}