import React, { Component, } from 'react';
import { AppRegistry, StyleSheet, ScrollView, Alert, Text, Button, View, Image, TouchableHighlight, Picker, TextInput, TouchableOpacity, PixelRatio, NativeModules, CameraRoll } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CheckBox } from 'react-native-elements';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { RNCamera } from 'react-native-camera';

class HomeScreen extends React.Component {
  state = {type: '', typeName: 'Évenement', typeStyle: styles.h1, checked: false};

  radio_props = [
    {label: 'Materiel', value: 0 },
    {label: 'Humain', value: 1 },
    {label: 'Environnement', value: 2 },
  ];

  updateType = (NewType) => {
    this.state.type = NewType;
    if(NewType === "accident"){
      this.state.typeName = "Accident";
      if(this.state.checked){
        this.state.typeStyle = [styles.h1, styles.ACCrit];
      } else {
        this.state.typeStyle = [styles.h1, styles.ACCbas];
      }
      
    } else if(NewType === "nearmiss") {
      this.state.typeName = "Presque Accident";
      if(this.state.checked){
        this.state.typeStyle = [styles.h1, styles.NMCrit];
      } else {
        this.state.typeStyle = [styles.h1, styles.NMbas];
      }
    } else {
      this.state.typeName = "Évenement";
      this.state.typeStyle = [styles.h1];
    };
    this.setState({})
  }
  

  render() {
    const { navigation } = this.props;
    const testing = navigation.getParam('testing');
    if(testing == null){
      console.log("empty");
      console.log(testing);
    } else {
      console.log("not empty");
      console.log(testing);
      
    }
        radioButtonView=
          <View>
            <Text style = {styles.h2}>Classification :</Text>
            <RadioForm
              style={styles.radioButtonView}
              radio_props={this.radio_props}
              initial={0}
              onPress={(value) => {this.setState({value:value})}}
              buttonColor={'black'}
              selectedButtonColor={'black'}
              buttonSize={15}
              borderWidth={0.5}
            />
          </View>

     return (
      //
      <ScrollView>
        <Text style = {this.state.typeStyle} >Declarer un {this.state.typeName}</Text>
        <View>
          <Text style = {styles.h2}>Type : </Text>
          <Picker 
            selectedValue = {this.state.type} 
            onValueChange = {this.updateType}
            mode = "dropdown"
            >
            <Picker.Item label = "Merci de choisir une option" value = "null" />
            <Picker.Item label = "Accident" value = "accident" />
            <Picker.Item label = "Presque Accident" value = "nearmiss" />
          </Picker>
        </View>

        {this.state.type==="accident" ? radioButtonView : <View></View>} 

        <View style={styles.critCheckBox}>
          <CheckBox
            title={this.state.typeName+' critique ?'}
            checked={this.state.checked}
            onPress = {() => {this.setState({checked:!this.state.checked});this.updateType}}
            iconRight={true}
          />
        </View>
        <View>
          <Text style = {styles.h2}>Description : </Text>
          <TextInput
            editable = {true}
            maxLength = {40}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            multiline = {true}
            numberOfLines = {4}
            style={styles.descriptionText}
          />
        </View>
        {testing ? <Image source={{'uri' : testing}} style={{width: 300, height: 300, alignSelf: 'center'}} /> : <View></View>}
        <View style = {styles.buttonNavigationView}>
          <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
            <View style={[styles.buttonNavig, styles.buttonCancel]}>
              <Text style={[styles.buttonTextNavig, styles.buttonTextCancel]}>Annuler</Text>
            </View>
          </TouchableHighlight>
          
          <TouchableHighlight onPress={() => this.props.navigation.navigate('SecondScreen')} underlayColor="white">
            
            <View style={[styles.buttonNavig, styles.buttonNext]}>
              <Text style={[styles.buttonTextNavig, styles.buttonTextNext]}>Photo</Text>
            </View>
          </TouchableHighlight>
        </View>

      </ScrollView>
     )
  }
}

class SecondScreen extends React.Component {

  render() {
    //const { navigation } = this.props;
    //const testing = navigation.getParam('testing', 'TEST');
    return (
    // <ScrollView>

    //<Text>{JSON.stringify(testing)}</Text>
      
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            //onPress={this.takePicture.bind(this)}
            //onPress={() => this.props.navigation.navigate('Home', {testing : this.takePicture.bind(this)})}
            
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> O </Text>
        </TouchableOpacity>
        </View>
      </View>
            

  //     <View style = {styles.buttonNavigationView}>
  //     <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
  //       <View style={[styles.buttonNavig, styles.buttonCancel]}>
 //         <Text style={[styles.buttonTextNavig, styles.buttonTextCancel]}>Annuler</Text>
  //       </View>
  //     </TouchableHighlight>
  //     <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')} underlayColor="white">
  //       <View style={[styles.buttonNavig, styles.buttonNext]}>
  //         <Text style={[styles.buttonTextNavig, styles.buttonTextNext]}>Précédent</Text>
  //       </View>
  //     </TouchableHighlight>
  //   </View>
  // </ScrollView>
    );
  }

  /*
  export function takePicture2(this) {
    let val;
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log("----------");
      console.log(data);
      console.log("---------");
      console.log(data.uri);
      val = data.url;
    }

    return val;
  };
  */

  takePicture = async function() {
    
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      //console.log("----------");
      //console.log(data);
      //console.log("---------");
      //console.log(data.uri);
      this.props.navigation.navigate('Home', {testing : data.uri})
    }
  };
}


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    SecondScreen: {
      screen: SecondScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  h1: {
     fontSize: 18,
     alignSelf: 'center',
     margin: 18,
     marginTop:30,
     fontWeight: 'bold',
  },
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 8,
  },
  ACCrit: {
    color: 'red',
  },
  ACCbas: {
    color: 'orange',
  },
  NMCrit: {
    color: 'olive',
  },
  NMbas: {
    color: 'green',
  },
  buttonNavig: {
    margin: 30,
    width: 120,
  },
  buttonTextNavig: {
    padding: 10,
    alignSelf: 'center',
  },
  buttonNext: {
    backgroundColor: '#2196F3'
  },
  buttonCancel: {
    backgroundColor: 'white'
  },
  buttonTextNext: {
    color: 'white'
  },
  buttonTextCancel: {
    color: '#2196F3'
  },
  radioButtonView: {
    padding: 10
  }, 
  critCheckBox: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  descriptionText: {
    margin: 5,
    height: 100, 
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonNavigationView: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

    container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})

