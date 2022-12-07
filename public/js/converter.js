function Normalize(decimal,exponent,roundMethod){
    let i = 1;
    let temp;
    if(decimal.toString()[0] === '-' ){
        temp = decimal.toString().split('-');
        decimal = temp[1];
        temp = '-';
    }
    if(decimal.toString()[0] === '+'){
        temp = decimal.toString().split('+');
        decimal = temp[1];
    }
    let length = decimal.toString().length;
    let pattern = /\./;
    
    if(pattern.test(decimal.toString()) == false && decimal.toString().length <= 7){
        result = [decimal,exponent]
        return result;

    }
    if(pattern.test(decimal.toString())){
        length = length - 1;
    }
    templength = decimal.toString().length;
    while(pattern.test(decimal.toString())){
        
        decimal = decimal * 10;
        console.log("normalized : " + decimal);
        if(i < length){
            i++;
            exponent -=1;
        }
        if(decimal.toString().length > templength){
        decimal = decimal*10;
        decimal = Math.round(decimal)
        decimal = decimal / 10;
        console.log("normalized2 : " + decimal);
        }
        
    }
    
    
    decimal = parseInt(decimal.toString().substring(0,length));
    rounded = decimal.toString().length;
    
    while(rounded > 7){
        decimal = decimal/10;
        rounded --;
        exponent++
    }
    
   
    if(pattern.test(decimal.toString())){
    switch(roundMethod) {
        case 0:
            temp = decimal.toString().split('-')
            norm=[temp[1],exponent];
            return norm;
            break;
        case 1:
            decimal = Math.trunc(decimal)
          break;
        case 2:
            let array = decimal.toString().split('.');
            fraction = array[1];
            if(parseInt(fraction[0]) == 5){
                significand = parseInt(array[0]);
                if(significand % 2 == 0){
                    decimal = Math.floor(decimal);
                }
                else{
                    decimal = Math.ceil(decimal);
                }
            }
            decimal = Math.round(decimal);
          break;
        case 3:
            if(temp === '-'){
                decimal = Math.floor(decimal);
             }
             else{
                decimal = Math.ceil(decimal);
             }
          // code block
          break;
        case 4:
            if(temp === '-'){
                decimal = Math.ceil(decimal);
             }
             else{
            decimal = Math.floor(decimal);
             }
          // code block
          break;
      }
    }
    norm=[decimal,exponent];
    return norm;
}
function CFExpCont(Base10Dec,exponent){
    let temp = Base10Dec.toString();
    while(temp.length < 7){
        temp = '0' + temp;
    }
    msd = BCD(parseInt(temp[0]));
    while(msd.length < 4){
        msd = '0' + msd;
    }
    eprime = exponent + 101;
	console.log('esponenet is ' + exponent)
    
    eprime = eprime.toString(2);
    while(eprime.length < 8){
            eprime = '0' + eprime;
    }
    
    if(temp[0] == '9' || temp[0] == '8' ){
        combifield = [1,1,parseInt(eprime[0]),parseInt(eprime[1]),parseInt(msd[3])];
        expcont = [parseInt(eprime[2]),parseInt(eprime[3]),parseInt(eprime[4]),parseInt(eprime[5]),parseInt(eprime[6]),parseInt(eprime[7])]
        
       
    }
    
    else{
        combifield = [parseInt(eprime[0]),parseInt(eprime[1]),parseInt(msd[1]),parseInt(msd[2]),parseInt(msd[3])]
    }
    expcont = [parseInt(eprime[2]),parseInt(eprime[3]),parseInt(eprime[4]),parseInt(eprime[5]),parseInt(eprime[6]),parseInt(eprime[7])]
    result = [combifield,expcont];
    return result;
}
function BCD(decimal){
    let binary = decimal.toString(2);
    return binary
}
function getSignBit(input){
    if(input.toString()[0] === '-')
        return 1;
    if(input.toString()[0] === '+')
        return 0;
    return 0;
}
function CoefficientCont(decimal, mode){
    console.log(decimal);
    decimal = decimal.toString();
    while(decimal.length < 7){
      decimal = '0' + decimal;  
    }
    decimal = decimal.slice(1); //Remove most significant digit
    let i = 0;
    let bcd = [];
    // This gets the BCD for every digit of the remaining input
    for (const digit of decimal){
        bcd[i] = BCD(parseInt(digit));
        while(bcd[i].length < 4){
            bcd[i] = 0 + bcd[i];
        }
        i++;
        
    }
    bcd = bcd.toString().replaceAll(',', '');

	if(mode == 0){
		return denselypacked(bcd) + denselypacked(bcd.slice(12));
	}
	
    return denselypacked(bcd) + ' ' + denselypacked(bcd.slice(12));
    
}
function denselypacked(bcd){
    let dpbcd = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']

    if (bcd[0] == '0' && bcd[4] == '0' && bcd[8] == '0') {
        dpbcd = bcd[1] + bcd[2] + bcd[3] + bcd[5] + bcd[6] + bcd[7] + '0' + bcd[9] + bcd[10] + bcd[11];
    } else if (bcd[0] == '0' && bcd[4] == '0' && bcd[8] == '1') {
        dpbcd = bcd[1] + bcd[2] + bcd[3] + bcd[5] + bcd[6] + bcd[7] + '1' + '0' + '0' + bcd[11];
    } else if (bcd[0] == '0' && bcd[4] == '1' && bcd[8] == '0') {
        dpbcd = bcd[1] + bcd[2] + bcd[3] + bcd[9] + bcd[10] + bcd[7] + '1' + '0' + '1' + bcd[11];
    } else if (bcd[0] == '1' && bcd[4] == '0' && bcd[8] == '0') {
        dpbcd = bcd[9] + bcd[10] + bcd[3] + bcd[5] + bcd[6] + bcd[7] + '1' + '1' + '0' + bcd[11]
    } else if (bcd[0] == '0' && bcd[4] == '1' && bcd[8] == '1') {
        dpbcd = bcd[1] + bcd[2] + bcd[3] + '1' + '0' + bcd[7] + '1' + '1' + '1' + bcd[11];
    } else if (bcd[0] == '1' && bcd[4] == '0' && bcd[8] == '1') {
        dpbcd = bcd[5] + bcd[6] + bcd[3] + '0' + '1' + bcd[7] + '1' + '1' + '1' + bcd[11];
    } else if (bcd[0] == '1' && bcd[4] == '1' && bcd[8] == '0') {
        dpbcd = bcd[9] + bcd[10] + bcd[3] + '0' + '0' + bcd[7] + '1' + '1' + '1' + bcd[11];
    } else if (bcd[0] == '1' && bcd[4] == '1' && bcd[8] == '1') {
        dpbcd = '0' + '0' + bcd[3] + '1' + '1' + bcd[7] + '1' + '1' + '1' + bcd[11];
    }
    console.log(dpbcd);
    return dpbcd;
}

