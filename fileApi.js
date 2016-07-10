var fs;
function initFs() {
  window.webkitRequestFileSystem(
    TEMPORARY,
    1024*1024,
    function(filesystem) {
      fs = filesystem;
      console.log("success");
      fs.root.getFile("read2", {create: true}, function(entry) {
        console.log(entry)
        entry.file(function (file) {
          var reader = new FileReader();
          reader.readAsText(file);
          reader.onload = function() {
            console.log(reader.result);
          };
        });

        entry.createWriter(function(writer) {
          writer.seek(writer.length);
          var blob = new Blob(['你是猪'],{type:"text/plain"});
          writer.write(blob);
          writer.onerror = function(e) {
            console.log(e);
          };
          writer.onwrite = function() {
            console.log("写入成功");
          };
          console.log(writer);
        });
      });
      fs.root.getDirectory("dir", {create: true}, function (dirEntry) {
        
      });
      var dirReader = fs.root.createReader();
      dirReader.readEntries(function (results) {
        console.log(results);
        if(results.length) {
          var fragment = document.createDocumentFragment();
          results.forEach(function (entry, i) {
            console.log(entry.name);
          });
          //results[3].createReader().readEnt
        }
      });
      /*
       for(var i = 0, file; file = files[i]; i++) {
       (function(f){
       fs.root.getFile(file.name, {create:true, exclusive: true}, function(fileEntry) {
       fileEntry.createWriter(function(fileWriter) {
       fileWriter.write(f);
       console.log("en");
       }, function(e) {
       console.log(e);
       });
       }, function(e) {
       console.log(e);
       });
       })(file);
       }
       */
    },
    function(e) {
      console.log(e);
    }
  )
}

window.onload = function() {
  var fileInput = document.querySelector("#file");
  fileInput.onchange = function(e) {
    var files = this.files;
    initFs(files);
  }
};
initFs();
