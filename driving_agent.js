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
    var mov_order = document.getElementById("mov_order");
    var conv_content = document.getElementById("conv_content");
    var converse = document.getElementById("converse");
    var data = document.getElementById("data");
    var init = document.getElementById("initialize");
    var id_input = document.getElementById("id_input");
    var eval=document.getElementById("eval");
    var test = document.getElementById("test");
    var ss_id = document.getElementById("ss_id");

  function signup(){
      var spreadsheetId = '1hMVakKu0CUcER6yjud8ZabY4HMa0tGylLRUE87CfnEM';
      gapi.auth2.getAuthInstance().signIn();
      id_input.style.display = 'inline-block';
      init.style.display = 'none';
  }

  var na = "";
  var gen = "";
  var age = "";
  var prof = "";

  function check_in(){
    if (name_in.value == ""){
      alert("名前を入力してください")
    } else if (document.getElementById('gender').value == ""){
      alert("性別を選択してください");
    } else if (age_in.value == ""){ 
      alert("年齢を入力してください");
    } else if (document.getElementById('driver').value == ""){ 
      alert("運転頻度を選択してください");
    } else {
      na = name_in.value;
      gen = document.getElementById('gender').value;
      age = age_in.value;
      prof = document.getElementById('driver').value;
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
          mov_order.innerHTML=link_array;
          data.innerHTML=no_array;
        });
      
      gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId ,
          range: 'agent'
      }).then((response) => {
          var conv_array = []
          var result = response.result;
          var numRows = result.values ? result.values.length : 0;
          console.log(`${numRows} rows retrieved.`);
          for (x=1; x<numRows; x++) {
            conv_array.push(JSON.stringify(result.values[x][1]));
          }
          conv_content.innerHTML=conv_array;
        });
  }

  var vid = document.getElementById("vid");
  vid.addEventListener('contextmenu', e => {
  e.preventDefault();
  });

  var next = document.getElementById("next");
  var save = document.getElementById("save");
  var i = Math.floor(Math.random() * 30);
  var j = Math.floor(Math.random() * 80);
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
      var all_link = JSON.parse("["+mov_order.innerHTML+"]");
      var conv = JSON.parse("["+conv_content.innerHTML+"]");
      var embed = "https://drive.google.com/uc?export=download&id="+all_link[i];
      vid.style.display='block';
      vid.src = embed;
      vid.onended = function() {
        //progplus();
        //bottom.style.display="block";
        eval.style.display='block';
        converse.innerHTML = na + "さん、" + conv[j];
        vid.width = '1280';
        vid.height = '960';
        vid.controls = false;
        vid.style.cursor="pointer";
        next.style.display = "block";
        //save.style.display = "block";
        }},5000)
    }


  var answer = document.getElementById("answer");
  let discomfort = document.getElementsByName('q1');
  var q1_ans = 0;

  function check(){
      if (answer.value==''){
        alert("発話に対する返答を入力してください。");
      } else if (!(discomfort[0].checked || discomfort[1].checked)){
        alert("違和感の有無を回答してください。")
      } else {
        if (discomfort[0].checked) {
          q1_ans = 1;
        } else {
          q1_ans = 0;
        }
        save_file();
        i = (i + Math.floor(Math.random() * 29)) % 30;
        j = (j + Math.floor(Math.random() * 79)) % 80;
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
      //save.style.display="none";
      //bottom.style.display="none";
      vid.pause()
      vid.style.display='none';
      setTimeout(function(){
        //openFullscreen()
        var all_link = JSON.parse("["+mov_order.innerHTML+"]");
        var embed = "https://drive.google.com/uc?export=download&id="+all_link[i];
        vid.style.display='block';
        vid.src = embed;
        vid.width='1280';
        vid.height='960';
        vid.controls = false;
        vid.style.cursor="none";
        vid.play()
      },5000)
      vid.onended = function() {
        var conv = JSON.parse("["+conv_content.innerHTML+"]");
        //progplus();
        //bottom.style.display="block";
        eval.style.display='block';
        converse.innerHTML = na + "さん、" + conv[j];
        vid.width='1280';
        vid.height='960';
        vid.controls = false;
        vid.style.cursor="pointer";
        var finished_num = i;
        var next=document.getElementById("next");
        next.style.display="block";
        //var save=document.getElementById("save");
        //save.style.display="block";
        //openFullscreen()
      }
    }
    
    function save_file() {
        var data_array=[
              [gen, age, prof, converse.innerHTML, answer.value, q1_ans]
        ];
        console.log(data_array);
        var body = {
              values: data_array
          };
      
        var spreadsheetId = '1hMVakKu0CUcER6yjud8ZabY4HMa0tGylLRUE87CfnEM';
        var sheet_name = 'data';
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: sheet_name,
            valueInputOption: 'RAW',
            resource: body
        }).then((response) => {
            var result = response.result;
            console.log(`${result.updates.updatedCells} cells appended.`);
       });
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
