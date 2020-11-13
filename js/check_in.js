
$(function () {
    var emp = "";
    var list_emp = ""; // 撈取人員名單span
    /*-------預設值-------*/
    document.body.onselectstart=document.body.oncontextmenu=function(){ return false;}
    $('#txt_add').focus();
    $("#txt_add").blur(function(){
        $('#txt_add').focus();        
   });

    $('#btn_add').on('click', function () {
        list();
    });
    $('#txt_add').on('change', function () {
        console.log($(this).val());
        $(this).val('');
        list();
    });
    
    function list(){
        list_emp = document.querySelectorAll(".emp_list>span");
        if (list_emp.length === 40) {
            list_emp[39].remove();
        }

        emp = `0000${getRandom(1, 9)}　XXX`; // 報到人員，格式：09136　林鈺真
        console.log(emp);
        $('.emp>span').html(`${emp}　報到成功！`); // 報到成功提示

        $('.emp_list').prepend($("<span/>", { "text": emp, })); // 顯示人員名單
    }

    /* 測試用，亂數替代，產出min(含) ~ max(含)之間的值 */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
});
