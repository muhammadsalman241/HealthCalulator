import React, { Component} from "react";
import Constants from 'expo-constants';
import { Image, ImageBackground, View, StyleSheet, Dimensions, Platform, SafeAreaView  } from "react-native";
import { 
    Container,
    Header, 
    Content, 
    Footer, 
    Title, 
    Button, 
    Body, 
    Icon, 
    Text ,
    Accordion ,
    FooterTab,
    Left
} from 'native-base';


const mainLogo = require('../img/hisLogo.png');

export default class History extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Container style={{paddingTop: Constants.statusBarHeight}}>
                <Header style={{ backgroundColor: "#3b3bff" }} androidStatusBarColor="#00003b">
                    <Left>
                        <Button transparent onPress={() => {this.props.navigation.navigate('home')}}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Calculation History</Title>
                    </Body>
                </Header>
                <View style={{flex:1, justifyContent:'space-around'}}>
                    <View style={styles.logoContainer}>
                        <Image source={mainLogo} style={styles.logo} />
                    </View>
                </View>
                <Footer style={{ backgroundColor: "#3b3bff" }} >
                    <FooterTab >
                        <Button active={false} style={{ backgroundColor: "#3b3bff" }} onPress={() => {this.props.navigation.navigate('home')}}>
                            <Icon active={true} type="FontAwesome" name="home" />
                            <Text style={styles.footerTxt}>Home</Text>
                        </Button>
                        <Button active={false} style={{ backgroundColor: "#3b3bff" }} onPress={() => {this.props.navigation.navigate('age')}}>
                            <Icon active={false} type="FontAwesome" name="hourglass-half" />
                            <Text style={styles.footerTxt}>Age Calculator</Text>
                        </Button>
                        <Button active={false}  style={{ backgroundColor: "#3b3bff" }} onPress={() => {this.props.navigation.navigate('bmi')}}>
                            <Icon active={false} type="FontAwesome" name="universal-access" />
                            <Text style={styles.footerTxt}>BMI Calculator</Text>
                        </Button>
                        <Button active={true}  style={{ backgroundColor: "#3b3bff" }} onPress={() => {this.props.navigation.push('history')}}>
                            <Icon active={true} type="FontAwesome" name="history" />
                            <Text style={styles.footerTxt}>History</Text>
                        </Button>
                    </FooterTab>
                </Footer>
          </Container>
        );
    }
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({  
    logoContainer: {
        flex: (Platform.OS === 'web') ? 2 : 0.5,
        alignItems:'center',
        justifyContent:'space-around'
    },
    logo: {
        resizeMode:'contain',
        height: (deviceWidth > deviceHeight)? deviceHeight/4:deviceWidth/2.8,
        width: (deviceWidth > deviceHeight)? deviceHeight/2:deviceWidth/1.6,
    },
    details:{ 
        backgroundColor: "#ddecf8", 
        fontSize:deviceHeight/40, 
        fontWeight:'bold'
    },
    detailsOutter:{
        flex:2, 
        paddingHorizontal: deviceWidth/12,
        justifyContent:'flex-start'
    },
    footerTxt:{
        fontSize: (deviceWidth > deviceHeight )? deviceHeight/70:deviceWidth/45
    }
});