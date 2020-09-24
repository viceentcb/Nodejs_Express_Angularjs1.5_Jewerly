class JewelsCtrl {
    constructor(jewels, $scope, $stateParams) {
        "ngInject";
        console.log("controlador_jewel")


          this._$scope = $scope;

          $scope.jewels= jewels

          
          this.filter = $stateParams.filter;

        }
    }

    export default JewelsCtrl;