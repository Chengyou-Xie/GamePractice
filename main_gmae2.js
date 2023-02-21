$(() => {
    // 取消網頁的選取事件，避免文字或圖片反白影響使用者體驗
    document.onselectstart = function () {
        return false;
    };

    let angle = 0;
    $("h5").on("click", () => {
        $("h5").css("visibility", "hidden");

        angle += Math.floor(Math.random() * 36 + 1) * 10 + 360 * 10;
        let rotate = {
            transition: "3.8s ease", // ease、ease-out、
            transform: `rotate(${angle}deg)`,
        };
        $("img.pointer").css(rotate);

        setTimeout(() => {
            $("h5").css("visibility", "visible");
        }, 3800);
    });
});
