export function getDaysArray() {
    for(var arr=[], count=0, dt = new Date(); count<5; count++) {
        arr.push(new Date(dt.setDate(dt.getDate() + 1)));
    }
    return arr;
}
