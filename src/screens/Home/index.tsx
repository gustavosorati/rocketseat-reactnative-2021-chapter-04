import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { CarList, Container, Header, MyCarButton, TotalCars } from './styles';

import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Car } from '../../components/Car';

import { LoadAnimation } from '../../components/LoadAnimation'

import { StackParamList } from '../../routes/stack.routes';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Loading } from '../../components/Loading';
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

import Animated, {color, useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

const ButtonAnimeted = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const theme = useTheme();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<StackParamList>();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]

    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      // positionX.value = withSpring(0)
      // positionY.value = withSpring(0)
    }
  })

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

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);

    return () => backHandler.remove();
  })

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

        {!loading && (
          <TotalCars>
          Total de {cars.length} carros
          </TotalCars>
        )}
      </Header>

      {loading ? <LoadAnimation /> :
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Car data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[myCarButtonStyle, { position: "absolute", bottom: 13, right: 22 }]}>
          <ButtonAnimeted onPress={() => handleOpenMyCars()} style={[styles.button, { backgroundColor: theme.colors.main}]}>
            <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
          </ButtonAnimeted>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  }
})
