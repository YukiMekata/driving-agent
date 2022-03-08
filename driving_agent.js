var elem = document.documentElement;

function openFullscreen(){
  if(elem.requestFullscreen){
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen){
    elem.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
  elem.mozRequestFullScreen();
  }
}

    var row = 0;
    var vol = document.getElementById("vol");
    var finished_num = document.getElementById("finished_num");
    var cm_order = document.getElementById("cm_order");
    var data = document.getElementById("data");
    var init = document.getElementById("initialize");
    var id_input = document.getElementById("id_input");
    var eval=document.getElementById("eval");
    var test = document.getElementById("test");
    var ss_id = document.getElementById("ss_id");
    var mov = document.getElementById("mov");

  function signup(){
      var spreadsheetId = '1hMVakKu0CUcER6yjud8ZabY4HMa0tGylLRUE87CfnEM';
      gapi.auth2.getAuthInstance().signIn();
      id_input.style.display = 'inline-block';
      init.style.display = 'none';
  }

  function check_in(){
    if (document.getElementById('gender').value == ""){
      alert("性別を選択してください");
    } else if (age_in.value == ""){ 
      alert("年齢を入力してください");
    } else if (document.getElementById('driver').value == ""){ 
      alert("運転頻度を選択してください");
    } else {
      start();
      id_input.style.display = 'none';
    }
  }

  function reloadPage(){
    location.reload(true);
  }

  function get_link() {
    var spreadsheetId = '1hMVakKu0CUcER6yjud8ZabY4HMa0tGylLRUE87CfnEM';
      gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId ,
          range: 'dr_mov'
      }).then((response) => {
          var no_array = []
          var link_array = []
          var result = response.result;
          var numRows = result.values ? result.values.length : 0;
          console.log(`${numRows} rows retrieved.`);
          for (x=1; x<numRows; x++) {
            no_array.push(JSON.stringify(result.values[x][0]));
            link_array.push(JSON.stringify(result.values[x][2]));
          }
          cm_order.innerHTML=link_array;
          data.innerHTML=no_array;
        });
  }

  var vid = document.getElementById("vid");
  vid.addEventListener('contextmenu', e => {
  e.preventDefault();
  });

  var next = document.getElementById("next");
  var save = document.getElementById("save");
  var i = 0;
  var width = 0;
  var prog = document.getElementById("prog");
  var progressbar = document.getElementById("progress-bar");
  var bottom = document.getElementById("bottom");

  function start() {
    get_link();
    finished_num.innerHTML = i;
    alert("実験が始まります");
    //openFullscreen()
    setTimeout(function(){
      var all_link = JSON.parse("["+cm_order.innerHTML+"]");
      var embed = "https://drive.google.com/uc?export=download&id=1SVxVAl7i8IJiO42yE_BH_jFw4dVkIhXt";
      mov.style.display="block";
      eval.style.display='block';
      //vid.style.display='block';
      next.style.display = "block";
      vid.src = embed;
      vid.onended = function() {
        progplus();
        bottom.style.display="block";
        eval.style.display='block';
        vid.width = '1600';
        vid.height = '900';
        vid.controls = true;
        vid.style.cursor="pointer";
        vid.play();
        next.style.display = "block";
        save.style.display = "block";
        }},5000)
    }

  function check(){
      var answer = document.getElementsById("answer");
      var discomfort = document.getElementsById("q1");
      if (answer.value==''){
        alert("発話に対する返答を入力してください。");
      } else if (discomfort.value==''){
        alert("違和感の有無を回答してください。");
      } else {
        nextVideo();
      }
  }

  function check2(){
        var output = document.getElementsByTagName("output");
        var y=0;
        for (x = 0; x<output.length; x++){
          if (output[x].value=='未回答'){
            y++;
          }}
        if (y==0){
          i++;
          save_file();
          close_file();
        }  else {
            alert(y+'個の答えていない項目があります');
          }
      }

      function progplus(){
          width+=1*5/4;
          prog.innerHTML= i+1+" / 80";
          progressbar.style.width=width+"%"
      }

  function nextVideo() {
      finished_num.innerHTML = i;
      eval.reset()
      eval.style.display='none';
      next.style.display="none";
      save.style.display="none";
      bottom.style.display="none";
      vid.pause()
      vid.style.display='none';
      setTimeout(function(){
        openFullscreen()
        var all_link = JSON.parse("["+cm_order.innerHTML+"]");
        var embed = "https://drive.google.com/uc?export=download&id="+all_link[i];
        vid.style.display='block';
        vid.src = embed;
        vid.width='1400';
        vid.height='800';
        vid.controls = false;
        vid.style.cursor="none";
        vid.play()
      },5000)
      vid.onended = function() {
        progplus();
        bottom.style.display="block";
        eval.style.display='block';
        vid.width='700';
        vid.height='400';
        vid.controls = true;
        vid.style.cursor="pointer";
        vid.play();
        var finished_num = i;
        var left_num = 80 - finished_num;
        var next=document.getElementById("next");
        if (left_num>0){
          next.style.display="block";
        }
        var save=document.getElementById("save");
        save.style.display="block";
        openFullscreen()
      }
    }
    
    var CLIENT_ID = '953234749-82036rtotjhqtj1skvchrjrqo3juof7n.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyAAxx5m050VfzQZ77vUPIAmwbU2OturxoE';
    var spreadsheetId = '1hMVakKu0CUcER6yjud8ZabY4HMa0tGylLRUE87CfnEM';

    var authorizeButton = document.getElementById('authorize_button');

    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            authorizeButton.style.display = 'none';
        } else {
            authorizeButton.style.display = 'inline-block';
        }
    }

    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

    function handleClientLoad() {
          gapi.load('client:auth2', initClient);
      }

      function initClient() {
          gapi.client.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES
          }).then(function () {
              // Listen for sign-in state changes.
              gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

              // Handle the initial sign-in state.
              updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          }, function (error) {
              console.log(error);
          });
      }

    function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }
