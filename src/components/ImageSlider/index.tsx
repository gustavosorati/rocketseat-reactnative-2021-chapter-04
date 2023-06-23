import React, { useRef, useState } from 'react';
import { CarImage, CarImageWrapper, Container, ImageIndex, ImageIndexes } from './styles';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { FlatList, ViewToken } from 'react-native';

interface Props  {
  imagesUrl: {
    id: string;
    photo: string;
  }[]
}

interface ChangeImageProps {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}

export function ImageSlider({ imagesUrl }: Props) {
  const theme = useTheme();

  const [slideIndex, setSlideIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setSlideIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <ImageIndex
            key={item.id}
            active={index === slideIndex}
          />
        ))}
      </ImageIndexes>

        <FlatList
          data={imagesUrl}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CarImageWrapper>
              <CarImage
                source={{ uri: item.photo }}
                resizeMode="contain"
              />
            </CarImageWrapper>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          onViewableItemsChanged={indexChange.current}
        />

    </Container>
  );
}
