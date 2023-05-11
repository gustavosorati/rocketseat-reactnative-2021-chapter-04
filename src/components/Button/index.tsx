import React from 'react';
import { Container, Title } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enable?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  enable = true,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme();


  return (
    <Container
      {...rest}
      color={color ? color : theme.colors.main}
      enabled={enable}
      style={{ opacity: (enable === false || loading === true) ? .5 : 1 }}
    >

      {loading ? <ActivityIndicator color="white" size="small" /> : <Title>{title}</Title>}
    </Container>
  );
}
