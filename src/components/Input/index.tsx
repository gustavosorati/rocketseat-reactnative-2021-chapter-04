import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons'
import { ChangePasswordVisibilityButton, Container, IconContainer, InputText } from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  changePasswordVisibilityButton?: boolean;
  value?: string;
}

export function Input({
  iconName,
  changePasswordVisibilityButton,
  value,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  function handlePasswordVisibility() {
    setPasswordVisible(!isPasswordVisible);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  const theme = useTheme();
  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      {
        changePasswordVisibilityButton &&
        <ChangePasswordVisibilityButton onPress={handlePasswordVisibility}>
        <Feather
          name="eye"
          size={24}
          color={theme.colors.text_detail}
        />
      </ChangePasswordVisibilityButton>
      }

    </Container>
  );
}
