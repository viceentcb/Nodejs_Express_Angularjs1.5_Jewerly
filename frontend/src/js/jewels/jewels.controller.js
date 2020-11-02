class JewelsCtrl {
    constructor(jewels, $scope, $stateParams, User, Tags) {
        "ngInject";


        this._$scope = $scope;


        // console.log(jewels)

        Tags
            .getAll()
            .then(
                (tags) => {
                    this.tagsLoaded = true;
                    this.tags = tags
                }
            );
        // console.log("thistags",this.tags)

        // console.log($stateParams.filter)

        if (jewels) {

            if ($stateParams.filter) {
                // console.log(jewels)
                let all_filter = $stateParams.filter.split(',')
                console.log(all_filter)
                let filter = all_filter[0]
                let hwfilter = all_filter[1]

                console.log(jewels)
                jewels = jewels.filter(element => element[hwfilter] == filter)
                console.log(this.jewels)

            } else {
                this.jewels = jewels

            }

        }


        // var all = []
        // all = this.jewels
        // var j = [];
        // let price = 0



        // // UN BUCLE HASTA QUE SE ACABE EL ARRAY
        // do {
        //     // alert("para1")

        //     // BUSCAMOS CUAL ES EL PRECIO MAYOR DE LOS QUE TENEMOS EN LA ACTUAL ARRAY
        //     for (var i = 0; i < all.length; i++) {


        //         if ((all[i].price) > (price)) {
        //             price = all[i].price
        //         }
        //     }

        //     //UNA VEZ SEPAMOS CUAL ES EL PRECIO MAYOR BUSCAMOS TODAS LAS JOYAS CON IGUAL PRECIO
        //     //Y LO AÑADIMOS A UNA ARRAY Y LO ELIMINAMOS DE LA ARRAY PRINCIPAL
        //     for (var l = 0; l < all.length; l++) {

        //         // console.log("segundo for")

        //         if ((all[l].price) >= (price)) {


        //             j.push(all[l])


        //             all = all.filter(item => item !== all[l])


        //         }
        //     }

        //     //INICIALIZAMOS LAS VARIABLES PARA NO CREAR UN BUCLE INFINITO
        //     i = 0
        //     l = 0
        //     price = 0
        //         // alert("para2")


        // } while (all.length != 0);

        // //Y POR ULTUMO IGUALAMOS LOS DATOS QUE SE VERAN A LA ARRAY YA ORDENADA POR PRECIO MAYOR
        // this.jewels = j


        //-------------------------------------------------------IMPORTANTE---------------------------------------

        // LO BUENO DE ESTA FUNCION ES QUE LUEGO PODREMOS REUTILIZARLA Y HACERLA GENERAL ES DECIR:
        // CUANDO PONGAMOS FILTROS PODREMOS SUSTITUIR "PRICE" POR UNA VARIABLE LA CUAL SERA EL FILTRO QUE ELIJA EL USUARIO
        // POR LO TANTO ORDENARA POR DIFERENTES CAMPOS SEGUN QUIERA EL USUARIO

        this.listConfig = {
            type: User.current ? 'feed' : 'all'
        };
    }

    changeList(newList) {
        this._$scope.$broadcast('setListTo', newList);
    };
}

export default JewelsCtrl;