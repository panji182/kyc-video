'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { JingleVideoInput } from '@/types/molecules/JingleVideo';
import styles from '../../atoms/TextInput/index.styles';
import { toRem } from '@/helpers/globalFunctions';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const Select = dynamic(() => import('@/components/atoms/Select'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));

const initJingleVideoInput: JingleVideoInput = {
  name: '',
  type: '',
  video: '',
  image: '',
  audio: '',
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
  onSubmited: (e: JingleVideoInput) => void;
  onClosePopup: () => void;
};

const optionsJingleType = [
  {
    value: 'video',
    label: 'Video',
  },
  {
    value: 'imageAudio',
    label: 'Image + Audio',
  },
];

const PopupFormAddJingleVideo = ({ open, onSubmited, onClosePopup }: Props) => {
  const [jingleVideoInput, setJingleVideoInput] =
    useState<JingleVideoInput>(initJingleVideoInput);

  const handleInput = (value: string, name: string) => {
    setJingleVideoInput((prevState: JingleVideoInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (value: string, name: string) => {
    setJingleVideoInput((prevState: JingleVideoInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setJingleVideoInput({ ...initJingleVideoInput });
  };

  const handleSubmit = () => {
    onSubmited({ ...jingleVideoInput });
    onClosePopup();
  };

  return (
    <Modal
      open={open}
      title={'Create Jingle Video'}
      onClose={() => onClosePopup()}
    >
      <>
        <Grid container spacing={1} sx={{ marginBottom: toRem(16) }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="name"
              label="Enter Name"
              formInput={true}
              placeholder="Enter Name"
              value={jingleVideoInput.name}
              variant="outlined"
              onChange={val => handleInput(val, 'name')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Select
              id="type"
              label="Jingle Type"
              options={optionsJingleType}
              isFormInput={true}
              value={jingleVideoInput.type}
              onChange={val => handleSelect(val, 'type')}
              sx={{ margin: 0 }}
            />
          </Grid>
          {jingleVideoInput.type === 'video' && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl>
                <FormLabel id="video" sx={styles.bottomSpace}>
                  Video
                </FormLabel>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  href="#video-upload"
                >
                  Upload a video
                  <VisuallyHiddenInput
                    type="file"
                    onChange={e => console.log(137, e)}
                  />
                </Button>
              </FormControl>
            </Grid>
          )}
          {jingleVideoInput.type === 'imageAudio' && (
            <>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl>
                  <FormLabel id="image" sx={styles.bottomSpace}>
                    Image
                  </FormLabel>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    href="#video-upload"
                  >
                    Upload an Image
                    <VisuallyHiddenInput
                      type="file"
                      onChange={e => console.log(137, e)}
                    />
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl>
                  <FormLabel id="audio" sx={styles.bottomSpace}>
                    Audio
                  </FormLabel>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    href="#video-upload"
                  >
                    Upload an Audio
                    <VisuallyHiddenInput
                      type="file"
                      onChange={e => console.log(137, e)}
                    />
                  </Button>
                </FormControl>
              </Grid>
            </>
          )}
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

export default PopupFormAddJingleVideo;
