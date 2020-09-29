class Jewels_det_Ctrl {
    constructor(jewel, $scope, $stateParams) {
        "ngInject";
        console.log(jewel)


          this._$scope = $scope;

          // $scope.jewel= 
          this.jewel=jewel

          
          this.filter = $stateParams.filter;


        }
    }

    export default Jewels_det_Ctrl;