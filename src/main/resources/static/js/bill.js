var bill = bill || {};
var product = product || {};

bill.billList = function () {
    $.ajax({
        url: page.urls.getAllProducts + "/cskh",
        method: 'GET',
        success: function (response) {

            $('.table-bill tbody').empty();
            response = response.sort(function (pdt1, pdt2) {
                return pdt2.id - pdt1.id;
            })
            $.each(response, function (index, item) {
                $('.table-bill tbody').append(`
                <tr>
                        <td>${item.id}</td>
                        <td>${item.productName}</td>
                        <td>${item.serialNumber}</td>
                        <td>${item.serviceTag}</td>
                        <td>${item.status == 1 ?
                            '<span class="badge bg-danger">Từ Chối Bảo Hành</span>' :
                                item.remainingDay > 30 ? 
                                '<span class="badge bg-primary">Còn Bảo Hành </span>' :
                                    item.remainingDay <= 0 ?
                                        '<span class="badge bg-danger">Hết Bảo Hành</span>':
                                        '<span class="badge bg-alert">Gần Hết Bảo Hành</span>'
                            }
                        </td>
                        <td>${item.status == 1 || item.remainingDay <= 0 ?
                            '<span hidden class="badge bg-danger">###</span>' :
                            item.remainingDay
                            }
                        </td>
                        <td>${item.customer}</td>
                        <td>
                            ${item.status == 1 ?
                            `<a href='javascript:;' class='btn btn-danger btn-sm'
                                title='View Reason'
                                onclick="bill.getReason(${item.id})">
                                <i class="fa fa-edit"></i>
                            </a>`     :
                                item.remainingDay <= 0 ?
                                    '<span hidden class="badge bg-danger">###</span>':    
                                    `<a href='javascript:;' class='btn btn-success btn-sm'
                                        title='Add Bill'
                                        onclick="bill.getProduct(${item.id})">
                                        <i class="fa fa-plus"></i>
                                    </a>`   
                            }
                        </td>
                    </tr>
                    `);
            });
            if ( $.fn.dataTable.isDataTable( '.table-bill' ) ) {
                table = $('.table-bill').DataTable();
            }
            else {
                table = $('.table-bill').DataTable( {
                    paging: true
                } );
            }
        }
    })
}
bill.getReason = function (id){
    $('#viewHistoryWarnatyForm')[0].reset();
    $.ajax({
        url: page.urls.getProduct + id,
        method: "GET",
        success: function (response) {
            $('#reason').text(response.reason);
            let photo = response.photo;


            Swal.fire({
                title: 'Nguyên Nhân',
                text: response.reason,
                imageUrl: 'https://toyotahue.net/data/electronic/' + photo,
                imageWidth: 750,
                imageHeight: 300,
                imageAlt: 'Custom image',
            })
        }
    })
}

function getToday(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}
bill.save = function () {
    if ($('#createBillForm').valid()) {
        let billId = parseInt($('input[name="billId"]').val());
        if (billId == 0) {
            let createObj = {};
            createObj.product = {"id": $('#productId').val()};
            createObj.currentAddress = $('input[name="billAddress"]').val();
            createObj.currentPhone = $('input[name="billPhoneNumber"]').val();
            createObj.firstStatus = $('input[name="firstStatus"]').val();
            createObj.customer = {"id": $("#customerId").val()};
            console.log(createObj);
            $.ajax({
                url: page.urls.saveNewBills,
                method: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(createObj),
                success: function (result) {
                    if (result) {
                        bill.billList();
                        $('#billModal').modal('hide');
                        $.notify("Đã thêm mới thành công phiếu kiểm tra sơ bộ", "success");
                    } else {
                        $.notify("Đã có lỗi xảy ra, xin thử lại", "error");
                    }
                }
            })
        }
    }
}
bill.getProduct = function (id) {
    bill.reset();
    $.ajax({
        url: page.urls.getProduct + id,
        method: "GET",
        success: function (response) {
            $('#customerId').val(response.customer.id);
            $('#productId').val(response.id);
            $('#customerFullName').text(response.customer.customerFullName);
            $('#productName').text(response.productName);
            $('#productSerial').text(response.serialNumber);
            $('#billModal').modal('show');
        }
    })
}
bill.showModalCalculator = function (){

    $('#calculatorModal').modal('show');
}

