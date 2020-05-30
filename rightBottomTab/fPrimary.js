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
  };
  shopDataUpdate = data => {
    this.setState({ Messages: data });
  };
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
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
    }
  }
  componentDidMount() {
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
  }
  render() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: this.props.colorScheme.backgroundcolor },
        ]}>
        <ScrollView
          style={{ backgroundColor: this.props.colorScheme.backgroundcolor }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', width: '70%' }}>
              <Text
                style={[
                  styles.headtext,
                  { color: this.props.colorScheme.primarybutton },
                ]}>
                Retailors
              </Text>
              <Text
                style={[
                  styles.nexttext,
                  { color: this.props.colorScheme.textcolor },
                ]}>
                {' '}
                Inventory Manager{' '}
              </Text>
            </View>
            <View
              style={[
                styles.headtext,
                {
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <TouchableRipple
                style={styles.touchable}
                onPress={() => this.props.navigation.push('NewRetail')}
                rippleColor={this.props.colorScheme.primarybutton}>
                <Icon
                  style={[{ color: this.props.colorScheme.primarybutton }]}
                  size={35}
                  name={'ios-add-circle'}
                />
              </TouchableRipple>
            </View>
          </View>

          {this.state.Messages.map((user, i) => (
            <Animatable.View animation="fadeInDown">
              <Card
                onPress={() => {
                  console.log('Card pressed: ', user.title);
                  this.props.navigation.push('AddRetail', {
                    retailName: user.title,
                  });
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

    paddingLeft: 20,

    paddingTop: 50,
  },
  card: {
    borderRadius: 27,
    margin: 7,
  },
  nexttext: {
    fontSize: 15,

    paddingLeft: 20,

    paddingTop: 5,

    paddingBottom: 15,
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
