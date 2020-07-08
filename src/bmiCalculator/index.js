import React, {Component} from 'react';
import { Slider, ImageBackground, View, StyleSheet, Dimensions, Platform} from "react-native";
import Constants from 'expo-constants';
import AlertPro from "react-native-alert-pro";
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
    Text,
    Item,
    Input,
    FooterTab
} from 'native-base';
import CalculateBMI from './calculator';

const bg = require('../img/bmiBg.jpg');

export default class BMICalculator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            height: 0,
            weight: 0,
            data: {bmi: 0, status: ""}
        };
    }    
    render(){
        return(
            <Container style={{paddingTop: Constants.statusBarHeight}}>
                <Header style={{ backgroundColor: "#006d5b" }} androidStatusBarColor="#6dffe7">
                    <Left>
                        <Button transparent onPress={() => {this.props.navigation.navigate('home')}}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>BMI Calculator</Title>
                    </Body>
                    <Right />
                </Header>
                <ImageBackground source={bg} style={styles.imageContainer} imageStyle={{resizeMode: 'stretch'}}>
                    <View style={{flex:1, justifyContent:'space-around'}}>
                        <View style={[styles.container_style, {flex:1, justifyContent:'center'}]}>
                            <Text style={styles.title}>Calculate Your B.M.I</Text>
                        </View>
                        <View style={[styles.box_style, {flex:4, justifyContent:'space-evenly'}]}>
                            <Text style={styles.subtitle}>Select Your height (feet)</Text>
                             <Item rounded style={{borderColor: '#008080'}}>
                                <Input 
                                    style={styles.subtitle} 
                                    placeholder={this.state.height.toFixed(1)}
                                    keyboardType='number-pad'
                                    onSubmitEditing ={({ nativeEvent })=> {
                                        if(isNaN(nativeEvent.text) || nativeEvent.text=="")
                                            return;
                                        else
                                            this.setState({height:parseFloat(nativeEvent.text)});
                                    }}
                                />
                            </Item>
                            <View style={{padding:(Platform.OS === 'web')? 5:0}}>
                                {
                                    (Platform.OS === 'web')?
                                        <input type="range" value={this.state.height} min="0" max="10.4987" onChange={(event) => this.setState({height:parseFloat(event.target.value)})}/>
                                    :
                                        <Slider
                                            style={{width: 220, height: 80}}
                                            minimumValue={0}
                                            maximumValue={10.4987}
                                            value={this.state.height}
                                            minimumTrackTintColor="#00322a"
                                            maximumTrackTintColor="#006d5b"
                                            onValueChange={(n) => this.setState({height: n})}
                                        />
                                }
                            </View>
                            <Text style={styles.subtitle}>Select Your Weight (Kg)</Text>
                            <Item rounded style={{borderColor: '#008080'}}>
                                <Input 
                                    style={styles.subtitle} 
                                    placeholder={this.state.weight.toFixed(0)}
                                    keyboardType='number-pad'
                                    onSubmitEditing ={({ nativeEvent })=> {
                                        if(isNaN(nativeEvent.text) || nativeEvent.text=="")
                                            return;
                                        else
                                            this.setState({weight: parseInt(nativeEvent.text)});
                                    }}
                                />
                            </Item>
                            <View style={{padding:(Platform.OS === 'web')? 5:0}}>
                                {
                                    (Platform.OS === 'web')?
                                        <input type="range" value={this.state.weight} min="0" max="200" onChange={(event) => this.setState({weight:parseInt(event.target.value)})} />
                                    :
                                        <Slider
                                            style={{width: 220, height: 80}}
                                            minimumValue={0}
                                            maximumValue={200}
                                            value={this.state.weight}
                                            minimumTrackTintColor="#00322a"
                                            maximumTrackTintColor="#006d5b"
                                            step={1}
                                            onValueChange={(n) => this.setState({weight: n})}
                                        />
                                }
                            </View>
                            <View style={{position:'absolute', shadowColor:'white'}}>
                                {    
                                    (this.state.show)?
                                        <AlertPro
                                            ref={ref => {
                                                this.AlertPro = ref;
                                                if(this.state.show)
                                                    this.AlertPro.open();
                                            }}
                                            onConfirm={() => {
                                                this.AlertPro.close();
                                                this.setState({show:false})
                                            }}
                                            title= 'Your BMI is...'
                                            message= {this.state.data.bmi + "\nAnd it is " + this.state.data.status}
                                            textConfirm="Ok!"
                                            showCancel={false}
                                            closeOnPressMask={false}
                                            customStyles={{
                                                mask: {
                                                    backgroundColor: "transparent"
                                                },
                                                container: {
                                                    borderWidth: 1,
                                                    borderColor: "#00816b",
                                                    shadowColor: "#000000",
                                                    shadowOpacity: 0.1,
                                                    shadowRadius: 10
                                                },
                                                buttonConfirm: {
                                                    backgroundColor: "#00594b"
                                                },
                                                title: {
                                                    color:'#00cfad',
                                                    marginBottom:8
                                                },
                                                message: {
                                                    fontSize: 20,
                                                }
                                            }}
                                        />
                                    
                                    :
                                        <View></View>
                            }
                        </View>
                        </View>
                        <View style={{flex:1}}>
                            <Button
                                style={[styles.container_style, {alignSelf:'center'}]}
                                onPress={() => {
                                    if(this.state.height != 0 && this.state.weight != 0){
                                        this.setState({data: CalculateBMI(this.state.height, this.state.weight), show:true}); 
                                        if(this.AlertPro != undefined)
                                            this.AlertPro.open();
                                    }
                                }}
                            >
                                <Text style={{color:'#006666', fontWeight:'bold', fontSize:18}}>Calculate</Text>
                            </Button>
                        </View>
                    </View>
                </ImageBackground>
                <Footer style={{ backgroundColor: "#006d5b" }} >
                    <FooterTab>
                        <Button active={false} style={{ backgroundColor: "#006d5b" }} onPress={() => {this.props.navigation.navigate('home')}}>
                            <Icon active={false} type="FontAwesome" name="home" />
                            <Text style={styles.footerTxt}>Home</Text>
                        </Button>
                        <Button active={false} style={{ backgroundColor: "#006d5b" }} onPress={() => {this.props.navigation.navigate('age')}}>
                            <Icon active={false} type="FontAwesome" name="hourglass-half" />
                            <Text style={styles.footerTxt}>Age Calculator</Text>
                        </Button>
                        <Button active={true} style={{ backgroundColor: "#006d5b" }} onPress={() => {this.props.navigation.push('bmi')}}>
                            <Icon active={true} type="FontAwesome" name="universal-access" />
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
        marginTop: deviceHeight / 15,
        marginBottom: 15
    },
    title: {
        color:'#006666',
        fontSize:deviceHeight/20, 
        fontWeight:'bold', 
        textAlign: 'center'
    },
    subtitle: {
        color:'#006666',
        fontSize:(deviceWidth > deviceHeight )? deviceHeight/20:deviceWidth/18, 
        textAlign: 'center', 
        paddingBottom: deviceHeight/30, 
        fontWeight:'bold'
    },
    box_style: {
        alignContent: 'center',
        alignItems: 'center',   
        backgroundColor: 'rgba(27, 134, 116, 0.3)',
        borderColor: 'transparent',
        borderWidth: 2.5,     
        borderRadius: 40,
        marginHorizontal: deviceWidth/10,
        padding:15,
        paddingHorizontal: deviceWidth/60
    },
    container_style: {
        backgroundColor:'rgba(0,128,128,0.5)',
        borderColor: '#008080',
        borderWidth: 2.5,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,     
        marginHorizontal: deviceWidth/8,
        marginVertical:10,
        paddingBottom:5
    },
    footerTxt:{
        fontSize: (deviceWidth > deviceHeight )? deviceHeight/70:deviceWidth/45
    }
});

