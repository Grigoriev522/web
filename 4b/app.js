$(document).ready(function() {
    
let students = (function(){

    let studArr = [];
    let objElem = ["firstName","secondName","age","avgMark"];
    
    let getData = function(){
        
        const request = $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET',
            datatype: 'json'
        })

        request.done(response => {
            let obj = {};
                $.each(response, function(index, key) {
                    if (key.name.split(' ').length == 2) {
                        obj.firstName = key.name.split(' ')[0];
                        obj.secondName = key.name.split(' ')[1];
                        obj.age = Math.round(((Math.random() + 1) * 10));
                        obj.avgMark = Math.round((Math.random() * 10) * 10) / 10;
                        studArr.push(obj);
                    }
                    obj = {};
                })
            createTable()
        })

        request.fail(err => console.log(err))
    }

    let _createButtons = function(){
            $.each(studArr, function(i) {
                
            let cont = $("<div></div>");
            let btnDel = $("<input />");
            btnDel.attr("type", "button");
            btnDel.attr("value", "удалить");
            btnDel.attr("class", "table_buttons");
            btnDel.attr("id", `${i}`);
            btnDel.click(_deleteStudent);
            let btnChange = $("<input />");
            btnChange.attr("type", "button");
            btnChange.attr("value", "редактировать");
            btnChange.attr("class", "table_buttons");
            btnChange.attr("id", `${i}`);
            btnChange.click(_editStudent);

            cont.append(btnDel);
            cont.append(btnChange);
            $('#div2').append(cont[0]);
            })
    }

    let _deleteStudent = function () {
        studArr.splice(+this.id,1);
        _setTable(studArr.length + 1);
    }

    let createTable = function(){
        let table = $("<table></table>");
        table.attr("border",1);
        $('#div1').append(table);
        let tr = $("<tr></tr>");
        let thArr = ["Имя","Фамилия","Возраст","Оценка"];
        $.each(thArr, function(i) {
            let th = $("<th></th>");
            th.text(thArr[i]);
            tr.append(th);
        })
        $('table').append(tr);
        _createButtons();

            
        $.each(studArr, function(i) {
                
            let tr = $("<tr></tr>");
            
            for(let j = 0; j < 4; j++){
                let td = $("<td></td>");
                td.text(studArr[i][objElem[j]]);
                tr.append(td);
                
            }
            $('table').append(tr);
        })
    };

    let _setTable = function(len){
        $("table").remove();
        for(let i = 0; i < len; i++){
            $($("#div2").children()[0]).remove();
        }
        createTable();
        
    };
    
    let calculateAvgMark = function(){
            let avg = 0
            let h1;
            $.each(studArr, function(i) {
                avg += +studArr[i].avgMark;
            })
            avg /= studArr.length;
            if ($("h1").length == 0){
                h1 = $("<h1></h1>");
            }else{
                h1 = $("h1");
            }
            h1.text(`Средний балл: ${avg.toFixed(2)}`);
            $('button[type="button"]').after(h1);
    }

    let addStudent = function(){
        let name = $('#name_input');
        let surname = $('#sername_input');
        let age = $('#age_input');
        let avgMark = $('#avg_mark_input');
        studArr.push({
            firstName: name.val(),
            secondName: surname.val(),
            age: age.val(),
            avgMark: avgMark.val()
        });
        name.val("");
        surname.val("");
        age.val("");
        avgMark.val("");
        _setTable(studArr.length - 1);

    }
    let _editStudent = function(){
        let name = $('#name_input');
        let surname = $('#sername_input');
        let age = $('#age_input');
        let avgMark = $('#avg_mark_input');
        studArr.splice(+this.id,1,{
            firstName: name.val(),
            secondName: surname.val(),
            age: age.val(),
            avgMark: avgMark.val()
        });
        name.val("");
        surname.val("");
        age.val("");
        avgMark.val("");
        _setTable(studArr.length);
    }
    return {
        calculateAvgMark: calculateAvgMark,
        addStudent: addStudent,
        getData: getData
    }
    
})();

let calcButton = $("<button></button>");
calcButton.attr("type", "button");
calcButton.text("Рассчитать средний балл");
calcButton.css("margin", "20px");
$('form').after(calcButton);
$('button[type="button"]').click(students.calculateAvgMark);
$('#add_button').click(students.addStudent);

students.getData();
})