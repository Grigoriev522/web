
let students = (function(){

    let studArr = [
    // {
    //     firstName: "Егор",
    //     secondName: "Григорьев",
    //     age: 19,
    //     avgMark: 7.4
    // },
    // {
    //     firstName: "Петя",
    //     secondName: "Петров",
    //     age: 17,
    //     avgMark: 7.9
    // },
    // {
    //     firstName: "Иван",
    //     secondName: "Иванов",
    //     age: 18,
    //     avgMark: 7.7
    // }
    ];
    let objElem = ["firstName","secondName","age","avgMark"];
    
    let beruZaScheky = function(){
        
        let x = new XMLHttpRequest()

        x.addEventListener('readystatechange', () => {
            if(x.readyState === 4 && x.status === 200){
                let data = JSON.parse(x.response)
                for(let key of data) {
                    studArr.push(key);
                    
                }
                console.log(studArr); 
                createTable();  
            }else if(x.readyState === 4){
                console.log('could not fetch the data')
            }
        })
        
        x.open('GET', 'students.json')
        
        x.send()
    }

    let _createButtons = function(){
        for(let i = 0; i < studArr.length; i++){
            let cont = document.createElement("div");
            let btnDel = document.createElement("input");
            btnDel.type = "button";
            btnDel.value = "удалить";
            btnDel.className = "table_buttons";
            btnDel.id = `${i}`
            btnDel.onclick = _deleteStudent;
            let btnChange = document.createElement("input");
            btnChange.type = "button";
            btnChange.value = "редактировать";
            btnChange.className = "table_buttons";
            btnChange.id = `${i}`;
            btnChange.onclick = _editStudent;


            cont.appendChild(btnDel);
            cont.appendChild(btnChange);
            div2.appendChild(cont);
        }
        
    }
    let _deleteStudent = function () {
        studArr.splice(+this.id,1);
        _setTable(studArr.length + 1);
    }
    let createTable = function(){
        let table = document.createElement("table");
        table.setAttribute("border",1);
        document.querySelector('#div1').appendChild(table);
        let tr = document.createElement("tr");
        let thArr = ["Имя","Фамилия","Возраст","Оценка"];
        for(let i = 0; i < 4; i++){
            let th = document.createElement("th");
            th.innerHTML = thArr[i];
            tr.appendChild(th);
        }
        table.appendChild(tr);
        _createButtons();

            
        for(let i = 0; i < studArr.length; i++){
            let tr = document.createElement("tr");
            
            for(let j = 0; j < 4; j++){
                let td = document.createElement("td");
                td.innerHTML = studArr[i][objElem[j]];
                tr.appendChild(td);
                ///////////////////////////
                
            }
            table.appendChild(tr);
        }
        /////////////////////////////////////////////////
    };
    let _setTable = function(len){
        let div2 = document.querySelector("#div2");
        let table = document.querySelector("table");
        table.remove();
        for(let i = 0; i < len; i++){
            div2.firstChild.remove();
        }
        createTable();
        
    };
    
    let calculateAvgMark = function(){
            let table = document.querySelector("table");
            let avg = 0
            let h1;
            for(let i = 1; i < studArr.length + 1; i++){
                avg += +table.childNodes[i].lastChild.innerHTML;
            }
            avg /= studArr.length;
            if (document.querySelectorAll("h1").length == 0){
                h1 = document.createElement("h1");
            }else{
                h1 = document.querySelector("h1");
            }
            h1.innerHTML = "Средний балл: " + avg.toFixed(2);
            document.body.appendChild(h1);
    }
    let addStudent = function(){
        let name = document.querySelector('#name_input');
        let surname = document.querySelector('#sername_input');
        let age = document.querySelector('#age_input');
        let avgMark = document.querySelector('#avg_mark_input');
        studArr.push({
            firstName: name.value,
            secondName: surname.value,
            age: age.value,
            avgMark: avgMark.value
        });
        name.value = "";
        surname.value = "";
        age.value = "";
        avgMark.value = "";
        _setTable(studArr.length - 1);

    }
    let _editStudent = function(){
        let name = document.querySelector('#name_input');
        let surname = document.querySelector('#sername_input');
        let age = document.querySelector('#age_input');
        let avgMark = document.querySelector('#avg_mark_input');
        studArr.splice(+this.id,1,{
            firstName: name.value,
            secondName: surname.value,
            age: age.value,
            avgMark: avgMark.value
        });
        name.value = "";
        surname.value = "";
        age.value = "";
        avgMark.value = "";
        _setTable(studArr.length);
    }
    return {
        calculateAvgMark: calculateAvgMark,
        addStudent: addStudent,
        beruZaScheky: beruZaScheky
    }
    
})();

let addButton = document.querySelector('#add_button');
let calcButton = document.createElement("input");
calcButton.setAttribute("value", "Рассчитать средний балл");
calcButton.setAttribute("type", "button");
calcButton.style.margin = "20px";
calcButton.onclick = students.calculateAvgMark;
document.body.appendChild(calcButton);
addButton.onclick = students.addStudent;

students.beruZaScheky();