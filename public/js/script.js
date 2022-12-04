$(document).ready(function() {
    // Convert input based on selected method
    $('#btn-translate').on('click', function() {
        var inputElement = $('#input');
        var outputElement = $('#binary-output');
        var radioValue = $("input[name='round-option']:checked").val();
        console.log("This" +radioValue);
        var input = $(inputElement).val();
        var normalizedinput;
        let temp;
        let CF;
        let exp= parseInt($('#base10-inp').val());
        let Expcont;
        let result;
        if (input == '') {
            $(outputElement).text('No input given.');
            $(outputElement).css('color', 'red');
            return;
        }


        significand = inputElement.val();
        signbit = getSignBit(input);

      
        switch (radioValue) {
            case "no-round":
              
                break;

            case "ntte":
                console.log('significand is :' +significand);


                normalizedinput = Normalize(significand,exp,2);
                temp =CFExpCont(normalizedinput[0],normalizedinput[1])
                CF = temp[0].toString().replaceAll(',', '');
                Expcont = temp[1].toString().replaceAll(',', '');
                result = CoefficientCont(normalizedinput[0]);
                console.log('normalized input is ' + normalizedinput[0])
                console.log('Combination field and Exp Cont is ' + CF + ' and ' + Expcont );
                console.log('Coefficient Continuation is : ' + CoefficientCont(normalizedinput[0]));
                $(outputElement).val(signbit + " " + CF + " " + Expcont + " " + result);
                





                break;

            case "trunc": 

                
            normalizedinput = Normalize(significand,exp,1);
            temp =CFExpCont(normalizedinput[0],normalizedinput[1])
            CF = temp[0].toString().replaceAll(',', '');
            Expcont = temp[1].toString().replaceAll(',', '');
            result = CoefficientCont(normalizedinput[0]);
            console.log('normalized input is ' + normalizedinput[0])
            console.log('Combination field and Exp Cont is ' + CF + ' and ' + Expcont );
            console.log('Coefficient Continuation is : ' + CoefficientCont(normalizedinput[0]));
            $(outputElement).val(signbit + " " + CF + " " + Expcont + " " + result);
                break;

            case "up":
                normalizedinput = Normalize(significand,exp,3);
                temp =CFExpCont(normalizedinput[0],normalizedinput[1])
                CF = temp[0].toString().replaceAll(',', '');
                Expcont = temp[1].toString().replaceAll(',', '');
                result = CoefficientCont(normalizedinput[0]);
                console.log('normalized input is ' + normalizedinput[0])
                console.log('Combination field and Exp Cont is ' + CF + ' and ' + Expcont );
                console.log('Coefficient Continuation is : ' + CoefficientCont(normalizedinput[0]));
                $(outputElement).val(signbit + " " + CF + " " + Expcont + " " + result);
                
                break;

            case "down":
                normalizedinput = Normalize(significand,exp,4);
                temp =CFExpCont(normalizedinput[0],normalizedinput[1])
                CF = temp[0].toString().replaceAll(',', '');
                Expcont = temp[1].toString().replaceAll(',', '');
                result = CoefficientCont(normalizedinput[0]);
                console.log('normalized input is ' + normalizedinput[0])
                console.log('Combination field and Exp Cont is ' + CF + ' and ' + Expcont );
                console.log('Coefficient Continuation is : ' + CoefficientCont(normalizedinput[0]));
                $(outputElement).val(signbit + " " + CF + " " + Expcont + " " + result);
         
                break;


            default:
                console.log('Default case');
                $(outputElement).val('No rounding method selected.');
        }
    });
});
