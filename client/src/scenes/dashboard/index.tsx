import { Box, useMediaQuery, useTheme } from '@mui/material';
import DashboardBox from '@/components/DashboardBox';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';

type Props = {};

const gridTemplateLargeScreens = `
    "a b c"
    "a b c"
    "a b c"
    "a b c"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Dashboard(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { palette } = useTheme();
  const isAboveMediumScreens = useMediaQuery('(min-width: 800px)');
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',
              gridTemplateRows: 'repeat(10, minmax(60px, 1fr))',
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: '1fr',
              gridAutoRows: '80px',
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 />
    </Box>
  );
}

export default Dashboard;
