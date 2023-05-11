import React, { useState } from 'react';
import { Container, Content, DateInfo, DateTitle, DateValue, Footer, Header, RentalPeriod, Title } from './styles';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';
import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, MarkeDateProps } from '../../components/Calendar';
import { StackParamList } from '../../routes/stack.routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DateData } from 'react-native-calendars';
import { generateInterval } from '../../components/Calendar/generate-interval';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { format } from 'date-fns';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const {colors}  = useTheme();
  const route = useRoute();
  const { car } = route.params as Params;

  const navigation = useNavigation<StackParamList>();

  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData);
  const [markedDates, setMarkedDates] = useState<MarkeDateProps>({} as MarkeDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);


  async function handleGoBack() {
    navigation.goBack()
  }

  async function handleConfirm() {
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Selecione o intervalo para alugar")
    } else {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates)
      })
    }
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0]
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(getPlataformDate(new Date(firstDate)), "dd/MM/yyy"),
      endFormatted: format(getPlataformDate(new Date(endDate)), "dd/MM/yyy"),
    })

  }

  return (
    <Container>
      <StatusBar barStyle='light-content' translucent backgroundColor="transparent" />

      <Header>
        <BackButton color={colors.shape} onPress={handleGoBack} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirm}
          enable={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
