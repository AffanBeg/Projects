//playsize is a global variable for the size of the playlist table
var playsize = 0
function getSong() {

    let songTitle = document.getElementById('songTitleTextField').value.trim()
    console.log('songTitle: ' + songTitle)
    if(songTitle === '') {
        return alert('Please enter a Song Title')
    }

    let songsDiv = document.getElementById('songs_div')
    songsDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
            var table = document.getElementById("list")
            
            for(let i=0; i<=19; i++){
              //create image object to apply on table
              var art = new Image()
              art.src = response.results[i].artworkUrl30
              let Btn = document.createElement("button")
              //create row cells for the table
              var row = table.insertRow(0)
              var l1 = row.insertCell(0)
              var l2 = row.insertCell(1)
              var l3 = row.insertCell(2)
              var l4 = row.insertCell(3)
              //add info from the response array
              Btn.innerHTML = "+"
              l1.appendChild(Btn)
              l2.innerHTML = response.results[i].trackName
              l3.innerHTML = response.results[i].artistName
              l4.appendChild(art)
              //l4.innerHTML = response.results[i].artworkUrl130   
              Btn.addEventListener("click", function handleClick(event){
                addPlaylist(response, i)})           
            }

 			songsDiv.innerHTML = songsDiv.innerHTML + `
			<h1>Songs matching: ${songTitle} </h1>
			`
      }
    }
    xhr.open('GET', `/songs?title=${songTitle}`, true)
    xhr.send()
}

//Attach Enter-key Handler
const ENTER=13

function handleKeyUp(event) {
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}
function addPlaylist(response, i){
  var table = document.getElementById("Playlist")
    //create image object to apply on table
    var art = new Image()
    art.src = response.results[i].artworkUrl30
    let removebtn = document.createElement("button")
    let uparr = document.createElement("button")
    let downarr = document.createElement("button")
    //create row cells for the table
    var row = table.insertRow(0)
    var l1 = row.insertCell(0)
    var l2 = row.insertCell(1)
    var l3 = row.insertCell(2)
    var l4 = row.insertCell(3)
    //add info from the response array
    removebtn.innerHTML = "-"
    uparr.innerHTML = "↑"
    downarr.innerHTML = "↓"
    l1.appendChild(uparr)
    l1.appendChild(downarr)
    l1.appendChild(removebtn)
    l2.innerHTML = response.results[i].trackName
    l3.innerHTML = response.results[i].artistName
    l4.appendChild(art)
    //linking each button to a function
    removebtn.addEventListener("click", function handleClick(event){
      removePlaylist()}) 
    uparr.addEventListener("click", function handleClick(event){
      up()})
    downarr.addEventListener("click", function handleClick(event){
      down()}) 
  }

function removePlaylist(){
  //SelectedTable grabs what table it is in according to where the cursor was clicked
  var SelectedTable = event.target.parentNode
  //SelectedRow grab what row is it in according to SelectedTable
  var SelectedRow = SelectedTable.parentNode
  SelectedRow.parentNode.removeChild(SelectedRow)
  playsize -= 1

}

function up(){
  //rows grabs what table it is in according to where the cursor was clicked
  var rows = event.target.parentNode
  //prev grab what row is it in according to rows
  var prev = rows.parentNode
  //prevRow grabs the previous row
  prevRow = prev.previousElementSibling
  prev.parentNode.insertBefore(prev,prevRow)
}

function down(){
  //rows grabs what table it is in according to where the cursor was clicked
  var rows = event.target.parentNode
  //prev grab what row is it in according to rows
  var prev = rows.parentNode
  //prevRow grabs the previous row
  prevRow = prev.nextElementSibling
  prev.parentNode.insertBefore(prevRow,prev)
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit_button').addEventListener('click', getSong)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyUp)
  
})
