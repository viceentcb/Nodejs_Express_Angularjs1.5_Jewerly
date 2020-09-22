function HomeConfig($stateProvider) {

  'ngInject';
  $stateProvider
    .state('app.home', {

      url: '/',
      controller: 'HomeCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'home/home.html',
      title: 'Home',
      resolve: {
        jewels: function (Jewels) {
          // console.log("resolve");
          return Jewels.getJewels().then(jewels => jewels)
        }

      }
    });

};

export default HomeConfig;
