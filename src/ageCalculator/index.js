import React, { Component} from "react";
import { Image, ImageBackground, View, StyleSheet, Dimensions, Platform } from "react-native";
import { 
    Container,
    Header, 
    Content, 
    Footer, 
    Card,
    CardItem,
    Title, 
    Button, 
    Left, 
    Right, 
    Body, 
    Icon, 
    H3, 
    Text , 
    Subtitle,
    DatePicker
} from 'native-base';
import Calculator from './calculator';

const mainLogo = require('../img/a_logo.png');
const bg = require('../img/greenBg.jpg');

export default class AgeCalculator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            bdate: null,
            enddate: null,
            ageCal: new Calculator(null, null)
        };
        this.setStart = this.setStart.bind(this);
        this.setEnd = this.setEnd.bind(this);
    }    
    setStart(newDate) {
        this.setState({ bdate: newDate });
    }
    setEnd(newDate) {
        this.setState({ enddate: newDate });
    }
    render(){
        const result =  this.state.ageCal.getAge();
        return(
            <Container>
                <Header style={{ backgroundColor: "#006200" }} androidStatusBarColor="#006200">
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Age Calculator</Title>
                        <Subtitle>Calculate Your Age</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ImageBackground source={bg} style={styles.imageContainer} imageStyle={{resizeMode: 'stretch'}}>
                     <Content>
                        <View style={styles.logoContainer}>
                            <Image source={mainLogo} style={styles.logo} />
                        </View>
                        <View style={styles.box_style}>   
                            <Text style={styles.title}>Select the Dates</Text>
                            <View style={styles.pickerStyle}>
                                <DatePicker
                                    defaultDate={new Date(1997, 0, 0)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText={"Select Your Birth Date"}
                                    textStyle={{ color: "green", fontWeight:'200'}}
                                    disabled={false}
                                    onDateChange={this.setStart}
                                />
                            </View>
                            <View style={styles.pickerStyle}>
                                <DatePicker
                                    defaultDate={new Date()}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText={"Select (Age as on) Date"}
                                    textStyle={{ color: "red", fontWeight:'200' }}
                                    disabled={false}
                                    onDateChange={this.setEnd}
                                />
                            </View>
                        </View>
                        <View style={ (this.state.show)? styles.box_style:{margin:20, padding:20} }>
                            {result}
                        </View>
                        <View style={{ marginBottom: 80 }}>
                            <Button
                                style={{...styles.pickerStyle, alignSelf: "center", backgroundColor: '#0099CC' }}
                                onPress={() => this.setState({show: (this.state.bdate != undefined && this.state.enddate != undefined), ageCal: new Calculator(this.state.bdate, this.state.enddate)})}
                            >
                                <Text>Calculate Age</Text>
                            </Button>
                        </View>
                    </Content>
                </ImageBackground>
                <Footer style={{ backgroundColor: "#006200" }} >
                <FooterTab>
                        <Button active={false} onPress={() => {}}>
                            <Icon active={false} type="FontAwesome" name="home" />
                            <Text>Home</Text>
                        </Button>
                        <Button active={true} onPress={() => {}}>
                            <Icon active={true} type="FontAwesome" name="hourglass-half" />
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
    },
    text: {
        color: "#D8D8D8",
        bottom: 6,
        marginTop: 5
    },
    title: {
        color:'white',
        fontSize:20, 
        fontWeight:'bold', 
        textAlign: 'center', 
        textDecorationLine:'underline', 
        paddingBottom: 5
    },
    pickerStyle:{
        backgroundColor: '#05B8CC', 
        borderColor: 'blue', 
        borderTopRightRadius: 20,
        borderWidth: 2, 
        marginBottom: 20,
    },
    box_style: {
        backgroundColor: '#33A1DE',
        borderWidth: 2.5,
        borderColor: 'blue',
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        alignContent: 'center',
        alignItems: 'center',        
        margin:20,
        padding:20
    }
});