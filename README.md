jQuery-plugin
=============

jQuery plugin for email address verification.

## About
 * A plug-in for WordPress contact form 7.
 * A general jQuery plugin.

## Usage
When you edit a Contact Form 7 form, there is a new "Email Checker" field. 
You can add as many of these fields as you need, and when you add each one, 
you can configure various options in the form editor.

## jQuery Plugin 
A generic jQuery library has been constructed to use RESTful email verification services hosted at api.emailverifyapi.com.

### Basic Usage

```
#!html
<!-- if you haven't already, make sure you include jquery, locally or from Google's servers -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<!-- include the jQuery plugin file -->
<script type="text/javascript" src="//az631289.vo.msecnd.net/cdn/jquery.emailChecker.1.0.0.min.js"></script>

<!-- include optional CSS -->
<link rel="stylesheet" type="text/css" media="screen" href="//az631289.vo.msecnd.net/cdn/jquery.emailChecker.min.css" />

<!-- setup your email fields to be verified -->
<script type="text/javascript">
	$(document).ready(function()
	{
		$('#email').emailChecker();
	});
</script>
```
By default the email field will be verified on blue (when it loses focus) and when it's form is submitted. The verification results will appear to the right of the field by default and will use our default styling.

**Note:** A valid domain ACL / license is required in emailverifyapi.com for client side script to work.

### Advanced Usage
Every part of the plugin's functionality configurable in the easiest way possible. Here are some examples of what you can do. The fill list of options are in the next section.

```
#!html
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
