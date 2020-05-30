import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  Picker,
  Modal,
  TouchableHighlight,
} from 'react-native';

import Constants from 'expo-constants';

import { store } from '../redux/store';
import { Card } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryStack,
  VictoryLabel,
  Bar,
} from 'victory-native';
import Svg from 'react-native-svg';
import { _analyticsHydrate } from '../api.js';
import Pie from './pie.js';
//import { theme } from './victoryTheme.js';

class Analytics extends React.Component {
  analyticsConstructor = () => {
    //console.log('Calling _analyticsHydrate');
    _analyticsHydrate(this.props.data);
  };
  state = {
    data: [
      { x: 1, y: 13000 },
      { x: 2, y: 16500 },
      { x: 3, y: 14250 },
      { x: 4, y: 19000 },
      { x: 5, y: 19000 },
    ],
    pieData: [],
    sPie: '',
    sProducts: [],
    bList: [],
    modalVisible: false,
    modalData: [],
    selectARegion: '',
  };
  setModalVisible = visible => {
    if (this.props.user.userType === 'F') {
      this.setState({ modalVisible: false });
    } else {
      this.setState({ modalVisible: visible });
    }
  };

  setSelectedValue(itemValue, itemIndex) {
    //console.log('Changing index', itemIndex, itemValue);
    var pie = this.props.analytics.pie[itemIndex][1];
    //console.log('pie returned', pie);
    var returnVal = [];
    pie.map(function(each, index) {
      if (each[1] !== 0) {
        var str = each[0];
        //console.log("radius",str,each[1],radiusCount)
        returnVal.push({ x: str, y: each[1], label: each[1] });
      }
    });
    this.setState({ pieData: returnVal, sPie: itemValue });
  }
  barClickHandler(evt) {
    for (let key in evt) {
      //console.log('key', key, 'value', evt[key]);
    }
  }
  fnum = x => {
    if (isNaN(x)) return x;

    if (x < 9999) {
      return x;
    }

    if (x < 1000000) {
      return Math.round(x / 1000) + 'K';
    }
    if (x < 10000000) {
      return (x / 1000000).toFixed(2) + 'M';
    }

    if (x < 1000000000) {
      return Math.round(x / 1000000) + 'M';
    }

    if (x < 1000000000000) {
      return Math.round(x / 1000000000) + 'B';
    }

    return '1T+';
  };
  modalData = () => {
    var data = [];
    var count = 0;
    this.props.analytics.bar.productsTop.map(pro => {
      var p = pro[0];
      var indexP = Object.keys(this.props.products).indexOf(p);
      //console.log('indexP', indexP, p);
      var topTerr = this.props.analytics.bar.terrTop[count];
      count = count + 1;
      var obj = {};
      var supervisorAmount = this.props.analytics.bar.allSupervisor[indexP][1];
      var val1 = topTerr[0][1][indexP][1] * this.props.products[p];
      var val2 = topTerr[1][1][indexP][1] * this.props.products[p];
      var val3 = topTerr[2][1][indexP][1] * this.props.products[p];
      var val4 = supervisorAmount * this.props.products[p];
      val1 = this.fnum(val1);
      val2 = this.fnum(val2);
      val3 = this.fnum(val3);
      val4 = this.fnum(val4);
      obj = {
        product: p,
        terr1: topTerr[0][0],
        val1: val1,
        terr2: topTerr[1][0],
        val2: val2,
        terr3: topTerr[2][0],
        val3: val3,
        terr4: 'Supervisor',
        val4: val4,
      };

      data.push(obj);
    });
    //console.log('modalData', data);
    this.setState({ modalData: data });
  };
  pieSet = () => {
    this.setState({ sPie: this.props.analytics.pie[0][0] }, function() {
      this.setSelectedValue(this.state.sPie, 0);
      var dum = [];
      this.props.analytics.pie.map(function(each) {
        //console.log('each', each);
        dum.push(each[0]);
      });
      this.setState({ sProducts: dum });
      //console.log('sProducts||||||||||', this.state.sProducts);
    });
  };
  bListSet = dumdum => {
    this.setState({ bList: dumdum });
  };
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      try {
        /*console.log(
          'middle tab component update: ',
          store.getState(),
          this.props.analytics.pie[0][1]
        );*/
        if (this.props.user.userType !== 'F') {
          this.modalData();
        }
        this.pieSet();
        var dumdum = [];
        this.props.analytics.bar.productsTop.map(function(list) {
          var scaled = list[1]/1000
          scaled = Number(scaled.toFixed(2))
          dumdum.push({ x: list[0], y: scaled });
        });
        this.bListSet(dumdum);
      } catch (err) {
        console.log(err);
      }
    }
  }
  render() {
    try {
      /*console.log(
        'middle tab: ',
        store.getState(),
        this.props.analytics.pie[0][1]
      );*/
      if (this.state.sPie === '') {
        if (this.props.user.userType === 'admin') {
          this.setState({ selectARegion: 'Select a territory' });
        } else if (this.props.user.userType === 'T') {
          this.setState({ selectARegion: 'Select a F.O' });
        } else if (this.props.user.userType === 'F') {
          this.setState({ selectARegion: 'Select a retailor' });
        }

        if (this.props.user.userType !== 'F') {
          this.modalData();
        }
        this.setState({ sPie: this.props.analytics.pie[0][0] }, function() {
          this.setSelectedValue(this.state.sPie, 0);
          var dum = [];
          this.props.analytics.pie.map(function(each) {
            //console.log('each', each);
            dum.push(each[0]);
          });
          this.setState({ sProducts: dum });
          //console.log('sProducts||||||||||', this.state.sProducts);
        });
        var dumdum = [];
        this.props.analytics.bar.productsTop.map(function(list) {
          var scaled = list[1]/1000
          scaled = Number(scaled.toFixed(2))
          dumdum.push({ x: list[0], y: scaled });
        });
        this.setState({ bList: dumdum });
      }
    } catch (err) {
      console.log(err);
    }
    //console.log('Products from fs: ', this.props.products);

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
              Analytics
            </Text>
            <Text
              style={[
                styles.nexttext,
                { color: this.props.colorScheme.textcolor },
              ]}>
              {' '}
              Product and territorial analysis{' '}
            </Text>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <ScrollView
                style={[
                  styles.modalView,
                  { backgroundColor: this.props.colorScheme.backgroundcolor },
                ]}>
                {this.state.modalData.map((modal, key) => (
                  <View>
                    <Text
                      style={[
                        styles.modalText,
                        { color: this.props.colorScheme.primarybutton },
                      ]}>
                      {modal.product}
                    </Text>
                    <Text
                      style={{
                        color: this.props.colorScheme.textcolor,
                        fontSize: 15,
                      }}>
                      {modal.terr1 +
                        ' : ₹' +
                        modal.val1 +
                        '\n' +
                        modal.terr2 +
                        ' : ₹' +
                        modal.val2 +
                        '\n' +
                        modal.terr3 +
                        ' : ₹' +
                        modal.val3 +
                        '\n' +
                        modal.terr4 +
                        ' : ₹' +
                        modal.val4 +
                        '\n\n\n'}
                    </Text>
                  </View>
                ))}

                <TouchableHighlight
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#2196F3',
                    marginBottom: 72,
                  }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Close Modal</Text>
                </TouchableHighlight>
              </ScrollView>
            </View>
          </Modal>

          <Card
            containerStyle={{
              backgroundColor: this.props.colorScheme.tabtheme,
              margin: 7,
              width: '100%',
              height: '100%',
              elevation: 4,
              paddingBottom: 27,
            }}>
            <Svg
              style={{
                fill: this.props.colorScheme.tabtheme,
                backgroundColor: this.props.colorScheme.tabtheme,
              }}>
              <VictoryChart
                width={400}
                theme={VictoryTheme.material}
                domainPadding={{ x: [20, 20] }}>
                <VictoryBar
                  style={{
                    parent: {
                      backgroundColor: this.props.colorScheme.backgroundcolor,
                      color: this.props.colorScheme.textcolor,
                    },
                    labels: {
                      fontSize: 15,
                      fill: this.props.colorScheme.textcolor,
                    },
                    data: {
                      fill: this.props.colorScheme.secondarybutton,
                    },
                  }}
                  data={this.state.bList}
                  dataComponent={
                    <Bar
                      events={{
                        onPressIn: evt => this.setModalVisible(true),
                      }}
                    />
                  }
                  labels={({ datum }) => datum.y}
                  labelComponent={<VictoryLabel dy={30} />}
                />
              </VictoryChart>
            </Svg>
          </Card>
          <Card
            style={{
              backgroundColor: this.props.colorScheme.backgroundcolor,
              borderRadius: 15,
              width: '100%',
              elevation: 0,
              paddingTop: 27,
            }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              {this.state.selectARegion}
            </Text>
            <Picker
              selectedValue={this.state.sPie}
              style={{
                width: '72%',
                textAlign: 'center',
                backgroundColor: this.props.colorScheme.primarybutton,
                color: this.props.colorScheme.textcolor,
                height: 50,
                alignSelf: 'center',
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setSelectedValue(itemValue, itemIndex)
              }
              mode="dropdown">
              {this.state.sProducts.map((product, key) => (
                <Picker.Item label={product} value={product} key={key} />
              ))}
            </Picker>
          </Card>
          <Card
            style={{
              alignItems: 'center',
              alignContent: 'center',
              width: '100%',
              height: '100%',
              elevation: 0,
              backgroundColor: this.props.colorScheme.backgroundcolor,
            }}>
            <Pie data={this.state.pieData} />
          </Card>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '77%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 27,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

const mapStoretoProps = state => ({
  colorScheme: state.colorScheme,
  products: state.products,
  analytics: state.analytics,
  user: state.user,
  data: state.data,
});
export default connect(mapStoretoProps)(Analytics);