bill.showModal = function () {
    bill.reset();
    $('#billModal').modal('show');
}

bill.reset = function () {
    $('#createBillForm')[0].reset();
    $('#billModal').find('.modal-title');
}


bill.doingList = function(){
    $.ajax({
        url: page.urls.getAllBillsDoing,
        method:'GET',
        success: function(response){
            $('.table-doing tbody').empty();
            $.each(response, function(index, item){
                $('.table-doing tbody').append(`
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.product.productName}</td>
                        <td>${item.product.serialNumber}</td>
                        <td>${item.currentAddress}</td>
                        <td>${item.startDate}</td>
                        <td>${item.firstStatus}</td>
                        <td>
                            <select id="technician" class="form-select form-select-lg technician"></select>
                            <a href='javascript:;' class='btn btn-success btn-sm'
                                title='Add technician'
                                onclick="bill.addTechnician(${item.id})">
                                <i class="fa fa-check"></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });
        }
    })
}


bill.doneList = function(){
    $.ajax({
        url: page.urls.getAllBillsDone,
        method:'GET',
        success: function(response){
            $('.table-done tbody').empty();
            $.each(response, function(index, item){
                $('.table-done tbody').append(`
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.user.fullName}</td>
                        <td>${item.product.productName}</td>
                        <td>${item.product.serialNumber}</td>
                        <td>${item.currentPhone}</td>
                       
                        <td>${item.currentAddress}</td>
                        <td>
                            <input type="number" id="kilometer">
                            <a href='javascript:;' class='btn btn-success btn-sm'
                                title='Calculator'
                                onclick="bill.calculalorKilometer(${item.id})">
                                <i class="fa fa-calculator"></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });
        }
    })
}

bill.completeList = function(){
    $.ajax({
        url: page.urls.getAllBillComplete,
        method:'GET',
        success: function(response){
            $('.table-complete tbody').empty();
            $.each(response, function(index, item){
                $('.table-complete tbody').append(`
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.user.fullName}</td>
                        <td>${item.product.productName}</td>
                        <td>${item.currentAddress}</td>
                        <td>${item.kilometer}</td>
                        <td>${item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                       
                    </tr>
                    `);
            });
            $('.table-complete').DataTable({
                // columnDefs: [
                //     { orderable: false, targets: [6,7] },
                //     { searchable: false, targets: [0,6,7] }
                // ],
                // order: [[0, 'desc']]
            });
        }
    })
}
bill.salaryList = function(){
    let month = App.getMonth();
    let year = App.getYear();
    // let month = $("#month").val();
    $.ajax({
        url: page.urls.getAllSalary + month +"/"+year,
        method:'GET',
        success: function(response){
            var i = 0;
            $('.table-salary tbody').empty();
            $.each(response, function(index, item){

                $('.table-salary tbody').append(`
                    
                    <tr>
                        <td>${i=i+1}</td>
                        <td>${item.userName}</td>
                        <td>${item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                        <td>${item.count}</td>
                        

                    </tr>
                    `);
            });
            $('.table-complete').DataTable({
                // columnDefs: [
                //     { orderable: false, targets: [6,7] },
                //     { searchable: false, targets: [0,6,7] }
                // ],
                // order: [[0, 'desc']]
            });
        }
    })
}


bill.statistical = function (){
    bill.staticsList();
    $("#statisticalModal").modal("show");
}
bill.staticsList = function(){
    $.ajax({
        url: page.urls.getAllBilStatics,
        method:'GET',
        success: function(response){
            $('.table-statics tbody').empty();
            $.each(response, function(index, item){
                $('.table-statics tbody').append(`
                    <tr>
                        <td>${item[0]}</td>
                        <td>${item[1].toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>

                    </tr>
                    `);
            });
        }
    })
}

