import { VStack, Image, Text, Button, Box } from '@chakra-ui/react';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import './ProductCard.scss';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getFromStorage } from '../../components/utilities/storage';
import { getExistingCartItems } from '../../components/utilities/cartFunctions';

export default function ProductCard({ name = 'Untitled', image_id, id }) {
  const [inCart, setInCart] = useState(false);

  function cartChange() {
    const currentCartItems = getExistingCartItems();

    const productExists = currentCartItems.find(function (cartItem) {
      return cartItem.id === id;
    });

    if (productExists === undefined) {
      const product = { id: id, name: name, image: image_id };
      currentCartItems.push(product);
      saveCartItems(currentCartItems);
      setInCart(true);
    } else {
      const newCartItems = currentCartItems.filter(
        cartItem => cartItem.id !== id
      );
      saveCartItems(newCartItems);
      setInCart(false);
    }
  }
  function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  useEffect(() => {
    const currentCartItems = getExistingCartItems();
    const productExists = currentCartItems.find(function (cartItem) {
      return cartItem.id === id;
    });
    if (productExists === undefined) {
      setInCart(false);
    } else {
      setInCart(true);
    }
  }, []);

  return (
    <Box
      as={motion.div}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      layout
      className="product-card"
    >
      <VStack
        as="a"
        href={`/details/${id}`}
        spacing="1rem"
        className="product-card__details-wrapper"
      >
        <Image className="product-card__image" src={image_id}></Image>
        <Text className="product-card__title" fontSize="lg">
          {name}
        </Text>
        <Text className="product-card__details" cursor="pointer">
          Details
        </Text>
      </VStack>
      <VStack>
        <Button
          className="product-card__cart"
          variant="ghost"
          opacity="0.8"
          leftIcon={inCart ? <FiX /> : <FiShoppingCart />}
          mt="1rem"
          onClick={cartChange}
        >
          {inCart ? 'Remove from cart' : 'Add to cart'}
        </Button>
      </VStack>
    </Box>
  );
}
