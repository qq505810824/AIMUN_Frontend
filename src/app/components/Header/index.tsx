import MenuIcon from '@mui/icons-material/Menu';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';

import { toggleSidebar } from '../../../utils/utils';
import { useAppContext } from '@/context/app-context';
import { useEffect, useState } from 'react';

export default function Header() {
    const { userProfile } = useAppContext();
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    return (
        <Sheet
            sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'fixed',
                top: 0,
                width: '100vw',
                height: 'var(--Header-height)',
                zIndex: 9995,
                p: 2,
                gap: 1,
                borderBottom: '1px solid',
                borderColor: 'background.level1',
                boxShadow: 'sm',
                bgcolor: 'background.surface'
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Header-height': '52px',
                        [theme.breakpoints.up('md')]: {
                            '--Header-height': '0px'
                        }
                    }
                })}
            />
            <IconButton
                onClick={() => toggleSidebar()}
                variant="outlined"
                color="neutral"
                size="sm"
            >
                <MenuIcon />
            </IconButton>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}
            >
                {userProfile?.school && !imageError ? (
                    <>
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
                    </>
                ) : null}
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

            {/* 保持布局平衡的空白元素 */}
            <Box sx={{ width: 28 }} />
        </Sheet>
    );
}
