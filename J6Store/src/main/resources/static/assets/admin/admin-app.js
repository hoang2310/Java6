app = angular.module("admin-app", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/product", {
      templateUrl: "/assets/admin/product/index.html",
      controller: "product-ctrl",
    })
    .when("/authorize", {
      templateUrl: "/assets/admin/authority/index.html",
      controller: "authority-ctrl",
    })
    .when("/unauthorized", {
      templateUrl: "/assets/admin/authority/unauthorized.html",
      controller: "authority-ctrl",
    })
    .when("/account", {
      templateUrl: "/assets/admin/account/index.html",
      controller: "account-ctrl",
    })
    .when("/category", {
      templateUrl: "/assets/admin/category/index.html",
      controller: "category-ctrl",
    })
    .when("/details", {
      templateUrl: "/assets/admin/orderdetail/index.html",
      controller: "order-ctrl",
    })
    .when("/order", {
      templateUrl: "/assets/admin/order/index.html",
      controller: "order-ctrl",
    })
    .when("/summary", {
      templateUrl: "/assets/admin/summary/index.html",
      controller: "summary-ctrl",
    })
    .otherwise({
      template: "<h1 class='text-center'>FPT Administration</h1>",
    });
});
