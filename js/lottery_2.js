/*
星座代號
    0：03.21 ~ 04.20 -- Aries;
    1：04.21 ~ 05.20 -- Taurus;
    2：05.21 ~ 06.20 -- Gemini;
    3：06.21 ~ 07.22 -- Cancer;
    4：07.23 ~ 08.22 -- Leo;
    5：08.23 ~ 09.22 -- Virgo;
    6：09.23 ~ 10.22 -- Libra;
    7：10.23 ~ 11.22 -- Scorpio;
    8：11.23 ~ 12.22 -- Sagittarius;
    9：12.23 ~ 01.21 -- Capricorn;
    10：01.22 ~ 02.19 -- Aquarius;
    11：02.20 ~ 03.20 -- Pisces;

資料庫建議？
    1. 當點選開始後撈取人員資料回傳部門、工號、姓名以及轉換好的星座代號回傳如上，共四項資料。
    2. Redraw：重新抽取人員。

以下可搜尋：
***更換資料
*/


var max_num = $('ul > li.constellation').length; //總框12
var last_index, //上一個位置
    now_index, //目前轉動的位置
    roll_flag, //是否可執行
    speed, //速度
    final_test, //停止的位置
    myInterval, //計時
    max_speed, //最快速度
    maxturns, //最大圈數
    runs_now, //當前圈數
    lotter_m; //存取當前抽取人員顯示字串
/* ----預設值----*/   

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
    last_index = 0;
    now_index = 0;
    roll_flag = true;
    speed = 300;
    final_test = 0;
    myInterval = '';
    max_speed = 40;
    maxturns = 4;
    runs_now = 0;
    lotter_m = "";//存取當前抽取人員顯示字串
    /* ----預設值----*/

    $('.btn').on('click', function () {
        var $this = $(this);
        var name = $this.attr('id');
        switch (name) {
            case 'btn_redraw':
                // 重新抽取
                if (runs_now != 0) { $('ul > li.constellation').eq(now_index).toggleClass('active disapp'); };
                anima_clear();
                roll_flag = true;
                get_emp();
                break;
            case 'btn_next':
                // 抽取下一位
                if (runs_now != 0) { $('ul > li.constellation').eq(now_index).toggleClass('active disapp'); };
                anima_clear();
                roll_flag = true;
                $('#btn1').prop('disabled', false);
                break;
            default:
                break;
        };
    });

    // 開始按鈕
    $('ul > li.start').on({
        'click': function () {
            // final_test = 10; //測試用 
            get_emp();
        },
        'mouseover': function () {
            if (roll_flag) {
                $(this).addClass("start_hover");
            } else {
                $(this).removeClass("start_hover");
            }
        },
    })


    // 抽取人員暫以亂數替代，置換為部門、工號、姓名加<br>斷行
    function get_emp() {
        if (roll_flag) {
            final_test = getRandom(0, 11);//***更換資料，注意，這裡要替換為抽取人員之星座代號 
            lotter_m = `部門：MIS <br> 工號：0000${getRandom(1, 9)} <br> 姓名：ｘｘｘ`; // ***更換資料
            console.log(lotter_m);
            $('.back > div > p').html(lotter_m);
            $('.front').css({ 'background-image': `url('asset/ConstellationCard/${$('ul > li.constellation').eq(final_test).attr('id')}_front.svg')`, });
            $('.back').css({ 'background-image': `url('asset/ConstellationCard/${$('ul > li.constellation').eq(final_test).attr('id')}_back.svg')`, });
            runs_now = 0;
            $('#btn1').prop('disabled', true);
            roll_flag = false;
            rolling();
        }
    }

    function rolling() {
        myInterval = setTimeout(function () {
            $('ul > li.constellation').eq(now_index).toggleClass('active');
            rolling();
        }, speed);
        runs_now += 1;
        now_index += 1;

        var count_num = maxturns * max_num + final_test - last_index;

        if (runs_now <= (count_num / 3) * 2) {
            speed -= 30; //加速
            if (speed <= max_speed) {
                speed = max_speed; //最高40；
            }
        }
        //抽獎結束
        else if (runs_now >= count_num) {
            clearInterval(myInterval);
            last_index = now_index;
        }
        //下降期間
        else if (count_num - runs_now <= 30) {
            speed += 20;
        }
        //緩衝
        else {
            speed += 10;
            if (speed >= 100) {
                speed = 100; //最低100；
            }
        }
        //是否大於最大數
        if (now_index >= max_num) {
            now_index = 0;
        }
        $('ul > li.constellation').eq(now_index).toggleClass('active');

        if (runs_now === count_num) {
            setTimeout(function () {
                $('ul > li.constellation').eq(now_index).toggleClass('disapp');
                $('.col-12.card_msg').css({ 'animation': 'card_msg 1s ease forwards 0s', });
                $('.flip3D > .front').css({ 'animation': 'front 0.7s linear forwards 5s', });
                $('.flip3D > .back').css({ 'animation': 'back 0.7s linear forwards 5s', });
            }, 500);
        }
    }
    //清除抽取卡牌之動畫
    function anima_clear() {
        $('.col-12.card_msg').removeAttr('style');
        $('.col-12.card_msg >.flip3D >.back').removeAttr('style');
        $('.col-12.card_msg >.flip3D >.front').removeAttr('style');
    }

    // 流星框架
    var meteor_Fragment = document.createDocumentFragment();
    for (var j = 0; j < 10; j++) {
        var meteor_t = document.createElement("div");
        meteor_t.className = "meteor-" + (j + 1);
        meteor_Fragment.appendChild(meteor_t);
    }
    $('#meteor').append(meteor_Fragment);

    // 測試用，亂數替代，產出min(含) ~ max(含)之間的值
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
})
