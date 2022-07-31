import { Button, Stack, Badge, Alert, AlertIcon } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { PasswordField } from './PasswordField';
import { getFromStorage, saveToStorage } from '../utilities/storage';

export default function LoginForm() {
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
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={values => {
        const storageCreds = getFromStorage('login_credentials');
        console.log(storageCreds);

        if (
          storageCreds[0] === values.email &&
          storageCreds[1] === values.password
        ) {
          saveToStorage('logged_in', true);
          window.location.href = '/browse';
        } else {
          const loginFailMessage = document.querySelector('.loginFailMessage');
          loginFailMessage.style.display = 'flex';
        }
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
            <Alert status="error" display="none" className="loginFailMessage">
              <AlertIcon />
              Incorrect username or password
            </Alert>
            <Badge colorScheme="red" p={3} display="none"></Badge>
            <Button type="submit">Log in</Button>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
}
