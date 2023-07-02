app.controller("category-ctrl", function ($scope, $http) {
  $scope.items = [];
  $scope.listCategories = [];
  $scope.form = {};

  $scope.initialize = function () {
    // load categories
    $http.get("/rest/categories").then((resp) => {
      $scope.items = resp.data;
      //      console.log(resp.data);
    });
  };

  // Khởi đầu
  $scope.initialize();

  // Xóa form
  $scope.reset = function () {
    $scope.form = {};
  };

  // hiển thị trên form
  $scope.edit = function (item) {
    $scope.form = angular.copy(item);
    $(".nav-tabs li:eq(0) button").tab("show");
    console.log($scope.form.name);
  };

  // thêm
  $scope.create = function () {
    var item = angular.copy($scope.form);
    $http
      .post(`/rest/categories`, item)
      .then((resp) => {
        $scope.items.push(resp.data);
        $scope.reset();
//        window.location.replace("/assets/admin/index.html#!/category");
        alert("Thêm mới danh mục thành công!");
      })
      .catch((error) => {
        alert("Thêm mới danh mục thất bại!");
        console.log("Error", error);
      });
  };

  // update
  $scope.update = function () {
    var item = angular.copy($scope.form);
    $http
      .put(`/rest/categories/${item.id}`, item)
      .then((resp) => {
        var index = $scope.items.findIndex((c) => c.id == item.id);
        $scope.items[index] = item;
        alert("Cập nhật danh mục thành công!");
      })
      .catch((error) => {
        alert("Cập nhật danh mục thất bại!");
        console.log("Error", error);
      });
  };

  // xóa sp
  $scope.delete = function (item) {
    $http
      .delete(`/rest/categories/${item.id}`)
      .then((resp) => {
        var index = $scope.items.findIndex((c) => c.id == item.id);
        $scope.items.splice(index, 1);
        $scope.reset();
        alert("Xóa danh mục thành công!");
        window.location.reload();
      })
      .catch((error) => {
        alert("Xóa danh mục thất bại!");
        console.log("Error", error);
      });
  };

  //upload hình
  //  $scope.imageChanged = function (files) {
  //    var data = new FormData();
  //    data.append("file", files[0]);
  //    $http
  //      .post("/rest/upload/images", data, {
  //        transformRequest: angular.identity,
  //        headers: { "Content-Type": undefined },
  //      })
  //      .then((resp) => {
  //        $scope.form.image = resp.data.name;
  //      })
  //      .catch((error) => {
  //        alert("Lỗi upload hình ảnh");
  //        console.log("Error", error);
  //      });
  //  };

  //phân trang
  // $scope.pager = {
  //     page:0,
  //     size:10,
  //     get items(){
  //         var start = this.page * this.size;
  //         return $scope.items.slice(start, start + this.size);
  //     },
  //     get count(){
  //         return Math.ceil(1.0 * $scope.items.length / this.size)
  //     },
  //     first(){
  //         this.page = 0;
  //     },
  //     prev(){
  //         this.page--;
  //         if(this.page < 0){
  //             this.last();
  //         }
  //     },
  //     next(){
  //         this.page++;
  //         if(this.page >= this.count){
  //             this.first();
  //         }
  //     },
  //     last(){
  //         this.page = this.count - 1;
  //     }
  // }

  //  $scope.pageSize = 5;
  //  $scope.start = 0;
  //  $scope.pageIndex = 0;
  //
  //  $scope.next = function () {
  //    if ($scope.start < $scope.items.length - $scope.pageSize) {
  //      $scope.start += $scope.pageSize;
  //      $scope.pageIndex++;
  //    }
  //  };
  //  $scope.prev = function () {
  //    if ($scope.start > 0) {
  //      $scope.start -= $scope.pageSize;
  //      $scope.pageIndex--;
  //    }
  //  };
  //  $scope.first = function () {
  //    $scope.start = 0;
  //    $scope.pageIndex = 0;
  //  };
  //  $scope.last = function () {
  //    sotrang = Math.ceil($scope.items.length / $scope.pageSize);
  //    $scope.start = $scope.pageSize * (sotrang - 1);
  //    $scope.pageIndex = $scope.count() - 1;
  //  };
  //  $scope.count = function () {
  //    return Math.ceil((1.0 * $scope.items.length) / $scope.pageSize);
  //  };
});
