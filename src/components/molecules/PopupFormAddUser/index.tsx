'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { UserInput } from '@/types/template/UserManagement';
import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));

const initUserInput: UserInput = {
  firstName: '',
  middlename: '',
  lastName: '',
  email: '',
  password: '',
  picture: '',
};

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: UserInput) => void;
  onClosePopup: () => void;
};

const PopupFormAddUser = ({ open, onSubmited, onClosePopup }: Props) => {
  const [userInput, setUserInput] = useState<UserInput>(initUserInput);

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setUserInput((prevState: UserInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setUserInput({ ...initUserInput });
  };

  const handleSubmit = () => {
    onSubmited({ ...userInput });
    onClosePopup();
  };

  return (
    <Modal open={open} title={'Create User'} onClose={() => onClosePopup()}>
      <>
        <Grid container spacing={1} sx={styles.bottomSpace}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl>
              <FormLabel id="firstName" sx={styles.bottomSpace}>
                First Name
              </FormLabel>
              <TextField
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                value={userInput.firstName}
                variant="outlined"
                onChange={e => handleUserInput(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl>
              <FormLabel id="middlename" sx={styles.bottomSpace}>
                Middle Name
              </FormLabel>
              <TextField
                id="middlename"
                name="middlename"
                placeholder="Enter Middle Name"
                value={userInput.middlename}
                variant="outlined"
                onChange={e => handleUserInput(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl>
              <FormLabel id="lastName" sx={styles.bottomSpace}>
                Last Name
              </FormLabel>
              <TextField
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                value={userInput.lastName}
                variant="outlined"
                onChange={e => handleUserInput(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl>
              <FormLabel id="email" sx={styles.bottomSpace}>
                Email
              </FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={userInput.email}
                variant="outlined"
                onChange={e => handleUserInput(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl>
              <FormLabel id="password" sx={styles.bottomSpace}>
                Password
              </FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={userInput.password}
                variant="outlined"
                onChange={e => handleUserInput(e)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <FormControl>
              <FormLabel id="picture" sx={styles.bottomSpace}>
                Picture
              </FormLabel>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                href="#file-upload"
              >
                Upload a file
                <VisuallyHiddenInput
                  type="file"
                  onChange={e => console.log(135, e)}
                />
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <ButtonComp
            label="Clear"
            variant="contained"
            color="error"
            onClick={handleClear}
          />
          <ButtonComp
            label="Submit"
            variant="contained"
            onClick={handleSubmit}
          />
        </Stack>
      </>
    </Modal>
  );
};

export default PopupFormAddUser;
