$(() => {
    let questions = [];

    $("#selectType").on("change", function () {
        let type = this.value;
        readHandler(type);
    });

    function readHandler(type) {
        let url = "http://localhost:3000/question";
        $.getJSON(url)
            .done((msg) => {
                questions = msg[type];
            })
            .fail((msg) => {
                console.log("Fail!");
            });
    }

    // 真心話
    $(".truth").on("click", async () => {
        let style = {
            color: "var(--bg-color)",
            backgroundColor: "var(--primary-color)",
            borderColor: "var(--primary-color)",
        };

        $(".truth").text("真心話😍");
        $(".dare").text("大冒險");
        $(".questionBanner").css(style);
        $("#question").css({ color: "var(--bg-color)" });

        if (questions.length == 0) {
            $("#question").text("請選擇類型");
            return;
        }

        let index = Math.floor(Math.random() * questions["真心話"].length);
        console.log("真心話", index);
        $("#question").text(questions["真心話"][index]);
    });

    // 大冒險
    $(".dare").on("click", () => {
        let style = {
            color: "var(--bg-color)",
            backgroundColor: "var(--secondary-color)",
            borderColor: "var(--secondary-color)",
        };

        $(".dare").text("大冒險😈");
        $(".truth").text("真心話");
        $(".questionBanner").css(style);
        $("#question").css({ color: "var(--bg-color)" });

        if (questions.length == 0) {
            $("#question").text("請選擇類型");
            return;
        }

        let index = Math.floor(Math.random() * questions["大冒險"].length);
        console.log("大冒險", index);
        $("#question").text(questions["大冒險"][index]);
    });
});
