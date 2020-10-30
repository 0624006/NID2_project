/*
資料庫建議？
    1. 一開始產出就更新獎序
       開始後產出的人員其獎序可以是同一個例如抽取五位期都是0 0 0 0 0，當現場遊戲結束後確認victory後再將該人員獎序更新為大獎序。
       REDRAW重新抽取同L1。

    2. 遊戲結束後確認victory後再將獎序寫入。

下方可搜尋：
***更換資料
****更新資料
*/

// Loading 
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        setTimeout(function () {
            $('#loading').fadeOut();
            $('.container').fadeIn();
        }, 1000);
    };
}

$(function () {
    var n = 0; //抽取數量，由數量框設定
    var count = 0; // 計數
    var du = 0; // 動畫延遲時間
    var F = 10; // 預設顯示個數，用於斷頁
    /* ----預設值----*/

    $('#btn_next').prop('disabled', true);
    $('#btn_new').prop('disabled', true);

    $('.btn').on('click', function () {
        var $this = $(this);
        var name = $this.attr('id');
        switch (name) {
            case 'btn_new':
                $('.div_count').toggleClass('btnS');
                $('#lottery').empty(); //每次都先清空畫面
                $('#number').val('1');
                break;
            case 'btn_next':
                // 下一批，count累加10
                count += F;
                console.log(n, count);
                for_list(n, count);
                break;
            case 'btn_close':
                $('.col-12.card_msg').removeAttr('style'); // 清除人員顯示動畫
                $('.bg').removeAttr('style'); // 清除card_msg的背景
                break;
            default:
                break;
        };
    });

    $('#myModal').on('show.bs.modal', function (e) {
        //獲取點擊打開的按鈕
        var button = $(e.relatedTarget);
        //根據標籤傳入參數
        var recipient = button.data('whatever');
        if (recipient === 'submit') {
            md_content.innerHTML = `\
			<h4 style="line-height: 3.5rem;"><font class='bg-danger text-white'>人數確認</font></br>\
			請再次確認人數：${$('#number').val()}</h4>`;
            $('#bt_suc').off('click').on('click', function () {
                $('.div_count').addClass('btnS');
                console.log($('#number').val());
                n = $('#number').val();
                if (n <= 5) {
                    $('#lottery').attr('style', 'justify-content: center;');
                }
                count = 0;
                setTimeout(function () {
                    for_list(n, count);
                }, 750);
            });
        };
        $('#btn_clo').off('click').on('click', function () { }); // close後

    });

    /* 動畫，每個抽取卡牌之重新抽取監聽，頭獎監聽 */
    function anima() {
        //動畫
        $('#lottery > .col').each(function () { $(this).toggleClass("autoshow"); });

        if ($('#lottery > .col > .back > input').length != 0) {
            //重新抽取監聽
            $('#lottery > .col > .back > input#redraw').each(function () {
                $(this).on('click', function () {
                    $(this).prev().html(`部門：MIS <br> 工號：0000${getRandom(1, 9)} <br> 姓名：ｘｘｘ`); // ***更換資料
                    console.log($(this).prev().text());

                    // 防止點選重新抽取時又誤按一次                    
                    if ($('#lottery > .col > .back > input').length != 0) {
                        $('#lottery > .col > .back > input').prop('disabled', true); // 關閉按鈕
                        $('#lottery > .col > .back > input#redraw').removeClass("redraw_hover"); // 關閉光暈
                        $('#lottery > .col > .back > input#victory').removeClass("victory_hover"); // 關閉光暈
                        setTimeout(function () {
                            $('#lottery > .col > .back > input').prop('disabled', false); // 開啟按鈕
                            $('#lottery > .col > .back > input#redraw').addClass("redraw_hover"); // 開啟光暈
                            $('#lottery > .col > .back > input#victory').addClass("victory_hover"); // 開啟光暈
                        }, 2000);
                    }
                });
            });
            //頭獎監聽
            $('#lottery > .col > .back > input#victory').each(function () {
                $(this).on('click', function () {
                    var $this = $(this);
                    $('#myModal').on('show.bs.modal', function (e) {
                        //獲取點擊打開的按鈕
                        var button = $(e.relatedTarget);
                        //根據標籤傳入參數
                        var recipient = button.data('whatever');
                        console.log(recipient);
                        if (recipient === 'Victory') {
                            md_content.innerHTML = `\
                            <h4 style="line-height: 3rem;"><font class='bg-danger text-white'>大獎確認</font></br>\
                            請再次確認大獎是否為：</br><p>${$this.prevAll('p').html()}</p></h4>`;
                            //Yes
                            $('#bt_suc').off('click').on('click', function () {
                                $("#btn1").prop('disabled', false);
                                console.log("大獎：" + $this.prevAll('p').html()); // ****更新資料，紀錄'大獎'，可用瑜回傳工號紀錄到資料庫

                                $('.card_msg > div > p').html(`${$this.prevAll('p').html()}`);
                                $('.col-12.card_msg').css({ 'animation': 'card_msg 1s ease forwards 1s', });
                                $('.bg').css({ 'animation': 'card_bg 0.5s ease forwards 0.5s', });

                                $this.prop('disabled', true);
                                $this.prevAll('#redraw').prop('disabled', true);//關閉重新抽取之按鈕
                                $('#btn_new').prop('disabled', true);
                                $('#lottery > .col > .back > input#redraw').removeClass("redraw_hover"); // 關閉光暈
                                $('#lottery > .col > .back > input#victory').removeClass("victory_hover"); // 關閉光暈
                                //紀錄大獎之外的小獎
                                if ($('#lottery > .col > .back > input').length != 0) {
                                    $('#lottery > .col > .back > input#victory').each(function (index) {
                                        if (this.disabled === false) {
                                            console.log("小獎：" + $(this).prevAll('p').html()); // ****更新資料，紀錄'小獎'，可用瑜回傳工號紀錄到資料庫
                                            $(this).prop('disabled', true); //關閉頭獎按鈕
                                            $(this).prevAll('#redraw').prop('disabled', true); //關閉重新抽取之按鈕
                                        }
                                    });
                                }
                            });
                        };
                        // No
                        $('#btn_clo').off('click').on('click', function () { });
                    });

                });
            });
        };
    }

    /* 動態產出人員卡 */
    function for_list(n, count) {
        $("#btn1").prop('disabled', true);
        $('#btn_next').prop('disabled', true);
        $('#btn_new').prop('disabled', true);
        $('#lottery').empty(); //每次都先清空畫面
        du = 0;

        for (var i = count; i < n; i++) {
            // 整面card
            var list_Fr = $("<div/>", {
                "class": "col flip3D",
                "css": {
                    '--duration': `${du}s`,
                    '--durationC': `${du + 0.5}s`,
                },
            });

            // card_back
            var list_nb = $("<div/>", { "class": "back", }).appendTo(list_Fr);
            $("<p/>", { "html": `部門：MIS <br> 工號：0000${getRandom(1, 9)} <br> 姓名：ｘｘｘ`, }).appendTo(list_nb); // ***更換資料，這裡有迴圈可用i帶出資料

            // 重抽取之按鈕
            $("<input/>", {
                "class": "btn redraw_hover",
                "type": "button",
                "value": "Redraw",
                "id": "redraw",
            }).appendTo(list_nb);

            // 冠軍之按鈕
            $("<input/>", {
                "class": "btn victory_hover",
                "type": "button",
                "value": "Victory",
                "id": "victory",
                "data-toggle": "modal",
                "data-target": "#myModal",
                "data-whatever": "Victory",
                "disabled": false,
            }).appendTo(list_nb);

            // card_front
            $("<div/>", { "class": "front", }).appendTo(list_Fr);

            du += 0.3; // 延遲0.7s
            $('#lottery').append(list_Fr); //顯示

            // 判斷顯示個數，超過十個就跳出
            if (i != 0 && i % F === 9) {
                anima();
                console.log(count, i);
                break;
            };
            // 最後剩餘個數也加入動畫
            if (i === (n - 1)) anima();
        };

        setTimeout(function () {
            if (count + F >= n) { //判斷若剛好抽取數量=顯示數量，則開new、關next；否則反之
                $('#btn_next').prop('disabled', true);
                $('#btn_new').prop('disabled', false);
            } else {
                $('#btn_new').prop('disabled', true);
                $('#btn_next').prop('disabled', false);
            };
        }, du * 1000 + 1500);

    }

    /* 測試用，亂數替代，產出min(含) ~ max(含)之間的值 */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

});
