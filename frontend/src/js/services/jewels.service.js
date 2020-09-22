export default class Jewels {
    constructor(AppConstants, $http, $q) {
        "ngInject";

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
    }


    //All jewels
    getJewels() {
        return this._$http({
            url: this._AppConstants.api + "/jewels",
            method: "GET"
        }).then(res => {
            // console.log(res.data.jewels)
            return res.data.jewels;
        });
    }

    //One Jewel
    getJewel(slug) {
        return this._$http({
          url: this._AppConstants.api + "/jewels/" + slug,
          method: "GET"
        })
          .then(res => res.data.jewel);
      }
    

}