<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div style="background: #ccc; width: 100px; height: 850px" class="scrollbar">
        <p>111111111111111111111111111111111111111111111111111111111111111</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
    </div>


    <style>
        .scrollbar {
            overflow: hidden;
        }
        .__scrollbar_container {
            display: inline-block;
            position: relative;
            overflow: hidden;
        }
        .__scrollbar_translate {
            transition: all .15s;
        }

        .__scrollbar_bar_x {
            width: 100%;
            height: 8px;
            background: #000;
            border-radius: 3px;
            position: absolute;
            left: 0;
            bottom: -16px;
            z-index: 9999;
        }
        .__scrollbar_container:hover > .__scrollbar_bar_x {
            bottom: 0;
        }
        .__scrollbar_block_x {
            height: 6px;
            margin-top: 1px;
            background: red;
            min-width: 5px;
        }

        .__scrollbar_bar {
            width: 8px;
            height: 100%;
            background: #000;
            border-radius: 3px;
            position: absolute;
            top: 0;
            right: -16px;
            z-index: 9999;
        }
        .__scrollbar_container:hover > .__scrollbar_bar {
            right: 0;
        }
        .__scrollbar_block {
            width: 6px;
            margin: 0 auto;
            background: red;
            min-height: 5px;
        }
    </style>
    <script>
        (function(element) {
            const useAddControlElement = (dom) => {
                const clientHeight = dom.clientHeight
                const scrollHeight = dom.scrollHeight
                let isAddY = true
                if (scrollHeight <= clientHeight) {
                    // 不需要添加
                    isAddY = false
                }

                const clientWidth = dom.clientWidth
                const scrollWidth = dom.scrollWidth
                let isAddX = true
                if (scrollWidth <= clientWidth) {
                    // 不需要添加
                    isAddX = false
                }

                if (!isAddX && !isAddY) {
                    return
                }

                const divTranslate = document.createElement('div')
                const div = document.createElement('div')
                if (isAddY || isAddX) {
                    console.log(dom);
                    if (dom.tagName.toLowerCase() === 'html') {
                        // TODO HTML 超出时处理
                        return
                    }
                    // 在当前元素内 套一个 div 用来偏移子元素
                    divTranslate.className = '__scrollbar_translate'
                    divTranslate.innerHTML = (dom.innerHTML)
                    dom.innerHTML = ''
                    dom.append(divTranslate)

                    // 在当前元素外层 套一个 div 用来定位滑动条
                    div.className = '__scrollbar_container'
                    dom.parentNode.insertBefore(div, dom);
                    div.appendChild(dom)
                }

                const scrollBar = document.createElement('div')
                const scrollBlock = document.createElement('div')
                let blockHeight = 0
                if (isAddY) {
                    // 添加滑动条
                    scrollBar.className = '__scrollbar_bar'
                    scrollBlock.className = '__scrollbar_block'
                    scrollBar.appendChild(scrollBlock)
                    div.appendChild(scrollBar)

                    // 计算滚动块高度
                    blockHeight = (clientHeight / scrollHeight) * clientHeight
                    scrollBlock.style.height = blockHeight + 'px'
                    console.log(blockHeight);
                }


                const scrollBarX = document.createElement('div')
                const scrollBlockX = document.createElement('div')
                let blockWidth = 0
                if (isAddX) {
                    // 添加滑动条
                    scrollBarX.className = '__scrollbar_bar_x'
                    scrollBlockX.className = '__scrollbar_block_x'
                    scrollBarX.appendChild(scrollBlockX)
                    div.appendChild(scrollBarX)

                    // 计算滚动块高度
                    blockWidth = (clientWidth / scrollWidth) * clientWidth
                    scrollBlockX.style.width = blockWidth + 'px'
                    console.log(blockWidth);
                }

                if (isAddX || isAddY) {
                    // 监听滚动
                    let transformX = 0
                    let transform = 0
                    dom.onwheel = (e) => {
                        console.log(e, transformX);
                        const size = e.wheelDeltaY / 100
                        if (e.shiftKey) {
                            if (e.wheelDeltaY > 0) {
                                console.log('向左滚', size);
                                const scrollSize = clientWidth * (size * 0.1)
                                console.log(scrollSize);
                                transformX -= scrollSize
                                if (transformX < 0) {
                                    transformX = 0
                                }
                                divTranslate.style.transform = "translateX("+-transformX+"px)"
                                scrollBlockX.style.transform = "translateX("+transformX+"px)"
                            } else {
                                console.log('向右滚', size);
                                const scrollSize = clientWidth * (-size * 0.1)
                                console.log(scrollSize);
                                transformX += scrollSize
                                if (transformX > clientWidth - blockWidth) {
                                    transformX = clientWidth - blockWidth
                                }
                                divTranslate.style.transform = "translateX("+-transformX+"px)"
                                scrollBlockX.style.transform = "translateX("+transformX+"px)"
                            }
                        } else {
                            if (e.wheelDeltaY > 0) {
                                console.log('向上滚', size);
                                const scrollSize = clientHeight * (size * 0.1)
                                console.log(scrollSize);
                                transform -= scrollSize
                                if (transform < 0) {
                                    transform = 0
                                }
                                divTranslate.style.transform = "translateY("+-transform+"px)"
                                scrollBlock.style.transform = "translateY("+transform+"px)"
                            } else {
                                console.log('向下滚', size);
                                const scrollSize = clientHeight * (-size * 0.1)
                                console.log(scrollSize);
                                transform += scrollSize
                                if (transform > clientHeight - blockHeight) {
                                    transform = clientHeight - blockHeight
                                }
                                divTranslate.style.transform = "translateY("+-transform+"px)"
                                scrollBlock.style.transform = "translateY("+transform+"px)"
                            }
                        }

                    }
                }

            }

            const addScrollbar = (dom) => {
                useAddControlElement(dom)
            }

            const doms = document.querySelectorAll(element)
            for (let i = 0, len = doms.length; i < len; i++) {
                addScrollbar(doms[i])
            }
        })('*')
    </script>
</body>
</html>
