class JewelsCtrl {
  constructor(jewels, $scope, $stateParams, User) {
    "ngInject";


    this._$scope = $scope;


    // console.log(jewels)

    // Tags
    // .getAll()
    // .then(
    //     (tags) => {
    //         this.tagsLoaded = true;
    //         this.tags = tags
    //     }
    // );
    // console.log("thistags",this.tags)

    // console.log($stateParams.filter)

    if (jewels) {

      if ($stateParams.filter) {
        // console.log(jewels)
        let all_filter = $stateParams.filter.split(',')
        console.log(all_filter)
        let filter = all_filter[0]
        let hwfilter = all_filter[1]

        this.jewels = jewels.filter(element => element[hwfilter] == filter)

      } else {
        this.jewels = jewels

      }

    }


    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };
  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
};
}

export default JewelsCtrl;