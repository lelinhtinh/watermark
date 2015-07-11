function demo() {
    $('<img>', {
        src: 'img/9.png'
    }).watermark({
        done: function (a) {
            $('#content').prepend('<p><img src="' + a + '" /></p>');
        }
    });
    
    $('.watermark').watermark({
        //outputType: 'jpeg',
        text: 'DEVS.FORUMVI.COM',
        gravity: 'w', // nw | n | ne | w | e | sw | s | se,
        //opacity: 1,
        margin: 15,
        outputWidth: 500
    });
    
    $('.watermark2').watermark({
        outputWidth: 200
    });
}
$(function () {
    demo();
});
