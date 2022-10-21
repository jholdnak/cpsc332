window.onload = function() {
    alert("nice")
    
    let song1Value = sessionStorage.getItem(song1)
    let song2Value = sessionStorage.getItem(song2)
    let song3Value = sessionStorage.getItem(song3)


    const song1Display = document.createElement("p")
    song1Display.innerText = song1Value
    document.body.appendChild(song1Display)
    const song2Display = document.createElement("p")
    song2Display.innerText = song2Value
    document.body.appendChild(song2Display)
    const song3Display = document.createElement("p")
    song3Display.innerText = song3Value
    document.body.appendChild(song3Display)

    // const song1Display = document.createElement("p")
    // song1Display.innerText = "lol1"
    // document.body.appendChild(song1Display)
    // const song2Display = document.createElement("p")
    // song2Display.innerText = "lol2"
    // document.body.appendChild(song2Display)
    // const song3Display = document.createElement("p")
    // song3Display.innerText = "lol3"
    // document.body.appendChild(song3Display)
}