app.controller("order-ctrl", function ($scope, $http) {
  $scope.items = [];
  $scope.form = {};
  $scope.orderDetails = [];

  // Khởi đầu
  $scope.initialize = function () {
    // load categories
    $http.get("/rest/orders").then((resp) => {
      $scope.items = resp.data;
//      console.log($scope.items);
    });
  };

  $scope.initialize();

  $scope.findViewDetail = function (item) {
    console.log("click r nè");
    window.location.replace("/assets/admin/index.html#!/details");
    $http.get(`/rest/details?id=${item.id}`).then((resp) => {
      $scope.orderDetails = resp.data;
      console.log($scope.orderDetails);
    });
    // window.location.replace("/order/detail-admin/" + item.id);
  };

  // xóa 
  $scope.delete = function (item) {
    $http
      .delete(`/rest/orders/${item.id}`)
      .then((resp) => {
        var index = $scope.items.findIndex((o) => o.id == item.id);
        $scope.items.splice(index, 1);
        $scope.reset();
        alert("Xóa đơn hàng thành công!");
      })
      .catch((error) => {
        alert("Xóa đơn hàng thất bại!");
        console.log("Error", error);
      });
  };

  $scope.pageSize = 5;
  $scope.start = 0;
  $scope.pageIndex = 0;

  $scope.next = function () {
    if ($scope.start < $scope.items.length - $scope.pageSize) {
      $scope.start += $scope.pageSize;
      $scope.pageIndex++;
    }
  };
  $scope.prev = function () {
    if ($scope.start > 0) {
      $scope.start -= $scope.pageSize;
      $scope.pageIndex--;
    }
  };
  $scope.first = function () {
    $scope.start = 0;
    $scope.pageIndex = 0;
  };
  $scope.last = function () {
    sotrang = Math.ceil($scope.items.length / $scope.pageSize);
    $scope.start = $scope.pageSize * (sotrang - 1);
    $scope.pageIndex = $scope.count() - 1;
  };
  $scope.count = function () {
    return Math.ceil((1.0 * $scope.items.length) / $scope.pageSize);
  };
});
