import React, { useEffect, useState } from 'react';
import { Container, Header, CarImage, Content, Details, Description, Brand, Name, Rent, Period, Price, Accessories, Footer, RentalPeriod, CalendarIcon, DateInfo, DateTitle, DateValue, RentalPrice, RentalPriceLabel, RentalPriceDetails, RentalPriceTotal, RentalPriceQuota } from './styles';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Button } from '../../components/Button';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../routes/app.tab.routes';
import { Accessory } from '../../components/Accessory';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { format } from 'date-fns';
import api from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(car.rent.price * dates.length)
  const navigation = useNavigation<StackParamList>();

  async function handleGoBack() {
    navigation.goBack()
  }

  async function handleConfirm() {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];

    await api.post("schedules_byuser", {
      user_id: 1,
      car,
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates: unavailable_dates
    }).then(() => {
      setLoading(false);
      navigation.navigate("SchedulingComplete")
    })
    .catch((error) => {
      console.log(error)
      setLoading(false);
      Alert.alert("Não foi possível realizar o agendamento.")
    })
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])
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
          {car.accessories.map(accesory => (
            <Accessory key={accesory.type} name={accesory.name} icon={getAccessoryIcon(accesory.type)} />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.start}</DateValue>
            </DateInfo>

            <Feather
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.end}</DateValue>
            </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.rent.price} x {dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>


      <Footer>
        <Button
          title="Alugar"
          onPress={handleConfirm}
          color={theme.colors.success}
          enable={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
