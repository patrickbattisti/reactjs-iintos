import * as Yup from 'yup';

const coordinator = Yup.object({
  name: Yup.string()
    .min(1, 'Must be 1 characters or more')
    .required('School name is required'),
  phone: Yup.number()
    .required('School phone is required')
    .typeError('Must specify a number'),
  country: Yup.string().required('School country is required'),
  city: Yup.string().required('School city is required'),
  postalCode: Yup.string().required('Postal code is required'),
  fileVerification: Yup.mixed().required('File is required'),
});

const prof = Yup.object({
  schoolId: Yup.number()
    .typeError('School is required')
    .required('School is required'),
});

export { coordinator, prof };
