import DeckIcon from '@mui/icons-material/Deck';
import { Box, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FlexBetween from '@/components/FlexBetween.tsx';

type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Navbar(props: Props) {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('dashboard');
  return (
    <FlexBetween mb="0.25rem" color={palette.grey[400]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <DeckIcon sx={{ fontSize: '20px' }} />
        <Typography variant="h4" fontSize="18px">
          Tropical Twista
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ '&:hover': { color: palette.primary[200] } }}>
          <Link
            to="/"
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            ANOTHER PAGE
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
}

export default Navbar;
