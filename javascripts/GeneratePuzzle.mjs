import {SudokuSolver} from './SudokuSolverAlgo.mjs';


const maxLoopsAllowed = 300000;


export const puzzle = {
    solvedSudoku:[], 
    unsolvedSudoku:[],
    generate_puzzle(difficulty){
        let randomNumber = 0; 
        if(difficulty === 'easy'){
            randomNumber = Math.floor(Math.random()*5)+40;
        }else if(difficulty === 'medium'){
            randomNumber = Math.floor(Math.random()*5)+45;
        }else if(difficulty === 'hard'){
            randomNumber = Math.floor(Math.random()*5)+50;
        }

       this.solvedSudoku = SudokuSolver.createSudoku();
       
       this.unsolvedSudoku = JSON.parse(JSON.stringify(this.solvedSudoku));
       
       let loopsMade = 0;
       while(randomNumber > 0 && loopsMade < maxLoopsAllowed){
        let row_to_remove = Math.floor(Math.random()* 9);
        let col_to_remove = Math.floor(Math.random()* 9);

        if(this.unsolvedSudoku[row_to_remove][col_to_remove] != 0){
            let number_removed = this.unsolvedSudoku[row_to_remove][col_to_remove];
            this.unsolvedSudoku[row_to_remove][col_to_remove] = 0;
            //count = 0;
            ;
            if(SudokuSolver.someFunction(0,0,this.unsolvedSudoku) == false){
                //console.log("false");
                this.unsolvedSudoku[row_to_remove][col_to_remove] = number_removed;
            }else{
                randomNumber -= 1;
            }
        }
        loopsMade++;
       }
       //console.log("loopsMade: ", loopsMade);
    }, 
    solve(){
        SudokuSolver.runSolver(this.unsolvedSudoku);
        //console.log(this.unsolvedSudoku === this.solvedSudoku);
    }
    
}
/********************************************************* testing ***************************/
                                // puzzle.generate_puzzle('easy');
                                // const print = (Sudoku)=>{
                                //     for(let i  =0; i< 9; i++){
                                //         let x = "";
                                //         for(let j = 0; j < 9; j++){
                                //             x += Sudoku[i][j];
                                //             x += ' ';
                                //         }
                                //     console.log(x);
                                // }
                                // console.log('\n')
                                // }

                                // print(puzzle.solvedSudoku);
                                // print(puzzle.unsolvedSudoku);
                                // puzzle.solve();
                                // print(puzzle.unsolvedSudoku);