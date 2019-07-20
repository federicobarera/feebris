import React, { Fragment, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import symptoms_eval from '../modules/sympthoms-evaluator';
import tracker from '../modules/sympthoms-tracker';

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

        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            {fluState.loading &&
              <Text >Evaluating symphtoms...</Text>
            }
            {!fluState.loading &&
              <Text>
                {fluState.hasFlu
                  ? 'You have flu'
                  : 'You don\'t have flu'
                }
              </Text>
            }
          </View>
          <View style={styles.sectionContainer}>
            {trackingState.sending &&
              <Text >Sending Results for further analysis...</Text>
            }
            {!trackingState.sending &&
              <Text>
                {trackingState.success
                  ? 'Results sents successfully'
                  : 'Failed to send results... we should really implement a queue processor'
                }
              </Text>
            }
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
}

LinksScreen.navigationOptions = {
  title: 'Results',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
