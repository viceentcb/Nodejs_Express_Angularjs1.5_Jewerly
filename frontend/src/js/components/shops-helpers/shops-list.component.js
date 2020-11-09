class ShopsListCtrl {
    constructor($scope, Shops) {
        "ngInject";
        console.log('---- City LIST ----');
        this._Shops = Shops;

        
        // this.runQuery()
        this.shops()

    }

    runQuery() {
        
        // Run the query
        this._Shops
            .query()
            .then(
                (res) => {
                    // console.log('console res in run query', res)                    
                    this.list = res.shops;
                    // console.log('console res in run query opinions -->', this.list)

                    //Creamos dos nuevos campos en la ciudad uno con el numero de ciudades que tiene
                    //Y otro para ponerlo en plural o singular
                    for( let i=0; i<this.list.length ;i++){
                        this.list[i].count=this.list[i].city.length;

                        this.list[i].hwmny= this.list[i].count==1?"Ciudad":"Ciudades"
                    }
                    // console.log(this.list)
                }
            );
    }

    shops() {
        
        // Run the query
        this._Shops
            .getShops()
            .then(
                (res) => {
                    this.list = res.shops;
                    // console.log(res)

                    //Creamos dos nuevos campos en la ciudad uno con el numero de ciudades que tiene
                    //Y otro para ponerlo en plural o singular
                    for( let i=0; i<this.list.length ;i++){
                        this.list[i].count=this.list[i].city.length;

                        this.list[i].hwmny= this.list[i].count==1?"Ciudad":"Ciudades"
                    }
                    // console.log(this.list)
                }
            );
    }
}

let ShopList = {
    controller: ShopsListCtrl,
    templateUrl: 'components/shops-helpers/shops-list.html'

}

export default ShopList;