$(document).ready(function () {
    var useragent = navigator && navigator.userAgent;
    var $submit = $('.submit');
    var $form = $('.form');
    var $input = $('.input');
    var $ua = $('.ua');

    $ua.text(useragent);

    $submit.attr('disabled', 'disabled');
    $input.on('keyup change', function () {
        var val = this.value && this.value.trim();
        if (!val) {
            $submit.attr('disabled', 'disabled');
        }
        else {
            $submit.removeAttr('disabled');
        }
    });

    $submit.on('click', submit);

    function submit(e) {
        e.preventDefault();
        var phoneType = $input[0].value;
        $.ajax({
            type: 'POST',
            url: 'ua',
            data: {
                useragent: useragent,
                phoneType: phoneType
            },
            success: function (res) {
                if (res && res.code === '0') {
                    $input.attr('disabled', 'disabled');
                    $submit.attr('disabled', 'disabled');
                    $form.css('opacity', 0.5);
                    alert(res.msg);
                }
                else if (res && res.code === '1') {
                    alert(res.msg);
                }
                else {
                    alert('服务出错，请您稍后再试。');
                }
            }
        });

        return false;
    }
});
