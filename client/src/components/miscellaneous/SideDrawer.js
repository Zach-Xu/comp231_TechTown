import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { ListItemButton, ListItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { GlobalState } from '../../context/GlobalProvider';
import { getFriend } from '../../utils/utlis'
import MyAvatar from './MyAvatar';

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
}));

export default function SideDrawer({ open, handleDrawerClose }) {

    const theme = useTheme();

    const handleClick = () => {

    };

    const [expandQ, setExpandQ] = useState(true)
    const expandQuestions = () => {
        setExpandQ(!expandQ)
    }

    const [expandF, setExpandF] = useState(false)
    const expandFriends = () => {
        setExpandF(!expandF)
    }

    const [expandG, setExpandG] = useState(false)

    const expandGroups = () => {
        setExpandF(!expandG)
    }

    const { user, friends } = GlobalState()

    const [groups, setGroups] = useState([])

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                        <ChevronLeftIcon />
                    ) : (
                        <ChevronRightIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <List
                sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {/* Profile */}
                <ListItemButton >
                    <ListItemIcon>
                        <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>

                {/* Questions */}
                <ListItemButton onClick={expandQuestions}>
                    <ListItemIcon>
                        <HelpOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Questions" />
                    {expandQ ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={expandQ} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <LiveHelpIcon />
                            </ListItemIcon>
                            <Link to='/question'>
                                <ListItemText primary="Ask Question" />
                            </Link>

                        </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <Link to='/myquestions'>
                                <ListItemText primary="My Questions" />
                            </Link>
                        </ListItemButton>
                    </List>
                </Collapse>


                {/* Friends */}
                <ListItemButton onClick={expandFriends}>
                    <ListItemIcon>
                        <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Friends" />
                    {expandF ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                {/* Friend List */}
                <Collapse in={expandF} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <Link to='/addfriend'> <ListItemText primary="Add a friend" /></Link>
                        </ListItemButton>
                        {
                            user && friends.length > 0 && friends.map(friend => (

                                <ListItemButton component={NavLink} to={`/chat/${friend._id}`} key={friend._id} sx={{ pl: 4 }} >
                                    <ListItemIcon>
                                        <MyAvatar username={getFriend(user, friend.users).username} width='30px' height='30px' />
                                    </ListItemIcon>
                                    <ListItemText primary={getFriend(user, friend.users).username} />
                                </ListItemButton>

                            ))
                        }

                    </List>
                </Collapse>

                {/* Group chats */}
                <ListItemButton onClick={expandGroups}>
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Groups" />
                    {expandF ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {/* Friend List */}
                <Collapse in={expandF} timeout="auto" unmountOnExit>

                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create a group" />
                        </ListItemButton>
                        {
                            groups.length > 0 && groups.map(friend => (
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary={groups.name} />
                                </ListItemButton>
                            ))
                        }

                    </List>
                </Collapse>

            </List>
        </Drawer>
    )
}
