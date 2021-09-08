app.controller('KiemTra', function ($scope, $http, $location, $ngBootbox) {
   
    var url = "https://kiemtra.baohanhdientu.net/api/ProductInfo_API/";


    //$scope.S_Model = 'APO-092/DCIC';
    //$scope.S_Serial = 'APO092ICC17MAR00345';

    $scope.ProductInfo = null;
    $scope.ShowKetQua = false;
    $scope.ShowError = false;
    $scope.isViewLoading = false;

    $scope.htm_chinhSachBaoHanh = "";
    $scope.Message = "Không tìm thấy thông tin";

    GetResouce();
    function GetResouce() {

        var urlGet = url + "GetHTML?key=dieu_kien_ban_hanh";


        $http.get(urlGet)
           .then(function (response) {
               $scope.htm_chinhSachBaoHanh = response.data.Contents;
           });
    }


    $scope.TraCuu = function TraCuu() {
        $scope.isViewLoading = true;
        $scope.ShowKetQua = false;
        $scope.ShowError = false;
        if (!$scope.S_Serial) {
            $scope.Message = "Vui lòng nhập đẩy đủ thông tin trước khi tra cứu";
            $scope.ShowError = true;
            $scope.isViewLoading = false;
            return;
        }
        //else if (!$scope.S_Agree)
        //{
        //    $scope.Message = "Vui lòng đồng ý điều khoản trước khi đăng ký";
        //    $scope.ShowError = true;
        //    $scope.isViewLoading = false;
        //    return;
        //}
         

        var urlPost = url + "CheckBH";
		 var data ={
		     'ProductModel': $scope.S_Model,
		     'SerialNo': $scope.S_Serial
		 };


        try {



            $http.post(urlPost, data).then(function (response) {


                if (response.data) {
                    $scope.ShowKetQua = true;
                    $scope.ProductInfo = response.data;
                }
                else {
                    $scope.Message = "Không tìm thấy thông tin";
                    $scope.ProductInfo = null;
                    $scope.ShowKetQua = false;

                    $scope.ShowError = true;
                }

                $scope.isViewLoading = false;

            });



        } catch (e) {

            $scope.isViewLoading = false;
        }



     

    };



     
});