import React from 'react';
import {View, Text} from 'native-base';

export default class Calculator{
    constructor(bdate, ldate){
        if(bdate == undefined || ldate == undefined){
            this.calculated = false;
        }
        else{
            this.bDate = bdate;
            this.lDate = ldate;
            this.age = {days:0, months:0, years:0};
            this.calculated = false;
            this.calculate();
        }
    }
    calculate(){
        let date = new Date(2000, 1, 1);
        date.setMilliseconds(this.lDate - this.bDate);
        this.age.days = date.getDay()+1;
        this.age.years = date.getYear()-100;
        this.age.months = date.getMonth()+1;
        this.calculated = true;
    }
    getAge(){
        if(!this.calculated)
            return <Text></Text>;
        return(
            <View>
                <Text style={{fontSize:15, fontWeight:'bold', textAlign: 'center', textDecorationLine:'underline'}}>Your Age is</Text>
                <Text style={{fontSize:20, color:'#282828'}}>
                    Years 
                    <Text style={{fontWeight: 'bold'}}> {this.age.years}</Text>,
                    Months 
                    <Text style={{fontWeight: 'bold'}}> {this.age.months}</Text>,
                    Days 
                    <Text style={{fontWeight: 'bold'}}> {this.age.days}</Text>
                </Text>
            </View>
        );
    }
}