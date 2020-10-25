class Jewels_det_Ctrl {
    constructor(jewel, Comments, comments, $scope, User, $stateParams) {
        "ngInject";

          this._$scope = $scope;
          this.jewel=jewel
          this._Comments = Comments;
          this.comments = comments;
          this.currentUser = User.current  
          this.filter = $stateParams.filter;
        }


        resetCommentForm() {
          this.commentForm = {
              isSubmitting: false,
              body: '',
              errors: []
          }
      }
  
  
      addComment() {
          this.commentForm.isSubmitting = true;
          this._Comments.add(this.jewel.slug, this.commentForm.body).then(
              (comment) => {
                  this.comments.unshift(comment);
                  this.resetCommentForm();
              },
              (err) => {
                  this.comment.isSubmitting = false;
                  this.commentForm.errors = err.data.errors;
              }
          )
      }
  
  
      deleteComment(commentId, index) {
          console.log('id',commentId);
          console.log("index", index)

          this._Comments.destroy(commentId, this.jewel.slug).then(
              (success) => {
                  this.comments.splice(index, 1)
              }
          )
      }


    }

    export default Jewels_det_Ctrl;