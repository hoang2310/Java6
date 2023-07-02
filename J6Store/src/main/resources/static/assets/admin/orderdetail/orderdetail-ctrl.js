app.controller("order_detail-ctrl", [
  "$location",
  function ($scope, $http, $location) {
    var params = $location.search();

    $scope.orderDetail = {};

    $scope.initialize = function () {
      // load categories
      $http.get(`/rest/details?id=${params.id}`).then((resp) => {
        $scope.orderDetail = resp.data;
//        console.log($scope.orderDetail);
      });
    };

    // Khởi đầu
    $scope.initialize();
    // xóa sp
    $scope.delete = function (item) {
      $http
        .delete(`/rest/details?id=${params.id}`)
        .then((resp) => {
          var index = $scope.items.findIndex((od) => od.id == item.id);
          $scope.items.splice(index, 1);
          $scope.reset();
          alert("Xóa danh mục thành công!");
        })
        .catch((error) => {
          alert("Xóa danh mục thất bại!");
          console.log("Error", error);
        });
    };
  },
]);
