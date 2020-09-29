class JewelDetailCtrl {
    constructor($scope) {
        'ngInject';

        this._$scope = $scope;
    }
}

let JewelDetail = {
    bindings: {
      jewel:'='
    },
    controller: JewelDetailCtrl,
    templateUrl: 'components/jewels-helpers/jewel_detail.html'
  };
  
  export default JewelDetail;
  