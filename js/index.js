
// CLEAR：清除資料庫獎品序號

$(function () {
    $('#myModal').on('show.bs.modal', function (e) {
        //獲取點擊打開的按鈕
        var button = $(e.relatedTarget);
        //根據標籤傳入參數
        var recipient = button.data('whatever');
        switch (recipient) {
            case 'clear':
                md_content.innerHTML = `\
                <h4 style="line-height: 3.5rem;"><font class='bg-danger text-white'>確認是否清除資料庫？</font></br>\
                資料一旦清除，即不可復原，請三思！</h4>`;
                $('#bt_suc').off('click').on('click', function () {
                    alert('清除成功！');
                });
                break;
            default:
                break;
        }
        $('#btn_clo').off('click').on('click', function () { }); // close後

    });

})
