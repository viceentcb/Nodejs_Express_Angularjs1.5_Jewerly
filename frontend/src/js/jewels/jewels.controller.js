class JewelsCtrl {
    constructor(jewels, $scope, $stateParams) {
        "ngInject";
        console.log("controlador_jewel")


          this._$scope = $scope;

          this.jewels=jewels
          
        }
    }

    export default JewelsCtrl;