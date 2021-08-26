var user = user || {};

user.userList = function(){
    $.ajax({
        url: page.urls.getAllUsers,
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
                        <td>${item.fullName}</td>
                        <td>${item.address}</td>
                        <td>${item.phone}</td>
                        <td>${item.username}</td>
                        <td>${item.role.name}</td>
                        <td></td>
                    </tr>
                    `);
            });
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

user.showModal = function(){
    // user.reset();
    $('#productModal').modal('show');
}
user.save = function(){
    let productId = parseInt($('input[name="id"]').val());
    if(productId == 0){
        let createObj = {};
        createObj.username = $('input[name="username"]').val();
        createObj.password = $('input[name="password"]').val();
        createObj.fullName = $('input[name="fullName"]').val();
        createObj.address = $('input[name="address"]').val();
        createObj.phone = $('input[name="phone"]').val();
        createObj.role = {"id": $("#role").val()};
        $.ajax({
            url: page.urls.saveNewUser,
            method: "POST",
            contentType:"application/json",
            datatype :"json",
            data: JSON.stringify(createObj),
            success: function(result){
                if(result){
                    user.userList();
                    $('#productModal').modal('hide');
                    $.notify("Product has been created success", "success");
                }
                else{
                    $.notify("Something went wrong, please try again", "error");
                }
            }
        })
    }
}
user.getRoles= function () {
    $.ajax({
        url: page.urls.getRole,
        method:'GET',
        success: function(response){
            $('#productModal').find('#role').empty();
            $.each(response, (i, item) => {
                $('#productModal').find('#role').append(`<option value="${item.id}">${item.name}</option>`);
            })
        }
    })
}

user.reset = function(){
    $('#productForm').validate().resetForm();
    $('#productForm')[0].reset();
}
user.init = function(){
    user.userList();
    user.getRoles();
}

$(document).ready(function(){
    user.init();
});