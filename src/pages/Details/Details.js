import {
  Box,
  Container,
  CircularProgress,
  Image,
  VStack,
  Badge,
  Text,
  Button,
} from '@chakra-ui/react';
import PageTitle from '../../components/layout/PageTitle';
import { useState, useEffect } from 'react';
import { oAuthURL, clientID, clientSecret, gamesURL } from '../../api/apiKeys';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { getExistingCartItems } from '../../components/utilities/cartFunctions';
import { FiShoppingCart, FiX } from 'react-icons/fi';

export default function Details() {
  const params = useParams();
  const gameID = params.id;

  console.log(gameID);

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [inCart, setInCart] = useState(false);

  function cartChange() {
    const currentCartItems = getExistingCartItems();

    const productExists = currentCartItems.find(function (cartItem) {
      return cartItem.id === product.id;
    });

    if (productExists === undefined) {
      const productItem = {
        id: product.id,
        name: product.name,
        image: product.image,
      };
      currentCartItems.push(productItem);
      saveCartItems(currentCartItems);
      setInCart(true);
    } else {
      const newCartItems = currentCartItems.filter(
        cartItem => cartItem.id !== product.id
      );
      saveCartItems(newCartItems);
      setInCart(false);
    }
  }
  function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    const productsList = fetch(
      `${oAuthURL}?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`,
      {
        method: 'post',
      }
    )
      .then(response => response.json())
      .then(data => {
        const dataFields = `fields screenshots.image_id,genres.*,name,first_release_date; where id = ${gameID};`;
        const token = data.access_token;
        return fetch(gamesURL, {
          method: 'post',
          headers: {
            'Client-ID': clientID,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'text/plain',
          },
          body: dataFields,
        });
      })
      .then(response => response.json())
      .catch(err => {
        console.error('Request failed', err);
      });

    productsList.then(productsList => {
      let prodRefactor = {};
      let genre = 'Undefined';
      productsList.forEach(item => {
        let image = '';
        if (item.screenshots) {
          image =
            'https://images.igdb.com/igdb/image/upload/t_screenshot_med/' +
            item.screenshots[0].image_id +
            '.jpg';
        } else {
          image = '/ImagePlaceholder.jpg';
        }
        if (item.genres) {
          genre = item.genres[0].name;
        }

        const release_date = new Date(
          item.first_release_date
        ).toLocaleDateString('en-US');
        prodRefactor = {
          id: item.id,
          name: item.name,
          genre: genre,
          image: image,
          date: release_date,
        };
      });

      setProduct(prodRefactor);
      setLoading(false);
    });
  }

  function AddToCart() {
    const currentCartItems = getExistingCartItems();
    const productExists = currentCartItems.find(function (cartItem) {
      return cartItem.id === product.id;
    });
    console.log(productExists);
    if (productExists === undefined) {
      setInCart(false);
      return (
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
      );
    } else {
      setInCart(true);
      return (
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
      );
    }
  }

  return (
    <Box as="section">
      <Container py="3rem" maxW="1200px">
        <VStack as={motion.div} layout spacing="1rem">
          <CircularProgress
            isIndeterminate
            display={loading ? 'block' : 'none'}
          />
          <PageTitle title={product.name} />
          <Image src={product.image} />
          <Badge>{product.genre}</Badge>
          <Text>Release Date: {product.date}</Text>
          <AddToCart />
        </VStack>
      </Container>
    </Box>
  );
}
