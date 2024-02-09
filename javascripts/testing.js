let oldarray = [[1,2,3],[4,5,6]];
let newArray = JSON.parse(JSON.stringify(oldarray));
oldarray[0][0] = 9;

console.log(newArray);