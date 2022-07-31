import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Image,
  Collapse,
  useDisclosure,
  Spacer,
  Link,
  VStack,
} from '@chakra-ui/react';
import { FiMenu, FiX, FiShoppingCart, FiSearch } from 'react-icons/fi';
import LogoWh from '../../assets/Logo-wh.svg';
import Logo from '../../assets/Logo.svg';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  const isDesktop = useBreakpointValue({
    base: false,
    md: true,
  });
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const activeLinkBg = useColorModeValue(
    'var(--chakra-colors-blackAlpha-200)',
    'var(--chakra-colors-whiteAlpha-200)'
  );
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box width="100%">
      <Flex
        as="nav"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        width="100%"
      >
        <Flex flexDir="column" width="100%" py="1rem" px="1rem">
          <Flex alignItems="center">
            <Link
              href="/"
              maxWidth={useBreakpointValue({
                base: '10rem',
                md: '14rem',
              })}
            >
              <Image
                src={useColorModeValue(Logo, LogoWh)}
                width="100%"
                height="100%"
              />
            </Link>

            {isDesktop ? (
              <Flex w="100%" justifyContent="center">
                <ButtonGroup variant="ghost" spacing="3" ml="3rem">
                  <Button
                    as={NavLink}
                    to="/browse"
                    _activeLink={{
                      background: activeLinkBg,
                    }}
                    leftIcon={<FiSearch />}
                  >
                    Browse
                  </Button>
                </ButtonGroup>
                <Spacer />
                <ButtonGroup variant="ghost" spacing="3">
                  <Button
                    variant="solid"
                    opacity="0.8"
                    as={NavLink}
                    to="/cart"
                    leftIcon={<FiShoppingCart />}
                    _activeLink={{
                      opacity: 0.9,
                    }}
                  >
                    Cart
                  </Button>
                  <Button
                    onClick={() => {
                      localStorage.setItem('logged_in', 'false');
                      window.location.href = '/';
                    }}
                  >
                    Log out
                  </Button>
                </ButtonGroup>
                <ColorModeSwitcher />
              </Flex>
            ) : (
              <>
                <Spacer></Spacer>
                <IconButton
                  variant="ghost"
                  icon={
                    isOpen ? (
                      <FiX fontSize="1.25rem" />
                    ) : (
                      <FiMenu fontSize="1.25rem" />
                    )
                  }
                  aria-label="Open Menu"
                  onClick={onToggle}
                />
              </>
            )}
          </Flex>
          {isDesktop ? (
            ''
          ) : (
            <Collapse in={isOpen} animateOpacity>
              <Flex flexDir="column">
                <VStack flexDir="column" spacing="4" mt="2rem">
                  <Button
                    as={NavLink}
                    to="/browse"
                    variant="solid"
                    opacity="0.7"
                    _activeLink={{
                      opacity: '1',
                    }}
                    leftIcon={<FiSearch />}
                    onClick={onToggle}
                  >
                    Browse
                  </Button>
                  <Button
                    as={NavLink}
                    to="/cart"
                    leftIcon={<FiShoppingCart />}
                    variant="solid"
                    opacity="0.7"
                    _activeLink={{
                      opacity: '1',
                    }}
                    onClick={onToggle}
                  >
                    Cart
                  </Button>
                  <Button
                    onClick={() => {
                      localStorage.setItem('logged_in', 'false');
                      window.location.href = '/';
                    }}
                    variant="ghost"
                    as="a"
                    href="/browse"
                  >
                    Log out
                  </Button>
                </VStack>
                <ColorModeSwitcher mt="1rem" />
              </Flex>
            </Collapse>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
