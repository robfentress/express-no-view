// Restricts input for the set of matched elements to the given inputFilter function.
// from https://jsfiddle.net/emkey08/tvx5e7q3
// (function($) {
//     $.fn.inputFilter = function(inputFilter) {
//         return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
//             if (inputFilter(this.value)) {
//                 this.oldValue = this.value;
//                 this.oldSelectionStart = this.selectionStart;
//                 this.oldSelectionEnd = this.selectionEnd;
//             } else if (this.hasOwnProperty("oldValue")) {
//                 this.value = this.oldValue;
//                 this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
//             } else {
//                 this.value = "";
//             }
//         });
//     };
// }(jQuery));



$(document).ready(function () {
  $.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  };

  $('#search').on('submit', function (e) {
    // validation code here
    alert("Imagine this returns results.");
    e.preventDefault();

  });
  $('.mainMenu a, .vt-logo-link').click(function (e) {
    alert("Imagine this takes you to a page.");
    e.preventDefault();
  })
  $("#datepicker").datepicker({
    changeMonth: true,
    changeYear: true
  });


  $('.number').autotab({
    filter: 'number',
    tabOnSelect: true
  });
  $('.ccard').autotab({
    filter: 'number',
    tabOnSelect: true
  });


  $('#languages a').click(function (e) {
    e.preventDefault();
    alert('Imagine this takes you to a version of the page in another language.');
  });


  //Timeout after 20 minutes
  window.setTimeout(function () {
    window.location.href = 'account-timeout.html';
  }, 1200000)
});


// Editor code lifted from https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content
$(document).ready(function () {
  var oDoc, sDefTxt;
  initDoc();
  $("#formatting").on('change', function (e) {
    formatDoc('formatblock', e.target[e.target.selectedIndex].value);
    e.target.selectedIndex = 0;
  });
  $("#font").on('change', function (e) {
    formatDoc('fontname', e.target[e.target.selectedIndex].value);
    e.target.selectedIndex = 0;
  });
  $("#fontSize").on('change', function (e) {
    formatDoc('fontsize', e.target[e.target.selectedIndex].value);
    e.target.selectedIndex = 0;
  });
  $("#foreColor").on('change', function (e) {
    formatDoc('forecolor', e.target[e.target.selectedIndex].value);
    e.target.selectedIndex = 0;
  });
  $("#backColor").on('change', function (e) {
    formatDoc('backcolor', e.target[e.target.selectedIndex].value);
    e.target.selectedIndex = 0;
  });


  $("#print").on('click', function (e) {
    printDoc();
  });


  $("#undo").on('click', function (e) {
    formatDoc('undo');
  });
  $("#redo").on('click', function (e) {
    formatDoc('redo');
  });
  $("#removeFormat").on('click', function (e) {
    formatDoc('removeFormat')
  });

  $("#bold").on('click', function (e) {
    formatDoc('bold');
  });
  $("#italic").on('click', function (e) {
    formatDoc('italic');
  });
  $("#underline").on('click', function (e) {
    formatDoc('underline');
  });

  $("#justifyLeft").on('click', function (e) {
    formatDoc('justifyleft');
  });
  $("#justifyCenter").on('click', function (e) {
    formatDoc('justifycenter');
  });
  $("#justifyRight").on('click', function (e) {
    formatDoc('justifyright');
  });


  $("#numberedList").on('click', function (e) {
    formatDoc('insertorderedlist');
  });
  $("#dottedList").on('click', function (e) {
    formatDoc('insertunorderedlist');
  });

  $("#quote").on('click', function (e) {
    formatDoc('formatblock', 'blockquote');
  });


  // $("#outdent").on('click', function (e) {
  //   formatDoc('outdent', e.target[e.target.selectedIndex].value);
  // });
  // $("#indent").on('click', function (e) {
  //   formatDoc('indent', e.target[e.target.selectedIndex].value);
  // });


  $("#hyperlink").on('click', function (e) {
    var sLnk = prompt('Write the URL here', 'http:\/\/');
    if (sLnk && sLnk != '' && sLnk != 'http://') {
      formatDoc('createlink', sLnk)
    }
  });

  $("#cut").on('click', function (e) {
    formatDoc('cut');
  });
  $("#copy").on('click', function (e) {
    formatDoc('copy');
  });
  $("#paste").on('click', function (e) {
    formatDoc('paste');
  });

  function initDoc() {
    oDoc = document.getElementById("textBox");
    sDefTxt = oDoc.innerHTML;
    $("#textBox").on('keydown keyup blur', function (e) {

      if (e.which === 9 && !e.shiftKey) {
        if (e.type === 'keydown') document.execCommand('indent', false);
        e.preventDefault();
      }
      if (e.which === 9 && e.shiftKey) {
        if (e.type === 'keydown') document.execCommand('outdent', false);
        e.preventDefault();
      }
    });
  }

  function formatDoc(sCmd, sValue) {
    document.execCommand(sCmd, false, sValue);
    oDoc.focus();
  }
  $("[name='compForm']").on("submit", function (e) {
    e.preventDefault();
    validate();
  });

  function validate() {
    var valid = true;
    $('.req').removeClass("invalid");
    if (document.compForm["first"].value == "") {
      $('[name="first"]').addClass("invalid");
      valid = false;
    }
    if (document.compForm["last"].value == "") {
      $('[name="last"]').addClass("invalid");
      valid = false;
    }
    if (document.compForm["username"].value == "") {
      $('[name="username"]').addClass("invalid");
      valid = false;
    }
    if (document.compForm["password"].value == "") {
      $('[name="password"]').addClass("invalid");
      valid = false;
    }
    if (document.compForm["password2"].value == "") {
      $('[name="password2"]').addClass("invalid");
      valid = false;
    }
    if (valid) {
      window.location.href = 'account-committed.html';
      return true;
    } else {
      //window.history.back();
      alert("Error: Fields highlighted in red are required");
      return false;
    }
    return valid;
  }


  function printDoc() {
    var oPrntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    oPrntWin.document.open();
    oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
    oPrntWin.document.close();
  }

  $('input#datepicker').unbind('keydown');
  $('input#datepicker').blur(function (e) {
    $("#datepicker").datepicker("hide")
  })
});