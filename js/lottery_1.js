/*
資料庫建議？
    1. 因大量抽取，故當點選START或NEXT時，就產出資料庫資料，並同時更新得獎者的序號。
    2. 而當REDRAW時，取出原得獎者的序號，更新原得獎者序號為空或0?並將新得獎者更新其序號。

下方可搜尋：
***抽取數量
***更換資料
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

    $('#myModal').on('show.bs.modal', function (e) {
        //獲取點擊打開的按鈕
        var button = $(e.relatedTarget);
        //根據標籤傳入參數
        var recipient = button.data('whatever');
        console.log(recipient);
        switch (recipient) {
            case 'submit':
                md_content.innerHTML = `\
                <h4 style="line-height: 3.5rem;"><font class='bg-danger text-white'>人數確認</font></br>\
                請再次確認人數：${$('#number').val()}</h4>`;
                $('#bt_suc').off('click').on('click', function () {
                    $('.div_count').addClass('btnS');
                    console.log($('#number').val());
                    n = $('#number').val(); // ***抽取數量
                    count = 0;
                    setTimeout(function () {
                        for_list(n, count);
                    }, 750);
                });
                break;
            case 'next':
                md_content.innerHTML = `\
                <h4 style="line-height: 3.5rem;"><font class='bg-warning text-black'>注意！==即將抽取下一批人員==</br><p style="color: black;">請確實確認完當前人員。<p></font></h4>`;
                $('#bt_suc').off('click').on('click', function () {
                    // 下一批，count累加10
                    count += F;
                    console.log(n, count);
                    for_list(n, count);
                });
                break;
            case 'new':
                md_content.innerHTML = `\
                <h4 style="line-height: 3.5rem;"><font class='bg-danger text-white'>注意！==即將抽取下一項獎項==</br><p style="color: black;">請確實確認完當前獎項以抽取完畢。<p></font></h4>`;
                $('#bt_suc').off('click').on('click', function () {
                    // 抽取下一項獎項
                    $('.div_count').toggleClass('btnS');
                    $('#lottery').empty(); //每次都先清空畫面
                    $('#number').val('1');
                });
                break;
            default:
                break;
        }
        $('#btn_clo').off('click').on('click', function () { }); // close後

    });

    /* 動畫，每個抽取卡牌之重新抽取監聽 */
    function anima() {
        //動畫
        $('#lottery > .col').each(function () { $(this).toggleClass("autoshow"); });
        //重新抽取監聽
        if ($('#lottery > .col > .back > input').length != 0) {
            $('#lottery > .col > .back > input#redraw').each(function () {
                $(this).on({
                    'click': function () {
                        $(this).prev().html(`部門：MIS <br> 工號：0000${getRandom(1, 9)} <br> 姓名：ｘｘｘ`); // ***更換資料
                        console.log($(this).prev().text());
                        
                        // 防止點選重新抽取時又誤按一次
                        if ($('#lottery > .col > .back > input').length != 0) {
                            $('#lottery > .col > .back > input').prop('disabled', true); // 關閉按鈕
                            $('#lottery > .col > .back > input').removeClass("redraw_hover"); // 關閉光暈
                            setTimeout(function () {
                                $('#lottery > .col > .back > input').prop('disabled', false); // 開啟按鈕
                                $('#lottery > .col > .back > input').addClass("redraw_hover"); // 開啟光暈

                            }, 2000);
                        }
                    },
                })
            })
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

            $("<p/>", { "html": `部門：MIS <br> 工號：0000${getRandom(1, 9)} <br> 姓名：ｘｘｘ`, }).appendTo(list_nb); // ***更換資料

            // 重抽取之按鈕
            $("<input/>", {
                "class": "btn redraw_hover",
                "type": "button",
                "value": "Redraw",
                "id": "redraw",
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
            if (i === (n - 1)) {
                setTimeout(function () {
                    $("#btn1").prop('disabled', false);
                }, du * 1000 + 1500);
                anima();
            };
        };

        setTimeout(function () {
            
            if (count + F >= n) { //判斷若剛好抽取數量=顯示數量，則開new、關next；否則反之
                $('#btn_next').prop('disabled', true);
                $('#btn_new').prop('disabled', false);
                $("#btn1").prop('disabled', false);
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
