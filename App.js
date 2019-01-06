import React from 'react';
import * as Expo from 'expo';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import names from './data/names';

Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.LANDSCAPE);

const getName = () => {
  const index = Math.floor(Math.random() * names.length);
  if (names[index]) {
    return names[index].name;
  }
  return getName();
};

const DURATION = 15;
const COUNTDOWN = 5;

export default class App extends React.Component {
  state = {
    name: null,
    delta: 0,
    starting: false,
    playing: false,
  };

  __start = null;
  __timer = null;

  start = () => {
    const name = getName();
    this.setState({ name });
    this.__start = new Date().getTime();
    this.setState({ starting: true }, () => {
      this.__timer = requestAnimationFrame(this.tick);
    });
  };

  tick = () => {
    const { delta: oldDelta } = this.state;
    const now = new Date().getTime();
    const delta = Math.ceil((now - this.__start) / 1000);

    if (DURATION - delta + COUNTDOWN < 1) {
      this.stop();
      return;
    }

    if (delta !== oldDelta) {
      if (delta > 5) {
        this.setState({ starting: false, playing: true, delta });
      }
      this.setState({ delta });
    }

    this.__timer = requestAnimationFrame(this.tick);
  };

  getTimeLeft = () => {
    const { playing, delta } = this.state;
    if (!playing) {
      return 0;
    }

    return DURATION - delta + COUNTDOWN;
  };

  getCountDown = () => {
    const { starting, delta } = this.state;

    if (!starting) {
      return 0;
    }
    return COUNTDOWN - delta;
  };

  stop = () => {
    this.setState({ starting: false, playing: false });
    cancelAnimationFrame(this.__timer);
  };

  // tick = () => {
  //   const { countdown, time } = this.state;
  //   if (countdown > 0) {
  //     this.setState({ countdown: countdown - 1 });
  //     return;
  //   }
  //   if (time > 0) {
  //     this.setState({ time: countdown - 1 });
  //   }
  // };

  render() {
    let { name } = this.state;

    if (name === null) {
      name = 'Tap to start';
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.start}>
          <Text style={styles.text}>{this.getTimeLeft()}</Text>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{this.getCountDown()}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    color: '#ff9',
  },
});