bill.getBillMonth=function (){
    var date = $("#datepicker").val();
    var monthYears = date.split("-");
    var month = monthYears[1];
    var year = monthYears[0];
    $.ajax({
        url: page.urls.getAllSalary + month +"/"+year,
        method:'GET',
        success: function(response){
            var i = 0;
            $('.table-salary tbody').empty();
            $.each(response, function(index, item){

                $('.table-salary tbody').append(`
                    
                    <tr>
                        <td>${i=i+1}</td>
                        <td>${item.userName}</td>
                        <td>${item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                        <td>${item.count}</td>
                        

                    </tr>
                    `);
            });
            $('.table-complete').DataTable({
                // columnDefs: [
                //     { orderable: false, targets: [6,7] },
                //     { searchable: false, targets: [0,6,7] }
                // ],
                // order: [[0, 'desc']]
            });
        }
    })
}

bill.getProductHome = function (id) {
    bill.reset();
    $.ajax({
        url: page.urls.getProduct + id,
        method: "GET",
        success: function (response) {
            $('#customerId').val(response.customer.id);
            $('#productId').val(response.id);
            $('#customer_Full_Name').text(response.customer.customerFullName);
            $('#productName').text(response.productName);
            $('#productSerial').text(response.serialNumber);
            $('#billModal').modal('show');
        }
    })
}
bill.calculalorKilometer = function (id){
    let kilometer = $("#kilometer").val();
    console.log(kilometer);
    $.ajax({
        url: page.urls.saveNewBills + "/kilometer/" + kilometer + "/" + id,
        type: "PATCH",
        success: function() {
            bill.init();
            $.notify("Bill has been update success", "success");
        },
        error: function (){
            $.notify("Something went wrong, please try again", "error");
        }
    })
}
bill.addTechnician = function (id){
    let userId = $("#technician").val();
    $.ajax({
        url: page.urls.saveNewBills + "/" + userId + "/" + id,
        type: "PATCH",
        success: function() {
            bill.init();
            // $('#customerModal').modal('hide');
            $.notify("Bill has been update success", "success");
        },
        error: function (){
            $.notify("Something went wrong, please try again", "error");
        }
    })
}

bill.getTechnicians= function () {
    $.ajax({
        url: page.urls.getAllTechnicians,
        method:'GET',
        success: function(response){
            $('.table-doing').find('.technician').empty();
            $.each(response, (i, item) => {
                $('.table-doing').find('.technician').append(`<option value="${item.id}">${item.fullName}</option>`);
            })
        }
    })
}



bill.search = function () {
    let serialNumber = $('#search').val();
    if (serialNumber === "") {
        bill.billList();
    } else {
        $.ajax({
            url: page.urls.searchProductBySerialNumber + serialNumber,
            method: 'GET',
            success: function (response) {
                $('.table-bill tbody').empty();
                response = response.sort(function (pdt1, pdt2) {
                    return pdt2.id - pdt1.id;
                })
                $.each(response, function (index, item) {
                    $('.table-bill tbody').append(`
                <tr>
                     <td>${item.id}</td>
                        <td>${item.productName}</td>
                        <td>${item.serialNumber}</td>
                        <td>${item.serviceTag}</td>
                        <td>${item.purchaseDay}</td>
                        <td>${item.customer.customerFullName}</td>
                        <td>
                         <a href='javascript:;' class='btn btn-success btn-sm'
                                title='Add Bill'
                                onclick="bill.getProduct(${item.id})">
                                <i class="fa fa-plus"></i>
                            </a>
                        </td>
                    </tr>
                    `);
                });
            }
        })
    }
}
bill.replacedList = function (){
    $.ajax({
        url: page.urls.getAllReplaced,
        method:'GET',
        success: function(response){
            $('.table-replaced tbody').empty();
            $.each(response, function(index, item){
                $('.table-replaced tbody').append(`
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.accessoryName}</td>
                            <td>${item.product.serialNumber}</td>
                            <td>${item.product.productName}</td>
                            <td>${item.retailPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                            <td>${item.purchaseDay}</td>
                            <td>${item.product.customer.customerFullName}</td>
                            <td>
                                <a href='javascript:;' class='btn btn-success btn-sm'
                                            title='Add Bill'
                                            onclick="bill.getProduct(${item.product.id})">
                                            <i class="fa fa-plus"></i>
                                        </a>
                            </td>
                           </tr>
                        `);
            });
        }
    })
}

bill.init = function(){
    bill.billList();
    bill.doingList();
    bill.doneList();
    bill.completeList();
    bill.replacedList();
    bill.getTechnicians();
    bill.salaryList();
}

$(document).ready(function(){
    bill.init();
});