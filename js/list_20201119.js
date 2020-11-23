var n = "";
var row = "";
var count = "";
var list_row = "";
var list_emp = "";
var emp_num = "";//用於計數，相當於顯示每一筆已獲獎之人員資料
var dt = "";
var time = "";
var refreshSetTimeouId = "";
var refreshIntervalId = "";
var delay = "";

$(function () {
    dt = new Date();
    time = (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
    $('#btn_bottom>p').html("— 更新時間：" + time + " —");
    // n = 9;//測試用
    show_list();

    //顯示資料，上面可不理。
    function show_list() {
        clearTimeout(refreshSetTimeouId);
        $('#boardbg').empty();
        //這裡可以放連接ajax，回傳之資料(根據序號由大到小排序，最新的再前面，放成陣列或json格式?)存入js變數中，再讓他去跑最下面的迴圈顯示
        n = 10; //**替換資料庫已獲獎之數量
        // n += 5;//測試用
        row = Math.ceil(n / 9);
        count = 9;
        emp_num = 0;
        delay = 0;
        dt = new Date();
        time = (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
        $('#btn_bottom>p').html("— 更新時間：" + time + " —");

        for (var j = 0; j < row; j++) {

            list_row = $("<div/>", {
                "class": "item row row-cols-3",
                "style": `--delay:${delay}s; `,
            }).appendTo($('#boardbg'));

            if (j + 1 === row) {
                count = n - (row - 1) * count;
            }

            for (var i = 0; i < count; i++) {
                list_emp = "獎項：X獎-$1000 <br>部門：XXXX<br>工號：" + emp_num + "<br>姓名：ＸＸＸＸ";//** 替換資料值，emp_num是用來對應ajax回傳之陣列
                if (j === 0) {
                    if (i < 5) {
                        $("<div/>", { "class": "new", }).html(list_emp).appendTo(list_row);
                    } else {
                        $("<div/>").html(list_emp).appendTo(list_row);
                    }
                } else {
                    $("<div/>").html(list_emp).appendTo(list_row);
                }
                emp_num += 1;
            }
            delay += 5;
        };

        refreshSetTimeouId = setTimeout(function () {
            console.log(delay);
            show_list();
        }, delay * 1000);

    }

    //以下不使用
    // $('#myModal').on('show.bs.modal', function (e) {
    //     //獲取點擊打開的按鈕
    //     var button = $(e.relatedTarget);
    //     //根據標籤傳入參數
    //     var recipient = button.data('whatever');
    //     console.log(recipient);
    //     if (recipient === 'stop') {
    //         md_content.innerHTML = "<h4><font class='bg-danger text-white'>請確認是否停止更新！</font></h4>";
    //         $('#bt_suc').off('click').on('click', function () {
    //             $('#myModal').modal('hide');
    //             clearTimeout(refreshSetTimeouId);
    //             $('#btn_bottom>.btn').val("— 已停止更新，最後更新時間：" + time + " —");
    //             $('#btn_bottom>.btn').prop('disabled', true);
    //             infinite();
    //             refreshIntervalId = setInterval(function () {
    //                 infinite();
    //             }, delay * 1000);
    //         });
    //     };
    //     $('#btn_clo').off('click').on('click'); // close後返還當前按鍵值
    // });

    function infinite() {
        var tmp = $('#boardbg>.item');
        $('#boardbg').empty();
        $('#boardbg').append(tmp);
    }

})
