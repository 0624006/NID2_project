
$(function () {
    var emp = "";
    var list_emp = ""; // 撈取人員名單span
    var emp_dep = "", emp_no = "", emp_name = "";
    /*-------預設值-------*/

    $('#submit').on('click', function () {
        var tmp = $('.emp>div>input');
        emp_dep = tmp.eq(0).val();
        emp_no = tmp.eq(1).val();
        emp_name = tmp.eq(2).val();
        if (emp_dep != "" && emp_no != "" && emp_name != "") {
            //存進資料庫
            list();
            tmp.eq(0).val("");
            tmp.eq(1).val("");
            tmp.eq(2).val("");
        } else {
            alert('請填寫部門、工號與姓名，再送出！');
        }

    });
    // function check_val(value) {
    //     var chk_v = ['select', 'or', '\'', 'and'];
    //     var _flag = false;
    //     chk_v.forEach(function (index) {
    //         console.log(value.includes(index));
    //         if (value.includes(index)) {
    //             _flag = true;
    //             break;
    //         }
    //     })
    //     return _flag;
    // }

    function list() {

        list_emp = document.querySelectorAll(".emp_list>span");
        if (list_emp.length === 40) {
            list_emp[39].remove();
        }

        emp = `${emp_dep} ${emp_no} ${emp_name}`; // 報到人員，格式：09136　林鈺真
        console.log(emp);
        $('.emp>span').html(`${emp}　報到成功！`); // 報到成功提示

        $('.emp_list').prepend($("<span/>", { "text": emp, })); // 顯示人員名單
    }


});
