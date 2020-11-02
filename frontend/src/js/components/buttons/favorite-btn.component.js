class FavoriteBtnCtrl {
  constructor(User, Jewels, $state, $scope) {
    'ngInject';

    this._User = User;
    this._Jewel = Jewels;
    this._$state = $state;
    this._$scope = $scope;


  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {

      this._$state.go('app.register');
      return;
    }

    if (this.jewel.favorited) {

      this._Jewel.unfavorite(this.jewel.slug).then(
        () => {
          this.isSubmitting = false;
          this.jewel.favorited = false;
          this.jewel.favoritesCount--;
          this._$scope.$emit('likes', this.jewel);

        }
      )

    } else {
      this._Jewel.favorite(this.jewel.slug).then(
        () => {
          this.isSubmitting = false;
          this.jewel.favorited = true;
          this.jewel.favoritesCount++;
          this._$scope.$emit('likes', this.jewel);
        }
      )


    }

  }

}

let FavoriteBtn= {
  bindings: {
    jewel: '='
  },
  transclude: true,
  controller: FavoriteBtnCtrl,
  templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;
