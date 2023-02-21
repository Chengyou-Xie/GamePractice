$(() => {
    // 取消網頁的選取事件，避免文字或圖片反白影響使用者體驗
    document.onselectstart = function () {
        return false;
    };

    const numberType = ["零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖", "拾"];
    const btnType = ["筒", "條", "萬"];
    const src = "./image/mahjong/";
    const btns = [
        $(".btn1")[0],
        $(".btn2")[0],
        $(".btn3")[0],
        $(".btn4")[0],
        $(".btn5")[0],
        $(".btn6")[0],
        $(".btn7")[0],
        $(".btn8")[0],
        $(".btn9")[0],
    ];

    let password = Math.floor(Math.random() * 99) + 1;

    let input = [];
    let inputValue = 0;
    let min = 0;
    let max = 100;
    console.log("密碼為:", password);

    // 無論點選 <td>、<img> 都是回傳 <img>
    $("img").on("click", (e) => {
        e.stopPropagation();
        clickBtn(e.target);
    });

    $("td").on("click", (e) => {
        clickBtn(e.target.childNodes[0]);
    });

    function clickBtn(element) {
        // 以 element.alt 取得實際點擊按鈕的值
        inputValue = 0;

        // 輸入數字到 []內，限不超過兩位數
        if (element.alt != "delete" && element.alt != "enter") {
            if (input.length < 2) {
                input.push(element.alt);
            }
        }

        if (element.alt == "delete") {
            input.pop();
        }

        // 輸入的 [] => 數字 => 換成國字並顯示到畫面上
        input.forEach((item) => {
            inputValue = parseInt(item) + inputValue * 10;
        });
        $(".inputValue").text(updatePage(inputValue));

        // 送出前一定要執行上面的程式碼（inputValue 要先經過計算）
        if (element.alt == "enter") {
            input = [];
            changeBtn();
            checkPassword(inputValue);
            $(".inputValue").text(updatePage(0));
        }
    }

    function checkPassword(inputVal) {
        console.log("你輸入的值為", inputVal);

        // 超出範圍
        if (inputVal <= min || inputVal >= max) {
            // alert("看清楚再答好嗎 美幹拎？");
            $("#boom").text("蛤，才這樣就醉了 ಠ_ಠ？");
            $("#boom").css("visibility", "visible");

            $(document).on("click", () => {
                $("#boom").css("visibility", "hidden");
                $(document).unbind("click");
            });
            return;
        }

        if (inputVal > password) {
            $(".max").text(updatePage(inputVal));
            max = inputVal;
        }

        if (inputVal < password) {
            $(".min").text(updatePage(inputVal));
            min = inputVal;
        }

        if (inputVal == password) {
            // alert("中了，喝！！");
            $("#boom").text("中了💣，喝 ٩(๑❛ᴗ❛๑)۶");
            $("#boom").css("visibility", "visible");

            $(document).on("click", () => {
                $("#boom").css("visibility", "hidden");
                $(document).unbind("click");
                restart();
            });
        }
    }

    function updatePage(n) {
        let str = "";
        let arr = n.toString();

        if (arr.length == 3) {
            return "壹佰";
        }

        for (let i = 0; i < arr.length; i++) {
            // 雙位數多個 "拾"，尾數為零不再加上 "零"
            if (i == 1) {
                str += numberType[10];
                if (arr[i] == 0) {
                    break;
                }
            }
            str += numberType[arr[i]];
        }
        return str;
    }

    function restart() {
        password = Math.floor(Math.random() * 99) + 1;
        min = 0;
        max = 100;
        $(".min").text(updatePage(min));
        $(".max").text(updatePage(max));
        console.log("密碼為:", password);
    }

    function changeBtn() {
        btns.forEach((btn, index) => {
            let r = Math.floor(Math.random() * 3);
            btn.childNodes[0].src = src + (index + 1) + btnType[r] + ".png";
        });
    }
});
