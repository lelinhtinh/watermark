jQuery plugin Watermark
=======================

JQuery plugin Watermark help you seal batch of images, like a stamp tool.

Because this plugin is written in HTML5 and Javascript, so it will operate without a server for image processing, bandwidth limit is no longer the thing you need to worry.

Suitable uses for low-bandwidth web server, or web creation services, free forums without management server as Blogspot, Forumotion, ...

Demo
----

[http://baivong.github.io/watermark/](http://baivong.github.io/watermark/)

Features
--------

1.	Using an image or text to stamp.
2.	Allows you to select a position to stamp on 8 corners of the image.
3.	Size and format options after the stamped image.
4.	Export image to base64 type, so might instead directly into the old photos or upload server allows, for example, Imgur.

#### Defect

1.	Does not work on older browsers that don't support **HTML5**.
2.	Cannot use images be limited server **CORS headers** according to the domain name. If this server in your rights management, you need to set up **Apache** as follows:

```apache
	Header set Access-Control-Allow-Origin "*"
	Header set Access-Control-Allow-Headers "referer, range, accept-encoding, x-requested-with"
```

Download
--------

Direct download file [watermark.zip](https://github.com/baivong/watermark/zipball/master) or [watermark.tar.gz](https://github.com/baivong/watermark/tarball/master) or use the command line:

[Git](https://git-scm.com/)
```bash
$ git clone https://github.com/baivong/watermark.git
```

[Bower](http://bower.io/)
```bash
$ bower install watermark
```

[npm](http://www.npmjs.com/)
```bash
$ npm install watermark
```

How to use
----------

This plugin requires jQuery library from 1.5 or above, add it at the end of your HTML document as follows:

```html
<!-- jQuery 1.5+ -->
<script src="jquery.js" type="text/javascript"></script>
<!-- jQuery plugin Watermark -->
<script src="jquery.watermark.js" type="text/javascript"></script>
```

Usage:

```js
$(function() {
  $(SELECTOR).watermark(OPTIONS);
});
```

### Options

| Name         | Type     | Default                              | Description                                                                |
|--------------|:--------:|:------------------------------------:|----------------------------------------------------------------------------|
| path         |  String  |           'watermark.png'            | Path contains images used as a watermark, can use base64 image.          |
| text         |  String  |                  ''                  | Text used as a watermark.                                                |
| textWidth    |  Number  |                 130                  | Text width of frame surrounds, units: px.                           |
| textSize     |  Number  |                  12                  | Font size of text, units: px.                                       |
| textColor    |  String  |               'white'                | Text color, you can use HEX or RGBA color codes.                                     |
| textBg       |  String  |         'rgba(0, 0, 0, 0.4)'         | Background color, you can use HEX or RGBA color codes.                                     |
| gravity      |  String  |                 'se'                 | The position of the watermark on the image (nw, n, ne, w, e, sw, s, se).             |
| opacity      |  Number  |                 0.7                  | The transparency of watermark, the value between 0 and 1.                     |
| margin       |  Number  |                  10                  | Distance from watermark to edge of image.                                      |
| outputWidth  |  Number  |                'auto'                | Image width after adding watermark, units: px or use 'auto'.           |
| outputHeight |  Number  |                'auto'                | Image height after adding watermark, units: px or use 'auto'.            |
| outputType   |  String  |                'jpeg'                | Image format after adding watermark, You can use one of three types (jpeg, png, webp). |
| done         | Function | `function(imgURL){this.src=imgURL;}` | Called after image with watermark is created.                                |
| fail         | Function |            `function(){}`            | Called after an error of images is occurring.                                   |
| always       | Function |            `function(){}`            | Called when processing finishes (done and fail).                                       |

**Note**:

1.	If you use the `text` parameter, `path` parameter will be disabled. The watermark will be created from the text you type in `text` parameter.
2.	In the `outputType` parameter, `webp` format only works on the Chrome browser. With other browsers, it will return the `png` format. Should avoid use `png` format, because image quality not much higher, but the output image size is quite large.

Examples
--------

### Basic usage

```html
<img class="img_awesome" src="img/1.jpg" alt="" />
<img class="img_awesome" src="img/2.jpg" alt="" />
<img class="img_awesome" src="img/3.jpg" alt="" />
```

```js
$(function() {
  $('.img_awesome').watermark();
});
```

With this usage, you need put `watermark.png` image in the root directory. You can replace it by using the `path` parameter with an URL image or base64 image.

```js
$(function() {
  $('.img_awesome').watermark({
    path: 'http://i.imgur.com/LcpZHu5.png'
  });
});
```

### Choose output image size

For example, limit the maximum width is 500px.

```js
$(function() {
  $('.img_awesome').watermark({
    outputWidth: 500
  });
});
```

You can also limit the height of image with `outputHeight` parameter. Should not use 2 size parameters simultaneously, because it can distort your image. Should only use a parameter, it will adjust the remaining parameter with image ratio.

### Use text as watermark

Like 9gag style.

```js
$(function() {
  $('.img_awesome').watermark({
    text: 'GOOGLE.COM',
    textWidth: 100,
    gravity: 'w',
    opacity: 1,
    margin: 12
  });
});
```

### Use image URL

If you use the image URL, and you just want to export the image URL (added watermark), you can use the following ways:

#### One image

```js
$(function() {
    $('<img>', {
        src: 'http://i.imgur.com/AAPx3rB.jpg'
    }).watermark({
        done: function (imgURL) {
            console.log(imgURL);
        }
    });
});
```

#### Multiple images

```js
$(function() {
    var inputImages = ['http://i.imgur.com/AAPx3rB.jpg', 'http://i.imgur.com/39dfdPw.jpg', 'http://i.imgur.com/3OfclQY.jpg'];

    var outputImages = [];

    var defer = $.Deferred();
    $.when(defer).done(function () {
        console.log(outputImages);
    });

    $.each(inputImages, function (i, v) {
        $('<img>', {
            src: v
        }).watermark({
            done: function (imgURL) {
                outputImages[i] = imgURL;
                if (i + 1 === inputImages.length) {
                    defer.resolve();
                }
            }
        });
    });
});
```

## License
[MIT License](http://opensource.org/licenses/MIT) © [Zzbaivong](https://github.com/baivong)