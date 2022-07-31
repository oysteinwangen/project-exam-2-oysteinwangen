import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Field, useField } from 'formik';

export const PasswordField = ({ label, ...props }) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef(null);
  const [field, meta] = useField(props);

  const onClickReveal = () => {
    onToggle();

    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel htmlFor="password">{label}</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          type={isOpen ? 'text' : 'password'}
          {...props}
          {...field}
        />
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
PasswordField.displayName = 'PasswordField';
