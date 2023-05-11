import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { CarList, Container, Header, MyCarButton, TotalCars } from './styles';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';
import { StackParamList } from '../../routes/stack.routes';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Loading } from '../../components/Loading';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';


export function Home() {
  const theme = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<StackParamList>();

  async function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car })
  }

  async function handleOpenMyCars() {
    navigation.navigate("MyCars")
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <Logo
          width={RFValue(108)}
          height={RFValue(12)}
        />

        <TotalCars>
          Total de 12 carros
        </TotalCars>
      </Header>

      {loading ? <Loading /> :
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

      <MyCarButton onPress={() => handleOpenMyCars()}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarButton>
    </Container>
  );
}
