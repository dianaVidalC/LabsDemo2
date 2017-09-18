var firstSeatLabel = 1;
$(_=> {
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
                    classes : 'first-class', //your custom CSS class
                    category: 'First Class'
                },
                e: {
                    price   : 40,
                    classes : 'economy-class', //your custom CSS class
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
                if (this.status() == 'available') {
                    if($('#name').val()!="") {
                        $('<li>' + this.data().category + ' Seat # ' + this.settings.label + ': <b>$' + this.data().price + '</b> <a href="#" class="cancel-cart-item">[cancel]</a></li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);
                        $counter.text(sc.find('selected').length + 1);
                        $total.text(recalculateTotal(sc) + this.data().price);
                        return 'selected';
                    }
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
    $('#selected-seats').on('click', '.cancel-cart-item', function () {
        sc.get($(this).parents('li:first').data('seatId')).click();
    });
    //let's pretend some seats have already been booked
    sc.get(['1_2', '4_1', '7_1', '7_2']).status('unavailable');

    var allNames=[];
    $('.checkout-button').on('click',(e)=>{
        e.preventDefault();
            allNames.push($("#nombre").val());
            $(".status").removeClass("hide");
            $('<p>La reservación fue exitosa!</p>').appendTo($(".status"));
    })
});

function recalculateTotal(sc) {
    var total = 0;
    //basically find every selected seat and sum its price
    sc.find('selected').each(function () {
        total += this.data().price;
    });
    return total;
}

