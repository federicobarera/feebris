import React, { Fragment, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import symptoms_eval from '../modules/sympthoms-evaluator';
import tracker from '../modules/sympthoms-tracker';

import styles from './styles'

export default function LinksScreen({ navigation }) {

  const [fluState, changeFluState] = useState({ loading: true, hasFlu: false });
  const [trackingState, changeTrackingState] = useState({ sending: false });
  const [cough, temp, fever] = ['cough', 'temp', 'fever'].map(navigation.getParam);

  useEffect(() => {
    changeFluState({ loading: false, hasFlu: symptoms_eval({ cough, temp, fever }) });
    changeTrackingState({ sending: true });
    tracker
      .track({ cough, temp, fever })
      .then(() => changeTrackingState(prev => ({ ...prev, sending: false, success: true })))
      .catch(() => changeTrackingState(prev => ({ ...prev, sending: false, success: false })))

  }, [cough, temp, fever])

  return (
    <Fragment>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {fluState.loading &&
                <Text style={styles.sectionTitle}>Evaluating symptoms...</Text>
              }
              {!fluState.loading &&
                <Text style={styles.sectionTitle}>
                  {fluState.hasFlu
                    ? 'You have flu.'
                    : 'You don\'t have flu.'
                  }
                </Text>
              }
            </View>
            <View style={styles.sectionContainer}>
              {trackingState.sending &&
                <Text style={styles.sectionTitle}>Sending results for further analysis...</Text>
              }
              {!trackingState.sending &&
                <Text style={styles.sectionTitle}>
                  {trackingState.success
                    ? 'Results sent successfully.'
                    : 'Failed to send results... we should really implement a queue processor.'
                  }
                </Text>
              }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

LinksScreen.navigationOptions = {
  title: 'Results',
};