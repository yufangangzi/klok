window.addEventListener('load', vidPlay );
function vidPlay(){

    document.getElementById('recordSound').addEventListener('click',lu.start);
    document.getElementById('stopSound').addEventListener('click',lu.stop);
}



var lu={
    mediaRecorder:null,
    chunk:[],
    recoding:false,
    media:function(stream){
        lu.mediaRecorder=new MediaRecorder(stream);
        lu.mediaRecorder.ondataavailable = function (e) {
            if(this.recoding){
                return
            }
            lu.chunk.push(e.data);
        };
        lu.mediaRecorder.onstop = function (e) {
            var blob = new Blob(lu.chunk, { 'type' : 'audio/mp3; codecs=opus' }),
                url = window.URL.createObjectURL(blob);
            document.getElementById('audio2').src=url;
            document.getElementById('audio2').play();
            console.log(url)
        }
    },
    stop:function(){
        this.recoding=true;
        document.getElementById('audio').pause();
        lu.mediaRecorder.stop()
    },
    start:function(){
        document.getElementById('audio').play();
        lu.mediaRecorder.start()
    }
}

