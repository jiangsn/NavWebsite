
var main = document.querySelector("main")




// 生成键盘
generateKeyborad(init());



//监听
flag = true;






function init() {
    var keyborad = {
        0: ["q", 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        1: ["a", 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        2: ["z", 'x', 'c', 'v', 'b', 'n', 'm'],
    };

    var hash = {
        'a': "baidu.com",
        'b': "qq.com",
        'c': "baidu.com",
        'd': "tencent.com",
        'e': "youtube.com",
        'f': "yello.com",
        'g': "qq.com",
        'h': "ii.com",
        'i': "ii.com",
        'j': "baidu.com",
        'k': "youtube.com",
        'l': "root.com",
        'm': "qq.com",
        'n': "youtube.com",
        'o': "qq.com",
        'p': "qq.com",
        'q': "baidu.com",
        'r': "r-project.org",
        's': "qq.com",
        't': "tencent.com",
        'u': "ui.cn",
        'v': "vuetifyjs.com",
        'w': "youtube.com",
        'x': "yello.com",
        'y': "yello.com",
        'z': "baidu.com",
    };


    if (localStorage.getItem("keyboardUrl")) {
        hash = getLocalStrageItmes();
    } else {
        setLocalStrageItmes(hash);
    }
    return { keyborad, hash };
}

// 生成键盘
function generateKeyborad(data) {
    for (var key in data.keyborad) {
        var div = createTagAddAttribute("div", { className: 'row' });
        main.appendChild(div);
        for (i in data.keyborad[key]) {
            var kba = createTagAddAttribute("kba");
            var span = createTagAddAttribute("span");
            var span1 = createTagAddAttribute("span", { className: 'edit' });
            span1.textContent = '编辑';

            //添加监听事件
            listenerAndEdit(span1);
            span.textContent = data.keyborad[key][i];

            var img = createTagAddAttribute("img", { id: (span.textContent) });
            // 设置url
            setImage(img, span.textContent);

            div.appendChild(kba);
            kba.appendChild(span);
            kba.appendChild(span1);
            kba.appendChild(img);
        }

    }

    //favicon.ico
}



// 创建tag添加属性
function createTagAddAttribute(tag, attribute) {
    var element = document.createElement(tag);
    if (typeof attribute) {
        for (var key in attribute) {
            element[key] = attribute[key];
        }
    }
    return element;
}


// 修改edit
function listenerAndEdit(target) {

    target.addEventListener('click', function () {
        document.removeEventListener("keydown", keyListener, false)
        let prompt = createTagAddAttribute('div', { className: 'cuPrompt' });

        prompt.draggable="true";
        let urlx = createTagAddAttribute('input', { className: 'url' });
        urlx.type = 'text';
        let urlDiv = createTagAddAttribute('div', { className: 'urlDiv' });
        urlDiv.appendChild(urlx)
        let enter = createTagAddAttribute('button', { className: 't' });
        enter.textContent = "OK";
        let cacel = createTagAddAttribute('button', { className: 'f' });
        cacel.textContent = "Cancel";
        let selectDiv = createTagAddAttribute('div', { className: 'selectDiv' });
        selectDiv.appendChild(enter);
        selectDiv.appendChild(cacel);
        let body = document.querySelector('body');
        body.appendChild(prompt);
        prompt.appendChild(urlDiv);
        prompt.appendChild(selectDiv);

        var key = target.previousSibling.textContent;
        var HashUrl = getLocalStrageItmes();
    
        urlx.value =HashUrl[key];


        enter.addEventListener("click", () => {
            document.querySelector("body").removeChild(prompt);
            document.addEventListener("keydown", keyListener, false)
            if (urlx.value) {
                var key = target.previousSibling.textContent;
                var HashUrl = setHashUrl(key, urlx.value)
                setLocalStrageItmes(HashUrl);

                var element = document.querySelector('#' + key);

                setImage(element, key);

            }
        });
        cacel.addEventListener("click", () => {
            document.querySelector("body").removeChild(prompt);
            document.addEventListener("keydown", keyListener, false)
        });

    });
}

//设置域名键位hash

function setHashUrl(tag, url) {
    var data = init();
    data['hash'][tag] = url;
    return data['hash']
}

// 键盘监听

document.addEventListener("keydown", keyListener, false)

function keyListener(e) {
    var hash = getLocalStrageItmes();

    var key = hash[e.key];

    if (key) {
        window.open('http://' + key, '_blank')
    }
}

// 从localStrage取数据

function getLocalStrageItmes() {
    var hash = JSON.parse(localStorage.getItem("keyboardUrl"));

    return hash;
}
// 从localStrage存数据
function setLocalStrageItmes(item) {
    localStorage.setItem("keyboardUrl", JSON.stringify(item));
}

fadeOut();
function fadeOut() {
    document.querySelector('.fade').addEventListener('click', function () {
        document.querySelector('main').classList.toggle("fadeOut");
    }, false);
}

// 添加图片
function setImage(element, key) {
    var hashUrl = getLocalStrageItmes();
    var url = hashUrl[key];

    element.src = "https://www." + url + "/favicon.ico";


    element.onerror = () => {
        element.src = "https://www.qq.com/favicon.ico";
    }
}
// 拖动输入界面

// document.addEventListener("click",()=>{
//     if(document.querySelector(".cuPrompt")){
//         document.querySelector(".cuPrompt").addEventListener("click",()=>{
//             alert(01)
//         })
//     }
// })

