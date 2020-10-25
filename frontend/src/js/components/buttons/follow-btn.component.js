class FollowBtnCtrl {
  constructor(Profile, User, $state) {
    'ngInject';

    this._Profile = Profile;
    this._User = User;

    this._$state = $state;

    this.$onInit = () => {
      console.log(this.user)
      if (User.current) {
        this.canModify = (User.current.username === this.user.username);
      } else {
        this.canModify = false;
      }
    }
  }

  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    // If following already, unfollow
    if (this.user.following) {
      this._Profile.unfollow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = false;
          this.user.followersCount--;

        }
      )

    // Otherwise, follow them
    } else {
      console.log(this.user.username)
      this._Profile.follow(this.user.username).then(
        () => {
          this.isSubmitting = false;
          this.user.following = true;
          this.user.followersCount++;

        }
      )
    }


  }
}

let FollowBtn= {
  bindings: {
    user: '='
  },
  controller: FollowBtnCtrl,
  templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;
