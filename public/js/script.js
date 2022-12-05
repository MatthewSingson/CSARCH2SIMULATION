$(document).ready(function() {
    // Convert input based on selected method
    $('#btn-translate').on('click', function() {
        var inputElement = $('#input');
        var outputElement = $('#binary-output');
		var roundElement = $('#round-output');
		var hexElement = $('#hex-output');
        var radioValue = $("input[name='round-option']:checked").val();
        console.log("This" +radioValue);
        var input = $(inputElement).val();
        var normalizedinput;
        let temp;
        let CF;
        let exp= parseInt($('#base10-inp').val());
        let Expcont;
        let result;
		let casechecked;
		let inputarray;
		let outputtohexa;
		let hexaprint;
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
                console.log('significand is : ' + significand);

				inputarray = [significand,exp,2];
                console.log('significand data type is ' + typeof inputarray[0])				
                normalizedinput = Normalize(significand,exp,2);
                temp = CFExpCont(normalizedinput[0],normalizedinput[1]);
                CF = temp[0].toString().replaceAll(',', '');
                Expcont = temp[1].toString().replaceAll(',', '');
                result = CoefficientCont(normalizedinput[0],1);
				casechecked = specialcasecheck(CF, Expcont, result, inputarray);
                console.log('normalized input is ' + normalizedinput[0])
                console.log('Combination field and Exp Cont is ' + casechecked[0] + ' and ' + casechecked[1] );
                console.log('Coefficient Continuation is : ' + casechecked[2]);
				outputtohexa = signcheck(input) + casechecked[0] + casechecked[1] + CoefficientCont(normalizedinput[0],0);
				hexaprint = outputprint(outputtohexa, casechecked);
				console.log('hexaprint is ' + hexaprint)
				$(roundElement).val(normalizedinput[0]);
                $(outputElement).val(signbit + " " + casechecked[0] + " " + casechecked[1] + " " + casechecked[2]);
                $(hexElement).val(hexaprint);
                break;

            case "trunc": 

				inputarray = [significand,exp,1];                
				normalizedinput = Normalize(significand,exp,1);
				temp = CFExpCont(normalizedinput[0],normalizedinput[1]);
                CF = temp[0].toString().replaceAll(',', '');
                Expcont = temp[1].toString().replaceAll(',', '');
                result = CoefficientCont(normalizedinput[0],1);
				casechecked = specialcasecheck(CF, Expcont, result, inputarray);
                console.log('normalized input is ' + normalizedinput[0])
                console.log('Combination field and Exp Cont is ' + casechecked[0] + ' and ' + casechecked[1] );
                console.log('Coefficient Continuation is : ' + casechecked[2]);
				outputtohexa = signcheck(input) + casechecked[0] + casechecked[1] + CoefficientCont(normalizedinput[0],0);
				hexaprint = outputprint(outputtohexa, casechecked);
				console.log('hexaprint is ' + hexaprint)
				$(roundElement).val(normalizedinput[0]);
                $(outputElement).val(signbit + " " + casechecked[0] + " " + casechecked[1] + " " + casechecked[2]);
                $(hexElement).val(hexaprint);
				
                break;

            case "up":
				inputarray = [significand,exp,3];			
                normalizedinput = Normalize(significand,exp,3);
                temp = CFExpCont(normalizedinput[0],normalizedinput[1]);
                CF = temp[0].toString().replaceAll(',', '');
                Expcont = temp[1].toString().replaceAll(',', '');
                result = CoefficientCont(normalizedinput[0],1);
				casechecked = specialcasecheck(CF, Expcont, result, inputarray);
                console.log('normalized input is ' + normalizedinput[0])
                console.log('Combination field and Exp Cont is ' + casechecked[0] + ' and ' + casechecked[1] );
                console.log('Coefficient Continuation is : ' + casechecked[2]);
				outputtohexa = signcheck(input) + casechecked[0] + casechecked[1] + CoefficientCont(normalizedinput[0],0);
				hexaprint = outputprint(outputtohexa, casechecked);
				console.log('hexaprint is ' + hexaprint)
				$(roundElement).val(normalizedinput[0]);
                $(outputElement).val(signbit + " " + casechecked[0] + " " + casechecked[1] + " " + casechecked[2]);
                $(hexElement).val(hexaprint);
                
                break;

            case "down":
				inputarray = [significand,exp,4];			
                normalizedinput = Normalize(significand,exp,4);
                temp = CFExpCont(normalizedinput[0],normalizedinput[1]);
                CF = temp[0].toString().replaceAll(',', '');
                Expcont = temp[1].toString().replaceAll(',', '');
                result = CoefficientCont(normalizedinput[0],1);
				casechecked = specialcasecheck(CF, Expcont, result, inputarray);
                console.log('normalized input is ' + normalizedinput[0])
                console.log('Combination field and Exp Cont is ' + casechecked[0] + ' and ' + casechecked[1] );
                console.log('Coefficient Continuation is : ' + casechecked[2]);
				outputtohexa = signcheck(input) + casechecked[0] + casechecked[1] + CoefficientCont(normalizedinput[0],0);
				hexaprint = outputprint(outputtohexa, casechecked);
				console.log('hexaprint is ' + hexaprint)
				$(roundElement).val(normalizedinput[0]);
                $(outputElement).val(signbit + " " + casechecked[0] + " " + casechecked[1] + " " + casechecked[2]);
                $(hexElement).val(hexaprint);
         
                break;


            default:
                console.log('Default case');
                $(outputElement).val('No rounding method selected.');
        }
    });
});
