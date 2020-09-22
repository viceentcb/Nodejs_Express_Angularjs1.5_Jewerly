function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.editor', {
    url: '/editor/:slug',
    controller: 'EditorCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'editor/editor.html',
    title: 'Editor',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
      },
      jewel: function(Jewels, User, $state, $stateParams) {

        if ($stateParams.slug) {

          return Jewels.get($stateParams.slug).then(
            (jewel) => {
              if (User.current.username === jewel.author.username) {
                return jewel;
              } else {
                $state.go('app.home');
              }
            },
            (err) => $state.go('app.home')
          )

        } else {
          return null;
        }

      }
    }
  });

};

export default EditorConfig;
