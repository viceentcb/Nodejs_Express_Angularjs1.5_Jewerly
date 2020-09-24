
function JewelsConfig($stateProvider) {
    // console.log("caxa")
    "ngInject";
    $stateProvider


        .state("app.jewels", {
            url: "/jewels",
            controller: "JewelsCtrl",
            controllerAs: "$ctrl",
            templateUrl: "jewels/jewels.html",
            title: "Lista de Noticias",
            resolve: {
                jewels: function (Jewels) {
                    console.log('noticias confign')//newss the name that are in json of server
                    return Jewels.getJewels().then(jewels => jewels);
                }
            }
        })

        .state("app.detailsJewels", {
            url: "/jewels/:slug",
            controller: "Jewels_det_Ctrl",
            controllerAs: "$ctrl",
            templateUrl: "jewels/jewelsdetails.html",
            title: "Details Jewels",
            resolve: {
                jewel: function (Jewels, $stateParams) {
                    //este nombre es el que recibe el controlador
                    return Jewels.getJewel($stateParams.slug).then(jewel => jewel); //recibo 1 jewel
                }
            }
        })
};

export default JewelsConfig;
