/*!
* 
* Description: Email Verification jQuery Plugin.
* Requires a domain key / license to work.
*
* Author: emailverifyapi.com
*
* Version: 1.0.0
*
* License: GPLv2 or later
*/
(function($, window, document, undefined) {
    "use strict";
    if ($.fn.emailChecker) {
        return
    }
    $.fn.emailchecker = $.fn.emailChecker = function(options) {
        if (!this.length) {
            return this
        }
        if (this.length > 1) {
            return this.each(function() {
                $(this).emailChecker(options)
            })
        }
        var $mainObj = this;
        var $ele = $(this[0]);
        var $opts = $.extend(true, {}, $.fn.emailChecker.defaults, options);
        switch ($opts.resultAnimation) {
            case "slideDown":
                $mainObj.animateIn = "slideDown";
                $mainObj.animateOut = "slideUp";
                break;
            case "slideUp":
                $mainObj.animateIn = "slideUp";
                $mainObj.animateOut = "slideDown";
                break;
            default:
                $mainObj.animateIn = "fadeIn";
                $mainObj.animateOut = "fadeOut";
                break
        }
        $mainObj.resultTimer = null;
        $mainObj.validationTimer = null;
        var fnc = {};
        fnc._build = function() {
            if ($opts.resultContainer == "") {
                var direction = "emailChecker_" + $opts.resultPosition;
                var resultID = "emailChecker_r" + Math.floor(Math.random() * 100001);
                var resultEle = $('<div class="emailChecker_results ' + resultID + " " + direction + '"></div>');
                var pos = $ele.position();
                switch ($opts.resultPosition) {
                    case "top":
                        resultEle.css({
                            left: pos.left + "px",
                            top: pos.top - $opts.resultPadding - ($ele.innerHeight() - 33) + "px"
                        });
                        break;
                    case "bottom":
                        resultEle.css({
                            left: pos.left + "px",
                            top: pos.top + ($opts.resultPadding - 3) + "px"
                        });
                        break;
                    case "left":
                        resultEle.css({
                            left: pos.left - $ele.innerWidth() - $opts.resultPadding + "px",
                            top: pos.top + "px"
                        });
                        break;
                    case "right":
                        resultEle.css({
                            left: pos.left + $ele.innerWidth() + 12 + "px",
                            top: pos.top + "px"
                        });
                        break
                }
                resultEle.css("width", $ele.innerWidth());
                resultEle.html($opts.message.empty);
                $ele.after(resultEle);
                $opts.resultContainer = "." + resultID;
                $ele.on("showResults", function(e) {
                    var pos = $ele.position();
                    switch ($opts.resultPosition) {
                        case "top":
                            $($opts.resultContainer).css({
                                left: pos.left + "px",
                                top: pos.top - $opts.resultPadding - ($ele.innerHeight() - 33) + "px"
                            });
                            break;
                        case "bottom":
                            $($opts.resultContainer).css({
                                left: pos.left + "px",
                                top: pos.top + ($opts.resultPadding - 3) + "px"
                            });
                            break;
                        case "left":
                            $($opts.resultContainer).css({
                                left: pos.left - $ele.innerWidth() - $opts.resultPadding + "px",
                                top: pos.top + "px"
                            });
                            break;
                        case "right":
                            $($opts.resultContainer).css({
                                left: pos.left + $ele.innerWidth() + 12 + "px",
                                top: pos.top + "px"
                            });
                            break
                    }
                    $($opts.resultContainer).css("width", $ele.innerWidth());
                    clearTimeout($mainObj.resultTimer);
                    eval("$($opts.resultContainer)." + $mainObj.animateIn + "()");
                    setTimeout(function() {
                        eval("$($opts.resultContainer)." + $mainObj.animateOut + "()")
                    }, $opts.resultTime)
                })
            }
            $ele.addClass("ec_notvalidated")
        };
        fnc._refresh = function() {
            if ($opts.resultContainer != "") {
                var e = $(".emailChecker_results " + $opts.resultContainer);
                var t = $ele.position();
                switch ($opts.resultPosition) {
                    case "top":
                        e.css({
                            left: t.left + "px",
                            top: t.top - $opts.resultPadding - ($ele.innerHeight() - 33) + "px"
                        });
                        break;
                    case "bottom":
                        e.css({
                            left: t.left + "px",
                            top: t.top + ($opts.resultPadding - 3) + "px"
                        });
                        break;
                    case "left":
                        e.css({
                            left: t.left - $ele.innerWidth() - $opts.resultPadding + "px",
                            top: t.top + "px"
                        });
                        break;
                    case "right":
                        e.css({
                            left: t.left + $ele.innerWidth() + 12 + "px",
                            top: t.top + "px"
                        });
                        break
                }
                e.css("width", $ele.innerWidth())
            }
        };
        fnc._bindEvents = function() {
            $mainObj.bind("validate_email", function(e, currEle) {
                e.stopPropagation();
                var pos = $(currEle).position();
                switch ($opts.resultPosition) {
                    case "top":
                        $($opts.resultContainer).css({
                            left: pos.left + "px",
                            top: pos.top - $opts.resultPadding - ($(currEle).innerHeight() - 33) + "px"
                        });
                        break;
                    case "bottom":
                        $($opts.resultContainer).css({
                            left: pos.left + "px",
                            top: pos.top + ($opts.resultPadding - 3) + "px"
                        });
                        break;
                    case "left":
                        $($opts.resultContainer).css({
                            left: pos.left - $(currEle).innerWidth() - $opts.resultPadding + "px",
                            top: pos.top + "px"
                        });
                        break;
                    case "right":
                        $($opts.resultContainer).css({
                            left: pos.left + $(currEle).innerWidth() + 12 + "px",
                            top: pos.top + "px"
                        });
                        break
                }
                $($opts.resultContainer).css("width", $ele.innerWidth());
                var callURL = "//api.emailverifyapi.com/api/b/v1?email=" + escape($(currEle).val()) + "&correct=1";
                $($opts.resultContainer).removeClass("emailChecker_invalid");
                if (typeof $opts.inProgress == "function") $opts.inProgress($(currEle).val());
                $($opts.resultContainer).html($opts.inProgressResultTemplate.replace("%%MESSAGE%%", $opts.message.inProgress));
                clearTimeout($mainObj.resultTimer);
                eval("$($opts.resultContainer)." + $mainObj.animateIn + "()");
                $.ajax({
                    url: callURL,
                    context: document.body
                }).done(function(e) {
                    var t = $.parseJSON(e);
                    if (t.status == "Ok" || t.status == "Unknown") {
                        if (typeof $opts.valid == "function") $opts.valid($(currEle).val());
                        $($opts.resultContainer).html($opts.validResultTemplate.replace("%%MESSAGE%%", $opts.message.valid));
                        $($opts.resultContainer).removeClass("emailChecker_invalid").addClass("emailChecker_valid");
                        $(currEle).removeClass("ec_notvalidated").removeClass("ec_invalid").addClass("ec_valid")
                    } else {
                        if (typeof $opts.invalid == "function") $opts.invalid($(currEle).val());
                        $($opts.resultContainer).html($opts.invalidResultTemplate.replace("%%MESSAGE%%", $opts.message.invalid));
                        $($opts.resultContainer).removeClass("emailChecker_valid").addClass("emailChecker_invalid");
                        $(currEle).removeClass("ec_notvalidated").removeClass("ec_valid").addClass("ec_invalid")
                    }
                }).error(function(e, t, n) {
                    if (typeof $opts.error == "function") $opts.error($(currEle).val());
                    $($opts.resultContainer).html($opts.invalidResultTemplate.replace("%%MESSAGE%%", $opts.message.error));
                    console.log("Error from Email Checker API: " + n);
                    $($opts.resultContainer).removeClass("emailChecker_valid").addClass("emailChecker_invalid");
                    $(currEle).removeClass("ec_notvalidated").removeClass("ec_valid").addClass("ec_invalid")
                });
                $mainObj.resultTimer = setTimeout(function() {
                    eval("$($opts.resultContainer)." + $mainObj.animateOut + "()")
                }, $opts.resultTime);
                return true
            });
            if ($opts.validateOnBlur) {
                $ele.unbind("blur").blur(function() {
                    if ($mainObj.validationTimer != null) {
                        clearTimeout($mainObj.validationTimer)
                    }
                    var e = this;
                    $mainObj.validationTimer = setTimeout(function() {
                        $mainObj.trigger("validate_email", e)
                    }, $opts.delay)
                })
            }
            if ($ele.closest("form").length) {
                $ele.closest("form").find('button[type="submit"], input[type="submit"], input[type="image"]').click(function(event) {
                    if ($ele.hasClass("ec_invalid") || $ele.hasClass("ec_notvalidated")) {
                        clearTimeout($mainObj.resultTimer);
                        eval("$($opts.resultContainer)." + $mainObj.animateIn + "()");
                        $mainObj.resultTimer = setTimeout(function() {
                            eval("$($opts.resultContainer)." + $mainObj.animateOut + "()")
                        }, $opts.resultTime);
                        event.preventDefault();
                        event.stopPropagation();
                        return false
                    }
                })
            }
        };
        fnc._build();
        fnc._bindEvents();
        return $mainObj
    };
    $.fn.emailChecker.defaults = {
        delay: 50,
        validateOnBlur: true,
        resultContainer: "",
        resultPosition: "right",
        resultPadding: 50,
        resultTime: 4e3,
        resultAnimation: "fade",
        inProgressResultTemplate: "<strong>%%MESSAGE%%</strong>",
        invalidResultTemplate: "<strong>%%MESSAGE%%</strong>",
        validResultTemplate: "<strong>%%MESSAGE%%</strong>",
        inProgress: null,
        invalid: null,
        valid: null,
        error: null,
        message: {
            empty: "Please enter your email address",
            inProgress: "Validating email address...",
            invalid: "That email address is invalid.",
            valid: "That email address is valid",
            error: "There was a problem validating your email"
        }
    }
})(jQuery, window, document)