export default class Jewels {
    constructor(AppConstants, $http, $q) {
        "ngInject";

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
    }

    query(config) {
        let request = {
            url: this._AppConstants.api + '/jewels' + ((config.type == 'feed') ? '/feed' : ''),
            method: 'GET',
            params: config.filters ? config.filters : null
        };
        return this._$http(request).then((res) => res.data);
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

    favorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/jewels/' + slug + '/favorite',
            method: 'POST'
        })
    }

    unfavorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/jewels/' + slug + '/favorite',
            method: 'DELETE'
        })
    }


    //delete jewel
    destroy(slug) {
        return this._$http({
            url: this._AppConstants.api + '/jewels/' + slug,
            method: 'DELETE'
        })
    }


}