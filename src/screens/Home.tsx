import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackHomeParamList} from '../stacks/StackHome';

type PropsType = NativeStackScreenProps<StackHomeParamList, 'Home1'>;
const Home: React.FC<PropsType> = props => {
  const {navigation} = props;
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('About');
        }}>
        <Text>Go to About</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
