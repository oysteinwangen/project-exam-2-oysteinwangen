import { Box, Container, CircularProgress } from '@chakra-ui/react';
import PageTitle from '../../components/layout/PageTitle';
import ProductCard from './ProductCard';
import Filter from '../../components/utilities/Filter';
import './Browse.scss';
import { useState, useEffect } from 'react';
import { oAuthURL, clientID, clientSecret, gamesURL } from '../../api/apiKeys';
import { motion } from 'framer-motion';

export default function Browse() {
  const [products, setProducts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const productsList = fetch(
      `${oAuthURL}?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`,
      {
        method: 'post',
      }
    )
      .then(response => response.json())
      .then(data => {
        const dataFields =
          'fields screenshots.image_id,genres.*,name; limit 50;';
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
      let prodRefactor = [];
      let genres = [];
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
        prodRefactor.push({
          id: item.id,
          name: item.name,
          genres: item.genres,
          image: image,
        });
        if (item.genres) {
          genres.push(item.genres[0].name);
        }
      });

      let allGenres = [...new Set(genres)];

      setProducts(prodRefactor);
      setFiltered(prodRefactor);
      setGenres(allGenres);
      setLoading(false);
    });
  }

  return (
    <Box as="section">
      <Container py="3rem" maxW="1200px">
        <PageTitle title="Browse games" />
        <Filter
          genres={genres}
          products={products}
          setFiltered={setFiltered}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}
        />
        <Box as={motion.div} layout className="products-grid">
          <CircularProgress
            isIndeterminate
            display={loading ? 'block' : 'none'}
          />
          {filtered.map(product => {
            return (
              <ProductCard
                id={product.id}
                key={product.id}
                name={product.name}
                image_id={product.image}
                genres={product.genres}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
