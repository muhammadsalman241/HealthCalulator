export default function CalculateBMI(height, weight){
    let heightInMeter = height * (0.3048 / 1);
    let bmi = parseInt(weight)/(heightInMeter*heightInMeter);
    let status = "";
    if (bmi < 18.5)
        status =  "underweight";
    else if ( bmi >= 18.5 && bmi < 24.9)
        status = "Healthy";
    else if ( bmi >= 24.9 && bmi < 30)
        status =  "overweight";
    else if ( bmi >=30)
        status = "Suffering from Obesity";
    return {bmi: bmi.toPrecision(4), status: status};
}