import React, { Component} from "react";
import { Image, ImageBackground, View, StyleSheet, Dimensions, Platform } from "react-native";
import Constants from 'expo-constants';
import { 
    Container,
    Header, 
    Content, 
    Footer, 
    Title, 
    Button, 
    Left, 
    Right, 
    Body, 
    Icon,
    Text , 
    Subtitle,
    DatePicker,
    FooterTab
} from 'native-base';
import Calculator from './calculator';
import mainLogoWeb from '../img/a_logo.png';
import bgWeb from '../img/greenBg.jpg';

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
            <Container style={{paddingTop: Constants.statusBarHeight}}>
                <Header style={{ backgroundColor: "#006200" }} androidStatusBarColor="#006200">
                    <Left>
                        <Button transparent onPress={() => {this.props.navigation.navigate('home')}}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Age Calculator</Title>
                        <Subtitle>Calculate Your Age</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <ImageBackground source={Platform.OS == 'web'? bgWeb:bg} style={styles.imageContainer} imageStyle={{resizeMode: 'stretch'}}>
                     <View style={{flex:1, justifyContent:'space-around'}}>
                        <View style={styles.logoContainer}>
                            <Image source={Platform.OS =='web'? mainLogoWeb:mainLogo} style={styles.logo} />
                        </View>
                        <View style={[styles.box_style, {flex:2}]}>
                            <Text style={styles.title}>Select the Dates</Text>
                            <View style={styles.pickerStyle}>
                                {
                                    (Platform.OS === 'web')?
                                        <input type="date" onChange={(event) => this.setStart(new Date(event.target.value))}/>
                                    :
                                        <DatePicker
                                            defaultDate={new Date(1997, 0, 0)}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            androidMode={"default"}
                                            placeHolderText={"Select Your Birth Date"}
                                            textStyle={{ color: "green", fontWeight:'bold'}}
                                            disabled={false}
                                            onDateChange={this.setStart}
                                        />
                                }
                            </View>
                            <View style={styles.pickerStyle}>
                                {
                                    (Platform.OS === 'web')?
                                        <input type="date" onChange={(event) => this.setEnd(new Date(event.target.value))}/>
                                    :
                                        <DatePicker
                                            defaultDate={new Date()}
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"fade"}
                                            androidMode={"default"}
                                            placeHolderText={"Select (Age as on) Date"}
                                            textStyle={{ color: "red", placeHolderColor: 'red', fontWeight:'bold' }}
                                            disabled={false}
                                            onDateChange={this.setEnd}
                                        />
                                }
                            </View>
                        </View>
                        <View style={ (this.state.show)? [styles.box_style, {flex:0.8, alignItems:'center'}]:{margin:10, padding:10} }>
                            {result}
                        </View>
                        <View style={{flex:1}}>
                            <Button
                                style={[styles.box_style, {alignSelf: 'center', marginVertical:0}]}
                                onPress={() => this.setState({show: (this.state.bdate != undefined && this.state.enddate != undefined), ageCal: new Calculator(this.state.bdate, this.state.enddate)})}
                            >
                                <Text>Calculate Age</Text>
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
                <Footer style={{ backgroundColor: "#006200" }} >
                <FooterTab >
                        <Button active={false} style={{ backgroundColor: "#006200" }}  onPress={() => {this.props.navigation.navigate('home')}}>
                            <Icon active={false} type="FontAwesome" name="home" />
                            <Text style={styles.footerTxt}>Home</Text>
                        </Button>
                        <Button active={true} style={{ backgroundColor: "#006200" }}  onPress={() => {this.props.navigation.push('age')}}>
                            <Icon active={true} type="FontAwesome" name="hourglass-half" />
                            <Text style={styles.footerTxt}>Age Calculator</Text>
                        </Button>
                        <Button active={false} style={{ backgroundColor: "#006200" }}  onPress={() => {this.props.navigation.navigate('bmi')}}>
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
        flex:2,
        alignItems:'center',
        justifyContent:'space-around'
    },
    logo: {
        height: (deviceWidth > deviceHeight)? deviceHeight/4:deviceWidth/2.9,
        width: (deviceWidth > deviceHeight)? deviceHeight/2:deviceWidth/1.5,
        borderColor: 'white',
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 0.7
    },
    title: {
        color:'#ffffff',
        fontSize: (Platform.OS == 'web')? deviceWidth/30:deviceWidth/12,
        fontWeight:'700', 
        textAlign: 'center', 
        textDecorationLine: 'underline'
    },
    pickerStyle:{
        backgroundColor: '#ffffff', 
        borderColor: '#105E51', 
        borderTopRightRadius: 20,
        borderWidth: 2, 
        alignItems:'center',
        ...Platform.select({
            web:{
                padding:deviceHeight/70,
                backgroundColor: 'rgba(27, 134, 116, 0.6)'
            }
        })
    },
    box_style: {
        backgroundColor: 'rgba(27, 134, 116, 0.4)',
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 2.5,
        borderColor: '#ffffff',
        alignContent: 'center',    
        justifyContent:'space-around',
        marginHorizontal: deviceWidth/10,
        marginVertical:5,
        padding:5,
        paddingHorizontal: deviceWidth/12
    },
    footerTxt:{
        fontSize: (deviceWidth > deviceHeight )? deviceHeight/70:deviceWidth/45
    }
});