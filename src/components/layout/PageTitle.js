import { Heading, useBreakpointValue } from '@chakra-ui/react';

export default function PageTitle({ title }) {
  return (
    <Heading
      fontSize={useBreakpointValue({
        base: '2xl',
        md: '4xl',
      })}
      textAlign="center"
      mb="2rem"
    >
      {title}
    </Heading>
  );
}
