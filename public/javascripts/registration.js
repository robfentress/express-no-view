
$(document).ready(function () {

    var secureFlag = true;
    var f = navigator.userAgent.search("Firefox");
    var c = navigator.userAgent.search("Chrome");
    var ie = navigator.userAgent.search("MSIE") + (navigator.userAgent.search(/Trident/)); // MSIE for older ie and Trident for newer IE such as IE 11
    var ie9 = navigator.userAgent.search("MSIE 9.0");

    var zoomlvl = 100;
    var cookie_name = "zoom_level";
    var index = document.cookie.indexOf(cookie_name);

    // write cookies
    function write_cookie_for_zoom(zoomLevel) {
        $.cookie(cookie_name, zoomLevel, { path: '/', expires: 3650, secure: secureFlag });
    }

    function zoom(zoomlvl) {
        if (f > -1) { // for firefox, use css3: transform:scale
            $("body").css({
                "-moz-transform": "scale(" + zoomlvl / 100 + ")",
                "-moz-transform-origin": "0 0"
            });
            var viewPortWidth = $(window).width();
            var currMainContentWrapperWidth = viewPortWidth * (zoomlvl / 100);
            var mainContentWidthDiff = (currMainContentWrapperWidth - viewPortWidth) / 2;
            if (mainContentWidthDiff > 50) { /* zoom in */
                $("body").css("left", "-" + mainContentWidthDiff + "px");
            } else if (mainContentWidthDiff < 50) {  /* zoom out */
                $("body").css("left", mainContentWidthDiff + "px");
            }

        } else if (ie9 > -1) { // for ie9
            $("body").css({
                "transform": "scale(" + zoomlvl / 100 + ")",
                "transform-origin": "0 0",
                "-ms-transform": "scale(" + zoomlvl / 100 + ")",
                "-ms-transform-origin": "0 0"
            });

        } else {  // for other browers, use zooming
            $("body").css("zoom", zoomlvl + "%");
            if (ie > -1) {  // for ie, re-position the div to center
                $("body").css("width", "100%");
                // center the viewport in the center if there is scroll bar in the window.
                var newPosition = ($(document).width() - $(window).width()) / 2;
                window.scrollTo(newPosition, 0);
            }
        }
        write_cookie_for_zoom(zoomlvl);
    }

    // zoom back
    $("#back_to_original_page").click(function () {
        zoomlvl = 100;
        zoom(zoomlvl);
    });

    // zoom in the page
    $("#zoom_in_page").click(function () {
        // max zoom level is 150%
        if (zoomlvl >= 150) {
            return;
        }
        zoomlvl += 10;
        zoom(zoomlvl);
    });

    // zoom out the page
    $("#zoom_out_page").click(function () {
        // min zoom level is 70%
        if (zoomlvl <= 70) {
            return;
        }
        zoomlvl -= 10;
        zoom(zoomlvl);
    });

    $('.password-toggle').on('click', function (evt) {
        var fieldSel = $(this).attr('data-for');
        $(fieldSel).each(function () {
            if (this.type === "password") {
                this.type = "text";
            } else {
                this.type = "password";
            }
        });
    });

    $('.question-toggle').on('change', function (evt) {
        var questionId = $(this).attr('data-for');
        var value = $(this).attr('data-option');

        var question = $(`#${questionId}`)[0];
        var label = $(`[for="${questionId}"]`);
        console.log(label);

        if ($(this).val() === value) {
            question.disabled = false;
            question.required = true;
            $(label).removeClass("text-muted");
            $('#requiredQuestion').removeClass("removedFromDOM");
        } else {
            question.disabled = true;
            question.required = false;
            $(label).addClass("text-muted");
            $('#requiredQuestion').addClass("removedFromDOM");
        }
    });

    $('#termsOfUse').on('change', function (evt) {
        if (this.checked) {
            $('#Register_Submit').prop("disabled", false);
        } else {
            $('#Register_Submit').prop("disabled", true);
        }
    });


}); 