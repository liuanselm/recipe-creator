import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Animated, View, TouchableOpacity,  StyleSheet, StatusBar, } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Ingredients from './Ingredients'
import Directions from './Directions'
import Information from './Information';

export default class Add extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Ingredients' },
      { key: 'second', title: 'Directions' },
      { key: 'third', title: 'Info'}
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={{ opacity, color: 'tomato' }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = ({ route }) =>{
    switch (route.key){
      case 'first':
        return <Ingredients session={this.props.session}/>
      case 'second':
        return <Directions />
      case 'third':
        return <Information session={this.props.session}/>
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
