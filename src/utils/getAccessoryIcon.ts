import SpeedSvg from '../assets/speed.svg';
import AccelerationSvg from '../assets/acceleration.svg';
import ForceSvg from '../assets/force.svg';
import GasolineSvg from '../assets/gasoline.svg';
import HybridSvg from '../assets/hybrid.svg';
import EnergySvg from '../assets/energy.svg';
import ExchangeSvg from '../assets/exchange.svg';
import PeopleSvg from '../assets/people.svg';
import CarSvg from '../assets/car.svg';

export function getAccessoryIcon(type: string) {
  switch(type) {
    case  "speed":
      return SpeedSvg;
    case  "acceleration":
      return AccelerationSvg;
    case  "force":
      return ForceSvg;
    case  "gasoline_motor":
      return GasolineSvg;
      case  "hybrid":
      return HybridSvg;
    case  "electric_motor" || "eletric":
      return EnergySvg;
      case  "exchange":
      return ExchangeSvg;
    case  "people":
      return PeopleSvg;
    default:
      return CarSvg;
  }
}
