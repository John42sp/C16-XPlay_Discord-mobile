//TO DEFINE WHAT CATEGORIES THE APP WILL HAVE
//REACT CAN T DEAL WITH SVG FILES: NEED TO DOWNLOAD 'EXPO SVG' : EXPO INSTALL REACT-NATIVE-SVG
//AND 'YARN ADD --DEV REACT-NATIVE-SVG-TRANSFORMER', TO TURN SGG IN COMPONENTS 
//AND CREATE FILE metro.config.js ON ROOT, WITH CONFIGS IN IT
//AND DEFINE SVG @TYPES AT svg.d.ts

import RankedSvg from '../assets/ranked.svg';
import DuelSvg from '../assets/duel.svg';
import FunSvg from '../assets/fun.svg';
import TrainingSvg from '../assets/training.svg';

export const categories = [
  { id: '1', title: 'Ranked', icon: RankedSvg },
  { id: '2', title: 'Duel 1x1', icon: DuelSvg },
  { id: '3', title: 'Fun', icon: FunSvg },
  { id: '4', title: 'Training', icon: TrainingSvg },
]