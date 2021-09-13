(function scrollbar(className) {
    function isPC() {
        const userAgent = navigator.userAgent;
        const arr = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        let flag = true;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (userAgent.indexOf(arr[i]) !== -1) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    if (!isPC()) {
        return false;
    }

    const css = `
            .__slide_bar {
                content: '';
                background: #c9c9c9;
                width: 4px;
                height: calc(100% - 4px);
                z-index: 99999999;
                position: absolute;
                top: 2px;
                right: 2px;
                display: none;
                border-radius: 3px;
                /*overflow: hidden;*/
            }
            .__slide_block {
                content: '';
                background: #3f3f3f;
                width: 100%;
                height: 10px;
                border-radius: 3px;
                transition: transform .1s;
            }
            .__slide_div {
                transition: transform .1s;
            }
            .${className}:hover .__slide_bar {
                display: block;
            }
    `

    const cssElement = document.createElement("style");
    cssElement.innerHTML = css;
    document.head.appendChild(cssElement);
    const div = document.querySelectorAll('.' + className);

    for (let i = 0, len = div.length; i < len; i++) {
        createSlide(div[i])
    }

    function createSlide(element) {
        element.style.overflow = 'hidden';
        element.style.position = 'relative';
        const slideDiv = document.createElement('div');
        const slideBar = document.createElement('div'); // scrollbar
        const slideBlock = document.createElement('div'); // scrollbar
        slideBlock.className = '__slide_block'; // scrollbar
        slideBar.className = '__slide_bar'; // scrollbar
        slideBar.appendChild(slideBlock) // scrollbar
        slideDiv.className = '__slide_div';
        slideDiv.innerHTML = element.innerHTML;
        element.innerHTML = '';
        element.appendChild(slideBar); // scrollbar
        element.appendChild(slideDiv);
        const boxHeight = element.offsetHeight;
        const slideHeight = slideDiv.offsetHeight;
        if (slideHeight < boxHeight) {
            // 不用添加滑动条
            return false;
        }

        // 顶部偏移位置
        const slideTop = 0;
        // 底部偏移位置
        const slideBottom = (slideHeight - boxHeight);

        // 单次滑动距离
        const slidePX = 32;

        // 能够滑动的次数
        const slideNum = ~~((slideBottom / 32) + .5); // scrollbar
        // 设置滑动块高度
        const slideBlockHeight = ~~(boxHeight / (slideNum + 1)) // scrollbar
        slideBlock.style.height = slideBlockHeight + 'px' // scrollbar

        // 当前滑动位置
        let translateNum = 0; // scrollbar
        let translate = 0;
        element.onmousewheel = (e) => {
            if (e.wheelDeltaY > 0) {
                // 向上滑
                translate += slidePX
                translateNum--

                if (translate >= 0) {
                    translate = slideTop;
                    translateNum = 0; // scrollbar
                }
                slideDiv.style.transform = 'translateY(' + (translate) + 'px)'
                slideBlock.style.transform = 'translateY(' + (translateNum * slideBlockHeight) + 'px)' // scrollbar
            } else {
                // 向下滑
                translate -= slidePX
                translateNum++

                if (-translate >= slideBottom) {
                    translate = -slideBottom - 2;
                    translateNum = slideNum; // scrollbar
                }
                slideDiv.style.transform = 'translateY(' + (translate) + 'px)'
                slideBlock.style.transform = 'translateY(' + ((translateNum * slideBlockHeight) - 2) + 'px)' // scrollbar
            }
        }
    }
})('scrollbar')