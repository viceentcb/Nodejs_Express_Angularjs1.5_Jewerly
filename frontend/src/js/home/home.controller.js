class HomeCtrl {
    constructor(User, jewels, Tags, AppConstants, $scope) {
        'ngInject';



        // console.log("home")
        this.appName = AppConstants.appName;
        this._$scope = $scope;

        // $scope.jewels= jewels
        this.jewels = jewels


        let unique = [];

        let all_filters = ['brand', 'type']


        let fils = []

        for (var x = 0; x < all_filters.length; x++) {
            unique = Array.from(new Set((jewels).map(elm => (elm[all_filters[x]]))))
            unique.forEach(element => {
                fils.push({ 'filter': element, 'hwfilter': all_filters[x], 'img': 'img/' + element + '.png' })
            })
        }

        // ///FILTER BRANDS


        console.log(fils)
        this.filters = fils

        // Get list of all tags
        Tags
            .getAll()
            .then(
                (tags) => {
                    this.tagsLoaded = true;
                    this.tags = tags
                }
            );

        // Set current list to either feed or all, depending on auth status.
        this.listConfig = {
            type: User.current ? 'feed' : 'all'
        };


    }





    changeList(newList) {
        this._$scope.$broadcast('setListTo', newList);
    }


}

export default HomeCtrl;