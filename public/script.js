$(document).ready(function () {
    console.log($('#userInfo').text().length + "USER");
    if ($('#userInfo').text().length > 54) {
        //CHANGE BADGE NUMBER ON BASCKET
        $(function () {
            $('.addToList').on('submit', function () {
                $.ajax({
                    url: '/other',
                    contentType: 'application/json',
                    success: function (response) {
                        var badgeA = $('#badgeA');
                        badgeA.html('');
                        var counter = response.data1 + 1;
                        badgeA.append('\
               <span class="badge badge-pill badge-danger"style="background-color:red">\
               ' + counter + ' </span>\
               <i class="fa fa-shopping-cart" aria-hidden="true"></i>\
               ');
                    }
                });

            });
        });
        //CHANGE AMOUNT NUMBER ON MYORDER
        $(function () {
            $('.add').on('submit', function () {
                var counter = $(this).parents('.addcount').siblings('.amountTd').find('input');
                var newAmount = Number(counter.val()) + 1;
                counter.val(newAmount);

            });
        });
        //CHANGE AMOUNT NUMBER ON MYORDER
        $(function () {
            $('.minus').on('submit', function () {
                var counter = $(this).parents('.minuscount').siblings('.amountTd').find('input');
                var newAmount = Number(counter.val()) - 1;
                counter.val(newAmount);
                if (newAmount<=0){
                    $(this).find("button").prop('disabled', true);
                }
            });
        });
        //create/post
        $('.addToList').on('submit', function (event) {
            event.preventDefault();
            var productId = $(this).find('.productId');
            $.ajax({
                url: '/orders',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: productId.val()
                }),
                success: function (response) {}
            });
        });
        //minus/post
        $('.minus').on('submit', function (event) {
            event.preventDefault();
            var orderid = $(this).find('.orderId');
            $.ajax({
                url: '/orderminus',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: orderid.val()
                }),
                success: function (response) {}
            });
        });
        //add/post
        $('.add').on('submit', function (event) {
            event.preventDefault();
            var orderid = $(this).find('.orderId');
            $.ajax({
                url: '/orderplus',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: orderid.val()
                }),
                success: function (response) {}
            });
        });
    }
    //        else {
    //        var expireDate = new Date();
    //        expireDate.setDate(expireDate.getDate() + 5);
    //        var order = document.cookie("order", [], {
    //            'expires': expireDate
    //        });
    //        $('.addToList').on('submit', function (event) {
    //            event.preventDefault();
    //            var productId = $(this).find('.productId');
    //            var productInfo = productId.val();
    //            var order = $.cookie("order").split(','); // get the string and split it
    //            var expireDate = new Date();
    //            expireDate.setDate(expireDate.getDate() + 1);
    //            order.push(productInfo);
    //            document.cookie("order", order, {
    //                'expires': expireDate
    //            });
    //            $(function myfunction() {
    //                var badgeA = $('#badgeA');
    //                badgeA.html('');
    //                var counter = (order.length);
    //                badgeA.append('\
    //               <span class="badge badge-pill badge-danger"style="background-color:red">\
    //               ' + counter + ' </span>\
    //               <i class="fa fa-shopping-cart" aria-hidden="true"></i>\
    //               ');
    //                console.log(document.cookie + '<---cookies---');
    //
    //            });
    //        });
    //    }
});




$(document).ajaxError(function (e, xhr, settings, exception) {

});
