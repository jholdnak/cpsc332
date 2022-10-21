// window.onload = function() {
//     let form = document.getElementById("yeForm")
//     const submitButton = document.getElementById("submit")
// }

function saveSong() { 
    let input1 = document.forms["yeForm"]["input1"].value;
    let input2 = document.forms["yeForm"]["input2"].value;
    let input3 = document.forms["yeForm"]["input3"].value;

    console.log(input1)
    
    sessionStorage.setItem("song1", input1);
    sessionStorage.setItem("song2", input2);
    sessionStorage.setItem("song3", input3);
}

function submitForm () {
    window.open("submission.html")
}