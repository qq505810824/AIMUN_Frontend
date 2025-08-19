'use client';

import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { closeSidebar } from '../../../utils/utils';
import LogoutButton from '../common/Widget/buttons/LogoutButton';
import { useAppContext } from '@/context/app-context';
import Image from 'next/image';
import CircularProgress from '@mui/joy/CircularProgress';

function Toggler({
    defaultExpanded = false,
    renderToggle,
    children
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
    const [open, setOpen] = React.useState(defaultExpanded);
    return (
        <React.Fragment>
            {renderToggle({ open, setOpen })}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: open ? '1fr' : '0fr',
                    transition: '0.2s ease',
                    '& > *': {
                        overflow: 'hidden'
                    }
                }}
            >
                {children}
            </Box>
        </React.Fragment>
    );
}

export default function Sidebar() {
    const pathname = usePathname();
    const { userProfile } = useAppContext();
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none'
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10,
                height: '100vh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.surface'
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px'
                        }
                    }
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)'
                    }
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {userProfile?.school && !imageError ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            component="img"
                            src={userProfile.school.logo_small_url}
                            alt={userProfile.school.name}
                            onLoad={() => setIsImageLoading(false)}
                            onError={() => {
                                setImageError(true);
                                setIsImageLoading(false);
                            }}
                            sx={{
                                width: 32,
                                height: 32,
                                objectFit: 'contain',
                                borderRadius: '4px',
                                display: isImageLoading ? 'none' : 'block'
                            }}
                        />
                        {isImageLoading && (
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <CircularProgress size="sm" />
                            </Box>
                        )}
                        <Typography
                            level="title-md"
                            sx={{
                                fontWeight: 600,
                                color: 'primary.main'
                            }}
                        >
                            AI English
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <IconButton variant="soft" color="primary" size="sm">
                            <BrightnessAutoRoundedIcon />
                        </IconButton>
                        <Typography level="title-lg">AI English</Typography>
                    </>
                )}
            </Box>

            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5
                    }
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm
                    }}
                >
                    <ListItem>
                        <ListItemButton
                            selected={pathname == '/' || pathname == '/home'}
                            component="a"
                            href="/"
                        >
                            <HomeRoundedIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Home</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="body-xs">{userProfile?.nickname || ''}</Typography>
                    <Typography level="body-xs" sx={{ opacity: 0.7 }}>
                        {userProfile?.email || ''}
                    </Typography>
                </Box>
                <LogoutButton />
            </Box>
        </Sheet>
    );
}
