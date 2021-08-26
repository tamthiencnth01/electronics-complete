    var bill = bill || {};
    var accessory = accessory || {};
    var replaced = replaced || {};
    let userId = $("#userId").val();

    bill.kythuatList = function () {
        $.ajax({
            url: page.urls.selectTechnicianById + userId,
            method:'GET',
            success: function(response){
                $('.table-technician tbody').empty();
                $.each(response, function(index, item){
                    $('.table-technician tbody').append(`
                <tr>
                    <td>${item.id}</td>
                    <td>${item.customer.customerFullName}</td>
                    <td>${item.currentAddress}</td>
                    <td>${item.currentPhone}</td>
                    <td>${item.firstStatus}</td>
                    <td>
                        <a href='javascript:;' class='btn btn-success btn-sm'
                            title='Thao Tác Xử Lý'
                            onclick="bill.showModalUpdateDoing(${item.id})">
                            <i class="fa fa-list"></i>
                        </a>
                        <a href='javascript:;' class='btn btn-info btn-sm'
                            title='Bảo Hành Trả Phí'
                            onclick="bill.showModalReplaced(${item.product.id})">
                            <i class="fas fa-dollar-sign"></i>
                        </a>
                        <a href='javascript:;' class='btn btn-danger btn-sm'
                            title='Từ Chối Bảo hành'
                            onclick="bill.warrantyDisclaimer(${item.product.id})">
                            <i class="fa fa-exclamation"></i>
                        </a>
                    </td>
                </tr>
                `);
                });
            }
        })
    }
    accessory.getAccesory = function (){
        $.ajax({
            url: page.urls.getAllAccessories,
            method:'GET',
            success: function(response){
                $('#updateDoingForm').find('.accessory').empty();
                $('#replacedForm').find('.accessory').empty();
                $.each(response, (i, item) => {
                    $('#updateDoingForm').find('.accessory').append(`<option value="${item.id}">${item.accessoryName}</option>`);
                    $('#replacedForm').find('.accessory').append(`<option value="${item.id}">${item.accessoryName}</option>`);
                })
            }
        })
    }
    bill.showModalReplaced = function (id){
        $('input[name="replaceId"]').val(id);
        $('#replacedModal').modal('show');
    }
    bill.showModalUpdateDoing = function (id){
        bill.reset();
        $('input[name="id"]').val(id);
        $('#updateDoingModal').modal('show');
    }

    bill.warrantyDisclaimer = function (id){
        $('input[name="idWa"]').val(id);
        $('#warrantyDisclaimerModal').modal('show');
    }
    bill.warrantyDisclaimerSubmit = function (){
        let reason = $('#reason').val();
        let id  =  $('input[name="idWa"]').val();
        let formData = new FormData();
        formData.append("select_file", select_file.files[0]);
        $.ajax({
            url: "https://toyotahue.net/api/electronic/create",
            method: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                let avatar = data.uploaded_image;
                $.ajax({
                    url: page.urls.getAllProducts + "/" + 1 + "/" + reason + "/" + avatar + "/" + id,
                    type: "PATCH",
                    success: function() {
                        bill.kythuatList();
                        $('#warrantyDisclaimerModal').modal('hide');
                        $.notify("Bill has been update success", "success");
                    },
                    error: function (){
                        $.notify("Something went wrong, please try again", "error");
                    }
                })
            }
        })
    }
    bill.updateDoing = function (){
        let repairOperation = $('input[name="repairOperation"]').val();

        let accessory = $("#accessory").val();

        let endDate = $('input[name="endDate"]').val();

        let id  =  $('input[name="id"]').val();

        $.ajax({
            url: page.urls.updateDoingBill + repairOperation + "/" + endDate + "/" + accessory + "/" + id,
            type: "PATCH",
            success: function() {
                bill.init();
                $('#updateDoingModal').modal('hide');
                $.notify("Bill has been update success", "success");
            },
            error: function (){
                $.notify("Something went wrong, please try again", "error");
            }
        })
    }

    bill.replaceSubmit = function (){
        let idAccessory = $("#replaceAccessory").val();
        $.ajax({
            url: page.urls.getAllAccessories +"/" + idAccessory,
            type: "GET",
            success: function (response){
                console.log(response);
                let replace = {};
                replace.accessoryName = response.accessoryName;
                replace.accessoryDescription = $('input[name="accessoryDescription"]').val();
                replace.retailPrice = response.retailPrice;
                replace.product  = {"id": $('input[name="replaceId"]').val()};
                let numberMonth = $('input[name="numberMonth"]').val();
                let accessoryId = response.id;
                $.ajax({
                    url: page.urls.saveNewReplaced + numberMonth,
                    type: "POST",
                    contentType:"application/json",
                    datatype :"json",
                    data: JSON.stringify(replace),
                    success: function() {
                        $.ajax({
                            url: page.urls.getAllAccessories + "/decrease/" + accessoryId,
                            method: "PATCH",
                            success: function (){
                                let reason = $('input[name="reason"]').val();
                                let id  =  $('input[name="replaceId"]').val();
                                let formData = new FormData();
                                formData.append("select_file", select_file_replace.files[0]);
                                $.ajax({
                                    url: "https://toyotahue.net/api/electronic/create",
                                    method: "POST",
                                    data: formData,
                                    contentType: false,
                                    cache: false,
                                    processData: false,
                                    success: function(data) {
                                        let avatar = data.uploaded_image;
                                        $.ajax({
                                            url: page.urls.getAllProducts + "/" + 1 + "/" + reason + "/" + avatar + "/" + id,
                                            type: "PATCH",
                                            success: function() {
                                                bill.kythuatList();
                                                $('#replacedModal').modal('hide');
                                                $.notify("Bill has been update success", "success");
                                            },
                                            error: function (){
                                                $.notify("Something went wrong, please try again", "error");
                                            }
                                        })
                                    }
                                })
                            }
                        })

                    }
                })
            }
        })
    }

    bill.historyTechnician = function (){
        bill.historyList();
        $("#historyTechnicianModal").modal("show");
    }

    bill.historyList = function (){
        let userId = $("#userId").val();
        $.ajax({
            url: page.urls.getAllBills + "/history/" + userId,
            method:'GET',
            success: function(response){
                $('.table-history-technicians tbody').empty();
                $.each(response, function(index, item){
                    $('.table-history-technicians tbody').append(`
                        <tr>
                            <td>${item.customer.customerFullName}</td>
                            <td>${item.product.productName}</td>
                            <td>${item.repairOperation}</td>
                            <td>${item.accessory.accessoryName}</td>
                            <td>${item.total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                        </tr>
                        `);
                });
            }
        })
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#picReplace')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function readURLDis(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#picDis')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    bill.tablePrice = function (){
        bill.priceList();
        $("#tablePriceModal").modal("show");
    }

    bill.priceList = function (){
        $.ajax({
            url: page.urls.getAllAccessories,
            method:'GET',
            success: function(response){
                $('.table-price-technicians tbody').empty();
                $.each(response, function(index, item){
                    $('.table-price-technicians tbody').append(`
                        <tr>
                            <td>${item.accessoryName}</td>
                            <td>${item.retailPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                        </tr>
                        `);
                });
            }
        })
    }
    bill.reset = function () {
        $('#updateDoingForm')[0].reset();
    }

    bill.init = function(){
        bill.kythuatList();
        accessory.getAccesory();
    };


    $(document).ready(function(){
        bill.init();
    });
