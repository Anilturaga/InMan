/*import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Picker,
  TextInput,
} from 'react-native';
import { Button, Title, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';

class ScreenComponentTwo extends React.Component {
  static navigationOptions = {
    title: 'some string title 2',
  };
  constructor(props) {
    super(props);
    this.state = { idk: '', selectedValue: 'ADMIRE' };
  }
  setSelectedValue = val => {
    console.log('new val: ', val);
    this.setState({ selectedValue: val });
  };

  render() {
    const products = [];
    console.log('Products from fs: ', this.props.products);
    for (let i in this.props.products) {
      products.push(i);
      console.log('product:', i);
    }
    console.log('selectedvalue: ', this.state.selectedValue);
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: this.props.colorScheme.backgroundcolor },
        ]}>
        <ScrollView
          style={{
            backgroundColor: this.props.colorScheme.backgroundcolor,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              paddingTop: '7%',
            }}>
            <Text
              style={[
                styles.headtext,
                { color: this.props.colorScheme.primarybutton },
              ]}>
              {this.props.navigation.getParam('retailName', 'Retail shop name')}
            </Text>
          </View>

          <View style={{ flexDirection: 'column', width: '100%' }}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '70%' }}>
                <Picker
                  selectedValue={this.state.selectedValue}
                  style={{ width: '100%' }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setSelectedValue(itemValue)
                  }
                  mode="dialog">
                  {products.map(product => (
                    <Picker.Item label={product} value={product} />
                  ))}
                </Picker>
              </View>
              <View style={{ width: '30%' }}>
                <TextInput
                  style={{ width: '100%', borderColor: 'gray', borderWidth: 1 }}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  headtext: {
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
const mapStoretoProps = state => ({
  colorScheme: state.colorScheme,
  user: state.user,
  products: state.products,
});
export default connect(mapStoretoProps)(ScreenComponentTwo);
*/

