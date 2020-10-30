/*
資料庫建議？
    1. 當拉霸開始後，抽取人員回傳資料為：部門、工號、姓名。
    2. 當點選NEXT後才將獎序更新。

下方可搜尋：
***更換資料
**!嵌入資料庫後要刪
*/



var str_list = "";  // 暫存抽取之工號
var list_n = [];    // 紀錄字串分割後的數字
var rollback = 0.3; // 回彈角度乘數
var flag = true;    // 設定把手點擊事件
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

  $('.btn').on('click', function () {
    var $this = $(this);
    var name = $this.attr('id');
    switch (name) {
      case 'btn_redraw':
        // 重新抽取
        bar_click(); // 拉動把手動畫
        $('.col-12.card_msg').removeAttr('style');// 清除人員顯示動畫   
        $('.bg').removeAttr('style'); // 清除card_msg的背景
        running();
        break;
      case 'btn_next':
        // 抽取下一位
        flag = true; //設定把手點擊事件，開啟
        $('.col-12.card_msg').removeAttr('style'); // 清除人員顯示動畫
        $('.bg').removeAttr('style'); // 清除card_msg的背景
        $('#btn1').prop('disabled', false);// 設定back按鈕顯示
        break;
      case 'bar':
        if (flag) {
          // 抽取new
          flag = false; //設定把手點擊事件，關閉
          bar_click(); // 拉動把手動畫
          $('#btn1').prop('disabled', true); // 設定back按鈕不顯示
          running();
        }
        break;
      default:
        break;
    };
  });

  function running() {    
    str_list = ""; // ***更換資料，儲存原字串，替換成從資料庫回傳的工號
    var dt = 1; //旋轉期間
    var t = 0; //旋轉角度
    get_list(); // 此為暫用亂數存str_list值，**!嵌入資料庫後要刪

    // 工號字串分割
    for (var i = 0; i < str_list.length; i++) {
      list_n[i] = str_list.split('')[i];
    };
    console.log(list_n);

    // ***更換資料，抽取人員暫以亂數替代，置換為部門、工號、姓名加<br>斷行
    $('.card_msg > div > p').html(`部門：MIS <br> 工號：${str_list} <br> 姓名：ＸＸＸ`); 

    $('.s_container').each(function (e) {
      var $this = $(this);
      t = 360 * 5 + 36 * list_n[e]; //至少跑五圈，再指定到回傳的值
      $this.css({
        '--targetDeg': `-${t}deg`,
        '--duration': `${dt}s`,
        '--rollBackDeg': `${Math.random() * rollback + 1}`,
        '--currentDeg': `-${t % 360}deg`
      });

      // 每次轉完自動切換class 
      $this.toggleClass('autoTurn');
      setTimeout(function () {
        $this.toggleClass('autoTurn');
      }, dt * 1000);

      dt += 1; //每個延遲1s再旋轉
    });
    
    if (dt = 5) {
      setTimeout(function () {
        $('.col-12.card_msg').css({ 'animation': 'card_msg 1s ease forwards 1s',});
        $('.bg').css({ 'animation': 'card_bg 0.5s ease forwards 0.5s',});
      }, dt * 1000);
    };

  }

  // 把手點擊/轉動動畫
  function bar_click() {
    document.querySelectorAll('#bar>#Group7>circle>animate').forEach(function (e) {
      e.beginElement();
    });
    document.querySelectorAll('#bar>rect>animate').forEach(function (e) {
      e.beginElement();
    });
    document.querySelectorAll('#bar>rect>animateTransform').forEach(function (e) {
      e.beginElement();
    });
  }

  /* 刪刪---測試用，亂數替代，產出min(含) ~ max(含)之間的值 */
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /* 刪刪---此為暫用隨機亂數來獲取數字 */
  function get_list() {
    for (var j = 0; j < 5; j++) {
      var x = getRandom(0, 9);
      str_list += x.toString();
    }
    console.log(str_list);
  }



})
