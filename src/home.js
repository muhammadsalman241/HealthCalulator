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
    FooterTab
} from 'native-base';
import mainLogoWeb from './img/homeLogo.png';
import bgWeb from './img/homeBg.jpg';

const mainLogo = require('./img/homeLogo.png');
const bg = require('./img/homeBg.jpg');
const dataArray = [
    {
      title: "Welcome",
      content:
        "This Health Calculator able you to calculate your Body Mass Index and keep care of your health accordingly, it also offers you to calculate your age, Be happy and take Care your self!"
    },
    {
      title: "BMI Calculator",
      content:
        "BMI expresses the relationship between your height and weight as a single number that is not dependent on “frame size.”  it is fairly new as a measure of health."
    },
    {
      title: "Age Calculator",
      content:
        "Aging is the process of becoming older, Human beings and members of other species, especially animals, necessarily experience aging and mortality, Calculate your age and be live happy!"
    }
  ];


export default class Home extends Component{
    render(){
        return(
            <Container style={{paddingTop: Constants.statusBarHeight}}>
                <Header style={{ backgroundColor: "#3b3bff" }} androidStatusBarColor="#00003b">
                    <Body style={{alignItems:'center'}}>
                        <Title>Health Calculator</Title>
                    </Body>
                </Header>
                <ImageBackground source={Platform.OS == 'web'? bgWeb:bg} style={styles.imageContainer} imageStyle={{resizeMode: 'stretch'}}>
                    <View style={{flex:1, justifyContent:'space-around'}}>
                        <View style={styles.logoContainer}>
                            <Image source={Platform.OS == 'web'? mainLogoWeb: mainLogo} style={styles.logo} />
                        </View>
                        <Accordion
                            contentContainerStyle={styles.detailsOutter}
                            dataArray={dataArray}
                            animation={true}
                            expanded={true}
                            headerStyle={{ backgroundColor: "#b7daf8" }}
                            contentStyle={styles.details}
                            expanded={0}
                        />
                    </View>
                </ImageBackground>
                <Footer style={{ backgroundColor: "#3b3bff" }} >
                    <FooterTab >
                        <Button active={true} style={{ backgroundColor: "#3b3bff" }} onPress={() => {this.props.navigation.push('home')}}>
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
                    </FooterTab>
                </Footer>
          </Container>
        );
    }
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({  
    imageContainer: {
        flex: 1,
        width: null,
        height: null,
    },
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