import { getFromStorage } from '../../components/utilities/storage';
import { FiX } from 'react-icons/fi';
import {
  VStack,
  Stack,
  Image,
  Box,
  Container,
  useBreakpointValue,
  Text,
  Button,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PageTitle from '../../components/layout/PageTitle';

export default function Cart() {
  const cartItems = getFromStorage('cartItems');
  const flexDir = useBreakpointValue({
    base: 'column',
    md: 'row',
  });

  function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  const numberInCart = JSON.parse(localStorage.cartItems).length;

  return (
    <Box as="section">
      <Container py="3rem" maxW="1200px">
        <PageTitle title="Cart" />
        <Text mb="2rem">Number of items in cart: {numberInCart}</Text>
        <VStack spacing="3rem" as={motion.div} layout>
          {cartItems.map(product => {
            return (
              <Stack
                key={product.id}
                borderBottom="solid 1px"
                justifyContent="center"
                alignItems="center"
                flexDir={flexDir}
                width="100%"
                gap="2rem"
                py="1rem"
              >
                <Image
                  src={product.image}
                  objectFit="cover"
                  width="7rem"
                  height="7rem"
                ></Image>
                <Text fontSize="lg">{product.name}</Text>
                <Spacer />
                <IconButton
                  onClick={() => {
                    const id = product.id;
                    const newCartItems = cartItems.filter(
                      cartItem => cartItem.id !== product.id
                    );
                    saveCartItems(newCartItems);
                    window.location.reload();
                  }}
                  ml="auto"
                  aria-label="Remove from cart"
                  icon={<FiX />}
                />
              </Stack>
            );
          })}
        </VStack>
      </Container>
    </Box>
  );
}
