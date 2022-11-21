Snake.objects.Fruit = function(spec) {
    
    let row = spec.row;
    let col = spec.col;

    let api = {
        get row() {return row;},
        get col() {return col;}
    }

    return api;
}