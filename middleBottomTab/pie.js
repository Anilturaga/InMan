import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
} from 'victory-native';
import Svg from 'react-native-svg';

const data = [
  { x: 1, y: 13000,label: "h" },
  { x: 2, y: 16500,label: "e" },
  { x: 3, y: 14250,label: "l" },
  { x: 4, y: 19000 ,label: "l"},
];

export default class App extends React.Component {
  render() {
      console.log(this.props)
    return (
        <Svg>
          <VictoryPie
                theme={VictoryTheme.material}
                labelRadius={({ innerRadius }) => innerRadius + 27 }
                style={{
                    labels: {
                      fontSize: 15,
                      fill: 'black',
                    },
                  }}
          innerRadius={72}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPressIn: datum => {
                    return [
                      {
                        target: 'data',
                        mutation: ({ style }) => {
                          return style.fill === '#3D8BC6'
                            ? null
                            : { style: { fill: '#3D8BC6' } };
                        },
                      },
                      {
                        target: 'labels',
                        mutation: props => {
                          console.log(props.data[props.index]['x'])

                          return props.text === props.data[props.index]['x']
                            ? null
                            : { text: props.data[props.index]['x'] };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            data={this.props.data}
          />
        </Svg>
    );
  }
}
