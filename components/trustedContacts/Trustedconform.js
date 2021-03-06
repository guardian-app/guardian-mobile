import React, { Component } from 'react';
import { View, StyleSheet, Button,Alert,Animated,Easing } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import t from 'tcomb-form-native';
import { ScrollView } from 'react-native-gesture-handler';

const Form = t.form.Form;

const Email = t.refinement(t.String, (email) => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});
const Password = t.refinement(t.String, (password) => {
  const reg = /^(?=\S+$).{8,}$/;
  console.log(reg.test(password))
  return reg.test(password);
}); 
const Mobile = t.refinement(t.String, (mobile)=>{
  const reg = /^\d{10}$/;
  return reg.test(mobile);
});
const nic = t.refinement(t.String, (NIC)=>{
  if(NIC.length == 10 || NIC.length == 12){
      return true;
  }
  else{
      return false;
  }
})

const User = t.struct({
  FirstName: t.String,
  LastName: t.String,
  mobile: Mobile,

});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

var values = {
  FirstName: localStorage.getItem("first_name"),
  LastName: localStorage.getItem("last_name"),
  mobile: localStorage.getItem("phone_number"),
};

const options = {
  fields: {
    FirstName : {
        error: 'provide your first name'
    }  ,
    LastName : {
        error: 'provide your last name'
    }  ,
   
    mobile: {
        keyboardType:'numeric',
        error: 'Please, provide correct phone number',
    },
   
  },
  stylesheet: formStyles,
};

const _onHome = () =>{

  setTimeout(() => {
    Actions.HomeScreen();
  }, 2300);
}

const _onAlert=()=> {
  setTimeout(() => {
    Actions.ChildRegScreen();
  }, 2300);
}

export default class App extends Component { 

 
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView  style = {{paddingTop: 20}}>
            <Form 
            ref={c => this._form = c}
            type={User} 
            options={options}
            value ={values}
            />

            <View style = {{paddingTop: 20}}>
              <Button
              
              color="#0020C2"
              title="OK"
              onPress={()=> {Actions.HomeScreen()}}
              />
            </View>

            <View style = {{paddingTop: 20, paddingBottom: 40}}>
              <Button
              color="#800080"
              title="UPDATE"
              //onPress={this.handleSubmit}
              />
            </View>
            
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    
  },
});