import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Picker,
  TextInput,
} from 'react-native';
import { Button, Title, Text, Card, TouchableRipple } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { _shopDataUpload } from '../api';
import { KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';

class ScreenComponentTwo extends React.Component {
  static navigationOptions = {
    title: 'some string title 2',
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedProducts: ['ADMIRE'],
      selectedQuantities: [0],
      error: '',
    };
  }
  setSelectedValue = (val, i) => {
    console.log('new val: ', val);
    var temp = this.state.selectedProducts;
    temp[i] = val;
    this.setState({ selectedProducts: temp });
  };
  setSelectedQuantity = (val, i) => {
    console.log('new val: ', val);
    var temp = this.state.selectedQuantities;
    temp[i] = val;
    this.setState({ selectedQuantities: temp });
  };

  addNewProduct = () => {
    console.log('new product');
    var temp = this.state.selectedProducts;
    temp.push('ADMIRE');
    this.setState({ selectedProducts: temp });
  };
  reset = () => {
    this.setState({ selectedProducts: ['ADMIRE'], selectedQuantities: [0] });
  };
  sendData = () => {
    var obj = {};

    for (let count = 0; count < this.state.selectedProducts.length; count++) {
      if (this.state.selectedQuantities[count] >= 0) {
        obj[this.state.selectedProducts[count]] = parseInt(
          this.state.selectedQuantities[count]
        );
      } else {
        this.setState({ error: 'All quantities must be valid' });
      }
    }
    var date = new Date().toLocaleDateString();
    obj['lastUpdated'] = date;
    console.log('sending: ', obj);
    _shopDataUpload(
      this.props.user.territory,
      this.props.user.f,
      this.props.navigation.getParam('retailName', 'Retail shop name'),
      obj
    );
  };
  componentDidMount() {
    var temp = JSON.stringify(
      this.props.navigation.getParam('retailName', 'Retail shop name')
    );
    temp = temp.replace(/"/g, '');

    var retail = this.props.data[temp];
    var t = 0;
    for (let data in retail) {
      if (data !== 'lastUpdated') {
        this.setSelectedValue(data, t);
        console.log('Quantity:', retail[data]);
        var num = retail[data].toString();
        this.setSelectedQuantity(num, t);
        t = t + 1;
      }
    }
  }
  render() {
    const products = [];
    console.log('Products from fs: ', this.props.products);
    for (let i in this.props.products) {
      products.push(i);
      console.log('product:', i);
    }

    console.log('colorScheme:', this.props.colorScheme);
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: this.props.colorScheme.backgroundcolor },
        ]}>
        <ScrollView
          style={{
            backgroundColor: this.props.colorScheme.backgroundcolor,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              paddingTop: '7%',
            }}>
            <Text
              style={[
                styles.headtext,
                { color: this.props.colorScheme.primarybutton },
              ]}>
              {JSON.stringify(
                this.props.navigation.getParam('retailName', 'Retail shop name')
              )
                .replace(/"/g, '')
                .replace('_', ' ')}
            </Text>
          </View>
          <Card
            style={[
              styles.card,
              { backgroundColor: this.props.colorScheme.tabtheme },
            ]}>
            <Text style={{ color: 'red', width: '100%', textAlign: 'center' }}>
              {this.state.error}
            </Text>
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <View
                  style={{
                    width: '60%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: this.props.colorScheme.textcolor }}>
                    Product
                  </Text>
                </View>
                <View
                  style={{
                    width: '40%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: this.props.colorScheme.textcolor }}>
                    Quantity(KG/L)
                  </Text>
                </View>
              </View>
              {this.state.selectedProducts.map((sProduct, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingTop: 27,
                  }}>
                  <View style={{ width: '60%' }}>
                    <Picker
                      selectedValue={sProduct}
                      style={{
                        width: '100%',
                        backgroundColor: this.props.colorScheme.secondarybutton,
                        color: 'white',
                        height: 50,
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setSelectedValue(itemValue, index)
                      }
                      mode="dialog">
                      {products.map((product, key) => (
                        <Picker.Item
                          label={product}
                          value={product}
                          key={key}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View style={{ width: '40%' }}>
                    <TextInput
                      style={{
                        width: '100%',
                        borderColor: this.props.colorScheme.secondarybutton,
                        borderWidth: 1,
                        height: 50,
                        color: this.props.colorScheme.textcolor,
                      }}
                      onChangeText={text =>
                        this.setSelectedQuantity(text, index)
                      }
                      keyboardType="numeric"
                      value={this.state.selectedQuantities[index]}
                    />
                  </View>
                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 27,
                }}>
                <Button
                  mode="contained"
                  style={{
                    backgroundColor: this.props.colorScheme.primarybutton,
                    color: this.props.colorScheme.secondarybutton,
                  }}
                  onPress={() => this.addNewProduct()}>
                  New product
                </Button>
              </View>
            </View>
          </Card>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 27,
            }}>
            <TouchableRipple
              style={styles.touchable}
              onPress={() => this.props.navigation.goBack()}
              rippleColor={this.props.colorScheme.primarybutton}>
              <Icon
                style={[{ color: this.props.colorScheme.primarybutton }]}
                size={50}
                name={'ios-arrow-round-back'}
              />
            </TouchableRipple>
            <TouchableRipple
              style={styles.touchable}
              onPress={() => this.reset()}
              rippleColor={this.props.colorScheme.primarybutton}>
              <Icon
                style={[{ color: this.props.colorScheme.primarybutton }]}
                size={50}
                name={'ios-refresh'}
              />
            </TouchableRipple>
            <TouchableRipple
              style={styles.touchable}
              onPress={() => {
                this.sendData();
                this.props.navigation.goBack();
              }}
              rippleColor={this.props.colorScheme.primarybutton}>
              <Icon
                style={[{ color: this.props.colorScheme.primarybutton }]}
                size={50}
                name={'ios-save'}
              />
            </TouchableRipple>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  headtext: {
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center',
  },
  card: {
    borderRadius: 27,
    margin: 7,
    padding: 27,
    elevation: 4,
  },
  touchable: {
    width: '33%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
const mapStoretoProps = state => ({
  colorScheme: state.colorScheme,
  user: state.user,
  products: state.products,
  data: state.data,
});
export default connect(mapStoretoProps)(ScreenComponentTwo);
