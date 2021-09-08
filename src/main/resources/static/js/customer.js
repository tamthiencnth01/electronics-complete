var customer = customer || {};

customer.customerList = function(){

    $.ajax({
        url: page.urls.getAllCustomers,
        method:'GET',
        success: function(response){
            $('.table-customer tbody').empty();
            // response = response.sort(function(ctr1, ctr2){
            //     return ctr2.id - ctr1.id;
            // })
            $.each(response, function(index, item){
                $('.table-customer tbody').append(`
                    <tr>
                        <td>${item.id}</td>
                        <td><a href='javascript:;' class='btn btn-info btn-sm'
                                title='View product'
                                onclick="customer.getAllProductByCustomerId(${item.id})">
                                ${item.customerFullName}
                            </a></td>
                        <td>${item.customerAddress}</td>
                        <td>${item.customerPhone}</td>
                        <td><a href='javascript:;' class='btn btn-success btn-sm'
                                title='Add product'
                                onclick="customer.getCustomer(${item.id})">
                                <i class="fa fa-plus"></i>
                            </a>
                        </td>
                        <td><a href='javascript:;' class='btn btn-danger btn-sm'
                                title='Delete customer'
                                onclick="customer.removeCustomer(${item.id})">
                                <i class="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });
            if ( $.fn.dataTable.isDataTable( '.table-customer' ) ) {
                table = $('.table-customer').DataTable();
            }
            else {
                table = $('.table-customer').DataTable( {
                    paging: true
                } );
            }
        }
    })
}

customer.showModal = function(){
    // $('#customerForm').validate().resetForm();
    $('#customerForm')[0].reset();
    $('#customerModal').modal('show');
}

customer.save = function(){
    if ($('#customerForm').valid()){
        let customerId = parseInt($('input[name="id"]').val());
        if(customerId == 0){
            let createObj = {};
            createObj.customerFullName = $('input[name="customerFullName"]').val();
            createObj.customerAddress = $('input[name="customerAddress"]').val();
            createObj.customerPhone = $('input[name="customerPhone"]').val();
            delete createObj.id;
            $.ajax({
                url: page.urls.saveNew,
                method: "POST",
                contentType:"application/json",
                datatype :"json",
                data: JSON.stringify(createObj),
                success: function(result){
                    if(result){
                        customer.customerList();
                        // $('#customerForm').validate().resetForm();
                        $('#customerForm')[0].reset();
                        $('#customerModal').modal('hide');
                        $.notify("Customer has been created success", "success");
                    }
                    else{
                        $.notify("Something went wrong, please try again", "error");
                    }
                }
            })
        }
        else{
            let modifyObj = {};
            modifyObj.customerFullName = $('input[name="customerFullName"]').val();
            modifyObj.customerAddress = $('input[name="customerAddress"]').val();
            modifyObj.customerPhone = $('input[name="customerPhone"]').val();
            modifyObj.id = customerId;

            $.ajax({
                url: page.urls.saveEdit,
                method: "PUT",
                contentType:"application/json",
                datatype :"json",
                data: JSON.stringify(modifyObj),
                success: function(result){
                    if(result){
                        customer.customerList();
                        // $('#customerForm').validate().resetForm();
                        $('#customerForm')[0].reset();
                        $('#customerModal').modal('hide');
                        $.notify("Customer has been updated success", "success");
                    }
                    else{
                        $.notify("Something went wrong, please try again", "error");
                    }
                }
            })
        }

    }
}


customer.getCustomer = function(id){
    customer.reset();
    $.ajax({
        url: page.urls.getCustomer + id,
        method:'GET',
        success: function(response){
            $('#customerFullName').text(response.customerFullName);
            $('#customerId').val(response.id);
            $('#productModal').modal('show');
        }
    })
}

customer.getAllProductByCustomerId = function(id){
    $.ajax({
        url: page.urls.getAllProductsByCustomerId + id,
        method:'GET',
        success: function(response){
            if (response == null) {
                App.showErrorAlert("Khách Hàng Hiện Tại Chưa Có Sản Phẩm!");
            } else {
                $('.table-product tbody').empty();
                response = response.sort(function(ctr1, ctr2){
                    return ctr2.id - ctr1.id;
                })
                $.each(response, function(index, item){
                    $('.table-product tbody').append(`
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.productName}</td>
                        <td>${item.serviceTag}</td>
                        <td>${item.serialNumber}</td>
                        <td>${item.purchaseDay}</td>
                    </tr>
                    `);
                });
                $('#viewProductModal').modal('show');
            }
        }
    })
}



customer.removeCustomer = function(id){

    $.ajax({
        type : "DELETE",
        url : page.urls.deleteCustomer + id
    }).done(function (){
        customer.customerList();
        App.showSuccessAlert("Đã xóa thành công!")
    }).fail(function (){
        App.showErrorAlert("Đã xảy ra lỗi!")
    })
}

customer.reset = function(){
    // $('#customerForm').validate().resetForm();
    $('#customerForm')[0].reset();
    $('#customerModal').find('.modal-title').text('Add customer');
}

customer.init = function(){
    customer.customerList();
}

$(document).ready(function(){
    customer.init();
});