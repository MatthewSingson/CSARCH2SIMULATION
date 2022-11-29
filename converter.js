function BCD(decimal){
    
    let binary = decimal.toString(2);
}
/*Normalize numbers
  Decimal is the mantissa of a base 10 number
  Exponent is the exponent of a base 10 number
  Round method is an int denoting what round method to choose
  if round method is 1 then truncate
  if round method is 2 then round to nearest tie to even
  if round method is 3 then Ceiling
  if round method is 4 then Floor*/
function Normalize(decimal,exponent,roundMethod){
    decimal = 117123.896;
    exponent = 0;
    roundMethod = 2;
    let i = 1
    let length = decimal.toString().length;
    let pattern = /\./;
    if(pattern.test(decimal.toString()) == false && decimal.toString().length <= 7){
        return decimal;
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
        console.log(decimal)
    }
    decimal = decimal/10;
    decimal = Math.round(decimal);
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
    console.log(norm);
    return norm;
}
function CF(Base10Dec){
    
}
