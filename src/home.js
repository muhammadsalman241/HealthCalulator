import React, { Component} from "react";
import { Image, ImageBackground, View, StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
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

import AgeCalculator from './ageCalculator/';
import BMICalculator from './bmiCalculator/';

const mainLogo = require('./img/homeLogo.png');
const bg = require('./img/homeBg.jpg');
const Stack = createStackNavigator();
const dataArray = [
    {
      title: "Welcome",
      content:
        ""
    },
    {
      title: "BMI Calculator",
      content:
        ""
    },
    {
      title: "Health Calculator",
      content:
        ""
    }
  ];


export default class Home extends Component{
    render(){
        return(
            <Container>
                <Header style={{ backgroundColor: "#3b3bff" }} androidStatusBarColor="#00003b">
                    <Body style={{alignItems:'center'}}>
                        <Title>Health Calculator</Title>
                    </Body>
                </Header>
                <ImageBackground source={bg} style={styles.imageContainer} imageStyle={{resizeMode: 'stretch'}}>
                    <Content>
                        <View style={styles.logoContainer}>
                            <Image source={mainLogo} style={styles.logo} />
                        </View>
                        <Accordion
                            dataArray={dataArray}
                            animation={true}
                            expanded={true}
                            headerStyle={{ backgroundColor: "#b7daf8" }}
                            contentStyle={{ backgroundColor: "#ddecf8" }}
                            expanded={0}
                            style={{paddingLeft:12, paddingRight:12}}
                        />
                    </Content>
                </ImageBackground>
                <Footer style={{ backgroundColor: "#3b3bff" }} >
                    <FooterTab>
                        <Button active={true} onPress={() => {}}>
                            <Icon active={true} type="FontAwesome" name="home" />
                            <Text>Home</Text>
                        </Button>
                        <Button active={false} onPress={() => {}}>
                            <Icon active={false} type="FontAwesome" name="hourglass-half" />
                            <Text>Age Calculator</Text>
                        </Button>
                        <Button active={false} onPress={() => {}}>
                            <Icon active={false} type="FontAwesome" name="universal-access" />
                            <Text>BMI Calculator</Text>
                        </Button>
                    </FooterTab>
                </Footer>
          </Container>
        );
    }
}

const deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({  
    imageContainer: {
        flex: 1,
        width: null,
        height: null,
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 30,
        marginBottom: 60
    },
    logo: {
        left: Platform.OS === "android" ? 40 : 50,
        top: Platform.OS === "android" ? 35 : 60,
        width: 280,
        height: 120,
        borderRadius: 10
    }
});