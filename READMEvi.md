jQuery plugin Watermark
=======================

jQuery plugin Watermark giúp bạn đóng dấu ảnh hàng loạt với đầy đủ các tính năng cơ bản của một tiện ích đóng dấu ảnh.

Vì plugin này sử dụng HTML5 và Javascript nên nó sẽ hoạt động mà không cần đến một máy chủ để xử lý ảnh, vấn đề băng thông không còn là điểu bạn cần lo lắng.

Thích hợp sử dụng cho các máy chủ web băng thông thấp, hoặc các dịch vụ tạo web, forum miễn phí mà không quản lý được máy chủ như Blogspot, Forumotion, ...

Demo
----

[http://baivong.github.io/watermark/](http://baivong.github.io/watermark/)

Tính năng
---------

1.	Sử dụng hình ảnh hoặc một văn bản để đóng dấu.
2.	Cho phép chọn vị trí đóng dấu ở 8 góc của ảnh.
3.	Tùy chọn kích thước và định dạng ảnh sau khi đóng dấu.
4.	Xuất ra kiểu ảnh base64 nên có thể thay trực tiếp vào ảnh cũ hoặc tải lên máy chủ cho phép, ví dụ: Imgur.

#### Nhược điểm

1.	Không hoạt động trên các trình duyệt cũ không hỗ trợ **HTML5**.
2.	Không thể sử dụng hình ảnh bị máy chủ giới hạn **CORS headers** theo tên miền. Nếu đó là máy chủ bạn quản lý, bạn cần thiết lập **Apache** như sau:

```apache
	Header set Access-Control-Allow-Origin "*"
	Header set Access-Control-Allow-Headers "referer, range, accept-encoding, x-requested-with"
```

Tải xuống
---------

Tải trực tiếp tệp [watermark.zip](https://github.com/baivong/watermark/zipball/master) hoặc [watermark.tar.gz](https://github.com/baivong/watermark/tarball/master) hoặc dùng:

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

Hướng dẫn
---------

Plugin này yêu cầu thư viện jQuery từ 1.5 trở lên, thêm nó vào cuối tài liệu HTML của bạn như sau:

```html
<!-- jQuery 1.5+ -->
<script src="jquery.js" type="text/javascript"></script>
<!-- jQuery plugin Watermark -->
<script src="jquery.watermark.js" type="text/javascript"></script>
```

Áp dụng phương thức watermark lên các ảnh bạn cần:

```js
$(function() {
  $(SELECTOR).watermark(OPTIONS);
});
```

### Tùy chọn

| Name         | Type     | Default                              | Description                                                                |
|--------------|:--------:|:------------------------------------:|----------------------------------------------------------------------------|
| path         |  String  |           'watermark.png'            | Đường dẫn chứa ảnh dùng làm watermark, có thể sử dụng ảnh base64.          |
| text         |  String  |                  ''                  | Văn bản dùng làm watermark.                                                |
| textWidth    |  Number  |                 130                  | Độ dài khung viền bao quanh văn bản, đơn vị: px.                           |
| textSize     |  Number  |                  12                  | Kích thước của kiểu chữ, đơn vị: px.                                       |
| textColor    |  String  |               'white'                | Màu chữ, có thể dùng mã màu HEX, RGBA.                                     |
| textBg       |  String  |         'rgba(0, 0, 0, 0.4)'         | Màu nền, có thể dùng mã màu HEX, RGBA.                                     |
| gravity      |  String  |                 'se'                 | Vị trí đặt watermark ở 8 góc ảnh (nw, n, ne, w, e, sw, s, se).             |
| opacity      |  Number  |                 0.7                  | Độ trong suốt của watermark, nhận giá trị giữa 0 và 1.                     |
| margin       |  Number  |                  10                  | Khoảng cách watermark so với mép ảnh.                                      |
| outputWidth  |  Number  |                'auto'                | Chiều rộng ảnh sau khi gắn watermark, đơn vị: px hoặc để 'auto'.           |
| outputHeight |  Number  |                'auto'                | Chiều cao ảnh sau khi gắn watermark, đơn vị: px hoặc để 'auto'.            |
| outputType   |  String  |                'jpeg'                | Định dạng ảnh sau khi gắn watermark, có thể chọn 3 kiểu (jpeg, png, webp). |
| done         | Function | `function(imgURL){this.src=imgURL;}` | Xử lý khi tạo ảnh với watermark thành công.                                |
| fail         | Function |            `function(){}`            | Xử lý khi tạo ảnh với watermark gặp lỗi.                                   |
| always       | Function |            `function(){}`            | Xử lý khi tiến trình xử lý kết thúc.                                       |

**Lưu ý**:

1.	Nếu bạn sử dụng thông số `text` thì thông số `path` sẽ bị vô hiệu. Watermark sẽ được tạo từ văn bản bạn nhập vào thông số `text`.
2.	Trong thông số `outputType`, định dạng `webp` chỉ hoạt động trên trình duyệt Chrome. Với các trình duyệt khác, nó sẽ trả về định dạng `png`. Nên hạn chế dùng định dạng `png` vì chất lượng ảnh cao hơn không nhiều, mà dung lượng ảnh xuất ra khá lớn.

Một số ví dụ
------------

### Cách dùng cơ bản

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

Với cách dùng này, bạn phải đặt ảnh `watermark.png` ở trong thư mục gốc. Bạn có thể thay thế nó bằng cách thiết lập thông số `path` một URL ảnh http hoặc dạng base64.

```js
$(function() {
  $('.img_awesome').watermark({
    path: 'http://i.imgur.com/LcpZHu5.png'
  });
});
```

### Chọn kích thước ảnh xuất ra

Ví dụ, giới hạn chiều rộng tối đa 500px.

```js
$(function() {
  $('.img_awesome').watermark({
    outputWidth: 500
  });
});
```

Bạn cũng có thể giới hạn theo chiều cao bằng thông số `outputHeight`. Không nên dùng cùng lúc 2 thông số kích thước, vì nó có thể làm méo hình ảnh của bạn. Chỉ nên dùng một thông số, nó sẽ điều chỉnh thông số còn lại tỉ lệ với ảnh.

### Sử dụng Text làm watermark

Kiểu dùng này được làm theo phong cách của 9GAG.

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

### Dùng URL ảnh

Nếu bạn sử dụng URL ảnh, và bạn chỉ muốn xuất ra URL ảnh (đã gắn watermark), bạn có thể dùng cách sau:

#### 1 ảnh

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

#### Nhiều ảnh

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