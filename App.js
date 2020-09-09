import 'react-native-gesture-handler';
import React from 'react';
import {Text, StatusBar} from 'react-native';
import MovieList from './components/list'
import Detail from './components/detail'
import Edit from './components/edit'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


 const AppNavigator = createStackNavigator({
  MovieList: {screen: MovieList},
  Detail: {screen: Detail},
  Edit: {screen: Edit},
});


export default createAppContainer(AppNavigator);


