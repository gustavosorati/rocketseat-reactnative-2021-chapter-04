import React, { useEffect, useState } from 'react';
import {StatusBar, Text} from 'react-native';
import { Appointments, AppointmentsQuantity, AppointmentsTitle, CarFooter, CarFooterDate, CarFooterPeriod, CarFooterTitle, CarWrapper, Container, Content, Header, SubTitle, Title } from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Car } from '../../components/Car';
import { AntDesign } from '@expo/vector-icons'
import { Loading } from '../../components/Loading';


interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  start: string;
  end: string
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        const response = await api.get("/schedules_byuser?user_id=1");

        console.log(response.data)
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar barStyle='light-content' translucent backgroundColor="transparent" />

      <Header>
        <BackButton color={theme.colors.shape} onPress={handleGoBack} />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>Conforto segurança e praticidade</SubTitle>
      </Header>

      {loading ? <Loading /> : (
        <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <CarWrapper>
              <Car key={item.id} data={item.car} />
              <CarFooter>
                <CarFooterTitle>Período</CarFooterTitle>
                <CarFooterPeriod>
                  <CarFooterDate>{item.start}</CarFooterDate>
                    <AntDesign name="arrowright" color={theme.colors.title} style={{ marginHorizontal: 10 }} size={20} />
                  <CarFooterDate>{item.end}</CarFooterDate>
                </CarFooterPeriod>
              </CarFooter>
            </CarWrapper>
          )}
        />
      </Content>
      )}

    </Container>
  );
}
