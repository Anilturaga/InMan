import React from 'react';

import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Divider,
  TouchableRipple,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

class ListScreen extends React.Component {
  state = {
    Messages: [],
    foName: '',
    selectedT: '',
    selectedF: '',
    length: 0,
    displayF: '',
    navT: '',
    navF: ''
  };
  shopDataUpdate = data => {
    this.setState({ Messages: data });
  };
  navigator = name => {
    if (this.props.user.userType === 'T') {
      this.props.navigation.navigate('Tr', {
        selectedF: this.state.navF,
        selectedR: name,
      });
    } else if (this.props.user.userType === 'admin') {
      this.props.navigation.navigate('AdminR', {
        selectedT: this.state.navT,
        selectedF: this.state.navF,
        selectedR: name,
      });
    }
  };
  /*componentDidMount() {
    const temp = [];
    for (let shop in this.props.data) {
      if (shop !== 0 && shop !== '0') {
        console.log('shop: ', shop);
        temp.push({
          time: this.props.data[shop].lastUpdated,
          title: shop,
          message: this.props.user.territory,
        });
      }
    }
    this.shopDataUpdate(temp);
  }*/
  render() {
    const temp = [];
    var len;
    var F = this.props.navigation.getParam('selectedF', 'Default');
    if (this.props.user.userType === 'T') {
      if (this.state.selectedF !== F) {
        this.setState({ selectedF: F });
        if (F === 'Default') {
          F = Object.keys(this.props.data)[0];
        }
        this.setState({ displayF: F ,navF:F});
        for (let shop in this.props.data[F]) {
          if (shop !== 0 && shop !== '0') {
            console.log('shop: ', shop);
            temp.push({
              time: this.props.data[F][shop].lastUpdated,
              title: shop,
              message: this.props.user.territory,
            });
          }
        }
        len = Object.keys(this.props.data[F]).length;
        this.setState({ length: len });
        this.shopDataUpdate(temp);

        console.log('T retail list');
      }
    } else if (this.props.user.userType === 'admin') {
      var T = this.props.navigation.getParam('selectedT', 'Default');
      if (this.state.selectedF !== F) {
        this.setState({ selectedF: F, selectedT: T });
        console.log('AdminTf: T', T, 'F', F);
        if (F === 'Default' || T === 'Default') {
          T = Object.keys(this.props.data)[0];
          F = Object.keys(this.props.data[T])[0];
        }
        console.log('AdminTf: T', T, 'F', F);
        this.setState({ displayF: F, navF:F,navT:T });
        console.log('ADMIN', this.props.data[T][F]);
        for (let shop in this.props.data[T][F]) {
          if (shop !== 0 && shop !== '0') {
            console.log('shop: ', shop);
            temp.push({
              time: this.props.data[T][F][shop].lastUpdated,
              title: shop,
              message: this.props.user.territory,
            });
          }
        }
        len = Object.keys(this.props.data[T][F]).length;
        this.setState({ length: len });
        this.shopDataUpdate(temp);

        console.log('admin retail list');
      }
    }
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: this.props.colorScheme.backgroundcolor },
        ]}>
        <ScrollView
          style={{ backgroundColor: this.props.colorScheme.backgroundcolor }}>
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
              {this.state.displayF.replace(/_/, ' ')}
            </Text>
            <Text
              style={[
                styles.nexttext,
                { color: this.props.colorScheme.textcolor },
              ]}>
              {this.state.length + ' retailors'}
            </Text>
          </View>

          {this.state.Messages.map((user, i) => (
            <Animatable.View animation="fadeInDown">
              <Card
                onPress={() => {
                  this.navigator(user.title);
                }}
                style={[
                  styles.card,
                  {
                    backgroundColor: this.props.colorScheme.tabtheme,
                    marginTop: 27,
                  },
                ]}>
                <List.Item
                  style={styles.listItem}
                  titleStyle={[
                    styles.title,
                    {
                      color: this.props.colorScheme.textcolor,
                      fontSize: 20,
                    },
                  ]}
                  title={user.time}
                  description="Last updated"
                  descriptionStyle={[
                    styles.subtitle,
                    { color: this.props.colorScheme.textcolor, fontSize: 16 },
                  ]}
                  left={() => (
                    <Ionicons
                      name="ios-clock"
                      size={32}
                      color={this.props.colorScheme.secondarybutton}
                    />
                  )}
                />
                <Divider />

                <List.Item
                  style={styles.listItem}
                  titleStyle={[
                    styles.title,
                    {
                      color: this.props.colorScheme.textcolor,
                    },
                  ]}
                  title={user.title.replace('_', ' ')}
                  description={user.message}
                  descriptionStyle={[
                    styles.subtitle,
                    { color: this.props.colorScheme.textcolor },
                  ]}
                  left={() => (
                    <Ionicons
                      name="ios-business"
                      size={32}
                      color={this.props.colorScheme.secondarybutton}
                    />
                  )}
                />
              </Card>
            </Animatable.View>
          ))}
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
  },
  nexttext: {
    fontSize: 15,
    paddingBottom: 15,
    alignSelf: 'center',
  },
  card: {
    borderRadius: 27,
    margin: 7,
  },
  title: {
    fontSize: 24,
    paddingLeft: 7,
  },
  subtitle: {
    fontSize: 20,
  },
});
const mapStoretoProps = state => ({
  colorScheme: state.colorScheme,
  user: state.user,
  data: state.data,
});
export default connect(mapStoretoProps)(ListScreen);
