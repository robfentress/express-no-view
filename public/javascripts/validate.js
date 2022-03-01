// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    var mypass = document.getElementById("password");

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //var forms = document.querySelectorAll('.needs-validation');
    let form = document.querySelector(`#acctForm`);
    const pw1 = "password";
    const pw2 = "retype";
    const first = document.querySelector(`#first`), firstHelp = first.nextElementSibling;
    const last = document.querySelector(`#last`), lastHelp = last.nextElementSibling;
    const username = document.querySelector(`#username`);
    const usernameFeedback = document.querySelector(`#usernameHelp`);
    const password = document.querySelector(`#${pw1}`);
    const retype = document.querySelector(`#${pw2}`);
    const email = document.querySelector(`#email`);
    const emailFeedback = document.querySelector(`#emailHelp`);
    const ssn = document.querySelector(`#ssn`);
    const dob = document.querySelector(`#dob`);
    const dobFeedback = document.querySelector(`#dobHelp`);
    const phone = document.querySelector(`#phone`);
    const monthly = document.querySelector(`#monthly`);
    const type = document.querySelector(`#type`);
    const ccName = document.querySelector(`#ccName`);
    const ccNum = document.querySelector(`#ccNum`);
    const month = document.querySelector(`#month`);
    const year = document.querySelector(`#year`);
    const globalMsg = document.querySelector(`#globalMsg`);
    const errorRegion = document.querySelector(`#errorRegion`);
    const errors = document.querySelector(`#errorsList`);
    const paymentInfo = document.querySelector(`#paymentInfo`);
    const cardInfo = document.querySelector(`#cardInfo`);

    // form.addEventListener('input', evt => {
    //     console.log(active);
    // })

    let status = document.getElementById('status');
    let validated = false;

    document.querySelectorAll('[data-hint]').forEach(item => {
        let help = item.nextElementSibling;
        help.innerHTML = item.getAttribute('data-hint');
    });

    // const checkRequired = () => {
    //     let help = this.nextElementSibling;
    //     help.innerHTML = item.getAttribute('data-required');
    // }
    function checkFirst() {
        let help = first.nextElementSibling;
        if (!first.checkValidity()) {
            firstHelp.innerHTML = first.getAttribute('data-invalid');
        } else {
            firstHelp.innerHTML = "";
        }
    }
    function checkLast() {
        let help = last.nextElementSibling;
        if (!last.checkValidity()) {
            lastHelp.innerHTML = last.getAttribute('data-invalid');
        } else {
            lastHelp.innerHTML = "";
        }
    }

    const checkDOB = function () {
        if (!dob.checkValidity()) {
            dobFeedback.classList.add('invalid-help');
            dobFeedback.innerHTML = "Date must be in format MM/DD/YYYY";
        } else {
            dobFeedback.classList.remove('invalid-help');
            dobFeedback.innerHTML = "";
            if (dob.getAttribute('data-hint')) {
                dobFeedback.innerHTML = dob.getAttribute('data-hint');
            }
        }
        updateErrorsList();
    }

    // const checkUsername = function () {

    //     if (!username.checkValidity()) {
    //         usernameFeedback.classList.add('invalid-help');
    //         if (username.value) {
    //             usernameFeedback.innerHTML = "Contains a character that isn't a letter or number. Only alphanumeric characters allowed.";
    //         } else {
    //             usernameFeedback.innerHTML = "Username cannot be empty.";
    //         }
    //     } else {
    //         usernameFeedback.classList.remove('invalid-help');
    //         usernameFeedback.innerHTML = "";
    //         if (username.getAttribute('data-hint')) {
    //             usernameFeedback.innerHTML = username.getAttribute('data-hint');
    //         }
    //     }
    // }

    const checkUsername = function () {

        if (!username.checkValidity()) {
            usernameFeedback.classList.add('invalid-help');
            if (username.value) {
                usernameFeedback.innerHTML = "Contains a character that isn't a letter or number. Only alphanumeric characters allowed.";
            } else {
                usernameFeedback.innerHTML = "Username cannot be empty.";
            }
        } else {
            usernameFeedback.classList.remove('invalid-help');
            usernameFeedback.innerHTML = "";
            if (username.getAttribute('data-hint')) {
                usernameFeedback.innerHTML = username.getAttribute('data-hint');
            }
        }
    }
    const checkPasswords = function () {
        let passwordFeedback = document.querySelector(`#${pw1}Help`);
        let retypeFeedback = document.querySelector(`#${pw2}Help`);
        let pMsg = [], rMsg = [];
        let missing = `Password missing.`;
        let different = `Passwords do not match.`

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
        password.setCustomValidity(pMsg.join(` and `));
        retype.setCustomValidity(rMsg.join(` and `));

        if (!password.checkValidity()) {
            passwordFeedback.classList.add('invalid-help');
        } else {
            passwordFeedback.classList.remove('invalid-help');
            if (retype.getAttribute('data-hint')) {
                retypeFeedback.innerHTML = retype.getAttribute('data-hint');
            }
        }

        if (!retype.checkValidity()) {
            retypeFeedback.classList.add('invalid-help');
        } else {
            retypeFeedback.classList.remove('invalid-help');
            if (password.getAttribute('data-hint')) {
                passwordFeedback.innerHTML = password.getAttribute('data-hint');
                console.log(password.getAttribute('data-hint'))
            }
        }

    }
    const checkEmail = function () {
        var mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (email.value == 0) {
            email.setCustomValidity('');
            emailFeedback.classList.remove('invalid-help');
        } else {
            if (email.value.match(mailformat)) {
                email.setCustomValidity('');
                emailFeedback.classList.remove('invalid-help');
                if (email.getAttribute('data-hint')) {
                    emailFeedback.innerHTML = email.getAttribute('data-hint');
                }
            } else {
                email.setCustomValidity('Invalid email address. An example of a valid email would be: someone@someserver.com');
                emailFeedback.classList.add('invalid-help');
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

    function checkCCName() {
        let help = ccName.nextElementSibling;
        if (!ccName.checkValidity()) {
            ccNameHelp.innerHTML = ccName.getAttribute('data-invalid');
        } else {
            ccNameHelp.innerHTML = "";
        }
    }
    const checkCCNum = function () {
        var ccformat = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/;
        let help = ccNum.nextElementSibling;
        if (ccNum.value == 0) {
            ccNum.setCustomValidity('');
        } else {
            if (ccNum.value.match(ccformat)) {
                ccNum.setCustomValidity('');
                help.innerHTML = '';
            } else {
                const lettersRegEx = /[A-Za-z]*/;
                let hasLetters = lettersRegEx.test(ccNum.value);
                if (hasLetters) {
                    let noLetters = 'Credit card number cannot have letters.';
                    ccNum.setCustomValidity(noLetters);
                    help.innerHTML = noLetters
                } else {
                    let generic = 'Must be 16 digits. Space or hyphen between every 4 digits is optional.';
                    ccNum.setCustomValidity(generic);
                    help.innerHTML = generic;
                }
            }
        }
    }
    let checkDate = function () {

    }

    let togglePayment = function () {
        if (monthly.checked) {
            paymentInfo.classList.add("show");
            //cardInfo.removeAttribute('disabled');
            cardInfo.querySelectorAll('[data-toggle-required]').forEach(item => {
                item.setAttribute("required", true);
            });
            cardInfo.querySelectorAll('[data-toggle-pattern]').forEach(item => {
                item.setAttribute("pattern", item.getAttribute("data-toggle-pattern"));
            });
        } else {
            paymentInfo.classList.remove("show");
            cardInfo.querySelectorAll('[data-toggle-required]').forEach(item => {
                item.removeAttribute("required", true);
            });
            cardInfo.querySelectorAll('[data-toggle-pattern]').forEach(item => {
                item.removeAttribute("pattern", item.getAttribute("data-toggle-pattern"));
            });
            //cardInfo.setAttribute('diabled', true);
        }

        form.checkValidity();
        updateErrorsList();
    }

    monthly.addEventListener('change', togglePayment);


    function updateErrorsList() {
        var inv = form.querySelectorAll(`:invalid:not(fieldset)`), numErrors = inv.length;
        let errs = "";
        for (var i = 0; i < numErrors; i++) {
            var controlId = inv[i].id;
            var label = document.getElementById(controlId);
            var labelText = accname.getAccessibleName(label);
            var msg = inv[i].nextElementSibling.innerHTML;
            errs += `<li id="${controlId}Item" class="list-group-item"><b><a href="#${controlId}">${labelText}</a>:</b><div>${msg}</div></li>`;
        }
        errors.innerHTML = errs;
    }

    const validationAlert = function () {
        //let numErrors = document.querySelectorAll('.invalid-help').length;
        var inv = form.querySelectorAll(`:invalid:not(fieldset)`), numErrors = inv.length;
        status.innerHTML += `<div class="alert alert-danger"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="images/bootstrap-icons.svg#exclamation-triangle-fill"/></svg>${numErrors} invalid form entries</div>`;
        setTimeout(() => { removeMsg(status.querySelector('div:last-child')) }, 5000);
    }
    const removeMsg = function (msg) {
        status.removeChild(msg);
    }
    // Loop over them and prevent submission

    form.addEventListener('submit', function (event) {
        checkFirst();
        checkLast();
        checkUsername();
        checkDOB();
        checkPasswords();
        //checkSocial();
        checkEmail();
        checkPhone();
        checkCCName();
        checkCCNum();
        let isValid = form.checkValidity();
        var inv = form.querySelectorAll(`:invalid:not(fieldset)`), numErrors = inv.length;
        if (!isValid) {
            validationAlert();
            if (numErrors > 0) {
                errorRegion.classList.remove("d-none");
            } else {
                errorRegion.classList.add("d-none");
            }
            document.querySelectorAll('.num-errors').forEach(item => {
                item.innerHTML = numErrors;
            });

            event.preventDefault()
            event.stopPropagation()
        } else {
            if (monthly.checked) {
                let retVal = confirm("You're committing to paying $19.99 per month for membership dues.  Is that alright?  If so, click OK to continue.");
                if (retVal == true) {
                    return true;
                } else {
                    event.preventDefault()
                    event.stopPropagation()
                }
            }
        }

        updateErrorsList();

        if (!validated) {
            form.classList.add('was-validated');
            first.addEventListener('input', checkFirst, false);
            first.addEventListener('input', checkLast, false);
            username.addEventListener('input', checkUsername, false);
            dob.addEventListener('input', checkDOB, false);
            password.addEventListener('input', checkPasswords, false);
            retype.addEventListener('input', checkPasswords, false);
            // ssn.addEventListener('input', checkSocial, false);
            // dob.addEventListener('input', checkDate, false);
            email.addEventListener('input', checkEmail, false);
            phone.addEventListener('input', checkPhone, false);
            ccName.addEventListener('input', checkCCName, false);
            ccNum.addEventListener('input', checkCCNum, false);
            validated = true;
        }
    }, false)
        ;

})()