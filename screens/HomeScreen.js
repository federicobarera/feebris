/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Switch,
  Slider,
  Button
} from 'react-native';

const App = ({ navigation }) => {
  const [cough, onCoughChange] = useState(false);
  const [temp, onTempChange] = useState(36.6);
  const [fever, onFeverChange] = useState(false);

  return (
    <Fragment>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Have you had fever over the last 5 days?</Text>
              <View style={styles.flex}>
                <View style={{}}>
                  <Switch
                    value={fever}
                    onValueChange={onFeverChange}
                  />
                </View>
                <View style={{}}>
                  <Text>{fever ? 'Yes' : 'No'}</Text>
                </View>

              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>What is your temperature</Text>
              <Text>{temp}</Text>
              <Slider maximumValue={42} minimumValue={35} step={0.1} onValueChange={onTempChange} value={temp} />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Have you had cough?</Text>
              <View style={styles.flex}>
                <View>
                  <Switch
                    value={cough}
                    onValueChange={onCoughChange}
                  />
                </View>
                <Text>{cough ? 'Yes' : 'No'}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Button title={'Evaluate'} onPress={() => navigation.navigate('Results', {
                  cough,
                  temp,
                  fever
                })} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

App.navigationOptions = {
  title: 'Sympthoms Check',
};

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
