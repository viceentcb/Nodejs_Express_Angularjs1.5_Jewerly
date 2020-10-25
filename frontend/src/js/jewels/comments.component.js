class CommentCtrl {
    constructor(User) {

        'ngInject';

        this.$onInit = () => {
            if (User.current) {
                this.canModify = User.current.username === this.jewel.owner.username ? true : User.current.username === this.data.author.username
            } else {
                this.canModify = false;
            }

        }


    } //end_constructor



} //endclass


let Comment = {
    bindings: {
        jewel: "=",
        data: '=',
        deleteCm: '&'
    },
    controller: CommentCtrl,
    templateUrl: 'jewels/comments.html'
}

export default Comment;