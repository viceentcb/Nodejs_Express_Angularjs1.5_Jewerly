export default class Shops {
    constructor(AppConstants, $http, $q, GraphQLClient) {
      'ngInject';

  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
  
    }
  
    /**
     * RETURN ALL OPINIONS
     */
    query() {
      let query = `
            {
              shops{
                slug
                name
                city{
                  slug
                  name
                }
              }
            }
          `;
      return this._GQL.get(query);
    }

  }