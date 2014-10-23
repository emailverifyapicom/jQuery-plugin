Email Verification jQuery-plugin
================================

# About
jQuery Plugin is a generic jQuery library has been constructed to use RESTful email verification services hosted at [api.emailverifyapi.com][2].

## Pre-requisites
A license for domain authentication is required.
[Click here to request a license][1]

## Installation
The minified version of javascript is available at:

```
//az631289.vo.msecnd.net/cdn/jquery.emailverifyapi.1.0.0.min.js
```

The minified version of CSS is available at:

```
//az631289.vo.msecnd.net/cdn/jquery.emailverifyapi.1.0.0.min.css
```

### Basic Usage

```html
<!-- if you haven't already, make sure you include jquery, locally or from Google's servers -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<!-- include the jQuery plugin file -->
<script type="text/javascript" src="//az631289.vo.msecnd.net/cdn/jquery.emailverifyapi.1.0.0.min.js"></script>

<!-- include optional CSS -->
<link rel="stylesheet" type="text/css" media="screen" href="//az631289.vo.msecnd.net/cdn/jquery.emailverifyapi.1.0.0.min.css" />

<!-- setup your email fields to be verified -->
<script type="text/javascript">
	$(document).ready(function()
	{
		$('#email').emailChecker();
	});
</script>
```
By default the email field will be verified on blur (when it loses focus) and when it's form is submitted. The verification results will appear to the right of the field by default and will use our default styling.

**Note:** A valid domain ACL / license is required in emailverifyapi.com for client side script to work.
[Click here to request a license][1].

### Advanced Usage
Every part of the plugin's functionality configurable in the easiest way possible. Here are some examples of what can be done. The fill list of options are in the next section.

```html
<script type="text/javascript">
        $(document).ready(function()
        {
            <!-- set a longer delay before validation occurs (default is 50 milliseconds) -->
            $('#email').emailChecker({delay: 500});

            <!-- make the validation results appear above the input (they appear to the right by default) -->
            $('#email').emailChecker({resultPosition: 'top'});

            <!-- use a custom callback when an email address is validated successfully -->
            $('#email').emailChecker({valid: function(value)
            {
                alert('Your email address "'+value+'" is valid!');
            }});

            <!-- set some custom messages and combie with some other options -->
            $('#email').emailChecker({
                delay: 250, 
                resultTime: 5000, 
                resultPosition: 'bottom', 
                resultAnimation: 'slideDown', 
                message: {
                    empty: 'You did not enter an email address!', 
                    inProgress: 'Please wait while we validate your email address...'
                }
            });
        });
</script>
```

### All Options

| Option                    | Default value                                | Accepted values                                      | Description
|---------------------------|----------------------------------------------|------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| delay                     | 50                                           | Any number (milliseconds)                            | The delay in milliseconds before the input field is validated
| validateOnBlur			| true                                         | true/false                                           | If true the field is validated whenever it loses focus. If false the field is only validated when the form is submitted.
| resultContainer           | empty                                        | jQuery selector                                      | If you want to use your own element to show the verification results, put it's selector here. If you leave this empty the plugin will generate it's own result container on the fly.
| resultPosition            | right                                        | top/right/bottom/left                                | The position that the result container will appear, in relation to the input element. Only applies if "resultContainer" is empty.
| resultPadding             | 50                                           | Any number (pixels)                                  | The distance between the "resultContainer" and the input element. Only applies if "resultContainer" is empty.
| resultTime                | 4000                                         | Any number (milliseconds)                            | The amount of time in milliseconds that the results stay visible. Only applies if "resultContainer" is empty.
| resultAnimation           | fade                                         | fade/slideDown/slideUp                               | The animation to use to show and hide the verification results. Only applies if "resultContainer" is empty.
| inProgressResultTemplate  | <strong>%%MESSAGE%%</strong>                 | Any HTML, where %%MESSAGE%% is replace by the result | The HTML template to use to show the in progress message. %%MESSAGE%% will be replaced by the in progress message.
| invalidResultTemplate     | <strong>%%MESSAGE%%</strong>                 | Any HTML, where %%MESSAGE%% is replace by the result | The HTML template to use to show the invalid message. %%MESSAGE%% will be replaced by the in progress message.
| validResultTemplate       | <strong>%%MESSAGE%%</strong>                 | Any HTML, where %%MESSAGE%% is replace by the result | The HTML template to use to shoiw the valid message. %%MESSAGE%% will be replaced by the in progress message.
| inProgress                | null                                         | A function                                           | Function to call when the verification is in progress. The only argument of the function is the value of the input element.
| invalid                   | null                                         | A function                                           | Function to call when the verification comes back as invalid. The only argument of the function is the value of the input element.
| valid                     | null                                         | A function                                           | Function to call when the verification comes back as valid. The only argument of the function is the value of the input element.
| error                     | null                                         | A function                                           | Function to call when there is an error with the verification service. The only argument of the function is the value of the input element.
| message.empty             | Please enter your email address              | Any text                                             | The message to show if no value is entered. 
| message.inProgress        | Validating email address...                  | Any text                                             | The message to show whilst the email address is being validate.
| message.invalid           | That email address is invalid.               | Any text                                             | The message to show if the email address is invalid.
| message.valid             | That email address is valid.                 | Any text                                             | The message to show if the verification is successful.
| message.error             | There was a problem validating your email.   | Any text                                             | The message to show if there is an error with the verification service.

[1]: https://api.emailverifyapi.com/GetLicense
[2]: https://api.emailverifyapi.com