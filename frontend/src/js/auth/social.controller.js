class SocialCtrl {
    constructor(User, $state, $scope, Toastr) {
        'ngInject';

        console.log("ENTRA EN EL CONTROLADOR DEL SOCIAL LOGIN------------------------------------------------------------------------------------------------")
        this._User = User;
        this._$state = $state;
        this._$scope = $scope;
        this._toaster = Toastr;

        this.title = $state.current.title;
        this.authType = $state.current.name.replace('app.', '');
        this._User.attemptAuth(this.authType, null).then(
            (res) => {
                this._toaster.showToastr('success', 'Successfully Logged In');
            },
            (err) => {
                this._toaster.showToastr('error', err);
                this._$state.go('app.home');
            }
        )
    }
}
export default SocialCtrl;