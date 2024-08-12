'use client';
import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: inter.style.fontFamily,
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '19px',
            textTransform: 'none',
            color: '#425466',
            margin: '8px 0px',
            '@media (max-width:899px)': {
                fontSize: '14px',
            }
        },
        body2: {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '17px',
            textTransform: 'none',
            color: '#425466',
            margin: '8px 0px',
            '@media (max-width:899px)': {
                fontSize: '12px',
            }
        },
        h1: {
            fontSize: '4rem',
            fontWeight: 700,
            lineHeight: '4.8rem',
            '@media (max-width:1200px)': {
                fontSize: '3rem',
                lineHeight: '3.5rem',
            },
            '@media (max-width:899px)': {
                fontSize: '2.5rem',
                lineHeight: '3rem',
            },
            '@media (max-width:599px)': {
                fontSize: '2rem',
                lineHeight: '2.6rem',
            },

        },
        h2: {
            fontSize: '3.5rem',
            fontWeight: 600,
            lineHeight: '4.23rem',
            color: '#0A2540',
            '@media (max-width:1200px)': {
                fontSize: '3rem',
                lineHeight: '3.2rem',
            },
            '@media (max-width:899px)': {
                fontSize: '2.5rem',
                lineHeight: '3.2rem',
            }

        },
        h3: {
            fontSize: '2.25rem',
            fontWeight: 600,
            lineHeight: '2.6rem',
            color: '#0A2540',
            '@media (max-width:899px)': {
                fontSize: '1.8rem',
                lineHeight: '2.25rem',
            }
        },
        h4: {
            fontSize: '1.313rem',
            fontWeight: 600,
            lineHeight: '1.58rem',
            color: '#0A2540',
            '@media (max-width:899px)': {
                fontSize: '1rem',
                lineHeight: '1.2rem',
            }

        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: '1.21rem',
            color: '#0A2540'
        },
    },
    palette: {
        primary: {
            main: '#635BFF',
            light: '#2FB4F7'
        },
        secondary: {
            main: '#425466',
        },
        info: {
            main: '#DEEAF6',
            light: '#FFFFFF'
        },

    },
});

export default theme;
