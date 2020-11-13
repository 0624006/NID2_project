var n = "";
var row = "";
var count = "";
var list_row = "";
var list_col = "";
var list_emp = "";
var emp_num = "";
var dt = "";
var time = "";

$(function () {
    dt = new Date();
    time = (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
    $('#btn_bottom>.btn').val("— 最新更新時間：" + time + " —");
    
    show_list();

    //每30秒重新抓資料，測試可自行更改
    var refreshIntervalId = setInterval(function () {
        $('#inner').empty();
        console.log('reload');        
        show_list();
        dt = new Date();
        time = (dt.getHours() < 10 ? "0" : "") + dt.getHours() + ":" + (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes() + ":" + (dt.getSeconds() < 10 ? "0" : "") + dt.getSeconds();
        $('#btn_bottom>.btn').val("— 最新更新時間：" + time + " —");
    }, 20000);

    $('#myModal').on('show.bs.modal', function (e) {
        //獲取點擊打開的按鈕
        var button = $(e.relatedTarget);
        //根據標籤傳入參數
        var recipient = button.data('whatever');
        console.log(recipient);
        if (recipient === 'stop') {
            md_content.innerHTML = "<h4><font class='bg-danger text-white'>請確認是否停止更新！</font></h4>";
            $('#bt_suc').off('click').on('click', function () {
                $('#myModal').modal('hide');
                clearInterval(refreshIntervalId);
                $('#btn_bottom>.btn').val("— 已停止更新，最後更新時間：" + time + " —");
                $('#btn_bottom>.btn').prop('disabled', true);
                
            });
        };
        $('#btn_clo').off('click').on('click'); // close後返還當前按鍵值
    });


    //顯示資料，上面可不理。
    function show_list() {
        //這裡可以放連接ajax，回傳之資料(根據序號由大到小排序，最新的再前面，放成陣列或json格式?)存入js變數中，再讓他去跑最下面的迴圈顯示
        n = 1; //**替換資料庫已獲獎之數量
        row = Math.ceil(n / 9);
        count = 9;
        emp_num = 0;
        

        for (var j = 0; j < row; j++) {

            if (j === 0) {
                list_row = $("<div/>", {
                    "class": "carousel-item active",
                }).appendTo($('#inner'));
            } else {
                list_row = $("<div/>", {
                    "class": "carousel-item",
                }).appendTo($('#inner'));
            }

            list_col = $("<div/>", {
                "class": "col-12 row  row-cols-3",
                "id": "list",
            }).appendTo(list_row);

            if (j + 1 === row) {
                count = n - (row - 1) * count;
            }

            for (var i = 0; i < count; i++) {
                if (j === 0) {
                    list_emp = "獎項：X獎-$1000 <br>部門：XXXX<br>工號：" + emp_num + "<br>姓名：ＸＸＸＸ";//** 替換資料值，emp_num是用來對應ajax回傳之陣列
                    if (i < 5) {
                        $("<div/>", { "class": "new", }).html(list_emp).appendTo(list_col);
                    } else {
                        $("<div/>").html(list_emp).appendTo(list_col);
                    }
                } else {
                    list_emp = "獎項：X獎-$1000 <br>部門：XXXX<br>工號：" + emp_num + "<br>姓名：ＸＸＸＸ";//** 替換資料值，emp_num是用來對應ajax回傳之陣列
                    $("<div/>").html(list_emp).appendTo(list_col);
                }
                emp_num += 1;
            }
        };

    }


})
