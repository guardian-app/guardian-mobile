import React, {Component} from 'react';
import {Platform,Dimensions, StyleSheet, Text, View,SafeAreaView} from "react-native";
import MapView, {Marker, AnimatedRegion} from "react-native-maps";
import PubNubReact from "pubnub-react";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ASPECT_RATIO = Width / Height;

export default class Location extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      latitude: 0,
      longitude: 0,
      error: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null
      });
    }, 
    error => this.setState({error: error.message}),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
    );
    
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  render() {
    return(
      <View Style = {styles.container}>
        <MapView
          onPress={e => console.log(e.nativeEvent)}
          style={styles.map}
          provider='google'
          mapType='mutedStandard'
          //camera="region"
          paddingAdjustmentBehavio="GoogleMaps"
          //liteMode={true}
          showsIndoorLevelPicker={true}
          cacheEnabled={true}
          loadingEnabled	={true}
          isAccessibilityElement	= {true}
          showsScale
          showsCompass
          showsPointsOfInterest
          showsBuildings
          showsUserLocation = {true}
          style={styles.map}
          region={{
            latitude: 6.927079,
            longitude: 79.861244,
            latitudeDelta: 2,
            longitudeDelta: 5
          }}
          onLayout={this.onMapLayout}
        >
          { this.state.isMapReady && 
            <Marker coordinate={this.state}/>
          }
        </MapView>  

      </View>
    )
  }
}

const styles =  StyleSheet.create({
  
  container: {
    flex: 1
  },
  map: {
    //flex: 1,
    height: Height,
    width: Width
  }
})