
/*Normalize numbers
  Decimal is the significand of a base 10 number
  Exponent is the exponent of a base 10 number
  Round method is an int denoting what round method to choose
  if round method is 1 then truncate
  if round method is 2 then round to nearest tie to even
  if round method is 3 then Ceiling
  if round method is 4 then Floor*/
function Normalize(decimal,exponent,roundMethod){
    let i = 1
    if(decimal.toString()[0] === '-' ){
        let temp = decimal.toString().split('-');
        decimal = temp[1];
    }
    if(decimal.toString()[0] === '+'){
        let temp = decimal.toString().split('-');
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

    while(pattern.test(decimal.toString())){
        decimal = decimal * 10;
        if(i < length){
            i++;
            exponent -=1;
        }
        
    }
    if(decimal.toString().length > 7){
    decimal = decimal/10;
    decimal = Math.round(decimal);
    }
    
    decimal = parseInt(decimal.toString().substring(0,length));
    rounded = decimal.toString().length;
    
    while(rounded != 7){
        decimal = decimal/10;
        rounded --;
    }
    
    if(pattern.test(decimal.toString())){
    switch(roundMethod) {
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
            decimal = Math.ceil(decimal)
          // code block
          break;
        case 4:
            decimal = Math.floor(decimal)
          // code block
          break;
      }
    }
    norm=[decimal,exponent];
    return norm;
}
function CFExpCont(Base10Dec,exponent){
    msd = BCD(parseInt(Base10Dec.toString()[0]));
    while(msd.length < 4){
        msd = 0 + msd
    }
    eprime = exponent + 101;
    if(exponent < -101 || exponent > 90){
        combifield = [1,1,1,1,0];
        return combifield;
    }
    eprime = eprime.toString(2);
    while(eprime.length < 8){
            eprime = '0' + eprime;
    }
    
    
    if(Base10Dec.toString()[0] == '9' || Base10Dec.toString()[0] == '8' ){
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
let input = [-1,-101,2] // 
var normalizedinput = Normalize(input[0],input[1],input[2])
let temp =CFExpCont(normalizedinput[0],normalizedinput[1])
let CF = temp[0].toString().replaceAll(',', '');
let Expcont = temp[1].toString().replaceAll(',', '');
console.log('Combination field and Exp Cont is ' + CF + ' and ' + Expcont );