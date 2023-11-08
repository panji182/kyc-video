'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { VideoJingleList } from '@/types/api/VideoJingle';
import styles from './index.styles';
import { optionsVideoJingleType } from '@/consts';
import { toRem } from '@/helpers/globalFunctions';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const Select = dynamic(() => import('@/components/atoms/Select'));
const ButtonComp = dynamic(() => import('@/components/atoms/Button'));

const validationSchema = yup.object({
  jinglename: yup.string().max(30, 'Too Long!').required('Required !'),
  jingletype: yup.string().max(30, 'Too Long!').required('Required !'),
});

const initVideoJingleInput: VideoJingleList = {
  id: '',
  jinglename: '',
  jingletype: '',
  urlvideo: '',
  urlaudio: '',
  urlimage: '',
};

type Props = {
  open: boolean;
  editedData: VideoJingleList | null;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: VideoJingleList) => void;
  onClosePopup: () => void;
};

const optionsJingleType = [
  {
    value: optionsVideoJingleType.video,
    label: 'Video',
  },
  {
    value: optionsVideoJingleType.imageAndAudio,
    label: 'Image + Audio',
  },
];

const PopupFormAddVideoJingle = ({
  open,
  editedData,
  onSubmited,
  onClosePopup,
}: Props) => {
  const isValidUrl = (url: string) =>
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/i.test(
      url
    );
  const formik = useFormik<VideoJingleList>({
    initialValues: initVideoJingleInput,
    validate: values => {
      const errors = {
        urlvideo: '',
        urlaudio: '',
        urlimage: '',
      };
      if (!isValidUrl(values.urlvideo) && values.jingletype === 'video') {
        errors.urlvideo = 'Invalid URL Video Path';
      }
      if (values.urlvideo === '' && values.jingletype === 'video') {
        errors.urlvideo = 'URL Video is required';
      }
      if (!isValidUrl(values.urlimage) && values.jingletype === 'imageaudio') {
        errors.urlimage = 'Invalid URL Image Path';
      }
      if (values.urlimage === '' && values.jingletype === 'imageaudio') {
        errors.urlimage = 'URL Image is required';
      }
      return errors.urlvideo !== '' ||
        errors.urlaudio !== '' ||
        errors.urlimage !== ''
        ? errors
        : {};
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      onSubmited({ ...values });
      onClosePopup();
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (editedData) {
      formik.setValues(editedData);
    } else {
      formik.resetForm();
    }
  }, [editedData]);

  const handleInput = (value: string, name: string) => {
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  const handleClear = () => {
    formik.resetForm();
  };

  return (
    <Modal
      open={open}
      title={editedData ? `Edit Channel` : `Create Channel`}
      onClose={() => onClosePopup()}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1} sx={{ marginBottom: toRem(16) }}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextInput
              id="jinglename"
              label="Enter Jingle Name"
              formInput={true}
              placeholder="Jingle Name"
              value={formik.values.jinglename}
              variant="outlined"
              onBlur={formik.handleBlur}
              error={
                formik.touched.jinglename && Boolean(formik.errors.jinglename)
              }
              onChange={val => handleInput(val, 'jinglename')}
            />
            {formik.errors.jinglename && formik.touched.jinglename ? (
              <Typography sx={styles.textError}>
                {formik.errors.jinglename}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Select
              id="jingletype"
              label="Enter Jingle Type"
              options={optionsJingleType}
              isFormInput={true}
              value={formik.values.jingletype}
              onBlur={formik.handleBlur}
              error={
                formik.touched.jingletype && Boolean(formik.errors.jingletype)
              }
              onChange={val => handleInput(val, 'jingletype')}
              sx={{ margin: 0 }}
            />
            {formik.errors.jingletype && formik.touched.jingletype ? (
              <Typography sx={styles.textError}>
                {formik.errors.jingletype}
              </Typography>
            ) : null}
          </Grid>
          {formik.values.jingletype === 'video' && (
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextInput
                id="video"
                label="Enter Video Url"
                formInput={true}
                placeholder="Video Url"
                value={formik.values.urlvideo}
                variant="outlined"
                onBlur={formik.handleBlur}
                error={
                  formik.touched.urlvideo && Boolean(formik.errors.urlvideo)
                }
                onChange={val => handleInput(val, 'urlvideo')}
              />
              {formik.errors.urlvideo && formik.touched.urlvideo ? (
                <Typography sx={styles.textError}>
                  {formik.errors.urlvideo}
                </Typography>
              ) : null}
            </Grid>
          )}
          {formik.values.jingletype === 'imageaudio' && (
            <>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  id="image"
                  label="Enter Image Url"
                  formInput={true}
                  placeholder="Image Url"
                  value={formik.values.urlimage}
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.urlimage && Boolean(formik.errors.urlimage)
                  }
                  onChange={val => handleInput(val, 'urlimage')}
                />
                {formik.errors.urlimage && formik.touched.urlimage ? (
                  <Typography sx={styles.textError}>
                    {formik.errors.urlimage}
                  </Typography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextInput
                  id="audio"
                  label="Enter Audio Url"
                  formInput={true}
                  placeholder="Audio Url"
                  value={formik.values.urlaudio}
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.urlaudio && Boolean(formik.errors.urlaudio)
                  }
                  onChange={val => handleInput(val, 'urlaudio')}
                />
                {formik.errors.urlaudio && formik.touched.urlaudio ? (
                  <Typography sx={styles.textError}>
                    {formik.errors.urlaudio}
                  </Typography>
                ) : null}
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
          <ButtonComp label="Submit" type="submit" variant="contained" />
        </Stack>
      </form>
    </Modal>
  );
};

export default PopupFormAddVideoJingle;
