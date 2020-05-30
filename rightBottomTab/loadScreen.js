import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
class Login extends React.Component {
  componentDidMount() {
    if (this.props.user.userType === 'T') {
      this.props.navigation.navigate('T');
    } else if (this.props.user.userType === 'F') {
      this.props.navigation.navigate('F');
    } else {
      this.props.navigation.navigate('Admin');
    }
  }

  render() {
    return (
      <View style={styles.animationContainer}>
        <Text>Redirecting</Text>
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
