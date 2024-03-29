


import { puzzle } from "./GeneratePuzzle.mjs";

var Myapp = new Vue({
    el: "#app",
    data: {
        
        started:false,
        end:false,
        numberMap:[],
        message:'hello',
        num1:{"1":{isSelected:false},"4":{isSelected:false},"7":{isSelected:false}},
        num2:{"2":{isSelected:false},"5":{isSelected:false},"8":{isSelected:false}},
        num3:{"3":{isSelected:false},"6":{isSelected:false},"9":{isSelected:false}},
        sudokuCell : {value:".", fontWeight:200,borderTopWidth:'0.1rem',borderBottomWidth:'0.1rem',borderLeftWidth:'0.1rem',borderRightWidth:'0.1rem'},
        sudoku:[],
        solved_sudoku: [],
        numbers:[
            {1:false},{2:false},{3:false},{4:false},{5:false},{6:false},{7:false},{8:false},{9:false}
        ],
        solved:false,
        rowIndex:"",
        previousSelection: "None",
        selected:"None",
        pencil_mode:false,
        remaining_hints:3,
        remaining_attempts:3,
        eraser:false,
        count: 0,
        
    },
    methods:{
        clear: function(number){
            let numbers = Object.keys(number);
            numbers.forEach(element => {
                number[element].isSelected = false;
            });
        },
        clearAll:function(){
           this.clear(this.num1);
           this.clear(this.num2);
           this.clear(this.num3);
           this.selected = "None";
        },
        select:function(num){
            Myapp.selected = num;
            if(this.eraser){
               this.changeMode();
            }
        },
        changeItem:function(index){
            //alert(index);
            let row = this.rowIndex;
            let col = index;
            if(!this.pencil_mode && this.sudoku[row][col].hasOwnProperty("pencilVal")){
                this.eraser = true;
                var temp = this.selected;
                this.Erase(index);
                delete this.sudoku[row][col].pencilVal;
                this.selected = temp;
                
            }
            if(!this.pencil_mode){
                if(this.sudoku[this.rowIndex][index].value != "."){
                    alert("Warning: cannot change this item !! ");
                }else if(row != -1 && this.selected != "None"){
    
                    this.sudoku[row][index].value = this.selected;
                    
                    
                    //this.sudoku[row][col].fontSize = "xx-large";
                    
                    if(this.selected != this.solved_sudoku[row][index]){
                        document.getElementById("MistakeInfo").style.fontSize = "xx-large";
                    
                        setTimeout(function(){
                            document.getElementById("MistakeInfo").style.fontSize = "large";
                            Myapp.sudoku[row][col].value = ".";
                        },2000);
                        this.remaining_attempts -= 1;
                    }else{
                        // this.sudoku[row][col].fontWeight = "900";
                        // this.sudoku[row][col].fontSize = "xxx-large";
                        this.count--;
                        this.remaining_hints = Math.min(this.remaining_hints, this.count);
                        if(this.count == 0){
                            this.solved = true;
                        }
                    }
                    if(this.remaining_attempts == -1){
                        this.end = true;
                    }
                    this.previousSelection = this.selected;
                }
            }else{
               
                 if(this.sudoku[row][col].fontWeight <= 200){
                    if(!this.sudoku[row][col].hasOwnProperty("pencilVal")){
                        this.sudoku[row][col].pencilVal = new Set();
                    }
                    
                    var grid = document.getElementById("sudokuGrid").children;
                    if(this.sudoku[row][col].value == "."){
                        grid[row].children[col].style.textAlign = "center";
                        grid[row].children[col].style.display = "flex";
                        grid[row].children[col].style.flexDirection = "row";
                        grid[row].children[col].style.flexWrap = "wrap";

                    }
                    if(!this.sudoku[row][col].pencilVal.has(this.selected) && this.selected != "None")
                    {
                        this.sudoku[row][col].pencilVal.add(this.selected);
                        let element = document.createElement("div");
                        element.setAttribute("style", "font-size:small; color:white; padding: 0.15rem; float:left");
                        let colors = ["white", "rgb(164, 168, 196)","rgb(39, 165, 136)","rgb(68, 110, 237)","rgb(147, 68, 237)",
                        "rgb(68, 175, 237)","rgb(105, 237, 68)","rgb(223, 237, 68)",
                       "rgb(221, 51, 130)" ];
                       element.style.color = colors[this.selected-1];
                        
                        
                        element.innerText = this.selected;
                        grid[row].children[col].appendChild(element);
                    }
                
                 }else{
                    alert("Warning: cannot change this item !! ");
                 }
            }
                 
        },
        changeMode(){
            this.eraser = !this.eraser;
            if(this.eraser){
                this.clearAll();
                document.getElementById("rub").style.color = "aquamarine";
            }else{
                document.getElementById("rub").style.color = "white";
            }
        },
        Erase:function(index){
            if(this.eraser){
                
                this.clearAll();
                let row = this.rowIndex;
                let col = index;
                var grid = document.getElementById("sudokuGrid").children;
                if(this.sudoku[row][col].fontWeight <= 200 ){
                    grid[row].children[col].style.textAlign = "center";
                    grid[row].children[col].style.flexDirection = "column";
                    grid[row].children[col].style.flexWrap = "nowrap";
                    var children = grid[row].children[col].childNodes; 
                    while(children.length >1){
                        grid[row].children[col].removeChild(children[1]);
                    }
                    delete this.sudoku[row][col].pencilVal;
                }
            }
            
        },
        changerowIndex: function(index){
            // alert(index+"!!!");
            this.rowIndex = Number(index);

            
        },
        prepare: function(){
            const n  = 9;
            for(let row = 0; row < n; row++){
                let list = [];
                for(let col = 0; col<n; col++){
                    list.push(this.sudokuCell);
                }
                this.sudoku.push(JSON.parse(JSON.stringify(list)));
            }
            
            for(let row = 0; row < n; row++){
                for(let col = 0; col< n; col++){
                    if(row == 2 || row == 5){
                        this.sudoku[row][col].borderBottomWidth = '0.2rem'; 
                    }
                    if(row == 0){
                        this.sudoku[row][col].borderTopWidth = '0.4rem';
                    }else if(row == 8){
                        this.sudoku[row][col].borderBottomWidth = '0.4rem';
                    }

                    if(col == 0){
                        this.sudoku[row][col].borderLeftWidth = '0.4rem';
                    }else if(col == 8){
                        this.sudoku[row][col].borderRightWidth = '0.4rem';
                    }

                    if(col == 2 || col == 5){
                        this.sudoku[row][col].borderRightWidth = '0.2rem';
                    }
                }
            }
            
        },
        
        construct_game: function(level){
            
            this.prepare();
            
           //create a random solution, save it in the solved_sudoku
           //now try to create gaps. 
            puzzle.generate_puzzle(level);
            this.solved_sudoku = puzzle.solvedSudoku;
            let sudoku = puzzle.unsolvedSudoku;
            
            for(let i  = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                   
                    
                    if(sudoku[i][j] === 0){
                        this.count += 1;
                        continue;
                    }
                    this.sudoku[i][j].value = sudoku[i][j];
                }
            }
            
            
        },
        // 
        solve: function(){
            for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                    this.sudoku[i][j].value = this.solved_sudoku[i][j];
                }
            }
            this.count = 0;
            this.remaining_hints = 0;
        },
        hintSolve:function(){
            this.remaining_hints -= 1;
            let row = randomInt(0,8);
            let col = randomInt(0,8);
            while(this.sudoku[row][col].value != "."){
                row = randomInt(0,8);
                col = randomInt(0,8);
            }
            this.selected = this.solved_sudoku[row][col];
            this.rowIndex = row;
            this.pencil_mode = false;
            this.changeItem(col);
        }


    }
    
});
var randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


const setupGrid = function(){
    const grid = document.getElementById("sudokuGrid").children;
    for(i = 0; i<grid.length; i++){
        grid[i].children[0].style.borderLeftWidth = "thick";
        grid[i].children[2].style.borderRightWidth = "thick";
        grid[i].children[5].style.borderRightWidth = "thick";
        grid[i].children[8].style.borderRightWidth = "thick";

    }
    for(i = 0; i < 9; i++){
        grid[0].children[i].style.borderTopWidth = "thick";
        grid[3].children[i].style.borderTopWidth = "thick";
        grid[6].children[i].style.borderTopWidth = "thick";
        grid[8].children[i].style.borderBottomWidth = "thick";
    }
}



