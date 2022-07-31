import CheckoutForm from '../../components/forms/CheckoutForm';
import { Box, Container } from '@chakra-ui/react';
import PageTitle from '../../components/layout/PageTitle';

export default function Checkout() {
  return (
    <Box as="section">
      <Container py="3rem" maxW="1200px">
        <PageTitle title="Checkout" />
        <CheckoutForm />
      </Container>
    </Box>
  );
}
