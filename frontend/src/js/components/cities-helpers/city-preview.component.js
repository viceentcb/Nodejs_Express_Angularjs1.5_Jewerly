
class CitiesListCtrl {
    constructor() {
        "ngInject";


    }

    detail() {
        //Cuando hagamos click en alguna ciudad abrira un modal con la informacion de la ciudad
        // Asi todo lo controla el preview sin falta de un controllador y no necesitamos hacer otro endpoint
        //ya que la informacion de la ciudad ya la tenemos

        var myModal = document.getElementById("myModal");

        let shops_names = (this.city.shop).filter(shop => shop.name)
        let shops = '';

        for (let i = 0; i < shops_names.length; i++) {
            shops += ` <li class="tag-default tag-pill tag-outline">${shops_names[i].name}</li>`
        }

        myModal.innerHTML = `
         <div class="modal-content">
            <span class="close">&times;</span>
            <h1>${ this.city.name}</h1>
            <p>${ this.city.count} ${this.city.hwmny}</p>
            <ul class="tag-list">
            ${shops}
        </ul>
            </div>`;

        myModal.style.display = "block";

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            myModal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == myModal) {
                myModal.style.display = "none";
            }
        }
    }

}
let CityPreview = {
    controller: CitiesListCtrl,

    bindings: {
        city: '='
    },
    templateUrl: 'components/cities-helpers/city-preview.html'
};



export default CityPreview;