"use strict";

let box = null;

const n = 10;

let mass = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,0,0,0,0,-1,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,-1,0,0,0,-1],
    [-1,-1,-1,-1,-1,-1,0,0,0,-1],
    [-1,0,0,-2,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,0,0,-1],
    [-1,0,0,0,0,0,0,-1,0,-1],
    [-1,0,0,0,0,0,0,0,0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
];

let buffer = null;

function reinitMatrix() {
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            const value = mass[i][j];
            switch (value) {
                case -1:
                    mass[i][j] = 9999999;
                    break;
                case -2:
                    mass[i][j] = 1;
                    break;
            }
        }
    }
}

function printPerimetr(iii, jjj, x) {
    for(let i = iii - 1; i <= iii + 1; i++) {
        for(let j = jjj - 1; j <= jjj + 1; j++) {
            if(mass[i][j] === 0) {
                mass[i][j] = x;
            }
        }
    }
}

function findWay() {
    for(let value = 1; value <= n * n; value++) {
        for(let i = 0; i < n; i++) {
            for(let j = 0; j < n; j++) {
                const number = mass[i][j];
                if(number === value) {
                    printPerimetr(i,j, value + 1);
                }
            }
        }
    }
}

function printAboutMe() {
    console.log("Kolotovkin Maxim");
}

function getWay() {
    let iii = parseInt(document.getElementById("i_val").value);
    let jjj = parseInt(document.getElementById("j_val").value);
    countWay(iii, jjj);
}

function countWay(iii, jjj) {
    let markArray = [];

    markArray.push({
        i: iii,
        j: jjj
    });

    while (true) {
        if(mass[iii][jjj] === 1) {
            printMatrix([]);
            printMatrix(markArray);
            break;
        }

        let b_i = iii;
        let b_j = jjj;
        let flag = true;

        for(let i = iii - 1; (i <= iii + 1) && flag === true; i++) {
            for(let j = jjj - 1; (j <= jjj + 1) && flag === true; j++) {
                if(mass[i][j] < mass[iii][jjj]) {
                    flag = false;
                    b_i = i;
                    b_j = j;
                }
            }
        }

        iii = b_i;
        jjj = b_j;

        markArray.push({
            i: iii,
            j: jjj
        });
    }

    for(let i = 0; i < n; i++)
        for(let j = 0; j < n; j++)
            mass[i][j] = buffer[i][j];

    reinitMatrix();
    findWay();
}

function printMatrix(arr) {
    for(let k = 0; k < arr.length; k++) {
        const element = arr[k];
        mass[element.i][element.j] = -999;
    }

    let bigString = "<table>";
    for(let i = 0; i < n; i++) {
        bigString += "<tr>";
        for(let j = 0; j < 10; j++) {
            if(mass[i][j] === -999) {
                bigString += ("<td style = 'background: #94f75c'>" + mass[i][j] + "</td>");
            } else if(mass[i][j] === 1) {
                bigString += ("<td style = 'background: #94f75c'>" + mass[i][j] + "</td>");
            } else if(mass[i][j] !== 9999999) {
                bigString += ("<td>" + mass[i][j] + "</td>");
            } else {
                bigString += ("<td style = 'background: #cacaca'>" + mass[i][j] + "</td>");
            }
        }
        bigString += "</tr>";
    }
    bigString += "</table>";
    box.innerHTML = bigString;
}

window.onload = function() {
    box = document.getElementById("resultBox");
    copyMatrix();
    reinitMatrix();
    findWay();
    printAboutMe();
    printMatrix([]);
};

function copyMatrix() {
    buffer = [];
    for(let i = 0; i < n; i++) {
        buffer[i] = [];
    }

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            buffer[i][j] = mass[i][j];
        }
    }
}
