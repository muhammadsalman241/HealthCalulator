import React, {Component} from 'react';
import { Slider, ImageBackground, View, StyleSheet, Dimensions, Platform} from "react-native";
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
    Input
} from 'native-base';
import CalculateBMI from './calculator';

const bg = require('../img/bmiBg.jpg');

export default class BMICalculator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            weight: 0,
            data: {bmi: 0, status: ""}
        };
    }    
    render(){
        return(
            <Container>
                <Header style={{ backgroundColor: "#006d5b" }} androidStatusBarColor="#6dffe7">
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>BMI Calculator</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <ImageBackground source={bg} style={styles.imageContainer} imageStyle={{resizeMode: 'stretch'}}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.title}>Calculate You BMI</Text>
                        </View>
                        <View style={styles.box_style}>   
                            <Text style={styles.subtitle}>Select Your height (feet)</Text>
                            <Item rounded>
                                <Input 
                                    style={styles.subtitle} 
                                    placeholder={this.state.height.toFixed(2)}
                                    keyboardType='number-pad'
                                    onSubmitEditing ={({ nativeEvent })=> {
                                        if(isNaN(nativeEvent.text))
                                            return;
                                        else
                                            this.setState({height:parseFloat(nativeEvent.text)});
                                    }}
                                />
                            </Item>
                            <View >
                                <Slider
                                    style={{width: 220, height: 80}}
                                    minimumValue={0}
                                    maximumValue={10.4987}
                                    value={this.state.height}
                                    minimumTrackTintColor="#00322a"
                                    maximumTrackTintColor="#006d5b"
                                    onValueChange={(n) => this.setState({height: n})}
                                />
                            </View>
                            <Text style={styles.subtitle}>Select Your Weight (Kg)</Text>
                            <Item rounded>
                                <Input 
                                    style={styles.subtitle} 
                                    placeholder={this.state.weight.toFixed(0)}
                                    keyboardType='number-pad'
                                    onSubmitEditing ={({ nativeEvent })=> {
                                        if(isNaN(nativeEvent.text))
                                            return;
                                        else
                                            this.setState({weight: parseInt(nativeEvent.text)});
                                    }}
                                />
                            </Item>
                            <View>
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
                            </View>
                        </View>
                        <View style={{marginBottom:35}}>
                            <AlertPro
                                ref={ref => {
                                    this.AlertPro = ref;
                                }}
                                onConfirm={() => {
                                    this.AlertPro.close();
                                    this.setState({show:false})
                                }}
                                title= 'Your BMI is...'
                                message= {this.state.data.bmi + "\nAnd it is " + this.state.data.status}
                                textConfirm="Ok!"
                                showCancel={false}
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
                        </View>
                        <View style={{ marginBottom: 50 }}>
                            <Button
                                style={styles.btnStyle}
                                onPress={() => {
                                    if(this.state.height != 0 && this.state.weight != 0){
                                        this.setState({data: CalculateBMI(this.state.height, this.state.weight)}); 
                                        this.AlertPro.open();
                                    }

                                }}
                            >
                                <Text>Calculate</Text>
                            </Button>
                        </View>
                    </ImageBackground>
                </Content>
                <Footer style={{ backgroundColor: "#006d5b" }} >
                <FooterTab>
                        <Button active={false} onPress={() => {}}>
                            <Icon active={false} type="FontAwesome" name="home" />
                            <Text>Home</Text>
                        </Button>
                        <Button active={false} onPress={() => {}}>
                            <Icon active={false} type="FontAwesome" name="hourglass-half" />
                            <Text>Age Calculator</Text>
                        </Button>
                        <Button active={true} onPress={() => {}}>
                            <Icon active={true} type="FontAwesome" name="universal-access" />
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
        alignItems: 'center'
    },
    text: {
        color: "#D8D8D8",
        bottom: 6,
        marginTop: 5
    },
    title: {
        color:'#00bb9d',
        fontSize:35, 
        fontWeight:'bold', 
        textAlign: 'center', 
        paddingBottom: 5
    },
    subtitle: {
        color:'#006d5b',
        fontSize:20, 
        textAlign: 'center', 
        paddingBottom: 5, 
        fontWeight:'bold'
    },
    btnStyle:{
        backgroundColor: '#00947c', 
        borderTopRightRadius: 20,
        alignSelf: "center"
    },
    box_style: {
        alignContent: 'center',
        alignItems: 'center',        
        margin:20,
        padding:20
    }
});

