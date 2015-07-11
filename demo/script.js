function demo() {
    var inputImages = ['http://i.imgur.com/AAPx3rB.jpg', 'http://i.imgur.com/39dfdPw.jpg'];
    $.each(inputImages, function (i, v) {
        $('<img>', {
            src: v
        }).watermark({
            done: function (imgURL) {
                $('#content').append('<p><img src="' + imgURL + '"></p>');
            }
        });
    });

    $('.watermark').watermark({
        text: 'GOOGLE.COM',
        textWidth: 100,
        gravity: 'w',
        opacity: 1,
        margin: 12
    });

    $('.watermark2').watermark({
        path: 'http://i.imgur.com/h0trtqE.jpg',
        margin: 0,
        gravity: 'nw',
        opacity: 0.5,
        outputWidth: 400
    });
}
$(function () {
    demo();
});
