import { Button, Stack, Badge, Alert, AlertIcon } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { PasswordField } from './PasswordField';
import { saveToStorage } from '../utilities/storage';

export default function RegisterForm() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required('Email is required')
          .email('Must be a valid email address'),
        password: Yup.string()
          .required('Password is required')
          .min(8, 'Your password must be at least 8 characters'),
        confirm_password: Yup.string()
          .required('You must confirm your password to move on')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={(values, actions) => {
        saveToStorage('login_credentials', [values.email, values.password]);
        const regSuccessMessage = document.querySelector('.regSuccessMessage');
        regSuccessMessage.style.display = 'flex';
        actions.resetForm();
      }}
    >
      {formik => (
        <Stack as="form" spacing="6" mt={6} onSubmit={formik.handleSubmit}>
          <Stack spacing="5">
            <TextField
              name="email"
              placeholder="Enter your email..."
              label="Email"
            />
            <PasswordField
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password..."
            />
            <PasswordField
              id="confirm_password"
              name="confirm_password"
              label="Confirm password"
              placeholder="Confirm your password..."
            />
            <Alert
              status="success"
              className="regSuccessMessage"
              display="none"
            >
              <AlertIcon />
              Successfully signed up. Click on the login tab to continue.
            </Alert>
            <Button type="submit">Register</Button>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
}
