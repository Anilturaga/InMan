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

class AdminScreen extends React.Component {
  state = {
    Messages: [],
  };
  shopDataUpdate = data => {
    this.setState({ Messages: data });
  };
  navigator = name => {
    console.log('Navigator in admin screen pressed');
    this.props.navigation.navigate('AdminF', { selectedT: name });
  };
  componentDidMount() {
    const temp = [];
    var size;
    for (let name in this.props.data) {
      console.log('ter: ', name);
      size = Object.keys(this.props.data[name]).length;
      temp.push({ title: name, count: size });
    }
    this.shopDataUpdate(temp);
  }
  render() {
    console.log("Admin primary")
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
              Territories
            </Text>
            <Text
              style={[
                styles.nexttext,
                { color: this.props.colorScheme.textcolor },
              ]}>
              {'Currently: ' + Object.keys(this.props.data).length}
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
                  description={'Contains ' + user.count + " F.0's"}
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
export default connect(mapStoretoProps)(AdminScreen);
