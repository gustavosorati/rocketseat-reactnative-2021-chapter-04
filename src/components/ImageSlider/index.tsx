import React from 'react';
import { CarImage, CarImageWrapper, Container, ImageIndex, ImageIndexes } from './styles';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

interface Props  {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage
          source={{ uri: imagesUrl[0] }}
          resizeMode="contain"
        />
      </CarImageWrapper>
    </Container>
  );
}
