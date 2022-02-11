
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    var mypass = document.getElementById("password");
    console.log(accname.getAccessibleName(mypass));

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
    const pw1 = "password";
    const pw2 = "retype";
    const password = document.querySelector(`#${pw1}`);
    const retype = document.querySelector(`#${pw2}`);
    const email = document.querySelector(`#email`);
    const phone = document.querySelector(`#phone`);
    const monthly = document.querySelector(`#monthly`);
    const globalMsg = document.querySelector(`#globalMsg`);
    const errors = document.querySelector(`#errors`);
    let validated = false;

    const checkPasswords = function () {
        const passwordFeedback = document.querySelector(`#${pw1}Invalid`);
        const retypeFeedback = document.querySelector(`#${pw2}Invalid`);
        let pMsg = [], rMsg = [];
        let missing = `Password missing`;
        let different = `Passwords do not match`

        if (password.validity.valueMissing) {
            pMsg.push(missing);
        }
        if (retype.validity.valueMissing) {
            rMsg.push(missing);
        }
        if (password.value !== retype.value) {
            pMsg.push(different);
            rMsg.push(different);
        }
        passwordFeedback.innerHTML = pMsg.join(`<br>`);
        retypeFeedback.innerHTML = rMsg.join(`<br>`);
        if (pMsg !== "") {
            password.setAttribute("aria-describedby", `${pw1}Invalid`);
        } else {
            password.removeAttribute("aria-describedby");
        }
        if (rMsg !== "") {
            retype.setAttribute("aria-describedby", `${pw2}Invalid`);
        } else {
            retype.removeAttribute("aria-describedby");
        }
        password.setCustomValidity(pMsg.join(` and `));
        retype.setCustomValidity(rMsg.join(` and `));
    }
    const checkEmail = function () {
        var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (email.value == 0) {
            email.setCustomValidity('');
        } else {
            if (email.value.match(mailformat)) {
                email.setCustomValidity('');
            } else {
                email.setCustomValidity('Invalid email address');
            }
        }
    }
    const checkPhone = function () {
        var phoneformat = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
        if (phone.value == 0) {
            phone.setCustomValidity('');
        } else {
            if (phone.value.match(phoneformat)) {
                phone.setCustomValidity('');
            } else {
                phone.setCustomValidity('Invalid phone number');
            }
        }
    }
    const checkCC = function () {
        var ccformat = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
        if (cc.value == 0) {
            cc.setCustomValidity('');
        } else {
            if (cc.value.match(ccformat)) {
                cc.setCustomValidity('');
            } else {
                cc.setCustomValidity('Invalid email address');
            }
        }
    }
    // let notify = function () {

    // }
    // let togglePayment = function (evt) {
    //     notify()
    //     setTimeout(function () {
    //         globalMsg.innerHTML = "";
    //     }, 10000);
    // }

    //monthly.addEventListener('change', togglePayment);

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                checkPasswords();
                checkEmail();
                checkPhone();
                if (!form.checkValidity()) {

                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    // if (monthly.checked) {
                    //     let retVal = confirm("You're committing to paying $19.99 per month for membership dues.  Is that alright?  If so, click OK to continue.");
                    //     if (retVal == true) {
                    //         return true;
                    //     } else {
                    //         event.preventDefault()
                    //         event.stopPropagation()
                    //     }
                    // }
                }

                var inv = form.querySelectorAll(`:invalid:not(fieldset)`), len = inv.length;
                let errs = "";
                for (var i = 0; i < len; i++) {
                    console.log(inv[i]);
                    var controlId = inv[i].id;
                    console.log(controlId);
                    var label = document.getElementById(controlId);
                    var labelText = accname.getAccessibleName(label);
                    var msg = inv[i].nextElementSibling.innerHTML;
                    console.log(labelText);
                    console.log(msg);
                    errs += `<li><b><a href="#${controlId}">${labelText}</a>:</b><div>${msg}</div></li>`
                }
                errors.innerHTML = errs;

                if (!validated) {
                    form.classList.add('was-validated');
                    password.addEventListener('input', checkPasswords, false);
                    retype.addEventListener('input', checkPasswords, false);
                    email.addEventListener('input', checkEmail, false);
                    phone.addEventListener('input', checkPhone, false);
                    validated = true;
                }
            }, false)
        });

})()