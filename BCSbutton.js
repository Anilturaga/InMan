import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.triangleCornerLayer}></View>
         <View style={styles.triangleCorner1}></View>
         <Text style={[styles.text,{left:this.props.left1,top:this.props.top1}]}>{this.props.text}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },triangleCorner1: {
    position: 'absolute',
    top:0,
    left:0,
    height:'10%',
    width: '80%',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 50,
    borderTopWidth: 75,
    borderRightColor: 'transparent',
    borderTopColor: 'white'
  },triangleCornerLayer: {
    position: 'absolute',
    top:0,
    left:'65%',
    width:'35%',
    height: '10%',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderBottomWidth: 75,
    borderLeftColor: 'transparent',
    borderBottomColor: 'green'
  },
  text:{
    position:'absolute',
    

  }
});
