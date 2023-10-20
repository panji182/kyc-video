'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { UserList } from '@/types/api/UserManagement';
import styles from './index.styles';
import { Roles } from '@/consts';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const Select = dynamic(() => import('@/components/atoms/Select'));

const initUserInput: UserList = {
  id: '',
  username: '',
  fullname: '',
  extid: '',
  roles: [],
};

const optionsRoles = [
  {
    value: Roles.admin,
    label: 'Administrator',
  },
  {
    value: Roles.operator,
    label: 'Operator',
  },
  {
    value: Roles.reporter,
    label: 'Reporting',
  },
];

type Props = {
  open: boolean;
  editedData: UserList | null;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: UserList) => void;
  onClosePopup: () => void;
};

const PopupFormAddUser = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const [userInput, setUserInput] = useState<UserList>(initUserInput);

  useEffect(() => {
    if (editedData) {
      setUserInput(editedData);
    } else {
      setUserInput(initUserInput);
    }
  }, [editedData]);

  const handleInput = (value: string, name: string) => {
    setUserInput((prevState: UserList) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (el: any, name: string) => {
    setUserInput((prevState: UserList) => ({
      ...prevState,
      [name]: el,
    }));
  };

  const handleClear = () => {
    setUserInput({ ...initUserInput });
  };

  const handleSubmit = () => {
    onSubmited({ ...userInput });
    handleClear();
    onClosePopup();
  };

  return (
    <Modal
      open={open}
      title={editedData ? `Edit User` : `Create User`}
      onClose={() => onClosePopup()}
    >
      <>
        <Grid container spacing={1} sx={styles.bottomSpace}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="id"
              label="Id"
              formInput={true}
              placeholder="Enter Id"
              value={userInput.id}
              variant="outlined"
              onChange={val => handleInput(val, 'id')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="username"
              label="Username"
              formInput={true}
              placeholder="Enter Username"
              value={userInput.username}
              variant="outlined"
              onChange={val => handleInput(val, 'username')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="fullname"
              label="Fullname"
              formInput={true}
              placeholder="Enter Fullname"
              value={userInput.fullname}
              variant="outlined"
              onChange={val => handleInput(val, 'fullname')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="extid"
              label="Ext Id"
              formInput={true}
              placeholder="Enter Ext Id"
              value={userInput.extid}
              variant="outlined"
              onChange={val => handleInput(val, 'extid')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Select
              id="roles"
              label="Roles"
              isMultipleSelect={true}
              options={optionsRoles}
              isFormInput={true}
              value={userInput.roles}
              onChange={e => handleSelect(e, 'roles')}
            />
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
