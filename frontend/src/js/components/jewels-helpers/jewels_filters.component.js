class JewelsFiltersCtrl {
    constructor($scope) {
        'ngInject';

        this._$scope = $scope;
    }
}

let JewelsFilters = {
    bindings: {
      filters:'='
    },
    controller: JewelsFiltersCtrl,
    templateUrl: 'components/jewels-helpers/jewels_filters.html'
  };
  
  export default JewelsFilters;
  