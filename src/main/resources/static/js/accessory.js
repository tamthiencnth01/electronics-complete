let page = {
    urls: {
        getAllAccessories: App.BASE_URL_ACCESSORY,
        getAccessory: App.BASE_URL_ACCESSORY + '/',
        saveNewAccessory: App.BASE_URL_ACCESSORY,
        editAccessory: App.BASE_URL_ACCESSORY + '/',
        deleteAccessory: App.BASE_URL_ACCESSORY + '/'
    }
}

let accessory = new Accessory();

accessory.accessoryList = function () {
    $.ajax({
        url: page.urls.getAllAccessories,
        method: 'GET',
        success: function (response) {
            $('.table-accessory tbody').empty();
            response = response.sort(function (pdt1, pdt2) {
                return pdt2.id - pdt1.id;
            })
            $.each(response, function (index, item) {
                $('.table-accessory tbody').append(`
                <tr>
                         <td>${item.id}</td>
                        <td>${item.accessoryName}</td>
                        <td>
                            ${item.importPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                        <td>
                            ${item.retailPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                        <td>${item.quantity}
                            ${item.quantity <=10 ?
                            '<span class="btn-danger btn-sm">Cần Nhập Thêm</span>':
                            '<span hidden class=" btn-danger"></span>'}</td>
                        <td>
                                 <a href='javascript:;' class='btn btn-success btn-sm'
                                    title='Edit'
                                    onclick="accessory.getAccessory(${item.id})">
                                    <i class="fa fa-pencil"></i>
                                </a>
                                <a href='javascript:;' class='btn btn-danger btn-sm'
                                    title='Delete'
                                    onclick="accessory.delete(${item.id})">
                                    <i class="fa fa-trash"></i>
                                </a>
                        </td>
                    </tr>
                    `);
            });
        }
    })
}

accessory.showModal = function () {
    accessory.reset();
    $('#accessoryModal').modal('show');
}
accessory.save = function () {
    let accessoryId = ($('input[name="id"]').val());
    if (accessoryId == 0) {
        let createObj = {};
        createObj.accessoryName = $('input[name="accessoryName"]').val();
        createObj.importPrice = $('input[name="importPrice"]').val();
        createObj.retailPrice = $('input[name="retailPrice"]').val();
        createObj.quantity = $('input[name="quantity"]').val();
        $.ajax({
            url: page.urls.saveNewAccessory,
            method: "POST",
            contentType: "application/json",
            datatype: "json",
            data: JSON.stringify(createObj),
            success: function (result) {
                console.log(result);
                if (result) {
                    accessory.accessoryList();
                    $('#accessoryModal').modal('hide');
                    $.notify("Accessory has been created success", "success");
                } else {
                    $.notify("Something went wrong, please try again", "error");
                }
            }
        })
    } else {
        let updateObj = {};
        updateObj.accessoryName = $('input[name="accessoryName"]').val();
        updateObj.importPrice = $('input[name="importPrice"]').val();
        updateObj.retailPrice = $('input[name="retailPrice"]').val();
        updateObj.quantity = $('input[name="quantity"]').val();
        updateObj.id = accessoryId;
        $.ajax({
        url: page.urls.saveNewAccessory,
            method: "POST",
            contentType: "application/json",
            datatype: "json",
            data: JSON.stringify(updateObj),
            success: function (result) {
                if (result) {
                    accessory.accessoryList();
                    $('#accessoryModal').modal('hide');
                    $.notify("Accessory has been created success", "success");
                } else {
                    $.notify("Something went wrong, please try again", "error");
                }
            }
        })
    }
}

accessory.getAccessory = function (id) {
    accessory.reset();
    $.ajax({
        url: page.urls.getAccessory + id,
        method: "GET",
        success: function (response) {
            $('#accessoryId').val(response.id);
            $('#accessoryName').val(response.accessoryName);
            $('#importPrice').val(response.importPrice);
            $('#retailPrice').val(response.retailPrice);
            $('#quantity').val(response.quantity);
            $('#accessoryModal').modal('show');
        }
    })
}

accessory.delete = function(id){
    $.ajax({
        type : "DELETE",
        url : page.urls.deleteAccessory + id
    }).done(function (){
        accessory.accessoryList()
        App.showSuccessAlert("Đã xóa thành công!")
    }).fail(function (){
        App.showErrorAlert("Đã xảy ra lỗi!")
    })
}

accessory.reset = function () {
    $('#accessoryForm').validate().resetForm();
    $('#accessoryForm')[0].reset();
}
accessory.init = function () {
    accessory.accessoryList();
}

$(document).ready(function () {
    accessory.init();
});

