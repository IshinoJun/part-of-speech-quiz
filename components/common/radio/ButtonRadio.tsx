import {
  Box,
  chakra,
  Text,
  useRadio,
  UseRadioProps,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

const RadioBox = chakra('div', {
  baseStyle: {
    borderWidth: '3px',
    px: '6',
    pt: '12',
    pb: '8',
    borderRadius: 'md',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _focus: { shadow: 'outline' },
  },
});

const CheckboxIcon = (props: { checked: boolean }): JSX.Element => (
  <Box fontSize='4xl' color={props.checked ? 'cyan.600' : 'gray.300'}>
    {props.checked ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
  </Box>
);

interface ButtonRadioProps extends UseRadioProps {
  icon?: React.ReactElement;
  label: string;
  description: string;
}

export const ButtonRadio = (props: ButtonRadioProps): JSX.Element => {
  const { label, icon, description } = props;
  const { getCheckboxProps, getInputProps, getLabelProps, state } =
    useRadio(props);

  const checkedStyles = {
    bg: 'cyan.50',
    borderColor: 'cyan.600',
  };

  return (
    <label style={{ width: '100%' }} {...getLabelProps()}>
      <input
        {...getInputProps()}
        id={label}
        name={label}
        aria-labelledby={label}
      />
      <RadioBox {...getCheckboxProps()} _checked={checkedStyles} id={label}>
        <VStack spacing='4'>
          <VStack textAlign='center' spacing='0'>
            <Box
              aria-hidden
              fontSize='4xl'
              color={state.isChecked ? 'cyan.600' : undefined}
            >
              {icon}
            </Box>
            <Text fontWeight='extrabold' fontSize='xl' color='gray.700'>
              {label}
            </Text>
            <Text fontSize='sm' color='gray.600'>
              {description}
            </Text>
          </VStack>
          <CheckboxIcon checked={state.isChecked} />
        </VStack>
      </RadioBox>
    </label>
  );
};
