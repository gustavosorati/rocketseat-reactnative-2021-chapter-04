import React from 'react';
import { Container, Header, CarImage, Content, Details, Description, Brand, Name, Rent, Period, Price, About, Accessories, Footer } from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../routes/stack.routes';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const route = useRoute();
  const { car } = route.params as Params;

  const navigation = useNavigation<StackParamList>();

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
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImage>
        <ImageSlider imagesUrl={car.photos} />
      </CarImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        {/* Accesory */}
        <Accessories>
          {car.accessories?.map(accesorie => (
            <Accessory key={accesorie.type} name={accesorie.name} icon={getAccessoryIcon(accesorie.type)} />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
