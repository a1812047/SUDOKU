# SUDOKU

play the game at : https://a1812047.github.io/SUDOKU/


The game above generates a new, random and unique board almost instantly. The process is explained below. There are  6,670,903,752,021,072,936,960 possible solvable sudoku. Do you think we will ever see the same sudoku again? (https://)

It is well known that we can solve the game of SUDOKU that comes on every Daily newspapers via backtracking algorithm and using some consistent hueristics that can fasten the process.Backtracking is a much slower process for us humans , but much faster for CPUs.

Backtracking in this process, explores all the different combinations possible until all the game is solved via trial and error. The program discovers choices/numbers that can be potential solutions to a box in the grid. Puts a random one and does that for all the boxes. if no more boxes are to be solved. A solution is reached else, the program travels back to the previous states(stored in the call stack/ or by deleting the currently tried value as it did not work) to try a different number. 

However, even if we can create a solution, we cannot go back to the original SUDOKU, given only the solution. There are plenty and many are not unique(i.e. has many solutions). 

A naive way to approach it would be to remove many of the numbers until the difficulty is reached, but on a counter-argument, if we happened to remove all the 8's and 9's, we have just removed 18 values to create a puzzle that has 2 solutions. Switching 8 for 9 everywhere is also a solution. 

Therefore, to create a SUDOKU puzzle takes much more time and resources, as we have to check for unique solutions. One way to do this, is:
1. remove a random number from the solved_sudoku's board and try to solve the sudoku using backtracking. Once the end is reached, instead of assuming we have solved the sudoku, we might have to check:
    if there are other numbers that can also solve the problem. 
2. once the board is filled increase the counter count by 1;
3. backtrack to the previous state, but now using a different number and therefore a different combination of numbers. This will tell us if the game has more than one solutions. 
4. To optimise: Once the counter is more than 2, stop and try to pick a different number/spot on the board-> going back to step 1. 
5. Once the count of numbers removed matches the difficulty, a new puzzle is created, that will be unique, but not necessarily the same as was on the newspaper. 


Note: So that we can create a random sudoku each time, we must shuffle the numbers we have in our list of choices duiring backtracking. 

Please play at the above link and try to come up with a solution? Average time to solve the puzzle is 20 minutes. 

[https://pi.math.cornell.edu/~mec/Summer2009/Mahmood/Count.html#:~:text=They%20discovered%20that%20the%20number,approximately%206.671×1021.](https://)