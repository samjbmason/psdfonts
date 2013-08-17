$(document).ready(function(){
    // This blocks the button default event and fires the field input but allows for styling.

    var realFileField = $('#js-file-field');
    var errorWrap = $('.errors-box');

    $('#js-file-btn').click(function(e){
        e.preventDefault();
        realFileField.click();
        errorWrap.removeClass('fade-in').hide();
    });

    realFileField.change(function(){
        var filePath = $(this).val();
        var fileName = filePath.substr(filePath.lastIndexOf('\\')+1);

        $('#js-file-name').text(fileName);
        $('.upload-form__file-actions').show(0,function(){
            $(this).addClass('fade-in');
        });
    });

   formValidator = new FormValidator('psd-form', [{
    name: 'psd',
    display: 'psd file',
    rules: 'required'
    }], function(errors, evt) {

        if (errors.length > 0) {

            var errorString = '';

            for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
                errorString += '<p class="errors-box__message">' + errors[i].message + '<p>';
            }

            errorWrap.html(errorString).show(0,function(){
                $(this).addClass('fade-in');
            });

            // This stops the form from firing if there are errors
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            } else if (event) {
                event.returnValue = false;
            };
        };
    });

    formValidator.setMessage('required', 'You must choose a %s.');
});


