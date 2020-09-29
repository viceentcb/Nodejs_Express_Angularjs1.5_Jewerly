class JewelsListCtrl {
    constructor($scope) {
        'ngInject';

        this._$scope = $scope;
    }
}

let JewelsList = {
    bindings: {
      jewels:'='
    },
    controller: JewelsListCtrl,
    templateUrl: 'components/jewels-helpers/jewels_list.html'
  };
  
  export default JewelsList;
  