var vendido=["rosmery","erika","flor"];
var nombre=document.getElementById("reserva");
var firstSeatLabel = 1;
$(_=> {
  console.log(localStorage.getItem("usuarios"));
    var name= $('#nombre');
    var $cart = $('#selected-seats'),
        $counter = $('#counter'),
        $total = $('#total'),
        sc = $('#seat-map').seatCharts({
            map: [
                'ff_ff',
                'ff_ff',
                'ee_ee',
                'ee_ee',
                'ee___',
                'ee_ee',
                'ee_ee',
                'ee_ee',
                'eeeee',
            ],
            seats: {
                f: {
                    price   : 100,
                    classes : 'first-class',
                    category: 'First Class'
                },
                e: {
                    price   : 40,
                    classes : 'economy-class',
                    category: 'Economy Class'
                }
            },
            naming : {
                top : false,
                getLabel : function (character, row, column) {
                    return firstSeatLabel++;
                },
            },
            legend : {
                node : $('#legend'),
                items : [
                    [ 'f', 'available',   'First Class' ],
                    [ 'e', 'available',   'Economy Class'],
                    [ 'f', 'unavailable', 'Already Booked']
                ]
            },
            click: function () {
              //console.log(this.settings);
              //console.log(this.settings.data.classes);
              $("#myModal").css("display","block");
              $("#enviar").on("click",function(){
                  vendido.forEach(function(elemento){
                    console.log("ente al for");
                      console.log(vendido);
                    if(elemento==nombre.value){
                      console.log("encontrado");
                      //vendido.push(name);
                      //localStorage.setItem("usuarios", vendido);
                    }
                  });
                });
                $(this).attr("nombre", nombre.value);
                console.log($(this).attr("nombre"));
                if (this.status() == 'available') {
                    $('<li>' + this.data().category + ' Seat # ' + this.settings.label + ': <b>$' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);
                        $counter.text(sc.find('selected').length + 1);
                        $total.text(recalculateTotal(sc) + this.data().price);
                        return 'selected';
                } else if (this.status() == 'selected') {
                    $counter.text(sc.find('selected').length-1);
                    $total.text(recalculateTotal(sc)-this.data().price);
                    $('#cart-item-'+this.settings.id).remove();
                    return 'available';
                } else if (this.status() == 'unavailable') {
                    return 'unavailable';
                } else {
                    return this.style();
                }
              }
        });

    $(".close").on("click",function() {
            $("#myModal").css("display","none");
        });
    $('#selected-seats').on('click', '.cancel-cart-item', function () {
        sc.get($(this).parents('li:first').data('seatId')).click();
    });
    sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');
});

function recalculateTotal(sc) {
    var total = 0;
    sc.find('selected').each(function () {
        total += this.data().price;
    });
    return total;
}

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
