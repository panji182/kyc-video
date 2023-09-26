'use client';

import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Draggable from 'react-draggable';
import Scrollbar from 'react-scrollbars-custom';
import { toRem } from '@/helpers/globalFunctions';

const StyledTabList = styled(TabList)({
  width: toRem(400),

  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
});

const StyledTab = styled(Tab)({
  borderRadius: '71px',
  color: '#fff',

  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: 'rgba(235,87,87, .4)',
  },
});

const StyledTextField = styled(TextField)({
  '& label': {
    color: '#000',
  },
  '& label.Mui-focused': {
    color: '#000',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: '3px !important',
    borderColor: '#F06547 !important',
  },
  '& fieldset ': {
    borderRadius: '10px',
    borderWidth: '3px',
    borderColor: '#F06547',
  },
});

const RecordingPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={'lg'}>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        {/* Design figma need to fix */}
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={1} lg={1} sx={{ marginRight: '1rem' }}>
            <Stack
              direction={{ xs: 'row', sm: 'row', md: 'column', lg: 'column' }}
              spacing={2}
            >
              <Box>
                <Image
                  src="/assets/icons/icon-audio.svg"
                  width={60}
                  height={60}
                  alt="icon audio"
                />
              </Box>
              <Box>
                <Image
                  src="/assets/icons/icon-record.svg"
                  width={60}
                  height={60}
                  alt="icon recording"
                />
              </Box>
              <Box>
                <Image
                  src="/assets/icons/icon-video.svg"
                  width={60}
                  height={60}
                  alt="icon video"
                />
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                '& img': {
                  height: 'auto !important',
                },
              }}
            >
              <Image
                src="/assets/images/video-call.jpg"
                layout={'fill'}
                objectFit={'contain'}
                alt="video call"
              />
            </Box>
            <Draggable bounds="parent">
              <Box sx={{ position: 'absolute', top: '5%', right: 0 }}>
                <Image
                  src="/assets/images/video-self.jpg"
                  width={155}
                  height={101}
                  alt="video self"
                />
              </Box>
            </Draggable>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TabContext value={value}>
              <Box
                sx={{
                  backgroundColor: 'rgba(235,87,87, .2)',
                  borderBottom: 1,
                  borderColor: 'divider',
                  borderRadius: '71px',
                  padding: '10px',
                }}
              >
                <StyledTabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <StyledTab label="Personal Data" value="1" />
                  <StyledTab label="Identity Card" value="2" />
                  <StyledTab label="Signature" value="3" />
                </StyledTabList>
              </Box>
              <TabPanel value="1">
                <Stack
                  spacing={2}
                  sx={{
                    padding: '3rem 1rem',
                    backgroundColor: 'rgba(235,87,87, .2)',
                    borderRadius: '10px',
                  }}
                >
                  <StyledTextField id="name" label="Name" variant="outlined" />
                  <StyledTextField id="age" label="Age" variant="outlined" />
                  <StyledTextField
                    id="email"
                    label="Email"
                    variant="outlined"
                  />
                  <Box
                    sx={{
                      paddingTop: '100px',
                      paddingBottom: '100px',
                      width: '100%',
                      height: '200px',
                      marginTop: '20px !important',
                      backgroundColor: '#fff',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>Screenshot Result</div>
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value="2">
                <Stack
                  spacing={2}
                  sx={{
                    padding: '3rem 1rem',
                    backgroundColor: 'rgba(235,87,87, .2)',
                    borderRadius: '10px',
                  }}
                >
                  <StyledTextField id="name" label="Name" variant="outlined" />
                  <StyledTextField id="age" label="Age" variant="outlined" />
                  <StyledTextField
                    id="email"
                    label="Email"
                    variant="outlined"
                  />
                  <Box
                    sx={{
                      paddingTop: '100px',
                      paddingBottom: '100px',
                      width: '100%',
                      height: '200px',
                      marginTop: '20px !important',
                      backgroundColor: '#fff',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>Screenshot Result</div>
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value="3">
                <Stack
                  spacing={2}
                  sx={{
                    padding: '3rem 1rem',
                    backgroundColor: 'rgba(235,87,87, .2)',
                    borderRadius: '10px',
                  }}
                >
                  <StyledTextField id="name" label="Name" variant="outlined" />
                  <StyledTextField id="age" label="Age" variant="outlined" />
                  <StyledTextField
                    id="email"
                    label="Email"
                    variant="outlined"
                  />
                  <Box
                    sx={{
                      paddingTop: '100px',
                      paddingBottom: '100px',
                      width: '100%',
                      height: '200px',
                      marginTop: '20px !important',
                      backgroundColor: '#fff',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>Screenshot Result</div>
                  </Box>
                </Stack>
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid> */}
      </Paper>
    </Container>
  );
};

export default RecordingPage;
