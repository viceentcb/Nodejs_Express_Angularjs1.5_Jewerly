class EditorCtrl {
  constructor(Jewels, jewel, $state) {
    'ngInject';

    this._Jewels = Jewels;
    this._$state = $state;

    console.log(jewel)
    console.log(Jewels)
    if (!jewel) {
      this.jewel = {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    } else {
      this.jewel = jewel;
    }

  }

  addTag() {
    if (!this.jewel.tagList.includes(this.tagField)) {
      this.jewel.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  removeTag(tagName) {
    this.jewel.tagList = this.jewel.tagList.filter((slug) => slug != tagName);
  }

  submit() {
    this.isSubmitting = true;

    this._Jewels.save(this.jewel).then(
      (newJewel) => {
        this._$state.go('app.jewel', { slug: newJewel.slug });
      },

      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }

    )
  }



}


export default EditorCtrl;
