import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { _loadLogin, _dataHydrate, _productsHydrate } from './api';
class Login extends React.Component {
  componentDidMount() {
    if (this.props.user.userID !== '' && this.props.user.username !== '') {
      var nav = this.props.navigation.getParam('Login', 'false');
      if (nav === 'true') {
        if (this.props.user.password === 'Test@1234') {
          this.props.navigation.navigate('Reset')
        } else {
          console.log('loading send to app');
          _productsHydrate();
          this.timer1 = setTimeout(this.dataHydrate, 500);
          this.timer2 = setTimeout(this.nav, 1500);
        }
      } else {
        this.dataHydrate();
        this.nav();
      }
    } else {
      console.log('loading send to login');
      _loadLogin();
      _productsHydrate();
      this.props.navigation.navigate('Login');
    }
    // Or set a specific startFrame and endFrame with:
    // this.animation.play(30, 120);
  }
  componentWillUnmount() {
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
  }
  dataHydrate = () => {
    _dataHydrate(this.props.user);
  };
  nav = () => {
    this.props.navigation.navigate('App');
  };
  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: 400,
            height: 400,
            backgroundColor: '#ffffff',
          }}
          source={require('./assets/loadingAnim.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
const mapStoretoProps = state => ({
  colorScheme: state.colorScheme,
  user: state.user,
});
export default connect(mapStoretoProps)(Login);
