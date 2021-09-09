var product = product || {};


product.productList = function(){
    $.ajax({
        url: page.urls.selectAllProduct,
        method:'GET',
        success: function(response){
            $('.table-product tbody').empty();
            response = response.sort(function(pdt1, pdt2){
                return pdt2.id - pdt1.id;
            })
            $.each(response, function(index, item){
                $('.table-product tbody').append(`
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
                                onclick="customer.addBill(${item.id})">
                                <i class="fa fa-plus"></i>
                            </a>
                        </td>
                    </tr>
                    `);
            });
            $('.table-product').DataTable({
                // columnDefs: [
                //     { orderable: false, targets: [6,7] },
                //     { searchable: false, targets: [0,6,7] }
                // ],
                // order: [[0, 'desc']]
            });

        }
    })
}

product.showModal = function(){
    product.reset();
    $('#productModal').modal('show');
}

product.save = function(){
    if($('#productForm').valid()){
        let productId = parseInt($('input[name="productId"]').val());
        if(productId == 0){
            let createObj = {};
            createObj.productName = $('input[name="productName"]').val();
            createObj.productDescription = $('input[name="productDescription"]').val();
            createObj.serviceTag = $('input[name="serviceTag"]').val();
            createObj.serialNumber = $('input[name="serialNumber"]').val();
            createObj.customer = {"id": $("#customerId").val()};
            let numberMonth = $('input[name="numberMonth"]').val();
            $.ajax({
                url:page.urls.saveNewProduct + "/" + numberMonth,
                method: "POST",
                contentType:"application/json",
                datatype :"json",
                data: JSON.stringify(createObj),
                success: function(){
                    $('#productModal').modal('hide');
                    product.reset();
                    $.notify("Sản Phẩm đã được tạo thành công!", "success");
                },
                error: function () {
                    $.notify("Sản phẩm đã bị trùng Serial Number, xin nhập lại", "error");
                },
                fail: function (){
                    $.notify("Sản Phẩm tạo thất bại!", "error");
                }
            })
        }
    }
}
product.search = function () {
    let serialNumber = $('#search-keyword').val();
    if (serialNumber === "") {
        App.showErrorAlert("Không Tìm Thấy Sản Phẩm!");
    } else {
        $.ajax({
            url: page.urls.searchProductBySerialNumber + serialNumber,
            method: 'GET',
            success: function (data) {
                console.log(data);
                if (data.length === 0) {
                    App.showSuccessAlert("Không Tìm Thấy Sản Phẩm!");
                } else {
                    let content = "";
                    for (let i = 0; i < data.length; i++) {
                        $('#customerFullName').text(data[i].customer.customerFullName);
                        content += `<tr>
                                <td id="serialNumber">${data[i].serialNumber}</td>
                                <td>${data[i].productName}</td>
                                <td>${data[i].serviceTag}</td>
                                <td>${data[i].purchaseDay}</td>
                                <td>${data[i].productDescription}</td>
                            </tr>`
                    }
                    $('#table-search-product tbody').html(content); // show dữ liệu khi trả về
                    $('#viewSearchProductModal').modal('show');
                }
            }
        });
    }
}

product.isUndefined = function (value) {
    return value === undefined || value === null
}
product.showModalSearchInput = function () {
    product.resetSearchInput();
    // $('#viewSearchProductModal').modal('show');
}

product.resetSearchInput = function(){
    $(':reset').wrap('<input type="text" name="search" id="search-keyword" class="search search-common-input" placeholder=\' Nhập Mã Sản Phẩm hoặc Từ Khóa\' title=\'Nhập Model của bạn # hoặc Tìm kiếm thông tin. Gợi ý tìm kiếm sẽ được mở.\'  maxlength="100" />')
    // $('#reset-search-keyword':reset)[0].reset;
}

product.reset = function(){
    $('#productForm').validate().resetForm();
    $('#productForm')[0].reset();
}

product.init = function(){
    product.productList();
}

$(document).ready(function(){
    product.init();
});