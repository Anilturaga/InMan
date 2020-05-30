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
    territoryName: '',
    navState: '',
    length: 0,
    navigationProp: ''
  };
  shopDataUpdate = (data, territory) => {
    this.setState({ Messages: data });
    this.setState({ territoryName: territory });
  };
  navigator = name => {
    if (this.props.user.userType === 'admin') {
      console.log('Admin pressed');
      this.props.navigation.navigate('AdminL', {
        selectedT: this.state.navigationProp,
        selectedF: name,
      });
    } else if (this.props.user.userType === 'T') {
      console.log('Card pressed:', name);
      this.props.navigation.navigate('Tl', { selectedF: name });
    }
  };
  setLength = len => {
    this.setState({ length: len });
  };
  componentDidMount() {
    const temp = [];
    var size, len;
    if (this.props.user.userType === 'T') {
      for (let name in this.props.data) {
        console.log('shop: ', name);
        size = Object.keys(this.props.data[name]).length;
        temp.push({ title: name, count: size });
      }
      len = Object.keys(this.props.data).length;
      this.setLength(len);
      console.log('tprimary', this.props.user);
      this.shopDataUpdate(temp, this.props.user.territory);
    }
  }
  render() {
    const temp = [];
    var size, len;
    if (this.props.user.userType === 'T') {
      if (this.state.Messages === []) {
        for (let name in this.props.data) {
          console.log('shop: ', name);
          size = Object.keys(this.props.data[name]).length;
          temp.push({ title: name, count: size });
        }
        len = Object.keys(this.props.data).length;
        this.setState({ length: len });
        console.log('tprimary', this.props.user);
        this.shopDataUpdate(temp, this.props.user.territory);
      }
    } else if (this.props.user.userType === 'admin') {
      var selectedTerritory = this.props.navigation.getParam(
        'selectedT',
        'Default'
      );
      if (selectedTerritory !== this.state.navState) {
        this.setState({ navState: selectedTerritory });
        console.log('selectedTerritory: ', selectedTerritory);
        if (selectedTerritory === 'Default') {
          console.log('Default param');
          selectedTerritory = Object.keys(this.props.data)[0];
        }
        this.setState({navigationProp:selectedTerritory})
        for (let name in this.props.data[selectedTerritory]) {
          console.log('shop: ', name);
          size = Object.keys(this.props.data[selectedTerritory][name]).length;
          temp.push({ title: name, count: size });
        }
        len = Object.keys(this.props.data[selectedTerritory]).length;
        this.setState({ length: len });
        this.shopDataUpdate(temp, selectedTerritory);
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
              {this.state.territoryName.replace(/_/, ' ')}
            </Text>
            <Text
              style={[
                styles.nexttext,
                { color: this.props.colorScheme.textcolor },
              ]}>
              {' ' + this.state.length + " F.O's"}
            </Text>
          </View>
          {this.state.Messages.map((user, i) => (
            <Animatable.View animation="fadeInDown">
              <Card
                onPress={() => {
                  console.log('Card pressed: ', user.title);
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
                    },
                  ]}
                  title={user.title.replace(/_/, ' ')}
                  description={'Contains ' + user.count + ' retailors'}
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
