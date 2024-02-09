const n = 9;
var count = 0;
export const SudokuSolver = {
    
    get_possibleNumbers(row, col, board){
       
        let numbers = new Array(10).fill(true);
        
        let grid_row_start = Math.floor(row/3)*3;
        let grid_col_start = Math.floor(col/3)*3;

        for(let i = grid_row_start; i < grid_row_start+3; i++){
            
            for(let j = grid_col_start; j < grid_col_start+3; j++){
                
                if( board[i][j] != 0) {numbers[board[i][j]] = false;}
            
            }

        }

        //check row //check col
        for(let i =  0; i < n; i++){
            
            //check row
            if(board[row][i] != 0) numbers[board[row][i]] = false;
            
            //check col
            if(board[i][col] != 0) numbers[board[i][col]] = false;
        }

        let answers = [];

        for(let i = 1; i <= n; i++){
            if(numbers[i]) answers.push(i);
        }
        answers = this.shuffleItems(answers);
        return answers;
    },

     shuffleItems(list){
        const n = list.length;
        for(let i = 0; i < n; i++){
            const index = Math.floor(Math.random()*n-i)+i;
            const temp = list[i];
            list[i] = list[index];
            list[index] = temp;
        }
        return list;
    },

    count: 0,
    numberOFwaysToSolveSudoku(curr_row, curr_col,board){
        //console.log(count);
        if(this.count > 1) { console.log(this.count);return ;}

        if(curr_col >= n && curr_row < n){
            curr_row += 1;
            curr_col = 0;
        }

        if(curr_row >= n){
            //console.log(board);
            this.count+= 1;
            return;
        }

        if(board[curr_row][curr_col] != 0){
            this.numberOFwaysToSolveSudoku(curr_row,curr_col+1,board);
        }else{
            let answers = this.get_possibleNumbers(curr_row, curr_col, board);
            for(const element of answers){
                board[curr_row][curr_col] = element;
                this.numberOFwaysToSolveSudoku(curr_row, curr_col+1, board);
                if(this.count > 1){
                    break;
                }
            }
            board[curr_row][curr_col] = 0;
        }
    },
    someFunction(curr_row, curr_col,board){
        this.count = 0;
        this.numberOFwaysToSolveSudoku(curr_row,curr_col, board);
        //console.log(count);
        if(this.count > 1){ return false;}
        return true;
    },
    solved:false,
    solve(curr_row, curr_col,board){
        if(this.solved) return ;

        if(curr_col >= n && curr_row < n){
            curr_row += 1;
            curr_col = 0;
        }

        if(curr_row >= n){
            this.solved = true;
            return;
        }

        if(board[curr_row][curr_col] != 0){
            this.solve(curr_row,curr_col+1,board);
        }else{
            const answers = this.get_possibleNumbers(curr_row, curr_col, board);
            for(const element of answers){
                board[curr_row][curr_col] = element;
                this.solve(curr_row, curr_col+1, board);
                if(this.solved){
                    break;
                }
            }
            if(!this.solved){board[curr_row][curr_col] = 0;}
        }
    },
    runSolver(board){
        this.solved = false;
        this.solve(0,0,board);
    },
    createSudoku(){
        let board = new Array(9);
        for(let i = 0; i < n; i++){
            board[i] = new Array(9).fill(0);
        }
        
        this.runSolver(board);
        return board;
    }
}

;