import React, { useMemo, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import Input from '~/components/Input';
import Button from '~/components/Button';
import Select from '~/components/Select';
import FileInput from '~/components/FileInput';

import {
  coordinator as validationSchemaCoordinator,
  prof as validationSchemaProf,
} from '~/validations/schoolInformation';

import api from '~/services/api';

import { Container, Content } from './styles';

const SchoolInformation = ({ location, history }) => {
  const user = useMemo(() => location.state, [location]);
  const coordinator = useMemo(() => user.coordinator, [user]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function loadSchools() {
      const response = await api.get('/schools');

      setSchools(response.data.schools);
    }

    loadSchools();
  }, []);

  const initFormik = () => {
    if (coordinator)
      return {
        initialValues: {
          name: '',
          phone: '',
          country: '',
          city: '',
          cep: '',
          fileVerification: '',
        },
        validationSchema: validationSchemaCoordinator,
      };

    return {
      initialValues: {
        schoolId: '',
      },
      validationSchema: validationSchemaProf,
    };
  };

  const submitForm = async ({ fileVerification, ...school }) => {
    try {
      const userData = fileVerification
        ? { ...user, fileVerificationId: fileVerification.id }
        : user;

      await api.post('/users', {
        school,
        user: userData,
      });

      toast.success('Account created with success', {
        position: toast.POSITION.TOP_CENTER,
      });

      history.push('login');
    } catch ({ response }) {
      console.log(response);
      toast.error(response?.data?.error || 'Invalid data', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const formik = useFormik({
    ...initFormik(),
    onSubmit: submitForm,
  });

  const onFileUpload = async ({ target }) => {
    const [file] = target.files;

    const formData = new FormData();

    formData.append('file', file);

    const response = await api.post('/files', formData);

    formik.setFieldValue('fileVerification', response.data);
  };

  console.log(formik.errors);

  return (
    <Container>
      <Content>
        <h1>Create your account</h1>

        <form onSubmit={formik.handleSubmit}>
          {coordinator ? (
            <>
              <Input
                label="School name"
                type="text"
                name="name"
                placeholder="Type your school name"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />

              <Input
                label="School phone"
                type="number"
                name="phone"
                placeholder="Type your school phone"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="School country"
                type="text"
                name="country"
                placeholder="Type your school country"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="School city"
                type="text"
                name="city"
                placeholder="Type your school city"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
              <Input
                label="School postal code"
                type="text"
                name="cep"
                placeholder="Type your school postal code"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />

              <FileInput
                label="Coordinator Verification"
                name="fileVerification"
                placeholder={
                  formik.values?.fileVerification?.name || 'Attachment file'
                }
                onChange={onFileUpload}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
              />
            </>
          ) : (
            <Select
              label="School"
              placeholder="Select your school"
              name="schoolId"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              options={schools}
            />
          )}

          <Button title="Create account" type="submit" />
        </form>
      </Content>
    </Container>
  );
};

export default withRouter(SchoolInformation);
