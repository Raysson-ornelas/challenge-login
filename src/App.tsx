import { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Login } from './utils';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChangeEmail = (email: string) => {
    setIsDisableButton(true);
    setEmail(email);

    if (!!email || password.length > 6) {
      setIsDisableButton(false);
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    await Login({ email, password }).then(() => {
      setLoginErrorMessage('');
      alert('Foi');
    }).catch((error) =>
      setLoginErrorMessage(error.message)
    ).finally(() => setLoading(false));
  };

  const handleChangePassword = (password: string) => {
    setIsDisableButton(true);
    setPassword(password);

    if (!!email || password.length > 6) {
      setIsDisableButton(false);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          {!!loginErrorMessage && (
            <Alert status='error'>
              <AlertIcon />
              {loginErrorMessage}
            </Alert>
          )}
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    value={email}
                    placeholder="email address"
                    onChange={(e) => handleChangeEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    children={<CFaLock color="gray.300" />}
                    pointerEvents="none"
                    color="gray.300"
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleChangePassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                isDisabled={isDisableButton}
                isLoading={loading}
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{' '}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}

export default App;
