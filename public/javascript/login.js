console.log("connected");
grecaptcha.ready(function() {
// do request for recaptcha token
// response is promise with passed token
    grecaptcha.execute('6LckzeUUAAAAANcKm00v94x1ocprnEd1BFiU6Azu', {action:'login'})
              .then(function(token) {
        // add token value to form
        document.getElementById('g-recaptcha-response').value = token;
    });
});