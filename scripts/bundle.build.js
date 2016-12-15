/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var FS = __webpack_require__(1);
	console.log(FS);

	window.fs = new FS();
	console.log(fs)



/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FS = function () {
	  function FS() {
	    _classCallCheck(this, FS);

	    var that = this;
	    window.webkitRequestFileSystem(TEMPORARY, 1024 * 1024, function (filesystem) {
	      that._instance = filesystem;
	      that.subDirs = [];
	      that._setRoot();
	    });
	  }

	  _createClass(FS, [{
	    key: "ls",
	    value: function ls() {
	      for (var i = 0, file; file = this.subDirs[i]; i++) {
	        console.log(file.name);
	      }
	    }
	  }, {
	    key: "cd",
	    value: function cd(dirName) {
	      for (var i = 0, file; file = this.subDirs[i]; i++) {
	        if (file.name === dirName) {
	          if (!file.isDirectory) {
	            console.log("not a dir");
	            return false;
	          } else {
	            this.currentDir = file;
	            this._refresh();
	            return true;
	          }
	        }
	      }
	      console.log("cannot find");
	      return false;
	    }
	  }, {
	    key: "mkdir",
	    value: function mkdir(dirName, callback, logerr) {
	      var that = this;
	      this.currentDir.getDirectory(dirName, { create: true, exclusive: true }, function () {
	        that._refresh();
	      }, logerr);
	    }
	  }, {
	    key: "_refresh",
	    value: function _refresh() {
	      var reader = this.currentDir.createReader();
	      var that = this;
	      reader.readEntries(function (results) {
	        that.subDirs = results;
	      });
	    }
	  }, {
	    key: "_setRoot",
	    value: function _setRoot() {
	      var rootReader = this._instance.root.createReader();
	      this.currentDir = this._instance.root;
	      var that = this;
	      rootReader.readEntries(function (results) {
	        that.subDirs = results;
	      });
	    }
	  }]);

	  return FS;
	}();

	function initFs() {
	  window.webkitRequestFileSystem(TEMPORARY, 1024 * 1024, function (filesystem) {
	    fs = filesystem;
	    console.log("success");
	    fs.root.getFile("read2", { create: true }, function (entry) {
	      console.log(entry);
	      entry.file(function (file) {
	        var reader = new FileReader();
	        reader.readAsText(file);
	        reader.onload = function () {
	          console.log(reader.result);
	        };
	      });

	      entry.createWriter(function (writer) {
	        writer.seek(writer.length);
	        var blob = new Blob(['你是猪'], { type: "text/plain" });
	        writer.write(blob);
	        writer.onerror = function (e) {
	          console.log(e);
	        };
	        writer.onwrite = function () {
	          console.log("写入成功");
	        };
	        console.log(writer);
	      });
	    });
	    fs.root.getDirectory("dir", { create: true }, function (dirEntry) {});
	    var dirReader = fs.root.createReader();
	    dirReader.readEntries(function (results) {
	      console.log(results);
	      if (results.length) {
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
	  }, function (e) {
	    console.log(e);
	  });
	}

	var fileInput = document.querySelector("#file");
	fileInput.onchange = function (e) {
	  var files = this.files;
	  initFs(files);
	};

	module.exports = FS;

/***/ }
/******/ ]);