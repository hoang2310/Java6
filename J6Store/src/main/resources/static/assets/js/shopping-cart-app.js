const app = angular.module("shopping-cart-app", []);

app.controller("shopping-cart-ctrl", function ($scope, $http) {
  $scope.cart = {
    items: [],

    //thêm sp vào giỏ
    add(id) {
      var item = this.items.find((item) => item.id == id);
      if (item) {
        item.qty++;
        this.saveToLocalStorage();
      } else {
        $http.get(`/rest/products/${id}`).then((resp) => {
          resp.data.qty = 1;
          this.items.push(resp.data);
          this.saveToLocalStorage();
        });
      }
    },

    //xóa sp khỏi giỏ
    remove(id) {
      var index = this.items.findIndex((item) => item.id == id);
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    },

    //xóa sạch mặt hàng
    clear() {
      this.items = [];
      this.saveToLocalStorage();
    },

    //   //tính tiền của 1 sp
    //   amt_of(item) {},

    get count() {
      return this.items
        .map((item) => item.qty)
        .reduce((total, qty) => (total += qty), 0);
    },

    //tỉnh tổng số lượng các sp trong giỏ
    get amount() {
      return this.items
        .map((item) => item.qty * item.price)
        .reduce((total, qty) => (total += qty), 0);
    },

    //lưu vào localstorage
    saveToLocalStorage() {
      var json = JSON.stringify(angular.copy(this.items));
      localStorage.setItem("cart", json);
    },

    //load local
    loadFromLocalStorage() {
      var json = localStorage.getItem("cart");
      this.items = json ? JSON.parse(json) : [];
    },
  };

  $scope.cart.loadFromLocalStorage();

  $scope.order = {
    createDate: new Date(),
    address: "",
    account: {username:$("#username").text().trim()},

    get orderDetails() {
      return $scope.cart.items.map(item => {
        return {
          product: { id: item.id },
          price: item.price,
          quantity: item.qty
        }
      });
    },
    purchase() {
      var order = angular.copy(this);
      //thực hiện đặt hàng
      $http
        .post("/rest/orders", order)
        .then(resp => {
          alert("Đặt hàng thành công!");
          $scope.cart.clear();
          location.href = "/order/detail/" + resp.data.id;
        })
        .catch(error => {
          alert("Đặt hàng không thành công!");
          console.log(error);
        });
    }
  }
});
