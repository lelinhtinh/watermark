/*  @preserve
 *  Project: jQuery plugin Watermark
 *  Description: ...
 *  Author: Zzbaivong (devs.forumvi.com)
 *  Version: 0.1
 *  License: MIT
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
(function ($, window, document, undefined) {

    'use strict';

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'watermark',
        defaults = {
            path: 'watermark.png',

            text: '',
            textWidth: 130,
            textSize: 12,
            textColor: 'white',
            textBg: 'rgba(0, 0, 0, 0.4)',

            gravity: 'se', // nw | n | ne | w | e | sw | s | se
            opacity: 0.7,
            margin: 10,
            outputWidth: 'auto',
            outputHeight: 'auto',
            outputType: 'jpeg', // jpeg | png
            done: function (imgURL) {
                this.src = imgURL;
            },
            fail: function (imgURL) {
                console.error(imgURL, 'image error!');
            },
            always: function ( /*imgURL*/ ) {
                //console.log(imgURL, 'image URL!');
            }
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            var _this = this,
                ele = _this.element,
                set = _this.settings,
                wmData = {
                    imgurl: set.path,
                    type: 'png',
                    cross: true
                },
                imageData = {
                    imgurl: ele.src,
                    cross: true,
                    type: set.outputType,
                    width: set.outputWidth,
                    height: set.outputHeight
                };

            // Watermark dạng base64
            if (set.path.search(/data:image\/(png|jpg|jpeg|gif);base64,/) === 0) {
                wmData.cross = false;
            }
            // Ảnh đang duyệt dạng base64
            if (ele.src.search(/data:image\/(png|jpg|jpeg|gif);base64,/) === 0) {
                imageData.cross = false;
            }
            var d1 = $.Deferred();


            $.when(d1).done(function (imgObj) {
                imageData.wmObj = imgObj;
                _this.imgurltodata(imageData, function (dataURL) {
                    set.done.call(ele, dataURL);
                    set.always.call(ele, dataURL);
                });
            });

            if (set.text !== '') {
                wmData.imgurl = _this.textwatermark();
                wmData.cross = false;
            }
            _this.imgurltodata(wmData, function (imgObj) {
                d1.resolve(imgObj);
            });
        },
        textwatermark: function () {
            var _this = this,
                set = _this.settings;

            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var w = set.textWidth,
                h = set.textSize + 8;

            canvas.width = w;
            canvas.height = h;

            ctx.fillStyle = set.textBg;
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = set.textColor;
            ctx.textAlign = 'center';
            ctx.font = '500 ' + set.textSize + 'px Sans-serif';
            ctx.fillText(set.text, (w / 2), (set.textSize + 3));

            return canvas.toDataURL();
        },
        imgurltodata: function (data, callback) {
            var _this = this,
                set = _this.settings,
                ele = _this.element;
            var img = new Image();
            if (data.cross) {
                img.crossOrigin = 'Anonymous';
            }
            img.onload = function () {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');

                var w = this.width, // image height
                    h = this.height, // image width
                    ctxH;

                if (data.wmObj) {

                    if (data.width !== 'auto' && data.height === 'auto' && data.width < w) {
                        h = h / w * data.width;
                        w = data.width;
                    } else if (data.width === 'auto' && data.height !== 'auto' && data.height < h) {
                        w = w / h * data.height;
                        h = data.height;
                    } else if (data.width !== 'auto' && data.height !== 'auto' && data.width < w && data.height < h) {
                        w = data.width;
                        h = data.height;
                    }

                }

                if ((set.gravity === 'w' || set.gravity === 'e') && !data.wmObj) {
                    canvas.width = h;
                    canvas.height = w;
                    ctxH = -h;
                    ctx.rotate(90 * Math.PI / 180);
                } else {
                    canvas.width = w;
                    canvas.height = h;
                    ctxH = 0;

                }

                if (data.type === 'jpeg') {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, w, h);
                }

                ctx.drawImage(this, 0, ctxH, w, h);

                if (data.wmObj) {
                    
                    var op = set.opacity;
                    if (op > 0 && op < 1) {
                        ctx.globalAlpha = set.opacity;
                    }

                    var wmW = data.wmObj.width,
                        wmH = data.wmObj.height,
                        pos = set.margin,
                        gLeft, gTop;
                    switch (set.gravity) { // nw | n | ne | w | e | sw | s | se
                        case 'nw':
                            gLeft = pos;
                            gTop = pos;
                            break;
                        case 'n':
                            gLeft = w / 2 - wmW / 2;
                            gTop = pos;
                            break;
                        case 'ne':
                            gLeft = w - wmW - pos;
                            gTop = pos;
                            break;
                        case 'w':
                            gLeft = pos;
                            gTop = h / 2 - wmH / 2;
                            break;
                        case 'e':
                            gLeft = w - wmW - pos;
                            gTop = h / 2 - wmH / 2;
                            break;
                        case 'sw':
                            gLeft = pos;
                            gTop = h - wmH - pos;
                            break;
                        case 's':
                            gLeft = w / 2 - wmW / 2;
                            gTop = h - wmH - pos;
                            break;
                        default:
                            gLeft = w - wmW - pos;
                            gTop = h - wmH - pos;
                    }
                    ctx.drawImage(data.wmObj, gLeft, gTop, wmW, wmH);
                }
                var dataURL = canvas.toDataURL('image/' + data.type);
                if (typeof callback === 'function') {
                    if (data.wmObj) {
                        callback(dataURL);
                    } else {
                        var wmNew = new Image();
                        wmNew.src = dataURL;
                        callback(wmNew);
                    }
                }
                canvas = null;
            };

            img.onerror = function () {
                set.fail.call(this, this.src);
                set.always.call(ele, this.src);
                return false;
            };

            img.src = data.imgurl;
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };

}(jQuery, window, document));
