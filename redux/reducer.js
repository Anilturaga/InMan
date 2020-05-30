import { combineReducers } from 'redux';

import {
  UPDATE_THEME,
  SIGNUP,
  DATA_DOWNLOAD,
  PRODUCTS_LIST,
  LOG_OUT,
  ANALYTICS
} from './actions';

const merge = (prev, next) => Object.assign({}, prev, next);

const createUserReducer = (
  state = { username: '', password: '', userID: '', error: '' },
  action
) => {
  switch (action.type) {
    case SIGNUP:
      var temp = merge(state, action.payload);
      console.log(
        'temp',
        temp,
        'action',
        action.payload,
        'merge',
        merge(state, temp)
      );
      return merge(state, temp);
    case LOG_OUT:
    return {username: '', password: '', userType: '', error: ''}
    default:
      //console.log('Def', state);
      return state;
  }
};
const logoutReducer = (
  state = {
    user: { username: '', password: '', userType: '', error: '',userID: '' },
    data: {},
    colorScheme: {
      tabtheme: '#eee',
      backgroundcolor: 'white',
      textcolor: 'black',
      primarybutton: '#3D8BC6',
      secondarybutton: '#1ABC9C',
    },
    products: {},
  },
  action
) => {
  switch (action.type) {
    case LOG_OUT:
    console.log("logout reducer returning")
      return {
        user: { username: '', password: '', userType: '', error: '' },
        data: {},
        colorScheme: state.colorScheme,
        products: state.products,
      };
    default:
      return {
        user: { username: '', password: '', userType: '', error: '' },
        data: {},
        colorScheme: state.colorScheme,
        products: state.products,
      };
  }
};

const themeReducer = (
  state = {
    tabtheme: '#eee',
    backgroundcolor: 'white',
    textcolor: 'black',
    primarybutton: '#3D8BC6',
    secondarybutton: '#1ABC9C',
  },
  action
) => {
  switch (action.type) {
    case UPDATE_THEME:
      if (action.payload.tabtheme === '#202020') {
        action.payload = {
          tabtheme: '#eee',
          backgroundcolor: 'white',
          textcolor: 'black',
          primarybutton: '#3D8BC6',
          secondarybutton: '#1ABC9C',
        };
      } else {
        action.payload = {
          tabtheme: '#202020',
          backgroundcolor: 'black',
          textcolor: 'white',
          primarybutton: '#3D8BC6',
          secondarybutton: '#1ABC9C',
        };
      }
      return merge(state, action.payload);
    default:
      return state;
  }
};
const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case DATA_DOWNLOAD:
      return merge(state, action.payload);
    case LOG_OUT:
    return {}
    default:
      return state;
  }
};
const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_LIST:
      return merge(state, action.payload);
    default:
      return state;
  }
};
const analyticsReducer = (state = {}, action) => {
  switch (action.type) {
    case ANALYTICS:
      return merge(state, action.payload);
    case LOG_OUT:
    return {}
    default:
      return state;
  }
};
function reducer(state = {}, action) {
  return {
    colorScheme: themeReducer(state.colorScheme, action),
    user: createUserReducer(state.user, action),
    data: dataReducer(state.data, action),
    products: productsReducer(state.products, action),
    analytics: analyticsReducer(state.analytics,action)
  };
}

export default reducer;
