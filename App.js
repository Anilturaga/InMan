import * as React from 'react';

import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { connect } from 'react-redux';
import Loading from './loading.js';
import Reset from './Auth/reset.js';
import Login from './Auth/login.js';
import ListView from './middleBottomTab/listView.js';
import SettingsScreen from './leftBottomTab/settings.js';
import { PersistGate } from 'redux-persist/integration/react';
import ListScreen from './rightBottomTab/fPrimary.js';
import StackScreen from './rightBottomTab/fSecondary.js';
import NewStackScreen from './rightBottomTab/fThree.js';
import GenericListScreen from './rightBottomTab/tPrimary.js';
import LoadScreen from './rightBottomTab/loadScreen';
import AdminPScreen from './rightBottomTab/adminPrimary.js';
import AdminTfScreen from './rightBottomTab/AdminTf.js';
import AdminTretailScreen from './rightBottomTab/AdminTretail.js';
// Before rendering any navigation stack
import { enableScreens } from 'react-native-screens';
enableScreens();
var red = store.getState().colorScheme.primarybutton;
var blue = store.getState().colorScheme.secondarybutton;
var backgroundcolor = store.getState().colorScheme.backgroundcolor;
var tabtheme = store.getState().colorScheme.tabtheme;
var textcolor = store.getState().colorScheme.textcolor;

function handleChange() {
  red = store.getState().colorScheme.primarybutton;
  blue = store.getState().colorScheme.secondarybutton;
  backgroundcolor = store.getState().colorScheme.backgroundcolor;
  tabtheme = store.getState().colorScheme.tabtheme;
  textcolor = store.getState().colorScheme.textcolor;
}
const subscribe = store.subscribe(handleChange);
subscribe();
class Tabes extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 27, backgroundColor: 'black' }}>
        <Text>tabs</Text>
        <Button
          raised
          theme={{ roundness: 3 }}
          title={red}
          onPress={() => {
            this.props.navigation.navigate(
              'Middle',
              {},
              NavigationActions.navigate({ routeName: 'addReminder' })
            );
          }}
        />
      </View>
    );
  }
}

const Fscreen = createStackNavigator(
  {
    List: ListScreen,
    AddRetail: StackScreen,
    NewRetail: NewStackScreen,
  },
  {
    initialRouteName: 'List',
    /* The header config from HomeScreen is now here */
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
      headerTintColor: red,
      headerTitleStyle: {
        fontWeight: 'italic',
      },
    },
  }
);

const Tscreen = createMaterialTopTabNavigator(
  {
    Tf: {
      screen: GenericListScreen,
      navigationOptions: {
        tabBarLabel: 'Save Me',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={'ios-heart-half'}
            />
          </View>
        ),
      },
    },
    Tl: {
      screen: AdminTfScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={'ios-compass'}
            />
          </View>
        ),
      },
    },
    Tr: {
      screen: AdminTretailScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={'ios-compass'}
            />
          </View>
        ),
      },
    },
  },
  {
    //pagerComponent: ViewPagerAdapter,
    initialRouteName: 'Tf',
    swipeEnabled: true,
    lazy: true,
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
    style: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: backgroundcolor,
    },
  }
);

const AdminScreen = createMaterialTopTabNavigator(
  {
    AdminT: {
      screen: AdminPScreen,
      navigationOptions: {
        tabBarLabel: 'Save Me',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={'ios-heart-half'}
            />
          </View>
        ),
      },
    },
    AdminF: {
      screen: GenericListScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={'ios-compass'}
            />
          </View>
        ),
      },
    },
    AdminL: {
      screen: AdminTfScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={'ios-compass'}
            />
          </View>
        ),
      },
    },
    AdminR: {
      screen: AdminTretailScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={'ios-compass'}
            />
          </View>
        ),
      },
    },
  },
  {
    //pagerComponent: ViewPagerAdapter,
    swipeEnabled: true,
    lazy: true,
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
    style: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: backgroundcolor,
    },
  }
);
const rightTab = createSwitchNavigator(
  {
    Load: LoadScreen,
    F: Fscreen,
    T: Tscreen,
    Admin: AdminScreen,
  },
  {
    initialRouteName: 'Load',
  }
);

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Left: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={'ios-settings'}
            />
          </View>
        ),
      },
    },
    Middle: {
      screen: ListView,

      navigationOptions: {
        tabBarLabel: 'Analytics',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-pulse'} />
          </View>
        ),
        /*activeColor: '#f60c0d',
        inactiveColor: '#f65a22',
        barStyle: { backgroundColor: '#f69b31' },*/
      },
    },
    Right: {
      screen: rightTab,
      navigationOptions: {
        tabBarLabel: 'Data',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-list'} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Middle',
    activeColor: red,
    inactiveColor: blue,
    barStyle: { backgroundColor: tabtheme },
    shifting: true,
  }
);

/*let TabContainer = connect(state => ({
  colorScheme: state.colorScheme,
  user: state.user,
}))(TabNavigator);
*/
const loginSwitcher = createSwitchNavigator(
  {
    Loading: Loading,
    Login: Login,
    Signup: Login,
    Reset: Reset,
    App: TabNavigator,
    //Auth: AuthStack,
  },
  {
    initialRouteName: 'Loading',
  }
);
const AppContainer = createAppContainer(loginSwitcher);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

/*
const PanicSwitcher = createSwitchNavigator(
  {
    Panic: Panic,
    PanicScreen: PanicScreen,
    //Auth: AuthStack,
  },
  {
    initialRouteName: 'Panic',
  }
);
class rightTab extends React.Component{
  render(){
    let result;
          console.log("rightTab class invoked")
        if(this.props.user.userType == 'T'){
          result = AppNavigator
        }else if(this.props.user.userType == 'admin'){
          result = PanicSwitcher
        }

    return(
      {result}
    )
  }
}
const mapStoretoProps = state => ({
  colorScheme: state.colorScheme,
  user: state.user,
});
const rightTabRedux = connect(mapStoretoProps)(rightTab);

TopTabNavigator options:
    tabBarOptions: {
      
      activeTintColor: red,
      inactiveTintColor: blue,
      upperCaseLabel: false,
      showIcon: true,
      showLabel: false,
      indicatorStyle: {
        backgroundColor: tabtheme,
      },
      tabStyle: {
        alignSelf: 'center',
      },
      style: {
        width: '50%',
        alignSelf: 'center',
        backgroundColor: backgroundcolor,
      },
    },
*/
