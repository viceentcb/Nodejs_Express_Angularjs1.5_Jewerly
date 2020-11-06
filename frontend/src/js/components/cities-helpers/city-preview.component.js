
class CitiesListCtrl {
    constructor() {
        "ngInject";


    }

    detail() {

        console.log(this.city)

        var myModal = document.getElementById("myModal");

        myModal.innerHTML = `
      <div class="modal-content">
    <span class="close">&times;</span>

    <h1>${ this.city.name}</h1>
    <p>${ this.city.count} ${this.city.hwmny}</p>
` ;

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