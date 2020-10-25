class JewelActionsCtrl {
    constructor(User, Jewels, $state) {
        'ngInject';

        this._Jewel = Jewels;
        this._$state = $state;

        
        this.$onInit = () => {
            if (User.current) {
                this.canModify = (User.current.username === this.jewel.owner.username);
            } else {
                this.canModify = false;
            }

        }

    }

    deleteJewel() {
        this.isDeleting = true;
        this._Jewel.destroy(this.jewel.slug).then(
            (success) => this._$state.go('app.home'),
            (err) => this._$state.go('app.home')
        )
    }

}

let JewelActions = {

    bindings: {
        jewel: '='
    },
    controller: JewelActionsCtrl,
    templateUrl: 'jewels/jewels-actions.html'


}



export default JewelActions;