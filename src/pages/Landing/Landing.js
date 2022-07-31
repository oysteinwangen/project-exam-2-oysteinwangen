import {
  Container,
  Stack,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import * as React from 'react';
import BgVideo from '../../assets/bgvideo.mp4';
import LogoWh from '../../assets/Logo-wh.svg';
import Logo from '../../assets/Logo.svg';
import LoginForm from '../../components/forms/LoginForm';
import RegisterForm from '../../components/forms/RegisterForm';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useColorModeValue } from '@chakra-ui/react';
import './Landing.scss';
import pageHead from '../../components/utilities/pageHead';

export default function Landing() {
  pageHead('Log in', 'Log in or register to enter the site');
  return (
    <Stack
      minH="100vh"
      maxW="100vw"
      overflow="hidden"
      position="relative"
      justify="center"
      align="center"
      py={10}
      px={3}
    >
      <ColorModeSwitcher
        justifySelf="flex-end"
        zIndex="12"
        bgColor={useColorModeValue('gray.50', 'gray.800')}
      />
      <div className="bg">
        <div className="bg__overlay"></div>
        <video
          src={BgVideo}
          type="video/mp4"
          loop
          autoPlay
          muted
          className="bg__video"
        ></video>
      </div>
      <Container
        maxW="lg"
        py={{
          base: '6',
          md: '12',
        }}
        px={{
          base: '4',
          sm: '8',
        }}
        zIndex="10"
        borderRadius="xl"
        bgColor={useColorModeValue('gray.50', 'gray.800')}
        boxShadow="2xl"
      >
        <Stack spacing="8" pt={10}>
          <Image
            src={useColorModeValue(Logo, LogoWh)}
            maxWidth="80%"
            mx="auto"
          />
          <Tabs align="center">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <RegisterForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
    </Stack>
  );
}
