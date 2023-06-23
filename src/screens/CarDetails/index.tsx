import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import { Container, Header, CarImage, Content, Details, Description, Brand, Name, Rent, Period, Price, About, Accessories, Footer } from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../routes/app.tab.routes';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const { colors } = useTheme();

  const route = useRoute();
  const { car } = route.params as Params;

  const navigation = useNavigation<StackParamList>();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return{
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
  }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  async function handleGoBack() {
    navigation.goBack()
  }

  async function handleConfirm() {
    navigation.navigate("Scheduling", {
      car
    })
  }

  return (
    <Container>
      <StatusBar
        barStyle='dark-content'
        translucent
        backgroundColor="transparent"
      />

      <Header style={styles.back}>
        <BackButton onPress={handleGoBack} />
      </Header>

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: colors.background_secondary }
        ]}
      >
        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImage>
            <ImageSlider imagesUrl={car.photos} />
          </CarImage>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {/* Accesory */}
        <Accessories>
          {car.accessories?.map(accesorie => (
            <Accessory key={accesorie.type} name={accesorie.name} icon={getAccessoryIcon(accesorie.type)} />
          ))}
        </Accessories>

        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
  back: {
    marginTop: 36,
    zIndex: 2,
  }
})
