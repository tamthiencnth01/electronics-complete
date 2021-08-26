var employee = employee || {};
var role = role || {};
let page = {
    urls: {
        getAllEmployees: App.BASE_URL_EMPLOYEE,
        saveNew: App.BASE_URL_EMPLOYEE,
        getAllRoles: App.BASE_URL_ROLE
    }
}

employee.employeeList = function(){
    $.ajax({
        url: page.urls.getAllEmployees,
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
                        <td>${item.employeeName}</td>
                        <td>${item.employeeAddress}</td>
                        <td>${item.employeePhone}</td>
                        <td>${item.userName}</td>
                        <td>${item.role.roleName}</td>
                        <td></td>
                    </tr>
                    `);
            });
            // $('.table-product').DataTable({
            //     columnDefs: [
            //         { orderable: false, targets: [2,5,6] },
            //         // { searchable: false, targets: [0,6,7] }
            //     ],
            //     order: [[3, 'desc']]
            // });
            if ( $.fn.dataTable.isDataTable( '.table-product' ) ) {
                table = $('.table-product').DataTable();
            }
            else {
                table = $('.table-product').DataTable( {
                    paging: true
                } );
            }
        }
    })
}

employee.showModal = function(){
    // employee.reset();
    $('#productModal').modal('show');
}

employee.save = function(){
    if($('#productForm').valid()){
        let productId = parseInt($('input[name="id"]').val());
        if(productId == 0){
            let createObj = {};
            createObj.employeeName = $('input[name="employeeName"]').val();
            createObj.employeeAddress = $('input[name="employeeAddress"]').val();
            createObj.employeePhone = $('input[name="employeePhone"]').val();
            createObj.userName = $('input[name="userName"]').val();
            createObj.role = {"id": $("#role").val()};
            console.log(createObj);
            $.ajax({
                url:page.urls.saveNew,
                method: "POST",
                contentType:"application/json",
                datatype :"json",
                data: JSON.stringify(createObj),
                success: function(result){
                    if(result){
                        employee.employeeList();
                        $('#productModal').modal('hide');
                        $.notify("Product has been created success", "success");
                    }
                    else{
                        $.notify("Something went wrong, please try again", "error");
                    }
                }
            })
        }
        else{
            let modifyObj = {};
            modifyObj.employeeName = $('input[name="employeeName"]').val();
            modifyObj.employeeAddress = $('input[name="employeeAddress"]').val();
            modifyObj.employeePhone = $('input[name="employeePhone"]').val();
            modifyObj.userName = $('input[name="userName"]').val();
            modifyObj.role = {"id": $("#role").val()};
            modifyObj.id = productId;

            $.ajax({
                url: page.urls.saveNew,
                method: "POST",
                contentType:"application/json",
                datatype :"json",
                data: JSON.stringify(modifyObj),
                success: function(result){
                    if(result){
                        employee.employeeList();
                        $('#productModal').modal('hide');
                        $.notify("Product has been updated success", "success");
                    }
                    else{
                        $.notify("Something went wrong, please try again", "error");
                    }
                }
            })
        }

    }
}

employee.getRoles= function () {
    $.ajax({
        url: page.urls.getAllRoles,
        method:'GET',
        success: function(response){
            $('#productModal').find('#role').empty();
            $.each(response, (i, item) => {
                $('#productModal').find('#role').append(`<option value="${item.id}">${item.roleName}</option>`);
            })
        }
    })
}

//
// employee.getProduct = function(productId){
//     $.ajax({
//         url:`https://6100c20bbca46600171cf995.mockapi.io/product/${productId}`,
//         method:'GET',
//         success: function(response){
//             $('input[name="productname"]').val(response.productname);
//             $('input[name="price"]').val(response.price);
//             $('input[name="quantity"]').val(response.quantity);
//             $('input[name="manufactory"]').val(response.manufactory);
//             $('input[name="productId"]').val(response.id);
//             $('input[name="active"]').prop("checked", response.status);
//
//             $('#productModal').find('.modal-title').text('Modify product');
//             $('#productModal').modal('show');
//         }
//     })
// }
//
// employee.confirmChangeStatus = function(productId, status){
//     bootbox.confirm({
//         title: "Change product status?",
//         message: `Do you want to ${status ? 'inactive' : 'active'} the product now?`,
//         buttons: {
//             cancel: {
//                 label: '<i class="fa fa-times"></i> Cancel'
//             },
//             confirm: {
//                 label: '<i class="fa fa-check"></i> Confirm'
//             }
//         },
//         callback: function (result) {
//             if(result){
//                 product.changeStatus(productId, status);
//             }
//         }
//     });
// }
//
// employee.changeStatus = function(productId, status){
//     let updateStatusObj = {};
//     updateStatusObj.status = !status;
//
//     $.ajax({
//         url:`https://6100c20bbca46600171cf995.mockapi.io/product/${productId}`,
//         method: "PUT",
//         contentType:"application/json",
//         datatype :"json",
//         data: JSON.stringify(updateStatusObj),
//         success: function(result){
//             if(result){
//                 product.productList();
//                 $.notify("Product status has been changed success", "success");
//             }
//             else{
//                 $.notify("Something went wrong, please try again", "error");
//             }
//         }
//     })
// }
//
// employee.removeProduct = function(productId){
//     bootbox.confirm({
//         title: "Remove product?",
//         message: `Do you want to remove the product now? this cannot be undone.`,
//         buttons: {
//             cancel: {
//                 label: '<i class="fa fa-times"></i> Cancel'
//             },
//             confirm: {
//                 label: '<i class="fa fa-check"></i> Confirm'
//             }
//         },
//         callback: function (result) {
//             if(result){
//                 $.ajax({
//                     url:`https://6100c20bbca46600171cf995.mockapi.io/product/${productId}`,
//                     method:'DELETE',
//                     success: function(response){
//                         if(response){
//                             product.productList();
//                             $.notify("Product has been removed success", "success");
//                         }
//                         else{
//                             $.notify("Something went wrong, please try again", "error");
//                         }
//                     }
//                 })
//             }
//         }
//     });
// }
//
// employee.reset = function(){
//     $('#productForm').validate().resetForm();
//     $('#productForm')[0].reset();
//     $('#productModal').find('.modal-title').text('Add product');
// }

employee.init = function(){
    employee.employeeList();
    employee.getRoles();
}

$(document).ready(function(){
    employee.init();
});