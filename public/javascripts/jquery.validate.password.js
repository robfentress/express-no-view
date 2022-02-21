/*
 * jQuery validate.password plugin - custom version base on version 1.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validate.password/
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * $Id: jquery.validate.password.js,v 1.1 2012/11/06 14:50:30 wtse Exp $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	
	var LOWER = /[a-z]/,
		UPPER = /[A-Z]/,
		DIGIT = /[0-9]/,
		DIGITS = /[0-9].*[0-9]/,
		SPECIAL = /[^a-zA-Z0-9]/,
		SAME = /^(.)\1+$/,
		// #400-045: V400 - Password Validation: character restriction
		VALID_CHARS = /^[0-9a-zA-Z!?$%&\^*()_\-\+:;<>?\[\]\{\}\/\"\'`@~#|\\,.=]+$/;
		
	function rating(rate, message) {
		//parent.document.forms[0].passwordStrengthRate.value = rate;
		//parent.document.getElementById("passwordStrengthRate").value = rate;
		document.getElementById("passwordStrengthRate").value = rate;
		return {
			rate: rate,
			messageKey: message
		};
	}
	
	function uncapitalize(str) {
		return str.substring(0, 1).toLowerCase() + str.substring(1);
	}
	
	$.validator.passwordRating = function(password, username, minRating) {
		if (!password) 
			return rating(10, "Password-not-required");
			//return rating(0, "Password-required");
		if (!VALID_CHARS.test(password))
			return rating(2, "invalid-character");		
		if (password.length < 8)
			return rating(0, "too-short");
		if (password.length > 20)
			return rating(0, "too-long");
		if (username && password.toLowerCase() == (username.toLowerCase()))
			return rating(0, "similar-to-username");
		if (SAME.test(password))
			return rating(1, "very-weak");
		
		var lower = LOWER.test(password),
			//upper = UPPER.test(uncapitalize(password)), why upcaptilize the first character?
			upper = UPPER.test(password),
			digit = DIGIT.test(password),
			digits = DIGITS.test(password),
			special = SPECIAL.test(password);
		
		// 2015-10-30 : change the strength level.
		// meet 3 out of 4 requirements = strong.
		var meetNumOfRequirements = 0;
		if(lower)
			meetNumOfRequirements += 1;
		
		if(upper)
			meetNumOfRequirements += 1;
		
		if(digit)
			meetNumOfRequirements += 1;
		
		if(special)
			meetNumOfRequirements += 1;
		
		/* Strong (or restricted) validation rules */
		if(minRating >= 5){
			if(meetNumOfRequirements >= 4){
				return rating(5, "strong");
			}else if(meetNumOfRequirements == 3){
				return rating(4, "not-good-enough");
			}else{
				return rating(3, "weak");
			}
		}
		
		/* eash-going rules for Better User Experience */
		else{
			// Strong: contains Upper letter/Lower letter, numbers, sepcial characters.
			if (meetNumOfRequirements>=3) 
				return rating(5, "strong");
			
			// Fair: meet at least 2 of the following 3 rules: letter, number, sepcial characters.
			else if (lower && digit || upper && digit || (special && (lower||digit||upper)) )
				return rating(4, "fair");
			
			else
				return rating(3, "weak");
		}
	}
	
	$.validator.passwordRating.messages = {
		"Password-not-required" : "",
		"Password-required" : "Password required",
		"similar-to-username": "Password too similar to username",
		"too-short": "Password too short",
		"too-long": "Password too long",
		"very-weak": "Very weak password",
		"weak": "Weak password",
		"fair": "Fair password",
		"not-good-enough": "Not good enough",
		"strong": "Strong password",
		"invalid-character": "Invalid Character Entered"
	}
	
	$.validator.addMethod("check_password", function(value, element, params) {
		var usernameField = params.usernameField;
		var minRating = params.minRating;
		
		// use untrimmed value
		var password = element.value,
		// get username for comparison, if specified
			username = $(typeof usernameField != "boolean" ? usernameField : []);
			
		var rating = $.validator.passwordRating(password, username.val(), minRating);
		// update message for this field
		
		var meter = $(".password-meter", element.form);
		
		meter.find(".password-meter-bar").removeClass().addClass("password-meter-bar").addClass("password-meter-" + rating.messageKey);
		meter.find(".password-meter-message")
		.removeClass()
		.addClass("password-meter-message")
		.addClass("password-meter-message-" + rating.messageKey)
		.text($.validator.passwordRating.messages[rating.messageKey]);
		// display process bar instead of error message
		
		return rating.rate >= minRating;
	}, "&nbsp;");
	// manually add class rule, to make username param optional
	$.validator.classRuleSettings.password = { check_password: true };
	
})(jQuery);
