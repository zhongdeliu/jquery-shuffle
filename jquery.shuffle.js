(function ($) {
    var shuffleModule = function () {
        function shuffle(arr) {
            var tmp, current, top = arr.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = arr[current];
                    arr[current] = arr[top];
                    arr[top] = tmp;
                }
            }
            return arr;
        }

        function updateContainer(c, curElements, newElements, remove, mode) {
            var i, newE, curE;

            for (i = 0; i < curElements.length; i++) {
                curE = $(curElements[i]);
                newE = $(newElements[i]);
                switch (mode) {
                    case 'append':
                        c.append(newE);
                        break;
                    case 'prepend':
                        c.prepend(newE);
                        break;
                    case 'same':
                        curE.after(newE);
                        break;
                }
                if (remove === true) {
                    curE.remove();
                }

            }
            return c;
        }

        return {
            exec:function (config) {
                var i = 0,
                    orderArray = [];

                for (i = 0; i < config.elements.length; i++) {
                    orderArray.push(i);
                }
                orderArray = shuffle(orderArray);

                return updateContainer(config.container, config.elements, $.map(config.elements, function (e, i) {
                    return $(config.elements[orderArray[i]]).clone(true);
                }), config.removeElements, config.mode);
            }
        };
    }();

    $.fn.shuffle = function (options) {
        var config = $.fn.shuffle.defaults;
        if (typeof options === 'string') {
            config.selector = options;
        } else if (typeof options === 'object') {
            config = $.extend(config, options);
        }
        return this.each(function () {
            $this = $(this);
            config.container = $this;
            config.elements = $this.children(config.selector);
            return (config.elements.length) ? shuffleModule.exec(config) : $this;
        });
    };
    
    $.fn.shuffle.defaults = {
        'removeElements' : true,
        'mode': 'same'
    };
})(jQuery);