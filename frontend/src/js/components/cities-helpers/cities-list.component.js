class CitiesListCtrl {
    constructor($scope, Cities) {
        "ngInject";
        console.log('---- City LIST ----');
        this._Cities = Cities;

        
        this.runQuery()

    }

    runQuery() {
        
        // Run the query
        this._Cities
            .query()
            .then(
                (res) => {
                    console.log('console res in run query', res)                    
                    this.list = res.cities;
                    console.log('console res in run query opinions -->', this.list)

                    for( let i=0; i<this.list.length ;i++){
                        this.list[i].count=this.list[i].shop.length;

                        this.list[i].hwmny= this.list[i].count==1?"Establecimiento":"Establecimientos"
                    }
                    console.log(this.list)
                }
            );
    }


}

let CityList = {
    controller: CitiesListCtrl,
    templateUrl: 'components/cities-helpers/cities-list.html'

}

export default CityList;