replaced = replaced || {};

replaced.replacedList = function (){
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
                        </tr>
                        `);
            });
        }
    })
}

replaced.reset = function () {
    $('#updateDoingForm')[0].reset();
}

replaced.init = function(){
    replaced.replacedList();
};


$(document).ready(function(){
    replaced.init();
});