app.controller("product-ctrl", function ($scope, $http) {
  $scope.items = [];
  $scope.cates = [];
  $scope.form = {};

  $scope.initialize = function () {
    //load products
    $http.get("/rest/products").then((resp) => {
      $scope.items = resp.data;
      $scope.items.forEach((item) => {
        item.createDate = new Date(item.createDate);
      });
    });
    //load categories
    $http.get("/rest/categories").then((resp) => {
      $scope.cates = resp.data;
    });
  };

  //khởi đầu
  $scope.initialize();
  
//phân trang
  $scope.pager = {
    page: 0,
    size: 10,
    get items() {
      var start = this.page * this.size;
      return $scope.items.slice(start, start + this.size);
    },
    get count() {
      return Math.ceil((1.0 * $scope.items.length) / this.size);
    },
    first() {
      this.page = 0;
    },
    previos() {
      this.page--;
      if (this.page < 0) {
        this.first();
      }
    },
    next() {
      this.page++;
      if (this.page >= this.count) {
        this.first();
      }
    },
    last() {
      this.page = this.count - 1;
    },
  };

  //reset form
  $scope.reset = function () {
    $scope.form = {
      createDate: new Date(),
      image: "cloud-upload.jpg",
      available: true,
    };
  };

  //Hiển thị lên form
  $scope.edit = function (item) {
    $scope.form = angular.copy(item);
    $(".nav-tabs a:eq(0)").tab("show");
  };

  //create
  $scope.create = function () {
    var item = angular.copy($scope.form);
    $http
      .post(`/rest/products`, item)
      .then((resp) => {
        resp.data.createDate = new Date(resp.data.createDate);
        $scope.items.push(resp.data);
        $scope.reset();
        alert("Thêm Sản Phẩm thành công!");
      })
      .catch((error) => {
        alert("Thêm Sản Phẩm thất bại!");
        console.log("Error", error);
      });
  };

  //update san pham
  $scope.update = function () {
    var item = angular.copy($scope.form);
    $http
      .put(`/rest/products/${item.id}`, item)
      .then((resp) => {
        var index = $scope.items.findIndex((p) => p.id == item.id);
        $scope.items[index] = item;
        alert("Cập nhập sản phẩm thành công!");
      })
      .catch((error) => {
        alert("Cập nhập sản phẩm thất bại!");
        console.log("Error", error);
      });
  };

  //xóa sản phảm
  $scope.delete = function (item) {
    $http
      .delete(`/rest/products/${item.id}`)
      .then((resp) => {
        var index = $scope.items.findIndex((p) => p.id == item.id);
        $scope.items.splice(index, 1);
        $scope.reset();
        alert("Xóa sản phẩm thành công!");
      })
      .catch((error) => {
        alert("Xóa sản phẩm thất bại!");
        console.log("Error", error);
      });
  };

  //Upload hình
  $scope.imageChanged = function (files) {
    var data = new FormData();
    data.append("file", files[0]);
    $http
      .post("/rest/upload/images", data, {
        transformRequest: angular.identity,
        headers: { "Content-Type": undefined },
      })
      .then((resp) => {
        $scope.form.image = resp.data.name;
      })
      .catch((error) => {
        alert("Lỗi Upload hình ảnh!");
        console.log("Error", error);
      });
  };

});