function specialcasecheck(CF, Expcont, CoeffCont, input,exp){
	let output = [CF, Expcont, CoeffCont]
	console.log('Combination Field is : ' + CF);
	if(CF == '11110'){
		 return output2 = ['Infinity', 'Infinity', 'Infinity'];
	}
	if(CF == '11111'){
		 return output2 = ['NaN', 'NaN', 'NaN'];
	}
	if(input[0] == 0){
		 return output2 = ['0', '0', '0'];
	}	
	if(exp < -101 || exp > 90){
       
        return output2 = ['Infinity', 'Infinity', 'Infinity'];
    }
	output = checkStringAndReplace(input, output);
	console.log('output is : ' + output);

	return output;
}

function checkStringAndReplace(inputstring, inputarray) {
	  console.log('checkstring entered')	
  if(Number.isNaN(Number(inputstring[0])) || Number.isNaN(Number(inputstring[1]))) {
	  console.log('element is string')
    return inputarray.map(() => 'NaN');
  } 
  else {
	  console.log('checkstring false')		  
    return inputarray;
  }
}

function signcheck(input){
	let signbit = '0';
	
	if(input[0] < 0){
		return signbit = '1';
	}
	
	return signbit;
}

function outputprint(outputtohexa, output){
	
	
	if(output.some(element => element === 'NaN' )){
		//console.log('full binary is : ' + outputtohexa.substring(1));
		//let number = parseInt(outputtohexa,2);
		//console.log('number is : ' + number);
		//let hexa = parseInt(outputtohexa, 2).toString(16);
		console.log('Hexadecimal value is : ' + 'NaN');
		outputtohexa = 'NaN';
	}
	
	else if(output.some(element => element === 'Infinity')){
		//console.log('full binary is : ' + outputtohexa.substring(1));
		//let number = parseInt(outputtohexa,2);
		//console.log('number is : ' + number);
		//let hexa = parseInt(outputtohexa, 2).toString(16);
		console.log('Hexadecimal value is : ' + 'Infinity');
		outputtohexa = 'Infinity';
	}
	
	else{
		console.log('full binary is : ' + outputtohexa);
		//let number = parseInt(outputtohexa,2);
		//console.log('number is : ' + number);
		let hexa = parseInt(outputtohexa, 2).toString(16);
		console.log('Hexadecimal value is : ' + hexa);
		outputtohexa = hexa;
	}
	
	return outputtohexa.toUpperCase();
	
}

function outputprintbinary(outputtobinary, output){
	
	
	if(output.some(element => element === 'NaN' )){
		//console.log('full binary is : ' + outputtohexa.substring(1));
		//let number = parseInt(outputtohexa,2);
		//console.log('number is : ' + number);
		//let hexa = parseInt(outputtohexa, 2).toString(16);
		//console.log('Hexadecimal value is : ' + 'NaN');
		outputtobinary = 'NaN';
	}
	
	if(output.some(element => element === 'Infinity')){
		//console.log('full binary is : ' + outputtohexa.substring(1));
		//let number = parseInt(outputtohexa,2);
		//console.log('number is : ' + number);
		//let hexa = parseInt(outputtohexa, 2).toString(16);
		//console.log('Hexadecimal value is : ' + 'Infinity');
		outputtobinary = 'Infinity';
	}
	
	
	return outputtobinary;
	
}

let input = ['check',20,1] // significand,exponent,rounding method
var normalizedinput = Normalize(input[0],input[1],input[2])
console.log('normalized input is ' + normalizedinput[0])
let temp = CFExpCont(normalizedinput[0],normalizedinput[1])
let CF = temp[0].toString().replaceAll(',', '');
let Expcont = temp[1].toString().replaceAll(',', '');
let CoeffCont = CoefficientCont(normalizedinput[0], 1);
let output = specialcasecheck(CF, Expcont, CoeffCont, input);
console.log('Combination field and Exp Cont is ' + output[0] + ' and ' + output[1] );
console.log('Coefficient Continuation is : ' + output[2]);
let outputtohexa = signcheck(input) + output[0] + output[1] + CoefficientCont(normalizedinput[0], 0);
console.log('full binary is : ' + outputtohexa);
//let number = parseInt(outputtohexa,2);
//console.log('number is : ' + number);
let hexa = parseInt(outputtohexa, 2).toString(16);
console.log('Hexadecimal value is : ' + hexa);