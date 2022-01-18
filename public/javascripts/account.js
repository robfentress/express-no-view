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
  $('.page-header a, .breadcrumb a, .page-sidebar a').click(function (e) {
    alert("Imagine this takes you to a page.");
    e.preventDefault();
  });
  $('#datepicker').datepicker({
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


  //Timeout after 20 minutes
  window.setTimeout(function () {
    window.location.href = 'account-timeout.html';
  }, 1200000000)
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


  $("#undo").on('mousedown', function (e) {
    formatDoc('undo');
  });
  $("#redo").on('mousedown', function (e) {
    formatDoc('redo');
  });
  $("#removeFormat").on('mousedown', function (e) {
    formatDoc('removeFormat')
  });

  $("#bold").on('mousedown', function (e) {
    formatDoc('bold');
  });
  $("#italic").on('mousedown', function (e) {
    formatDoc('italic');
  });
  $("#underline").on('mousedown', function (e) {
    formatDoc('underline');
  });

  $("#justifyLeft").on('mousedown', function (e) {
    formatDoc('justifyleft');
  });
  $("#justifyCenter").on('mousedown', function (e) {
    formatDoc('justifycenter');
  });
  $("#justifyRight").on('mousedown', function (e) {
    formatDoc('justifyright');
  });


  $("#numberedList").on('mousedown', function (e) {
    formatDoc('insertorderedlist');
  });
  $("#dottedList").on('mousedown', function (e) {
    formatDoc('insertunorderedlist');
  });

  $("#quote").on('mousedown', function (e) {
    formatDoc('formatblock', 'blockquote');
  });


  $("#hyperlink").on('mousedown', function (e) {
    var sLnk = prompt('Write the URL here', 'http:\/\/');
    if (sLnk && sLnk != '' && sLnk != 'http://') {
      formatDoc('createlink', sLnk)
    }
  });

  $("#cut").on('mousedown', function (e) {
    formatDoc('cut');
  });
  $("#copy").on('mousedown', function (e) {
    formatDoc('copy');
  });
  $("#paste").on('mousedown', function (e) {
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
    var correctFormat = true;
    var errmsg = '';


    var ss1 = Number(document.compForm["ss1"].value);
    var ss2 = Number(document.compForm["ss2"].value);
    var ss3 = Number(document.compForm["ss3"].value);

    $('.number').removeClass("format");
    if (isNaN(ss1)) {
      $("[name='ss1']").addClass("format");
      correctFormat = false;
    }
    if (isNaN(ss2)) {
      $("[name='ss2']").addClass("format");
      correctFormat = false;
    }
    if (isNaN(ss3)) {
      $("[name='ss3']").addClass("format");
      correctFormat = false;
    }
    if (correctFormat === false) {
      valid = "false";
      errmsg += '<li><span class="format">Incorrectly formated fields highlighted in yellow.</span></li>';
    }

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
    if (document.compForm["password"].value !== document.compForm["password2"].value) {
      errmsg += '<li>Password fields must match</li>';
      valid = false;
    }
    if (valid == true) {
      if ($("#yes").prop("checked", true)) {
        window.location.href = 'account-committed.html?committed=true';
      } else {
        window.location.href = 'account-committed.html';
      }
      return true;
    } else {
      if ($('.invalid').length !== 0) {
        errmsg += '<li>Fields highlighted in red are required</li>';
      }
      $('#status').html("<div class='alert alert-danger'><h2>Error:</h2><ul>" + errmsg + "</ul></div>");
      $('html,body').animate({
        scrollTop: $("#status").offset().top
      });
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