import { HStack, Button } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function Filter({
  genres,
  products,
  setFiltered,
  activeGenre,
  setActiveGenre,
}) {
  useEffect(() => {
    if (activeGenre.genre === 'All' || activeGenre.genre == undefined) {
      setFiltered(products);
      return;
    }

    let filtered = [];

    products.forEach(item => {
      if (item.genres) {
        if (item.genres[0].name === activeGenre.genre) {
          filtered.push(item);
        }
      }
    });
    setFiltered(filtered);
  }, [activeGenre]);
  return (
    <>
      <HStack wrap="wrap" rowGap="1rem" justify="center">
        <Button
          onClick={() => setActiveGenre('All')}
          variant={activeGenre === 'All' ? 'solid' : 'outline'}
        >
          All
        </Button>
        {genres.map(genre => {
          return (
            <Button
              onClick={() => setActiveGenre({ genre })}
              variant={activeGenre.genre === genre ? 'solid' : 'outline'}
              key={genre}
            >
              {genre}
            </Button>
          );
        })}
      </HStack>
    </>
  );
}
