import { Button, Stack, Badge, Alert, AlertIcon } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { PasswordField } from './PasswordField';
import { getFromStorage, saveToStorage } from '../utilities/storage';

export default function CheckoutForm() {
  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Name is required')
          .min(4, 'Must be at least 4 characters long'),
        address: Yup.string()
          .required('Address is required')
          .min(4, 'Must be at least 4 characters long'),
        card: Yup.number()
          .required('Credit card is required')
          .min(16, 'Must be 16 digits'),
      })}
      onSubmit={() => {
        localStorage.removeItem('cartItems');
        window.location.href = '/';
      }}
    >
      {formik => (
        <Stack as="form" spacing="6" mt={6} onSubmit={formik.handleSubmit}>
          <Stack spacing="5">
            <TextField
              name="name"
              placeholder="Enter your name..."
              label="Name"
            />
            <TextField
              name="address"
              placeholder="Enter your address..."
              label="Address"
            />
            <TextField
              name="card"
              placeholder="Enter your credit card..."
              label="Credit Card"
            />

            <Button type="submit">Submit</Button>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
}
