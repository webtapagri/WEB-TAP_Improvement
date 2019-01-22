function numberFormat (number, decimals, decPoint, thousandsSep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
	var n = !isFinite(+number) ? 0 : +number
	var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
	var sep = (typeof thousandsSep === 'undefined') ? '.' : thousandsSep
	var dec = (typeof decPoint === 'undefined') ? ',' : decPoint
	var s = ''

	var toFixedFix = function (n, prec) {
		var k = Math.pow(10, prec)
		return '' + (Math.round(n * k) / k)
			.toFixed(prec)
	}

	// @todo: for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || ''
		s[1] += new Array(prec - s[1].length + 1).join('0')
	}

	return s.join(dec);
}

function numberClean(value) {
	return typeof(value) === 'undefined' || value.length === 0 ? 0 : value.toString().replace(/\$|\./g, '').replace(/\$|\,/g, '.');
}

function setNumberFormat(field, value) {
	var formatted = numberFormat(value, 2);
  	field.val('').val(formatted);
}

function setNumberWithoutDecimal(field, value) {
    var formatted = numberFormat(value, 0);
    //console.log(formatted);
    field.val('').val(formatted);
}

function roundupTens(val) {
    var ruleRoundup = JSON.parse(GlobalLibUpp.getCookie('ruleRoundup'));
    //console.log(ruleRoundup);
    var checkDecimal = val % 1;
    console.log(val);
    //console.log(checkDecimal);
    if (checkDecimal != 0) {
        var param = Math.round(val);
        /*var result = param.toString();
        var lastChar = result.substr(result.length - ruleRoundup.param_value2);

        if (lastChar != ruleRoundup.param) {
            var division = ruleRoundup.param_salary - lastChar;
            result = (result *1) + division;
        }*/
    } else {
        var param = val;
    }
    
    var result = param.toString();
    var lastChar = result.substr(result.length - ruleRoundup.param_value2);

    if (lastChar != ruleRoundup.param_last_char) {
        var division = ruleRoundup.param_salary - lastChar;
        result = (result *1) + division;
    } else {
        result = (result *1);
    }
    
    return result;

}

function numberOnly(e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || //190, 188
         // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
         // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
         // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
            return true;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        return false;
    }
}

function ajaxSetup(){
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
}