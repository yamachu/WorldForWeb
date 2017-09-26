var World =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WorldWeb__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WorldWeb", function() { return __WEBPACK_IMPORTED_MODULE_0__WorldWeb__["a"]; });


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wasm_world__ = __webpack_require__(3);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var WorldWeb = function () {
    function WorldWeb() {
        _classCallCheck(this, WorldWeb);
    }

    _createClass(WorldWeb, null, [{
        key: 'Initialize',
        value: function Initialize() {
            WorldWeb.isInitialized = false;

            return new Promise(function (resolve, reject) {
                fetch('./wasm/world.wasm') // gh-pages向け
                .then(function (response) {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.arrayBuffer();
                }).then(function (buffer) {
                    return new Uint8Array(buffer);
                }).then(function (binary) {
                    var moduleArgs = {
                        wasmBinary: binary,
                        onRuntimeInitialized: function onRuntimeInitialized() {
                            WorldWeb.assignFunctions();
                            WorldWeb.isInitialized = true;
                            resolve();
                        }
                    };
                    WorldWeb.module = Object(__WEBPACK_IMPORTED_MODULE_0__wasm_world__["a" /* default */])(moduleArgs);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }, {
        key: 'assignFunctions',
        value: function assignFunctions() {
            if (WorldWeb.isInitialized) return;

            WorldWeb.functions = {};
            // int GetF0Length(int x_length, int fs)
            WorldWeb.functions.GetF0Length = WorldWeb.module.cwrap('GetF0Length', 'number', ['number', 'number']);
            // int GetFFTSize(int fs)
            WorldWeb.functions.GetFFTSize = WorldWeb.module.cwrap('GetFFTSize', 'number', ['number']);
            // void GetSpeechFeatures(const double* x, int x_length, int fs, double* f0, int f0_length, double* sp, double *ap, int fft_size)
            WorldWeb.functions.GetSpeechFeatures = WorldWeb.module.cwrap('GetSpeechFeatures', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
            // int GetSynthesisFormLength(int f0_length, int fs)
            WorldWeb.functions.GetSynthesisFormLength = WorldWeb.module.cwrap('GetSynthesisFormLength', 'number', ['number', 'number']);
            // void GetSynthesisForm(int fs, const double* f0, int f0_length, const double* sp, const double* ap, int fft_size, double* y, int y_length)
            WorldWeb.functions.GetSynthesisForm = WorldWeb.module.cwrap('GetSynthesisForm', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
        }
    }, {
        key: 'checkModuleEnabled',
        value: function checkModuleEnabled() {
            return WorldWeb.isInitialized && WorldWeb.functions != undefined;
        }
    }, {
        key: 'GetF0Length',
        value: function GetF0Length(x_length, fs) {
            if (!WorldWeb.checkModuleEnabled()) return null;
            return WorldWeb.functions.GetF0Length(x_length, fs);
        }
    }, {
        key: 'GetFFTSize',
        value: function GetFFTSize(fs) {
            if (!WorldWeb.checkModuleEnabled()) return null;
            return WorldWeb.functions.GetFFTSize(fs);
        }
    }, {
        key: 'GetSpeechFeatures',
        value: function GetSpeechFeatures(x, fs, f0_length, fft_size) {
            if (!WorldWeb.checkModuleEnabled()) return null;
            if (f0_length === undefined) f0_length = WorldWeb.GetF0Length(x.length, fs);
            if (fft_size === undefined) fft_size = WorldWeb.GetFFTSize(fs);

            // X - input waveform
            var pointer_x = WorldWeb.module._malloc(x.length * 8); // 64bit => 8byte
            var offset_x = pointer_x / 8;
            WorldWeb.module.HEAPF64.set(x, offset_x);

            // F0
            var pointer_f0 = WorldWeb.module._malloc(f0_length * 8);
            var offset_f0 = pointer_f0 / 8;

            // Spectrogram
            var pointer_sp = WorldWeb.module._malloc(f0_length * (fft_size / 2 + 1) * 8);
            var offset_sp = pointer_sp / 8;

            // F0
            var pointer_ap = WorldWeb.module._malloc(f0_length * (fft_size / 2 + 1) * 8);
            var offset_ap = pointer_ap / 8;

            WorldWeb.functions.GetSpeechFeatures(pointer_x, x.length, fs, pointer_f0, f0_length, pointer_sp, pointer_ap, fft_size);

            // Heap to JS TypedArray
            var f0 = new Float64Array(WorldWeb.module.HEAPF64.buffer, pointer_f0, f0_length);
            var sp = new Float64Array(WorldWeb.module.HEAPF64.buffer, pointer_sp, f0_length * (fft_size / 2 + 1));
            var ap = new Float64Array(WorldWeb.module.HEAPF64.buffer, pointer_ap, f0_length * (fft_size / 2 + 1));

            // Free memory
            WorldWeb.module._free(pointer_x);
            WorldWeb.module._free(pointer_f0);
            WorldWeb.module._free(pointer_sp);
            WorldWeb.module._free(pointer_ap);

            return {
                fs: fs,
                f0_length: f0_length,
                fft_size: fft_size,
                f0: f0,
                sp: sp,
                ap: ap
            };
        }
    }, {
        key: 'GetSynthesisFormLength',
        value: function GetSynthesisFormLength(f0_length, fs) {
            if (!WorldWeb.checkModuleEnabled()) return null;
            return WorldWeb.functions.GetSynthesisFormLength(f0_length, fs);
        }
    }, {
        key: 'GetSynthesisForm',
        value: function GetSynthesisForm(world_parameters) {}
    }]);

    return WorldWeb;
}();

/* harmony default export */ __webpack_exports__["a"] = (WorldWeb);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, module) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Module = function Module(Module) {
  Module = Module || {};
  var Module = Module;

  // The Module object: Our interface to the outside world. We import
  // and export values on it, and do the work to get that through
  // closure compiler if necessary. There are various ways Module can be used:
  // 1. Not defined. We create it here
  // 2. A function parameter, function(Module) { ..generated code.. }
  // 3. pre-run appended it, var Module = {}; ..generated code..
  // 4. External script tag defines var Module.
  // We need to do an eval in order to handle the closure compiler
  // case, where this code here is minified but Module was defined
  // elsewhere (e.g. case 4 above). We also need to check if Module
  // already exists (e.g. case 3 above).
  // Note that if you want to run closure, and also to use Module
  // after the generated code, you will need to define   var Module = {};
  // before the code. Then that object will be used in the code, and you
  // can continue to use Module afterwards as well.
  var Module;
  if (!Module) Module = (typeof Module !== 'undefined' ? Module : null) || {};

  // Sometimes an existing Module object exists with properties
  // meant to overwrite the default module functionality. Here
  // we collect those properties and reapply _after_ we configure
  // the current environment's defaults to avoid having to be so
  // defensive during initialization.
  var moduleOverrides = {};
  for (var key in Module) {
    if (Module.hasOwnProperty(key)) {
      moduleOverrides[key] = Module[key];
    }
  }

  // The environment setup code below is customized to use Module.
  // *** Environment setup code ***
  var ENVIRONMENT_IS_WEB = false;
  var ENVIRONMENT_IS_WORKER = false;
  var ENVIRONMENT_IS_NODE = false;
  var ENVIRONMENT_IS_SHELL = false;

  // Three configurations we can be running in:
  // 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
  // 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
  // 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)

  if (Module['ENVIRONMENT']) {
    if (Module['ENVIRONMENT'] === 'WEB') {
      ENVIRONMENT_IS_WEB = true;
    } else if (Module['ENVIRONMENT'] === 'WORKER') {
      ENVIRONMENT_IS_WORKER = true;
    } else if (Module['ENVIRONMENT'] === 'NODE') {
      ENVIRONMENT_IS_NODE = true;
    } else if (Module['ENVIRONMENT'] === 'SHELL') {
      ENVIRONMENT_IS_SHELL = true;
    } else {
      throw new Error('The provided Module[\'ENVIRONMENT\'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.');
    }
  } else {
    ENVIRONMENT_IS_WEB = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object';
    ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
    ENVIRONMENT_IS_NODE = (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && "function" === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
    ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
  }

  if (ENVIRONMENT_IS_NODE) {
    // Expose functionality in the same simple way that the shells work
    // Note that we pollute the global namespace here, otherwise we break in node
    if (!Module['print']) Module['print'] = console.log;
    if (!Module['printErr']) Module['printErr'] = console.warn;

    var nodeFS;
    var nodePath;

    Module['read'] = function shell_read(filename, binary) {
      if (!nodeFS) nodeFS = __webpack_require__(5);
      if (!nodePath) nodePath = __webpack_require__(6);
      filename = nodePath['normalize'](filename);
      var ret = nodeFS['readFileSync'](filename);
      return binary ? ret : ret.toString();
    };

    Module['readBinary'] = function readBinary(filename) {
      var ret = Module['read'](filename, true);
      if (!ret.buffer) {
        ret = new Uint8Array(ret);
      }
      assert(ret.buffer);
      return ret;
    };

    Module['load'] = function load(f) {
      globalEval(read(f));
    };

    if (!Module['thisProgram']) {
      if (process['argv'].length > 1) {
        Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
      } else {
        Module['thisProgram'] = 'unknown-program';
      }
    }

    Module['arguments'] = process['argv'].slice(2);

    if (true) {
      module['exports'] = Module;
    }

    process['on']('uncaughtException', function (ex) {
      // suppress ExitStatus exceptions from showing an error
      if (!(ex instanceof ExitStatus)) {
        throw ex;
      }
    });

    Module['inspect'] = function () {
      return '[Emscripten Module object]';
    };
  } else if (ENVIRONMENT_IS_SHELL) {
    if (!Module['print']) Module['print'] = print;
    if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

    if (typeof read != 'undefined') {
      Module['read'] = read;
    } else {
      Module['read'] = function shell_read() {
        throw 'no read() available';
      };
    }

    Module['readBinary'] = function readBinary(f) {
      if (typeof readbuffer === 'function') {
        return new Uint8Array(readbuffer(f));
      }
      var data = read(f, 'binary');
      assert((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object');
      return data;
    };

    if (typeof scriptArgs != 'undefined') {
      Module['arguments'] = scriptArgs;
    } else if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }

    if (typeof quit === 'function') {
      Module['quit'] = function (status, toThrow) {
        quit(status);
      };
    }
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    Module['read'] = function shell_read(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
    };

    if (ENVIRONMENT_IS_WORKER) {
      Module['readBinary'] = function readBinary(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(xhr.response);
      };
    }

    Module['readAsync'] = function readAsync(url, onload, onerror) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function xhr_onload() {
        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
          // file URLs can return 0
          onload(xhr.response);
        } else {
          onerror();
        }
      };
      xhr.onerror = onerror;
      xhr.send(null);
    };

    if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }

    if (typeof console !== 'undefined') {
      if (!Module['print']) Module['print'] = function shell_print(x) {
        console.log(x);
      };
      if (!Module['printErr']) Module['printErr'] = function shell_printErr(x) {
        console.warn(x);
      };
    } else {
      // Probably a worker, and without console.log. We can do very little here...
      var TRY_USE_DUMP = false;
      if (!Module['print']) Module['print'] = TRY_USE_DUMP && typeof dump !== "undefined" ? function (x) {
        dump(x);
      } : function (x) {
        // self.postMessage(x); // enable this if you want stdout to be sent as messages
      };
    }

    if (ENVIRONMENT_IS_WORKER) {
      Module['load'] = importScripts;
    }

    if (typeof Module['setWindowTitle'] === 'undefined') {
      Module['setWindowTitle'] = function (title) {
        document.title = title;
      };
    }
  } else {
    // Unreachable because SHELL is dependant on the others
    throw 'Unknown runtime environment. Where are we?';
  }

  function globalEval(x) {
    eval.call(null, x);
  }
  if (!Module['load'] && Module['read']) {
    Module['load'] = function load(f) {
      globalEval(Module['read'](f));
    };
  }
  if (!Module['print']) {
    Module['print'] = function () {};
  }
  if (!Module['printErr']) {
    Module['printErr'] = Module['print'];
  }
  if (!Module['arguments']) {
    Module['arguments'] = [];
  }
  if (!Module['thisProgram']) {
    Module['thisProgram'] = './this.program';
  }
  if (!Module['quit']) {
    Module['quit'] = function (status, toThrow) {
      throw toThrow;
    };
  }

  // *** Environment setup code ***

  // Closure helpers
  Module.print = Module['print'];
  Module.printErr = Module['printErr'];

  // Callbacks
  Module['preRun'] = [];
  Module['postRun'] = [];

  // Merge back in the overrides
  for (var key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key];
    }
  }
  // Free the object hierarchy contained in the overrides, this lets the GC
  // reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
  moduleOverrides = undefined;

  // {{PREAMBLE_ADDITIONS}}

  // === Preamble library stuff ===

  // Documentation for the public APIs defined in this file must be updated in:
  //    site/source/docs/api_reference/preamble.js.rst
  // A prebuilt local version of the documentation is available at:
  //    site/build/text/docs/api_reference/preamble.js.txt
  // You can also build docs locally as HTML or other formats in site/
  // An online HTML version (which may be of a different version of Emscripten)
  //    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

  //========================================
  // Runtime code shared with compiler
  //========================================

  var Runtime = {
    setTempRet0: function setTempRet0(value) {
      tempRet0 = value;
      return value;
    },
    getTempRet0: function getTempRet0() {
      return tempRet0;
    },
    stackSave: function stackSave() {
      return STACKTOP;
    },
    stackRestore: function stackRestore(stackTop) {
      STACKTOP = stackTop;
    },
    getNativeTypeSize: function getNativeTypeSize(type) {
      switch (type) {
        case 'i1':case 'i8':
          return 1;
        case 'i16':
          return 2;
        case 'i32':
          return 4;
        case 'i64':
          return 8;
        case 'float':
          return 4;
        case 'double':
          return 8;
        default:
          {
            if (type[type.length - 1] === '*') {
              return Runtime.QUANTUM_SIZE; // A pointer
            } else if (type[0] === 'i') {
              var bits = parseInt(type.substr(1));
              assert(bits % 8 === 0);
              return bits / 8;
            } else {
              return 0;
            }
          }
      }
    },
    getNativeFieldSize: function getNativeFieldSize(type) {
      return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
    },
    STACK_ALIGN: 16,
    prepVararg: function prepVararg(ptr, type) {
      if (type === 'double' || type === 'i64') {
        // move so the load is aligned
        if (ptr & 7) {
          assert((ptr & 7) === 4);
          ptr += 4;
        }
      } else {
        assert((ptr & 3) === 0);
      }
      return ptr;
    },
    getAlignSize: function getAlignSize(type, size, vararg) {
      // we align i64s and doubles on 64-bit boundaries, unlike x86
      if (!vararg && (type == 'i64' || type == 'double')) return 8;
      if (!type) return Math.min(size, 8); // align structures internally to 64 bits
      return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
    },
    dynCall: function dynCall(sig, ptr, args) {
      if (args && args.length) {
        assert(args.length == sig.length - 1);
        assert('dynCall_' + sig in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
        return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
      } else {
        assert(sig.length == 1);
        assert('dynCall_' + sig in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
        return Module['dynCall_' + sig].call(null, ptr);
      }
    },
    functionPointers: [],
    addFunction: function addFunction(func) {
      for (var i = 0; i < Runtime.functionPointers.length; i++) {
        if (!Runtime.functionPointers[i]) {
          Runtime.functionPointers[i] = func;
          return 2 * (1 + i);
        }
      }
      throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
    },
    removeFunction: function removeFunction(index) {
      Runtime.functionPointers[(index - 2) / 2] = null;
    },
    warnOnce: function warnOnce(text) {
      if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
      if (!Runtime.warnOnce.shown[text]) {
        Runtime.warnOnce.shown[text] = 1;
        Module.printErr(text);
      }
    },
    funcWrappers: {},
    getFuncWrapper: function getFuncWrapper(func, sig) {
      assert(sig);
      if (!Runtime.funcWrappers[sig]) {
        Runtime.funcWrappers[sig] = {};
      }
      var sigCache = Runtime.funcWrappers[sig];
      if (!sigCache[func]) {
        // optimize away arguments usage in common cases
        if (sig.length === 1) {
          sigCache[func] = function dynCall_wrapper() {
            return Runtime.dynCall(sig, func);
          };
        } else if (sig.length === 2) {
          sigCache[func] = function dynCall_wrapper(arg) {
            return Runtime.dynCall(sig, func, [arg]);
          };
        } else {
          // general case
          sigCache[func] = function dynCall_wrapper() {
            return Runtime.dynCall(sig, func, Array.prototype.slice.call(arguments));
          };
        }
      }
      return sigCache[func];
    },
    getCompilerSetting: function getCompilerSetting(name) {
      throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
    },
    stackAlloc: function stackAlloc(size) {
      var ret = STACKTOP;STACKTOP = STACKTOP + size | 0;STACKTOP = STACKTOP + 15 & -16;assert((STACKTOP | 0) < (STACK_MAX | 0) | 0) | 0;return ret;
    },
    staticAlloc: function staticAlloc(size) {
      var ret = STATICTOP;STATICTOP = STATICTOP + (assert(!staticSealed), size) | 0;STATICTOP = STATICTOP + 15 & -16;return ret;
    },
    dynamicAlloc: function dynamicAlloc(size) {
      assert(DYNAMICTOP_PTR);var ret = HEAP32[DYNAMICTOP_PTR >> 2];var end = (ret + size + 15 | 0) & -16;HEAP32[DYNAMICTOP_PTR >> 2] = end;if (end >= TOTAL_MEMORY) {
        var success = enlargeMemory();if (!success) {
          HEAP32[DYNAMICTOP_PTR >> 2] = ret;return 0;
        }
      }return ret;
    },
    alignMemory: function alignMemory(size, quantum) {
      var ret = size = Math.ceil(size / (quantum ? quantum : 16)) * (quantum ? quantum : 16);return ret;
    },
    makeBigInt: function makeBigInt(low, high, unsigned) {
      var ret = unsigned ? +(low >>> 0) + +(high >>> 0) * 4294967296.0 : +(low >>> 0) + +(high | 0) * 4294967296.0;return ret;
    },
    GLOBAL_BASE: 1024,
    QUANTUM_SIZE: 4,
    __dummy__: 0
  };

  Module["Runtime"] = Runtime;

  //========================================
  // Runtime essentials
  //========================================

  var ABORT = 0; // whether we are quitting the application. no code should run after this. set in exit() and abort()
  var EXITSTATUS = 0;

  /** @type {function(*, string=)} */
  function assert(condition, text) {
    if (!condition) {
      abort('Assertion failed: ' + text);
    }
  }

  var globalScope = this;

  // Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
  function getCFunc(ident) {
    var func = Module['_' + ident]; // closure exported function
    if (!func) {
      try {
        func = eval('_' + ident);
      } catch (e) {}
    }
    assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
    return func;
  }

  var cwrap, ccall;
  (function () {
    var JSfuncs = {
      // Helpers for cwrap -- it can't refer to Runtime directly because it might
      // be renamed by closure, instead it calls JSfuncs['stackSave'].body to find
      // out what the minified function name is.
      'stackSave': function stackSave() {
        Runtime.stackSave();
      },
      'stackRestore': function stackRestore() {
        Runtime.stackRestore();
      },
      // type conversion from js to c
      'arrayToC': function arrayToC(arr) {
        var ret = Runtime.stackAlloc(arr.length);
        writeArrayToMemory(arr, ret);
        return ret;
      },
      'stringToC': function stringToC(str) {
        var ret = 0;
        if (str !== null && str !== undefined && str !== 0) {
          // null string
          // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
          var len = (str.length << 2) + 1;
          ret = Runtime.stackAlloc(len);
          stringToUTF8(str, ret, len);
        }
        return ret;
      }
    };
    // For fast lookup of conversion functions
    var toC = { 'string': JSfuncs['stringToC'], 'array': JSfuncs['arrayToC'] };

    // C calling interface.
    ccall = function ccallFunc(ident, returnType, argTypes, args, opts) {
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      assert(returnType !== 'array', 'Return type should not be "array".');
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = Runtime.stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func.apply(null, cArgs);
      if ((!opts || !opts.async) && (typeof EmterpreterAsync === 'undefined' ? 'undefined' : _typeof(EmterpreterAsync)) === 'object') {
        assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling ccall');
      }
      if (opts && opts.async) assert(!returnType, 'async ccalls cannot return values');
      if (returnType === 'string') ret = Pointer_stringify(ret);
      if (stack !== 0) {
        if (opts && opts.async) {
          EmterpreterAsync.asyncFinalizers.push(function () {
            Runtime.stackRestore(stack);
          });
          return;
        }
        Runtime.stackRestore(stack);
      }
      return ret;
    };

    var sourceRegex = /^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
    function parseJSFunc(jsfunc) {
      // Match the body and the return value of a javascript function source
      var parsed = jsfunc.toString().match(sourceRegex).slice(1);
      return { arguments: parsed[0], body: parsed[1], returnValue: parsed[2] };
    }

    // sources of useful functions. we create this lazily as it can trigger a source decompression on this entire file
    var JSsource = null;
    function ensureJSsource() {
      if (!JSsource) {
        JSsource = {};
        for (var fun in JSfuncs) {
          if (JSfuncs.hasOwnProperty(fun)) {
            // Elements of toCsource are arrays of three items:
            // the code, and the return value
            JSsource[fun] = parseJSFunc(JSfuncs[fun]);
          }
        }
      }
    }

    cwrap = function cwrap(ident, returnType, argTypes) {
      argTypes = argTypes || [];
      var cfunc = getCFunc(ident);
      // When the function takes numbers and returns a number, we can just return
      // the original function
      var numericArgs = argTypes.every(function (type) {
        return type === 'number';
      });
      var numericRet = returnType !== 'string';
      if (numericRet && numericArgs) {
        return cfunc;
      }
      // Creation of the arguments list (["$1","$2",...,"$nargs"])
      var argNames = argTypes.map(function (x, i) {
        return '$' + i;
      });
      var funcstr = "(function(" + argNames.join(',') + ") {";
      var nargs = argTypes.length;
      if (!numericArgs) {
        // Generate the code needed to convert the arguments from javascript
        // values to pointers
        ensureJSsource();
        funcstr += 'var stack = ' + JSsource['stackSave'].body + ';';
        for (var i = 0; i < nargs; i++) {
          var arg = argNames[i],
              type = argTypes[i];
          if (type === 'number') continue;
          var convertCode = JSsource[type + 'ToC']; // [code, return]
          funcstr += 'var ' + convertCode.arguments + ' = ' + arg + ';';
          funcstr += convertCode.body + ';';
          funcstr += arg + '=(' + convertCode.returnValue + ');';
        }
      }

      // When the code is compressed, the name of cfunc is not literally 'cfunc' anymore
      var cfuncname = parseJSFunc(function () {
        return cfunc;
      }).returnValue;
      // Call the function
      funcstr += 'var ret = ' + cfuncname + '(' + argNames.join(',') + ');';
      if (!numericRet) {
        // Return type can only by 'string' or 'number'
        // Convert the result to a string
        var strgfy = parseJSFunc(function () {
          return Pointer_stringify;
        }).returnValue;
        funcstr += 'ret = ' + strgfy + '(ret);';
      }
      funcstr += "if (typeof EmterpreterAsync === 'object') { assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling cwrap') }";
      if (!numericArgs) {
        // If we had a stack, restore it
        ensureJSsource();
        funcstr += JSsource['stackRestore'].body.replace('()', '(stack)') + ';';
      }
      funcstr += 'return ret})';
      return eval(funcstr);
    };
  })();
  Module["ccall"] = ccall;
  Module["cwrap"] = cwrap;

  /** @type {function(number, number, string, boolean=)} */
  function setValue(ptr, value, type, noSafe) {
    type = type || 'i8';
    if (type.charAt(type.length - 1) === '*') type = 'i32'; // pointers are 32-bit
    switch (type) {
      case 'i1':
        HEAP8[ptr >> 0] = value;break;
      case 'i8':
        HEAP8[ptr >> 0] = value;break;
      case 'i16':
        HEAP16[ptr >> 1] = value;break;
      case 'i32':
        HEAP32[ptr >> 2] = value;break;
      case 'i64':
        tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1.0 ? tempDouble > 0.0 ? (Math_min(+Math_floor(tempDouble / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296.0) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];break;
      case 'float':
        HEAPF32[ptr >> 2] = value;break;
      case 'double':
        HEAPF64[ptr >> 3] = value;break;
      default:
        abort('invalid type for setValue: ' + type);
    }
  }
  Module["setValue"] = setValue;

  /** @type {function(number, string, boolean=)} */
  function getValue(ptr, type, noSafe) {
    type = type || 'i8';
    if (type.charAt(type.length - 1) === '*') type = 'i32'; // pointers are 32-bit
    switch (type) {
      case 'i1':
        return HEAP8[ptr >> 0];
      case 'i8':
        return HEAP8[ptr >> 0];
      case 'i16':
        return HEAP16[ptr >> 1];
      case 'i32':
        return HEAP32[ptr >> 2];
      case 'i64':
        return HEAP32[ptr >> 2];
      case 'float':
        return HEAPF32[ptr >> 2];
      case 'double':
        return HEAPF64[ptr >> 3];
      default:
        abort('invalid type for setValue: ' + type);
    }
    return null;
  }
  Module["getValue"] = getValue;

  var ALLOC_NORMAL = 0; // Tries to use _malloc()
  var ALLOC_STACK = 1; // Lives for the duration of the current function call
  var ALLOC_STATIC = 2; // Cannot be freed
  var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
  var ALLOC_NONE = 4; // Do not allocate
  Module["ALLOC_NORMAL"] = ALLOC_NORMAL;
  Module["ALLOC_STACK"] = ALLOC_STACK;
  Module["ALLOC_STATIC"] = ALLOC_STATIC;
  Module["ALLOC_DYNAMIC"] = ALLOC_DYNAMIC;
  Module["ALLOC_NONE"] = ALLOC_NONE;

  // allocate(): This is for internal use. You can use it yourself as well, but the interface
  //             is a little tricky (see docs right below). The reason is that it is optimized
  //             for multiple syntaxes to save space in generated code. So you should
  //             normally not use allocate(), and instead allocate memory using _malloc(),
  //             initialize it with setValue(), and so forth.
  // @slab: An array of data, or a number. If a number, then the size of the block to allocate,
  //        in *bytes* (note that this is sometimes confusing: the next parameter does not
  //        affect this!)
  // @types: Either an array of types, one for each byte (or 0 if no type at that position),
  //         or a single type which is used for the entire block. This only matters if there
  //         is initial data - if @slab is a number, then this does not matter at all and is
  //         ignored.
  // @allocator: How to allocate memory, see ALLOC_*
  /** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
  function allocate(slab, types, allocator, ptr) {
    var zeroinit, size;
    if (typeof slab === 'number') {
      zeroinit = true;
      size = slab;
    } else {
      zeroinit = false;
      size = slab.length;
    }

    var singleType = typeof types === 'string' ? types : null;

    var ret;
    if (allocator == ALLOC_NONE) {
      ret = ptr;
    } else {
      ret = [typeof _malloc === 'function' ? _malloc : Runtime.staticAlloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
    }

    if (zeroinit) {
      var ptr = ret,
          stop;
      assert((ret & 3) == 0);
      stop = ret + (size & ~3);
      for (; ptr < stop; ptr += 4) {
        HEAP32[ptr >> 2] = 0;
      }
      stop = ret + size;
      while (ptr < stop) {
        HEAP8[ptr++ >> 0] = 0;
      }
      return ret;
    }

    if (singleType === 'i8') {
      if (slab.subarray || slab.slice) {
        HEAPU8.set( /** @type {!Uint8Array} */slab, ret);
      } else {
        HEAPU8.set(new Uint8Array(slab), ret);
      }
      return ret;
    }

    var i = 0,
        type,
        typeSize,
        previousType;
    while (i < size) {
      var curr = slab[i];

      if (typeof curr === 'function') {
        curr = Runtime.getFunctionIndex(curr);
      }

      type = singleType || types[i];
      if (type === 0) {
        i++;
        continue;
      }
      assert(type, 'Must know what type to store in allocate!');

      if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

      setValue(ret + i, curr, type);

      // no need to look up size unless type changes, so cache it
      if (previousType !== type) {
        typeSize = Runtime.getNativeTypeSize(type);
        previousType = type;
      }
      i += typeSize;
    }

    return ret;
  }
  Module["allocate"] = allocate;

  // Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
  function getMemory(size) {
    if (!staticSealed) return Runtime.staticAlloc(size);
    if (!runtimeInitialized) return Runtime.dynamicAlloc(size);
    return _malloc(size);
  }
  Module["getMemory"] = getMemory;

  /** @type {function(number, number=)} */
  function Pointer_stringify(ptr, length) {
    if (length === 0 || !ptr) return '';
    // TODO: use TextDecoder
    // Find the length, and check for UTF while doing so
    var hasUtf = 0;
    var t;
    var i = 0;
    while (1) {
      assert(ptr + i < TOTAL_MEMORY);
      t = HEAPU8[ptr + i >> 0];
      hasUtf |= t;
      if (t == 0 && !length) break;
      i++;
      if (length && i == length) break;
    }
    if (!length) length = i;

    var ret = '';

    if (hasUtf < 128) {
      var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
      var curr;
      while (length > 0) {
        curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
        ret = ret ? ret + curr : curr;
        ptr += MAX_CHUNK;
        length -= MAX_CHUNK;
      }
      return ret;
    }
    return Module['UTF8ToString'](ptr);
  }
  Module["Pointer_stringify"] = Pointer_stringify;

  // Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
  // a copy of that string as a Javascript String object.

  function AsciiToString(ptr) {
    var str = '';
    while (1) {
      var ch = HEAP8[ptr++ >> 0];
      if (!ch) return str;
      str += String.fromCharCode(ch);
    }
  }
  Module["AsciiToString"] = AsciiToString;

  // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
  // null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

  function stringToAscii(str, outPtr) {
    return writeAsciiToMemory(str, outPtr, false);
  }
  Module["stringToAscii"] = stringToAscii;

  // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
  // a copy of that string as a Javascript String object.

  var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
  function UTF8ArrayToString(u8Array, idx) {
    var endPtr = idx;
    // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
    // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
    while (u8Array[endPtr]) {
      ++endPtr;
    }if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
    } else {
      var u0, u1, u2, u3, u4, u5;

      var str = '';
      while (1) {
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
        u0 = u8Array[idx++];
        if (!u0) return str;
        if (!(u0 & 0x80)) {
          str += String.fromCharCode(u0);continue;
        }
        u1 = u8Array[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);continue;
        }
        u2 = u8Array[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          u3 = u8Array[idx++] & 63;
          if ((u0 & 0xF8) == 0xF0) {
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u3;
          } else {
            u4 = u8Array[idx++] & 63;
            if ((u0 & 0xFC) == 0xF8) {
              u0 = (u0 & 3) << 24 | u1 << 18 | u2 << 12 | u3 << 6 | u4;
            } else {
              u5 = u8Array[idx++] & 63;
              u0 = (u0 & 1) << 30 | u1 << 24 | u2 << 18 | u3 << 12 | u4 << 6 | u5;
            }
          }
        }
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | ch >> 10, 0xDC00 | ch & 0x3FF);
        }
      }
    }
  }
  Module["UTF8ArrayToString"] = UTF8ArrayToString;

  // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns
  // a copy of that string as a Javascript String object.

  function UTF8ToString(ptr) {
    return UTF8ArrayToString(HEAPU8, ptr);
  }
  Module["UTF8ToString"] = UTF8ToString;

  // Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
  // encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
  // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
  // Parameters:
  //   str: the Javascript string to copy.
  //   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
  //   outIdx: The starting offset in the array to begin the copying.
  //   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
  //                    terminator, i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
  //                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
  // Returns the number of bytes written, EXCLUDING the null terminator.

  function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
      return 0;

    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
    for (var i = 0; i < str.length; ++i) {
      // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
      var u = str.charCodeAt(i); // possibly a lead surrogate
      if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | str.charCodeAt(++i) & 0x3FF;
      if (u <= 0x7F) {
        if (outIdx >= endIdx) break;
        outU8Array[outIdx++] = u;
      } else if (u <= 0x7FF) {
        if (outIdx + 1 >= endIdx) break;
        outU8Array[outIdx++] = 0xC0 | u >> 6;
        outU8Array[outIdx++] = 0x80 | u & 63;
      } else if (u <= 0xFFFF) {
        if (outIdx + 2 >= endIdx) break;
        outU8Array[outIdx++] = 0xE0 | u >> 12;
        outU8Array[outIdx++] = 0x80 | u >> 6 & 63;
        outU8Array[outIdx++] = 0x80 | u & 63;
      } else if (u <= 0x1FFFFF) {
        if (outIdx + 3 >= endIdx) break;
        outU8Array[outIdx++] = 0xF0 | u >> 18;
        outU8Array[outIdx++] = 0x80 | u >> 12 & 63;
        outU8Array[outIdx++] = 0x80 | u >> 6 & 63;
        outU8Array[outIdx++] = 0x80 | u & 63;
      } else if (u <= 0x3FFFFFF) {
        if (outIdx + 4 >= endIdx) break;
        outU8Array[outIdx++] = 0xF8 | u >> 24;
        outU8Array[outIdx++] = 0x80 | u >> 18 & 63;
        outU8Array[outIdx++] = 0x80 | u >> 12 & 63;
        outU8Array[outIdx++] = 0x80 | u >> 6 & 63;
        outU8Array[outIdx++] = 0x80 | u & 63;
      } else {
        if (outIdx + 5 >= endIdx) break;
        outU8Array[outIdx++] = 0xFC | u >> 30;
        outU8Array[outIdx++] = 0x80 | u >> 24 & 63;
        outU8Array[outIdx++] = 0x80 | u >> 18 & 63;
        outU8Array[outIdx++] = 0x80 | u >> 12 & 63;
        outU8Array[outIdx++] = 0x80 | u >> 6 & 63;
        outU8Array[outIdx++] = 0x80 | u & 63;
      }
    }
    // Null-terminate the pointer to the buffer.
    outU8Array[outIdx] = 0;
    return outIdx - startIdx;
  }
  Module["stringToUTF8Array"] = stringToUTF8Array;

  // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
  // null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
  // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
  // Returns the number of bytes written, EXCLUDING the null terminator.

  function stringToUTF8(str, outPtr, maxBytesToWrite) {
    assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  }
  Module["stringToUTF8"] = stringToUTF8;

  // Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.

  function lengthBytesUTF8(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      var u = str.charCodeAt(i); // possibly a lead surrogate
      if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | str.charCodeAt(++i) & 0x3FF;
      if (u <= 0x7F) {
        ++len;
      } else if (u <= 0x7FF) {
        len += 2;
      } else if (u <= 0xFFFF) {
        len += 3;
      } else if (u <= 0x1FFFFF) {
        len += 4;
      } else if (u <= 0x3FFFFFF) {
        len += 5;
      } else {
        len += 6;
      }
    }
    return len;
  }
  Module["lengthBytesUTF8"] = lengthBytesUTF8;

  // Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
  // a copy of that string as a Javascript String object.

  var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
  function UTF16ToString(ptr) {
    assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
    var endPtr = ptr;
    // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
    // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
    var idx = endPtr >> 1;
    while (HEAP16[idx]) {
      ++idx;
    }endPtr = idx << 1;

    if (endPtr - ptr > 32 && UTF16Decoder) {
      return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
    } else {
      var i = 0;

      var str = '';
      while (1) {
        var codeUnit = HEAP16[ptr + i * 2 >> 1];
        if (codeUnit == 0) return str;
        ++i;
        // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
        str += String.fromCharCode(codeUnit);
      }
    }
  }

  // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
  // null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
  // Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
  // Parameters:
  //   str: the Javascript string to copy.
  //   outPtr: Byte address in Emscripten HEAP where to write the string to.
  //   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
  //                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
  //                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
  // Returns the number of bytes written, EXCLUDING the null terminator.

  function stringToUTF16(str, outPtr, maxBytesToWrite) {
    assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
    assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
    // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
    if (maxBytesToWrite === undefined) {
      maxBytesToWrite = 0x7FFFFFFF;
    }
    if (maxBytesToWrite < 2) return 0;
    maxBytesToWrite -= 2; // Null terminator.
    var startPtr = outPtr;
    var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
    for (var i = 0; i < numCharsToWrite; ++i) {
      // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
      var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
      HEAP16[outPtr >> 1] = codeUnit;
      outPtr += 2;
    }
    // Null-terminate the pointer to the HEAP.
    HEAP16[outPtr >> 1] = 0;
    return outPtr - startPtr;
  }

  // Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

  function lengthBytesUTF16(str) {
    return str.length * 2;
  }

  function UTF32ToString(ptr) {
    assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
    var i = 0;

    var str = '';
    while (1) {
      var utf32 = HEAP32[ptr + i * 4 >> 2];
      if (utf32 == 0) return str;
      ++i;
      // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      if (utf32 >= 0x10000) {
        var ch = utf32 - 0x10000;
        str += String.fromCharCode(0xD800 | ch >> 10, 0xDC00 | ch & 0x3FF);
      } else {
        str += String.fromCharCode(utf32);
      }
    }
  }

  // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
  // null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
  // Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
  // Parameters:
  //   str: the Javascript string to copy.
  //   outPtr: Byte address in Emscripten HEAP where to write the string to.
  //   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
  //                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
  //                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
  // Returns the number of bytes written, EXCLUDING the null terminator.

  function stringToUTF32(str, outPtr, maxBytesToWrite) {
    assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
    assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
    // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
    if (maxBytesToWrite === undefined) {
      maxBytesToWrite = 0x7FFFFFFF;
    }
    if (maxBytesToWrite < 4) return 0;
    var startPtr = outPtr;
    var endPtr = startPtr + maxBytesToWrite - 4;
    for (var i = 0; i < str.length; ++i) {
      // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
      if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
        var trailSurrogate = str.charCodeAt(++i);
        codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | trailSurrogate & 0x3FF;
      }
      HEAP32[outPtr >> 2] = codeUnit;
      outPtr += 4;
      if (outPtr + 4 > endPtr) break;
    }
    // Null-terminate the pointer to the HEAP.
    HEAP32[outPtr >> 2] = 0;
    return outPtr - startPtr;
  }

  // Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

  function lengthBytesUTF32(str) {
    var len = 0;
    for (var i = 0; i < str.length; ++i) {
      // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
      // See http://unicode.org/faq/utf_bom.html#utf16-3
      var codeUnit = str.charCodeAt(i);
      if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
      len += 4;
    }

    return len;
  }

  function demangle(func) {
    var __cxa_demangle_func = Module['___cxa_demangle'] || Module['__cxa_demangle'];
    if (__cxa_demangle_func) {
      try {
        var s = func.substr(1);
        var len = lengthBytesUTF8(s) + 1;
        var buf = _malloc(len);
        stringToUTF8(s, buf, len);
        var status = _malloc(4);
        var ret = __cxa_demangle_func(buf, 0, 0, status);
        if (getValue(status, 'i32') === 0 && ret) {
          return Pointer_stringify(ret);
        }
        // otherwise, libcxxabi failed
      } catch (e) {
        // ignore problems here
      } finally {
        if (buf) _free(buf);
        if (status) _free(status);
        if (ret) _free(ret);
      }
      // failure when using libcxxabi, don't demangle
      return func;
    }
    Runtime.warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
    return func;
  }

  function demangleAll(text) {
    var regex = /__Z[\w\d_]+/g;
    return text.replace(regex, function (x) {
      var y = demangle(x);
      return x === y ? x : x + ' [' + y + ']';
    });
  }

  function jsStackTrace() {
    var err = new Error();
    if (!err.stack) {
      // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
      // so try that as a special-case.
      try {
        throw new Error(0);
      } catch (e) {
        err = e;
      }
      if (!err.stack) {
        return '(no stack trace available)';
      }
    }
    return err.stack.toString();
  }

  function stackTrace() {
    var js = jsStackTrace();
    if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
    return demangleAll(js);
  }
  Module["stackTrace"] = stackTrace;

  // Memory management

  var PAGE_SIZE = 16384;
  var WASM_PAGE_SIZE = 65536;
  var ASMJS_PAGE_SIZE = 16777216;
  var MIN_TOTAL_MEMORY = 16777216;

  function alignUp(x, multiple) {
    if (x % multiple > 0) {
      x += multiple - x % multiple;
    }
    return x;
  }

  var HEAP,
  /** @type {ArrayBuffer} */
  buffer,
  /** @type {Int8Array} */
  HEAP8,
  /** @type {Uint8Array} */
  HEAPU8,
  /** @type {Int16Array} */
  HEAP16,
  /** @type {Uint16Array} */
  HEAPU16,
  /** @type {Int32Array} */
  HEAP32,
  /** @type {Uint32Array} */
  HEAPU32,
  /** @type {Float32Array} */
  HEAPF32,
  /** @type {Float64Array} */
  HEAPF64;

  function updateGlobalBuffer(buf) {
    Module['buffer'] = buffer = buf;
  }

  function updateGlobalBufferViews() {
    Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
    Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
    Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
    Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
    Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
    Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
    Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
    Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
  }

  var STATIC_BASE, STATICTOP, staticSealed; // static area
  var STACK_BASE, STACKTOP, STACK_MAX; // stack area
  var DYNAMIC_BASE, DYNAMICTOP_PTR; // dynamic area handled by sbrk

  STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0;
  staticSealed = false;

  // Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
  function writeStackCookie() {
    assert((STACK_MAX & 3) == 0);
    HEAPU32[(STACK_MAX >> 2) - 1] = 0x02135467;
    HEAPU32[(STACK_MAX >> 2) - 2] = 0x89BACDFE;
  }

  function checkStackCookie() {
    if (HEAPU32[(STACK_MAX >> 2) - 1] != 0x02135467 || HEAPU32[(STACK_MAX >> 2) - 2] != 0x89BACDFE) {
      abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x' + HEAPU32[(STACK_MAX >> 2) - 2].toString(16) + ' ' + HEAPU32[(STACK_MAX >> 2) - 1].toString(16));
    }
    // Also test the global address 0 for integrity. This check is not compatible with SAFE_SPLIT_MEMORY though, since that mode already tests all address 0 accesses on its own.
    if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) throw 'Runtime error: The application has corrupted its heap memory area (address zero)!';
  }

  function abortStackOverflow(allocSize) {
    abort('Stack overflow! Attempted to allocate ' + allocSize + ' bytes on the stack, but stack has only ' + (STACK_MAX - Module['asm'].stackSave() + allocSize) + ' bytes available!');
  }

  function abortOnCannotGrowMemory() {
    abort('Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
  }

  function enlargeMemory() {
    abortOnCannotGrowMemory();
  }

  var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
  var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
  if (TOTAL_MEMORY < TOTAL_STACK) Module.printErr('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

  // Initialize the runtime's memory
  // check for full engine support (use string 'subarray' to avoid closure compiler confusion)
  assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined, 'JS engine does not provide full typed array support');

  // Use a provided buffer, if there is one, or else allocate a new one
  if (Module['buffer']) {
    buffer = Module['buffer'];
    assert(buffer.byteLength === TOTAL_MEMORY, 'provided buffer should be ' + TOTAL_MEMORY + ' bytes, but it is ' + buffer.byteLength);
  } else {
    // Use a WebAssembly memory where available
    if ((typeof WebAssembly === 'undefined' ? 'undefined' : _typeof(WebAssembly)) === 'object' && typeof WebAssembly.Memory === 'function') {
      assert(TOTAL_MEMORY % WASM_PAGE_SIZE === 0);
      Module['wasmMemory'] = new WebAssembly.Memory({ 'initial': TOTAL_MEMORY / WASM_PAGE_SIZE, 'maximum': TOTAL_MEMORY / WASM_PAGE_SIZE });
      buffer = Module['wasmMemory'].buffer;
    } else {
      buffer = new ArrayBuffer(TOTAL_MEMORY);
    }
    assert(buffer.byteLength === TOTAL_MEMORY);
  }
  updateGlobalBufferViews();

  function getTotalMemory() {
    return TOTAL_MEMORY;
  }

  // Endianness check (note: assumes compiler arch was little-endian)
  HEAP32[0] = 0x63736d65; /* 'emsc' */
  HEAP16[1] = 0x6373;
  if (HEAPU8[2] !== 0x73 || HEAPU8[3] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';

  Module['HEAP'] = HEAP;
  Module['buffer'] = buffer;
  Module['HEAP8'] = HEAP8;
  Module['HEAP16'] = HEAP16;
  Module['HEAP32'] = HEAP32;
  Module['HEAPU8'] = HEAPU8;
  Module['HEAPU16'] = HEAPU16;
  Module['HEAPU32'] = HEAPU32;
  Module['HEAPF32'] = HEAPF32;
  Module['HEAPF64'] = HEAPF64;

  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift();
      if (typeof callback == 'function') {
        callback();
        continue;
      }
      var func = callback.func;
      if (typeof func === 'number') {
        if (callback.arg === undefined) {
          Module['dynCall_v'](func);
        } else {
          Module['dynCall_vi'](func, callback.arg);
        }
      } else {
        func(callback.arg === undefined ? null : callback.arg);
      }
    }
  }

  var __ATPRERUN__ = []; // functions called before the runtime is initialized
  var __ATINIT__ = []; // functions called during startup
  var __ATMAIN__ = []; // functions called when main() is to be run
  var __ATEXIT__ = []; // functions called during shutdown
  var __ATPOSTRUN__ = []; // functions called after the runtime has exited

  var runtimeInitialized = false;
  var runtimeExited = false;

  function preRun() {
    // compatibility - merge in anything from Module['preRun'] at this time
    if (Module['preRun']) {
      if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
      while (Module['preRun'].length) {
        addOnPreRun(Module['preRun'].shift());
      }
    }
    callRuntimeCallbacks(__ATPRERUN__);
  }

  function ensureInitRuntime() {
    checkStackCookie();
    if (runtimeInitialized) return;
    runtimeInitialized = true;
    callRuntimeCallbacks(__ATINIT__);
  }

  function preMain() {
    checkStackCookie();
    callRuntimeCallbacks(__ATMAIN__);
  }

  function exitRuntime() {
    checkStackCookie();
    callRuntimeCallbacks(__ATEXIT__);
    runtimeExited = true;
  }

  function postRun() {
    checkStackCookie();
    // compatibility - merge in anything from Module['postRun'] at this time
    if (Module['postRun']) {
      if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
      while (Module['postRun'].length) {
        addOnPostRun(Module['postRun'].shift());
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
  }

  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
  }
  Module["addOnPreRun"] = addOnPreRun;

  function addOnInit(cb) {
    __ATINIT__.unshift(cb);
  }
  Module["addOnInit"] = addOnInit;

  function addOnPreMain(cb) {
    __ATMAIN__.unshift(cb);
  }
  Module["addOnPreMain"] = addOnPreMain;

  function addOnExit(cb) {
    __ATEXIT__.unshift(cb);
  }
  Module["addOnExit"] = addOnExit;

  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
  }
  Module["addOnPostRun"] = addOnPostRun;

  // Tools

  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  Module["intArrayFromString"] = intArrayFromString;

  function intArrayToString(array) {
    var ret = [];
    for (var i = 0; i < array.length; i++) {
      var chr = array[i];
      if (chr > 0xFF) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
        chr &= 0xFF;
      }
      ret.push(String.fromCharCode(chr));
    }
    return ret.join('');
  }
  Module["intArrayToString"] = intArrayToString;

  // Deprecated: This function should not be called because it is unsafe and does not provide
  // a maximum length limit of how many bytes it is allowed to write. Prefer calling the
  // function stringToUTF8Array() instead, which takes in a maximum length that can be used
  // to be secure from out of bounds writes.
  /** @deprecated */
  function writeStringToMemory(string, buffer, dontAddNull) {
    Runtime.warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

    var /** @type {number} */lastChar, /** @type {number} */end;
    if (dontAddNull) {
      // stringToUTF8Array always appends null. If we don't want to do that, remember the
      // character that existed at the location where the null will be placed, and restore
      // that after the write (below).
      end = buffer + lengthBytesUTF8(string);
      lastChar = HEAP8[end];
    }
    stringToUTF8(string, buffer, Infinity);
    if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
  }
  Module["writeStringToMemory"] = writeStringToMemory;

  function writeArrayToMemory(array, buffer) {
    assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)');
    HEAP8.set(array, buffer);
  }
  Module["writeArrayToMemory"] = writeArrayToMemory;

  function writeAsciiToMemory(str, buffer, dontAddNull) {
    for (var i = 0; i < str.length; ++i) {
      assert(str.charCodeAt(i) === str.charCodeAt(i) & 0xff);
      HEAP8[buffer++ >> 0] = str.charCodeAt(i);
    }
    // Null-terminate the pointer to the HEAP.
    if (!dontAddNull) HEAP8[buffer >> 0] = 0;
  }
  Module["writeAsciiToMemory"] = writeAsciiToMemory;

  function unSign(value, bits, ignore) {
    if (value >= 0) {
      return value;
    }
    return bits <= 32 ? 2 * Math.abs(1 << bits - 1) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
    : Math.pow(2, bits) + value;
  }
  function reSign(value, bits, ignore) {
    if (value <= 0) {
      return value;
    }
    var half = bits <= 32 ? Math.abs(1 << bits - 1) // abs is needed if bits == 32
    : Math.pow(2, bits - 1);
    if (value >= half && (bits <= 32 || value > half)) {
      // for huge values, we can hit the precision limit and always get true here. so don't do that
      // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
      // TODO: In i64 mode 1, resign the two parts separately and safely
      value = -2 * half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
    }
    return value;
  }

  // check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
  if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
    var ah = a >>> 16;
    var al = a & 0xffff;
    var bh = b >>> 16;
    var bl = b & 0xffff;
    return al * bl + (ah * bl + al * bh << 16) | 0;
  };
  Math.imul = Math['imul'];

  if (!Math['fround']) {
    var froundBuffer = new Float32Array(1);
    Math['fround'] = function (x) {
      froundBuffer[0] = x;return froundBuffer[0];
    };
  }
  Math.fround = Math['fround'];

  if (!Math['clz32']) Math['clz32'] = function (x) {
    x = x >>> 0;
    for (var i = 0; i < 32; i++) {
      if (x & 1 << 31 - i) return i;
    }
    return 32;
  };
  Math.clz32 = Math['clz32'];

  if (!Math['trunc']) Math['trunc'] = function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };
  Math.trunc = Math['trunc'];

  var Math_abs = Math.abs;
  var Math_cos = Math.cos;
  var Math_sin = Math.sin;
  var Math_tan = Math.tan;
  var Math_acos = Math.acos;
  var Math_asin = Math.asin;
  var Math_atan = Math.atan;
  var Math_atan2 = Math.atan2;
  var Math_exp = Math.exp;
  var Math_log = Math.log;
  var Math_sqrt = Math.sqrt;
  var Math_ceil = Math.ceil;
  var Math_floor = Math.floor;
  var Math_pow = Math.pow;
  var Math_imul = Math.imul;
  var Math_fround = Math.fround;
  var Math_round = Math.round;
  var Math_min = Math.min;
  var Math_clz32 = Math.clz32;
  var Math_trunc = Math.trunc;

  // A counter of dependencies for calling run(). If we need to
  // do asynchronous work before running, increment this and
  // decrement it. Incrementing must happen in a place like
  // PRE_RUN_ADDITIONS (used by emcc to add file preloading).
  // Note that you can add dependencies in preRun, even though
  // it happens right before run - run will be postponed until
  // the dependencies are met.
  var runDependencies = 0;
  var runDependencyWatcher = null;
  var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
  var runDependencyTracking = {};

  function getUniqueRunDependency(id) {
    var orig = id;
    while (1) {
      if (!runDependencyTracking[id]) return id;
      id = orig + Math.random();
    }
    return id;
  }

  function addRunDependency(id) {
    runDependencies++;
    if (Module['monitorRunDependencies']) {
      Module['monitorRunDependencies'](runDependencies);
    }
    if (id) {
      assert(!runDependencyTracking[id]);
      runDependencyTracking[id] = 1;
      if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
        // Check for missing dependencies every few seconds
        runDependencyWatcher = setInterval(function () {
          if (ABORT) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
            return;
          }
          var shown = false;
          for (var dep in runDependencyTracking) {
            if (!shown) {
              shown = true;
              Module.printErr('still waiting on run dependencies:');
            }
            Module.printErr('dependency: ' + dep);
          }
          if (shown) {
            Module.printErr('(end of list)');
          }
        }, 10000);
      }
    } else {
      Module.printErr('warning: run dependency added without ID');
    }
  }
  Module["addRunDependency"] = addRunDependency;

  function removeRunDependency(id) {
    runDependencies--;
    if (Module['monitorRunDependencies']) {
      Module['monitorRunDependencies'](runDependencies);
    }
    if (id) {
      assert(runDependencyTracking[id]);
      delete runDependencyTracking[id];
    } else {
      Module.printErr('warning: run dependency removed without ID');
    }
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback(); // can add another dependenciesFulfilled
      }
    }
  }
  Module["removeRunDependency"] = removeRunDependency;

  Module["preloadedImages"] = {}; // maps url to image data
  Module["preloadedAudios"] = {}; // maps url to audio data


  var memoryInitializer = null;

  var /* show errors on likely calls to FS when it was not included */FS = {
    error: function error() {
      abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1');
    },
    init: function init() {
      FS.error();
    },
    createDataFile: function createDataFile() {
      FS.error();
    },
    createPreloadedFile: function createPreloadedFile() {
      FS.error();
    },
    createLazyFile: function createLazyFile() {
      FS.error();
    },
    open: function open() {
      FS.error();
    },
    mkdev: function mkdev() {
      FS.error();
    },
    registerDevice: function registerDevice() {
      FS.error();
    },
    analyzePath: function analyzePath() {
      FS.error();
    },
    loadFilesFromDB: function loadFilesFromDB() {
      FS.error();
    },

    ErrnoError: function ErrnoError() {
      FS.error();
    }
  };
  Module['FS_createDataFile'] = FS.createDataFile;
  Module['FS_createPreloadedFile'] = FS.createPreloadedFile;

  function integrateWasmJS(Module) {
    // wasm.js has several methods for creating the compiled code module here:
    //  * 'native-wasm' : use native WebAssembly support in the browser
    //  * 'interpret-s-expr': load s-expression code from a .wast and interpret
    //  * 'interpret-binary': load binary wasm and interpret
    //  * 'interpret-asm2wasm': load asm.js code, translate to wasm, and interpret
    //  * 'asmjs': no wasm, just load the asm.js code and use that (good for testing)
    // The method can be set at compile time (BINARYEN_METHOD), or runtime by setting Module['wasmJSMethod'].
    // The method can be a comma-separated list, in which case, we will try the
    // options one by one. Some of them can fail gracefully, and then we can try
    // the next.

    // inputs

    var method = Module['wasmJSMethod'] || 'native-wasm';
    Module['wasmJSMethod'] = method;

    var wasmTextFile = Module['wasmTextFile'] || 'world.wast';
    var wasmBinaryFile = Module['wasmBinaryFile'] || 'world.wasm';
    var asmjsCodeFile = Module['asmjsCodeFile'] || 'world.temp.asm.js';

    if (typeof Module['locateFile'] === 'function') {
      wasmTextFile = Module['locateFile'](wasmTextFile);
      wasmBinaryFile = Module['locateFile'](wasmBinaryFile);
      asmjsCodeFile = Module['locateFile'](asmjsCodeFile);
    }

    // utilities

    var wasmPageSize = 64 * 1024;

    var asm2wasmImports = { // special asm2wasm imports
      "f64-rem": function f64Rem(x, y) {
        return x % y;
      },
      "f64-to-int": function f64ToInt(x) {
        return x | 0;
      },
      "i32s-div": function i32sDiv(x, y) {
        return (x | 0) / (y | 0) | 0;
      },
      "i32u-div": function i32uDiv(x, y) {
        return (x >>> 0) / (y >>> 0) >>> 0;
      },
      "i32s-rem": function i32sRem(x, y) {
        return (x | 0) % (y | 0) | 0;
      },
      "i32u-rem": function i32uRem(x, y) {
        return (x >>> 0) % (y >>> 0) >>> 0;
      },
      "debugger": function _debugger() {
        debugger;
      }
    };

    var info = {
      'global': null,
      'env': null,
      'asm2wasm': asm2wasmImports,
      'parent': Module // Module inside wasm-js.cpp refers to wasm-js.cpp; this allows access to the outside program.
    };

    var exports = null;

    function lookupImport(mod, base) {
      var lookup = info;
      if (mod.indexOf('.') < 0) {
        lookup = (lookup || {})[mod];
      } else {
        var parts = mod.split('.');
        lookup = (lookup || {})[parts[0]];
        lookup = (lookup || {})[parts[1]];
      }
      if (base) {
        lookup = (lookup || {})[base];
      }
      if (lookup === undefined) {
        abort('bad lookupImport to (' + mod + ').' + base);
      }
      return lookup;
    }

    function mergeMemory(newBuffer) {
      // The wasm instance creates its memory. But static init code might have written to
      // buffer already, including the mem init file, and we must copy it over in a proper merge.
      // TODO: avoid this copy, by avoiding such static init writes
      // TODO: in shorter term, just copy up to the last static init write
      var oldBuffer = Module['buffer'];
      if (newBuffer.byteLength < oldBuffer.byteLength) {
        Module['printErr']('the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here');
      }
      var oldView = new Int8Array(oldBuffer);
      var newView = new Int8Array(newBuffer);

      // If we have a mem init file, do not trample it
      if (!memoryInitializer) {
        oldView.set(newView.subarray(Module['STATIC_BASE'], Module['STATIC_BASE'] + Module['STATIC_BUMP']), Module['STATIC_BASE']);
      }

      newView.set(oldView);
      updateGlobalBuffer(newBuffer);
      updateGlobalBufferViews();
    }

    var WasmTypes = {
      none: 0,
      i32: 1,
      i64: 2,
      f32: 3,
      f64: 4
    };

    function fixImports(imports) {
      if (true) return imports;
      var ret = {};
      for (var i in imports) {
        var fixed = i;
        if (fixed[0] == '_') fixed = fixed.substr(1);
        ret[fixed] = imports[i];
      }
      return ret;
    }

    function getBinary() {
      try {
        var binary;
        if (Module['wasmBinary']) {
          binary = Module['wasmBinary'];
          binary = new Uint8Array(binary);
        } else if (Module['readBinary']) {
          binary = Module['readBinary'](wasmBinaryFile);
        } else {
          throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";
        }
        return binary;
      } catch (err) {
        abort(err);
      }
    }

    function getBinaryPromise() {
      // if we don't have the binary yet, and have the Fetch api, use that
      if (!Module['wasmBinary'] && typeof fetch === 'function') {
        return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
          if (!response['ok']) {
            throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
          }
          return response['arrayBuffer']();
        });
      }
      // Otherwise, getBinary should be able to get it synchronously
      return new Promise(function (resolve, reject) {
        resolve(getBinary());
      });
    }

    // do-method functions

    function doJustAsm(global, env, providedBuffer) {
      // if no Module.asm, or it's the method handler helper (see below), then apply
      // the asmjs
      if (typeof Module['asm'] !== 'function' || Module['asm'] === methodHandler) {
        if (!Module['asmPreload']) {
          // you can load the .asm.js file before this, to avoid this sync xhr and eval
          eval(Module['read'](asmjsCodeFile)); // set Module.asm
        } else {
          Module['asm'] = Module['asmPreload'];
        }
      }
      if (typeof Module['asm'] !== 'function') {
        Module['printErr']('asm evalling did not set the module properly');
        return false;
      }
      return Module['asm'](global, env, providedBuffer);
    }

    function doNativeWasm(global, env, providedBuffer) {
      if ((typeof WebAssembly === 'undefined' ? 'undefined' : _typeof(WebAssembly)) !== 'object') {
        Module['printErr']('no native wasm support detected');
        return false;
      }
      // prepare memory import
      if (!(Module['wasmMemory'] instanceof WebAssembly.Memory)) {
        Module['printErr']('no native wasm Memory in use');
        return false;
      }
      env['memory'] = Module['wasmMemory'];
      // Load the wasm module and create an instance of using native support in the JS engine.
      info['global'] = {
        'NaN': NaN,
        'Infinity': Infinity
      };
      info['global.Math'] = global.Math;
      info['env'] = env;
      // handle a generated wasm instance, receiving its exports and
      // performing other necessary setup
      function receiveInstance(instance) {
        exports = instance.exports;
        if (exports.memory) mergeMemory(exports.memory);
        Module['asm'] = exports;
        Module["usingWasm"] = true;
        removeRunDependency('wasm-instantiate');
      }

      addRunDependency('wasm-instantiate'); // we can't run yet

      // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
      // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
      // to any other async startup actions they are performing.
      if (Module['instantiateWasm']) {
        try {
          return Module['instantiateWasm'](info, receiveInstance);
        } catch (e) {
          Module['printErr']('Module.instantiateWasm callback failed with error: ' + e);
          return false;
        }
      }

      getBinaryPromise().then(function (binary) {
        return WebAssembly.instantiate(binary, info);
      }).then(function (output) {
        // receiveInstance() will swap in the exports (to Module.asm) so they can be called
        receiveInstance(output['instance']);
      }).catch(function (reason) {
        Module['printErr']('failed to asynchronously prepare wasm: ' + reason);
        abort(reason);
      });
      return {}; // no exports yet; we'll fill them in later
    }

    function doWasmPolyfill(global, env, providedBuffer, method) {
      if (typeof WasmJS !== 'function') {
        Module['printErr']('WasmJS not detected - polyfill not bundled?');
        return false;
      }

      // Use wasm.js to polyfill and execute code in a wasm interpreter.
      var wasmJS = WasmJS({});

      // XXX don't be confused. Module here is in the outside program. wasmJS is the inner wasm-js.cpp.
      wasmJS['outside'] = Module; // Inside wasm-js.cpp, Module['outside'] reaches the outside module.

      // Information for the instance of the module.
      wasmJS['info'] = info;

      wasmJS['lookupImport'] = lookupImport;

      assert(providedBuffer === Module['buffer']); // we should not even need to pass it as a 3rd arg for wasm, but that's the asm.js way.

      info.global = global;
      info.env = env;

      // polyfill interpreter expects an ArrayBuffer
      assert(providedBuffer === Module['buffer']);
      env['memory'] = providedBuffer;
      assert(env['memory'] instanceof ArrayBuffer);

      wasmJS['providedTotalMemory'] = Module['buffer'].byteLength;

      // Prepare to generate wasm, using either asm2wasm or s-exprs
      var code;
      if (method === 'interpret-binary') {
        code = getBinary();
      } else {
        code = Module['read'](method == 'interpret-asm2wasm' ? asmjsCodeFile : wasmTextFile);
      }
      var temp;
      if (method == 'interpret-asm2wasm') {
        temp = wasmJS['_malloc'](code.length + 1);
        wasmJS['writeAsciiToMemory'](code, temp);
        wasmJS['_load_asm2wasm'](temp);
      } else if (method === 'interpret-s-expr') {
        temp = wasmJS['_malloc'](code.length + 1);
        wasmJS['writeAsciiToMemory'](code, temp);
        wasmJS['_load_s_expr2wasm'](temp);
      } else if (method === 'interpret-binary') {
        temp = wasmJS['_malloc'](code.length);
        wasmJS['HEAPU8'].set(code, temp);
        wasmJS['_load_binary2wasm'](temp, code.length);
      } else {
        throw 'what? ' + method;
      }
      wasmJS['_free'](temp);

      wasmJS['_instantiate'](temp);

      if (Module['newBuffer']) {
        mergeMemory(Module['newBuffer']);
        Module['newBuffer'] = null;
      }

      exports = wasmJS['asmExports'];

      return exports;
    }

    // We may have a preloaded value in Module.asm, save it
    Module['asmPreload'] = Module['asm'];

    // Memory growth integration code

    var asmjsReallocBuffer = Module['reallocBuffer'];

    var wasmReallocBuffer = function wasmReallocBuffer(size) {
      var PAGE_MULTIPLE = Module["usingWasm"] ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE; // In wasm, heap size must be a multiple of 64KB. In asm.js, they need to be multiples of 16MB.
      size = alignUp(size, PAGE_MULTIPLE); // round up to wasm page size
      var old = Module['buffer'];
      var oldSize = old.byteLength;
      if (Module["usingWasm"]) {
        // native wasm support
        try {
          var result = Module['wasmMemory'].grow((size - oldSize) / wasmPageSize); // .grow() takes a delta compared to the previous size
          if (result !== (-1 | 0)) {
            // success in native wasm memory growth, get the buffer from the memory
            return Module['buffer'] = Module['wasmMemory'].buffer;
          } else {
            return null;
          }
        } catch (e) {
          console.error('Module.reallocBuffer: Attempted to grow from ' + oldSize + ' bytes to ' + size + ' bytes, but got error: ' + e);
          return null;
        }
      } else {
        // wasm interpreter support
        exports['__growWasmMemory']((size - oldSize) / wasmPageSize); // tiny wasm method that just does grow_memory
        // in interpreter, we replace Module.buffer if we allocate
        return Module['buffer'] !== old ? Module['buffer'] : null; // if it was reallocated, it changed
      }
    };

    Module['reallocBuffer'] = function (size) {
      if (finalMethod === 'asmjs') {
        return asmjsReallocBuffer(size);
      } else {
        return wasmReallocBuffer(size);
      }
    };

    // we may try more than one; this is the final one, that worked and we are using
    var finalMethod = '';

    // Provide an "asm.js function" for the application, called to "link" the asm.js module. We instantiate
    // the wasm module at that time, and it receives imports and provides exports and so forth, the app
    // doesn't need to care that it is wasm or olyfilled wasm or asm.js.

    Module['asm'] = function (global, env, providedBuffer) {
      global = fixImports(global);
      env = fixImports(env);

      // import table
      if (!env['table']) {
        var TABLE_SIZE = Module['wasmTableSize'];
        if (TABLE_SIZE === undefined) TABLE_SIZE = 1024; // works in binaryen interpreter at least
        var MAX_TABLE_SIZE = Module['wasmMaxTableSize'];
        if ((typeof WebAssembly === 'undefined' ? 'undefined' : _typeof(WebAssembly)) === 'object' && typeof WebAssembly.Table === 'function') {
          if (MAX_TABLE_SIZE !== undefined) {
            env['table'] = new WebAssembly.Table({ 'initial': TABLE_SIZE, 'maximum': MAX_TABLE_SIZE, 'element': 'anyfunc' });
          } else {
            env['table'] = new WebAssembly.Table({ 'initial': TABLE_SIZE, element: 'anyfunc' });
          }
        } else {
          env['table'] = new Array(TABLE_SIZE); // works in binaryen interpreter at least
        }
        Module['wasmTable'] = env['table'];
      }

      if (!env['memoryBase']) {
        env['memoryBase'] = Module['STATIC_BASE']; // tell the memory segments where to place themselves
      }
      if (!env['tableBase']) {
        env['tableBase'] = 0; // table starts at 0 by default, in dynamic linking this will change
      }

      // try the methods. each should return the exports if it succeeded

      var exports;
      exports = doNativeWasm(global, env, providedBuffer);

      return exports;
    };

    var methodHandler = Module['asm']; // note our method handler, as we may modify Module['asm'] later
  }

  integrateWasmJS(Module);

  // === Body ===

  var ASM_CONSTS = [];

  STATIC_BASE = Runtime.GLOBAL_BASE;

  STATICTOP = STATIC_BASE + 3824;
  /* global initializers */__ATINIT__.push();

  memoryInitializer = Module["wasmJSMethod"].indexOf("asmjs") >= 0 || Module["wasmJSMethod"].indexOf("interpret-asm2wasm") >= 0 ? "world.js.mem" : null;

  var STATIC_BUMP = 3824;
  Module["STATIC_BASE"] = STATIC_BASE;
  Module["STATIC_BUMP"] = STATIC_BUMP;

  /* no memory initializer */
  var tempDoublePtr = STATICTOP;STATICTOP += 16;

  assert(tempDoublePtr % 8 == 0);

  function copyTempFloat(ptr) {
    // functions, because inlining this code increases code size too much

    HEAP8[tempDoublePtr] = HEAP8[ptr];

    HEAP8[tempDoublePtr + 1] = HEAP8[ptr + 1];

    HEAP8[tempDoublePtr + 2] = HEAP8[ptr + 2];

    HEAP8[tempDoublePtr + 3] = HEAP8[ptr + 3];
  }

  function copyTempDouble(ptr) {

    HEAP8[tempDoublePtr] = HEAP8[ptr];

    HEAP8[tempDoublePtr + 1] = HEAP8[ptr + 1];

    HEAP8[tempDoublePtr + 2] = HEAP8[ptr + 2];

    HEAP8[tempDoublePtr + 3] = HEAP8[ptr + 3];

    HEAP8[tempDoublePtr + 4] = HEAP8[ptr + 4];

    HEAP8[tempDoublePtr + 5] = HEAP8[ptr + 5];

    HEAP8[tempDoublePtr + 6] = HEAP8[ptr + 6];

    HEAP8[tempDoublePtr + 7] = HEAP8[ptr + 7];
  }

  // {{PRE_LIBRARY}}


  function __ZSt18uncaught_exceptionv() {
    // std::uncaught_exception()
    return !!__ZSt18uncaught_exceptionv.uncaught_exception;
  }

  var EXCEPTIONS = { last: 0, caught: [], infos: {}, deAdjust: function deAdjust(adjusted) {
      if (!adjusted || EXCEPTIONS.infos[adjusted]) return adjusted;
      for (var ptr in EXCEPTIONS.infos) {
        var info = EXCEPTIONS.infos[ptr];
        if (info.adjusted === adjusted) {
          return ptr;
        }
      }
      return adjusted;
    }, addRef: function addRef(ptr) {
      if (!ptr) return;
      var info = EXCEPTIONS.infos[ptr];
      info.refcount++;
    }, decRef: function decRef(ptr) {
      if (!ptr) return;
      var info = EXCEPTIONS.infos[ptr];
      assert(info.refcount > 0);
      info.refcount--;
      // A rethrown exception can reach refcount 0; it must not be discarded
      // Its next handler will clear the rethrown flag and addRef it, prior to
      // final decRef and destruction here
      if (info.refcount === 0 && !info.rethrown) {
        if (info.destructor) {
          Module['dynCall_vi'](info.destructor, ptr);
        }
        delete EXCEPTIONS.infos[ptr];
        ___cxa_free_exception(ptr);
      }
    }, clearRef: function clearRef(ptr) {
      if (!ptr) return;
      var info = EXCEPTIONS.infos[ptr];
      info.refcount = 0;
    } };
  function ___resumeException(ptr) {
    if (!EXCEPTIONS.last) {
      EXCEPTIONS.last = ptr;
    }
    throw ptr;
  }function ___cxa_find_matching_catch() {
    var thrown = EXCEPTIONS.last;
    if (!thrown) {
      // just pass through the null ptr
      return (Runtime.setTempRet0(0), 0) | 0;
    }
    var info = EXCEPTIONS.infos[thrown];
    var throwntype = info.type;
    if (!throwntype) {
      // just pass through the thrown ptr
      return (Runtime.setTempRet0(0), thrown) | 0;
    }
    var typeArray = Array.prototype.slice.call(arguments);

    var pointer = Module['___cxa_is_pointer_type'](throwntype);
    // can_catch receives a **, add indirection
    if (!___cxa_find_matching_catch.buffer) ___cxa_find_matching_catch.buffer = _malloc(4);
    HEAP32[___cxa_find_matching_catch.buffer >> 2] = thrown;
    thrown = ___cxa_find_matching_catch.buffer;
    // The different catch blocks are denoted by different types.
    // Due to inheritance, those types may not precisely match the
    // type of the thrown object. Find one which matches, and
    // return the type of the catch block which should be called.
    for (var i = 0; i < typeArray.length; i++) {
      if (typeArray[i] && Module['___cxa_can_catch'](typeArray[i], throwntype, thrown)) {
        thrown = HEAP32[thrown >> 2]; // undo indirection
        info.adjusted = thrown;
        return (Runtime.setTempRet0(typeArray[i]), thrown) | 0;
      }
    }
    // Shouldn't happen unless we have bogus data in typeArray
    // or encounter a type for which emscripten doesn't have suitable
    // typeinfo defined. Best-efforts match just in case.
    thrown = HEAP32[thrown >> 2]; // undo indirection
    return (Runtime.setTempRet0(throwntype), thrown) | 0;
  }function ___cxa_throw(ptr, type, destructor) {
    EXCEPTIONS.infos[ptr] = {
      ptr: ptr,
      adjusted: ptr,
      type: type,
      destructor: destructor,
      refcount: 0,
      caught: false,
      rethrown: false
    };
    EXCEPTIONS.last = ptr;
    if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
      __ZSt18uncaught_exceptionv.uncaught_exception = 1;
    } else {
      __ZSt18uncaught_exceptionv.uncaught_exception++;
    }
    throw ptr;
  }

  function ___lock() {}

  function ___unlock() {}

  var _llvm_pow_f64 = Math_pow;

  function ___setErrNo(value) {
    if (Module['___errno_location']) HEAP32[Module['___errno_location']() >> 2] = value;else Module.printErr('failed to set errno from JS');
    return value;
  }

  var SYSCALLS = { varargs: 0, get: function get(varargs) {
      SYSCALLS.varargs += 4;
      var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
      return ret;
    }, getStr: function getStr() {
      var ret = Pointer_stringify(SYSCALLS.get());
      return ret;
    }, get64: function get64() {
      var low = SYSCALLS.get(),
          high = SYSCALLS.get();
      if (low >= 0) assert(high === 0);else assert(high === -1);
      return low;
    }, getZero: function getZero() {
      assert(SYSCALLS.get() === 0);
    } };function ___syscall146(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      // writev
      // hack to support printf in NO_FILESYSTEM
      var stream = SYSCALLS.get(),
          iov = SYSCALLS.get(),
          iovcnt = SYSCALLS.get();
      var ret = 0;
      if (!___syscall146.buffer) {
        ___syscall146.buffers = [null, [], []]; // 1 => stdout, 2 => stderr
        ___syscall146.printChar = function (stream, curr) {
          var buffer = ___syscall146.buffers[stream];
          assert(buffer);
          if (curr === 0 || curr === 10) {
            (stream === 1 ? Module['print'] : Module['printErr'])(UTF8ArrayToString(buffer, 0));
            buffer.length = 0;
          } else {
            buffer.push(curr);
          }
        };
      }
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[iov + i * 8 >> 2];
        var len = HEAP32[iov + (i * 8 + 4) >> 2];
        for (var j = 0; j < len; j++) {
          ___syscall146.printChar(stream, HEAPU8[ptr + j]);
        }
        ret += len;
      }
      return ret;
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }

  function ___gxx_personality_v0() {}

  function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
    return dest;
  }

  function ___syscall140(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      // llseek
      var stream = SYSCALLS.getStreamFromFD(),
          offset_high = SYSCALLS.get(),
          offset_low = SYSCALLS.get(),
          result = SYSCALLS.get(),
          whence = SYSCALLS.get();
      // NOTE: offset_high is unused - Emscripten's off_t is 32-bit
      var offset = offset_low;
      FS.llseek(stream, offset, whence);
      HEAP32[result >> 2] = stream.position;
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }

  function ___syscall6(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      // close
      var stream = SYSCALLS.getStreamFromFD();
      FS.close(stream);
      return 0;
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }

  function ___cxa_allocate_exception(size) {
    return _malloc(size);
  }

  function ___syscall54(which, varargs) {
    SYSCALLS.varargs = varargs;
    try {
      // ioctl
      return 0;
    } catch (e) {
      if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
      return -e.errno;
    }
  }
  /* flush anything remaining in the buffer during shutdown */__ATEXIT__.push(function () {
    var fflush = Module["_fflush"];if (fflush) fflush(0);var printChar = ___syscall146.printChar;if (!printChar) return;var buffers = ___syscall146.buffers;if (buffers[1].length) printChar(1, 10);if (buffers[2].length) printChar(2, 10);
  });;
  DYNAMICTOP_PTR = allocate(1, "i32", ALLOC_STATIC);

  STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

  STACK_MAX = STACK_BASE + TOTAL_STACK;

  DYNAMIC_BASE = Runtime.alignMemory(STACK_MAX);

  HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

  staticSealed = true; // seal the static portion of memory

  assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

  function nullFunc_iiii(x) {
    Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x);
  }

  function nullFunc_viiiii(x) {
    Module["printErr"]("Invalid function pointer called with signature 'viiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x);
  }

  function nullFunc_vi(x) {
    Module["printErr"]("Invalid function pointer called with signature 'vi'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x);
  }

  function nullFunc_ii(x) {
    Module["printErr"]("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x);
  }

  function nullFunc_v(x) {
    Module["printErr"]("Invalid function pointer called with signature 'v'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x);
  }

  function nullFunc_viiiiii(x) {
    Module["printErr"]("Invalid function pointer called with signature 'viiiiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x);
  }

  function nullFunc_viiii(x) {
    Module["printErr"]("Invalid function pointer called with signature 'viiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x);
  }

  Module['wasmTableSize'] = 145;

  Module['wasmMaxTableSize'] = 145;

  function invoke_iiii(index, a1, a2, a3) {
    try {
      return Module["dynCall_iiii"](index, a1, a2, a3);
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e;
      Module["setThrew"](1, 0);
    }
  }

  function invoke_viiiii(index, a1, a2, a3, a4, a5) {
    try {
      Module["dynCall_viiiii"](index, a1, a2, a3, a4, a5);
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e;
      Module["setThrew"](1, 0);
    }
  }

  function invoke_vi(index, a1) {
    try {
      Module["dynCall_vi"](index, a1);
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e;
      Module["setThrew"](1, 0);
    }
  }

  function invoke_ii(index, a1) {
    try {
      return Module["dynCall_ii"](index, a1);
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e;
      Module["setThrew"](1, 0);
    }
  }

  function invoke_v(index) {
    try {
      Module["dynCall_v"](index);
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e;
      Module["setThrew"](1, 0);
    }
  }

  function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
    try {
      Module["dynCall_viiiiii"](index, a1, a2, a3, a4, a5, a6);
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e;
      Module["setThrew"](1, 0);
    }
  }

  function invoke_viiii(index, a1, a2, a3, a4) {
    try {
      Module["dynCall_viiii"](index, a1, a2, a3, a4);
    } catch (e) {
      if (typeof e !== 'number' && e !== 'longjmp') throw e;
      Module["setThrew"](1, 0);
    }
  }

  Module.asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array, "NaN": NaN, "Infinity": Infinity };

  Module.asmLibraryArg = { "abort": abort, "assert": assert, "enlargeMemory": enlargeMemory, "getTotalMemory": getTotalMemory, "abortOnCannotGrowMemory": abortOnCannotGrowMemory, "abortStackOverflow": abortStackOverflow, "nullFunc_iiii": nullFunc_iiii, "nullFunc_viiiii": nullFunc_viiiii, "nullFunc_vi": nullFunc_vi, "nullFunc_ii": nullFunc_ii, "nullFunc_v": nullFunc_v, "nullFunc_viiiiii": nullFunc_viiiiii, "nullFunc_viiii": nullFunc_viiii, "invoke_iiii": invoke_iiii, "invoke_viiiii": invoke_viiiii, "invoke_vi": invoke_vi, "invoke_ii": invoke_ii, "invoke_v": invoke_v, "invoke_viiiiii": invoke_viiiiii, "invoke_viiii": invoke_viiii, "_llvm_pow_f64": _llvm_pow_f64, "___cxa_throw": ___cxa_throw, "___lock": ___lock, "___syscall6": ___syscall6, "___setErrNo": ___setErrNo, "___unlock": ___unlock, "___gxx_personality_v0": ___gxx_personality_v0, "___syscall146": ___syscall146, "_emscripten_memcpy_big": _emscripten_memcpy_big, "___syscall54": ___syscall54, "___syscall140": ___syscall140, "___resumeException": ___resumeException, "___cxa_find_matching_catch": ___cxa_find_matching_catch, "___cxa_allocate_exception": ___cxa_allocate_exception, "__ZSt18uncaught_exceptionv": __ZSt18uncaught_exceptionv, "DYNAMICTOP_PTR": DYNAMICTOP_PTR, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX };
  // EMSCRIPTEN_START_ASM
  var asm = Module["asm"] // EMSCRIPTEN_END_ASM
  (Module.asmGlobalArg, Module.asmLibraryArg, buffer);

  var real__GetSpeechFeatures = asm["_GetSpeechFeatures"];asm["_GetSpeechFeatures"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__GetSpeechFeatures.apply(null, arguments);
  };

  var real__malloc = asm["_malloc"];asm["_malloc"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__malloc.apply(null, arguments);
  };

  var real_stackSave = asm["stackSave"];asm["stackSave"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real_stackSave.apply(null, arguments);
  };

  var real_getTempRet0 = asm["getTempRet0"];asm["getTempRet0"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real_getTempRet0.apply(null, arguments);
  };

  var real__free = asm["_free"];asm["_free"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__free.apply(null, arguments);
  };

  var real_setTempRet0 = asm["setTempRet0"];asm["setTempRet0"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real_setTempRet0.apply(null, arguments);
  };

  var real_establishStackSpace = asm["establishStackSpace"];asm["establishStackSpace"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real_establishStackSpace.apply(null, arguments);
  };

  var real__GetSynthesisFormLength = asm["_GetSynthesisFormLength"];asm["_GetSynthesisFormLength"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__GetSynthesisFormLength.apply(null, arguments);
  };

  var real__GetF0Length = asm["_GetF0Length"];asm["_GetF0Length"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__GetF0Length.apply(null, arguments);
  };

  var real__sbrk = asm["_sbrk"];asm["_sbrk"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__sbrk.apply(null, arguments);
  };

  var real__GetSynthesisForm = asm["_GetSynthesisForm"];asm["_GetSynthesisForm"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__GetSynthesisForm.apply(null, arguments);
  };

  var real__emscripten_get_global_libc = asm["_emscripten_get_global_libc"];asm["_emscripten_get_global_libc"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__emscripten_get_global_libc.apply(null, arguments);
  };

  var real_stackAlloc = asm["stackAlloc"];asm["stackAlloc"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real_stackAlloc.apply(null, arguments);
  };

  var real_setThrew = asm["setThrew"];asm["setThrew"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real_setThrew.apply(null, arguments);
  };

  var real__fflush = asm["_fflush"];asm["_fflush"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__fflush.apply(null, arguments);
  };

  var real_stackRestore = asm["stackRestore"];asm["stackRestore"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real_stackRestore.apply(null, arguments);
  };

  var real____errno_location = asm["___errno_location"];asm["___errno_location"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real____errno_location.apply(null, arguments);
  };

  var real__GetFFTSize = asm["_GetFFTSize"];asm["_GetFFTSize"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return real__GetFFTSize.apply(null, arguments);
  };
  Module["asm"] = asm;
  var _GetSpeechFeatures = Module["_GetSpeechFeatures"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_GetSpeechFeatures"].apply(null, arguments);
  };
  var _malloc = Module["_malloc"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_malloc"].apply(null, arguments);
  };
  var stackSave = Module["stackSave"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["stackSave"].apply(null, arguments);
  };
  var getTempRet0 = Module["getTempRet0"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["getTempRet0"].apply(null, arguments);
  };
  var _free = Module["_free"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_free"].apply(null, arguments);
  };
  var runPostSets = Module["runPostSets"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["runPostSets"].apply(null, arguments);
  };
  var setTempRet0 = Module["setTempRet0"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["setTempRet0"].apply(null, arguments);
  };
  var establishStackSpace = Module["establishStackSpace"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["establishStackSpace"].apply(null, arguments);
  };
  var _GetSynthesisFormLength = Module["_GetSynthesisFormLength"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_GetSynthesisFormLength"].apply(null, arguments);
  };
  var _memset = Module["_memset"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_memset"].apply(null, arguments);
  };
  var _GetF0Length = Module["_GetF0Length"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_GetF0Length"].apply(null, arguments);
  };
  var _sbrk = Module["_sbrk"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_sbrk"].apply(null, arguments);
  };
  var _GetSynthesisForm = Module["_GetSynthesisForm"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_GetSynthesisForm"].apply(null, arguments);
  };
  var _memcpy = Module["_memcpy"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_memcpy"].apply(null, arguments);
  };
  var _emscripten_get_global_libc = Module["_emscripten_get_global_libc"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_emscripten_get_global_libc"].apply(null, arguments);
  };
  var stackAlloc = Module["stackAlloc"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["stackAlloc"].apply(null, arguments);
  };
  var setThrew = Module["setThrew"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["setThrew"].apply(null, arguments);
  };
  var _fflush = Module["_fflush"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_fflush"].apply(null, arguments);
  };
  var stackRestore = Module["stackRestore"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["stackRestore"].apply(null, arguments);
  };
  var ___errno_location = Module["___errno_location"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["___errno_location"].apply(null, arguments);
  };
  var _GetFFTSize = Module["_GetFFTSize"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["_GetFFTSize"].apply(null, arguments);
  };
  var dynCall_iiii = Module["dynCall_iiii"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["dynCall_iiii"].apply(null, arguments);
  };
  var dynCall_viiiii = Module["dynCall_viiiii"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["dynCall_viiiii"].apply(null, arguments);
  };
  var dynCall_vi = Module["dynCall_vi"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["dynCall_vi"].apply(null, arguments);
  };
  var dynCall_ii = Module["dynCall_ii"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["dynCall_ii"].apply(null, arguments);
  };
  var dynCall_v = Module["dynCall_v"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["dynCall_v"].apply(null, arguments);
  };
  var dynCall_viiiiii = Module["dynCall_viiiiii"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["dynCall_viiiiii"].apply(null, arguments);
  };
  var dynCall_viiii = Module["dynCall_viiii"] = function () {
    assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
    assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    return Module["asm"]["dynCall_viiii"].apply(null, arguments);
  };
  ;
  Runtime.stackAlloc = Module['stackAlloc'];
  Runtime.stackSave = Module['stackSave'];
  Runtime.stackRestore = Module['stackRestore'];
  Runtime.establishStackSpace = Module['establishStackSpace'];
  Runtime.setTempRet0 = Module['setTempRet0'];
  Runtime.getTempRet0 = Module['getTempRet0'];

  // === Auto-generated postamble setup entry stuff ===

  Module['asm'] = asm;

  if (memoryInitializer) {
    if (typeof Module['locateFile'] === 'function') {
      memoryInitializer = Module['locateFile'](memoryInitializer);
    } else if (Module['memoryInitializerPrefixURL']) {
      memoryInitializer = Module['memoryInitializerPrefixURL'] + memoryInitializer;
    }
    if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
      var data = Module['readBinary'](memoryInitializer);
      HEAPU8.set(data, Runtime.GLOBAL_BASE);
    } else {
      var doBrowserLoad = function doBrowserLoad() {
        Module['readAsync'](memoryInitializer, applyMemoryInitializer, function () {
          throw 'could not load memory initializer ' + memoryInitializer;
        });
      };

      addRunDependency('memory initializer');
      var applyMemoryInitializer = function applyMemoryInitializer(data) {
        if (data.byteLength) data = new Uint8Array(data);
        for (var i = 0; i < data.length; i++) {
          assert(HEAPU8[Runtime.GLOBAL_BASE + i] === 0, "area for memory initializer should not have been touched before it's loaded");
        }
        HEAPU8.set(data, Runtime.GLOBAL_BASE);
        // Delete the typed array that contains the large blob of the memory initializer request response so that
        // we won't keep unnecessary memory lying around. However, keep the XHR object itself alive so that e.g.
        // its .status field can still be accessed later.
        if (Module['memoryInitializerRequest']) delete Module['memoryInitializerRequest'].response;
        removeRunDependency('memory initializer');
      };

      if (Module['memoryInitializerRequest']) {
        // a network request has already been created, just use that
        var useRequest = function useRequest() {
          var request = Module['memoryInitializerRequest'];
          if (request.status !== 200 && request.status !== 0) {
            // If you see this warning, the issue may be that you are using locateFile or memoryInitializerPrefixURL, and defining them in JS. That
            // means that the HTML file doesn't know about them, and when it tries to create the mem init request early, does it to the wrong place.
            // Look in your browser's devtools network console to see what's going on.
            console.warn('a problem seems to have happened with Module.memoryInitializerRequest, status: ' + request.status + ', retrying ' + memoryInitializer);
            doBrowserLoad();
            return;
          }
          applyMemoryInitializer(request.response);
        };

        if (Module['memoryInitializerRequest'].response) {
          setTimeout(useRequest, 0); // it's already here; but, apply it asynchronously
        } else {
          Module['memoryInitializerRequest'].addEventListener('load', useRequest); // wait for it
        }
      } else {
        // fetch it from the network ourselves
        doBrowserLoad();
      }
    }
  }

  // Modularize mode returns a function, which can be called to
  // create instances. The instances provide a then() method,
  // must like a Promise, that receives a callback. The callback
  // is called when the module is ready to run, with the module
  // as a parameter. (Like a Promise, it also returns the module
  // so you can use the output of .then(..)).
  Module['then'] = function (func) {
    // We may already be ready to run code at this time. if
    // so, just queue a call to the callback.
    if (Module['calledRun']) {
      func(Module);
    } else {
      // we are not ready to call then() yet. we must call it
      // at the same time we would call onRuntimeInitialized.
      var old = Module['onRuntimeInitialized'];
      Module['onRuntimeInitialized'] = function () {
        if (old) old();
        func(Module);
      };
    }
    return Module;
  };

  /**
   * @constructor
   * @extends {Error}
   */
  function ExitStatus(status) {
    this.name = "ExitStatus";
    this.message = "Program terminated with exit(" + status + ")";
    this.status = status;
  };
  ExitStatus.prototype = new Error();
  ExitStatus.prototype.constructor = ExitStatus;

  var initialStackTop;
  var preloadStartTime = null;
  var calledMain = false;

  dependenciesFulfilled = function runCaller() {
    // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
    if (!Module['calledRun']) run();
    if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
  };

  Module['callMain'] = Module.callMain = function callMain(args) {
    assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
    assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

    args = args || [];

    ensureInitRuntime();

    var argc = args.length + 1;
    function pad() {
      for (var i = 0; i < 4 - 1; i++) {
        argv.push(0);
      }
    }
    var argv = [allocate(intArrayFromString(Module['thisProgram']), 'i8', ALLOC_NORMAL)];
    pad();
    for (var i = 0; i < argc - 1; i = i + 1) {
      argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
      pad();
    }
    argv.push(0);
    argv = allocate(argv, 'i32', ALLOC_NORMAL);

    try {

      var ret = Module['_main'](argc, argv, 0);

      // if we're not running an evented main loop, it's time to exit
      exit(ret, /* implicit = */true);
    } catch (e) {
      if (e instanceof ExitStatus) {
        // exit() throws this once it's done to make sure execution
        // has been stopped completely
        return;
      } else if (e == 'SimulateInfiniteLoop') {
        // running an evented main loop, don't immediately exit
        Module['noExitRuntime'] = true;
        return;
      } else {
        var toLog = e;
        if (e && (typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.stack) {
          toLog = [e, e.stack];
        }
        Module.printErr('exception thrown: ' + toLog);
        Module['quit'](1, e);
      }
    } finally {
      calledMain = true;
    }
  };

  /** @type {function(Array=)} */
  function run(args) {
    args = args || Module['arguments'];

    if (preloadStartTime === null) preloadStartTime = Date.now();

    if (runDependencies > 0) {
      return;
    }

    writeStackCookie();

    preRun();

    if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
    if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

    function doRun() {
      if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
      Module['calledRun'] = true;

      if (ABORT) return;

      ensureInitRuntime();

      preMain();

      if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
        Module.printErr('pre-main prep time: ' + (Date.now() - preloadStartTime) + ' ms');
      }

      if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

      if (Module['_main'] && shouldRunNow) Module['callMain'](args);

      postRun();
    }

    if (Module['setStatus']) {
      Module['setStatus']('Running...');
      setTimeout(function () {
        setTimeout(function () {
          Module['setStatus']('');
        }, 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
    checkStackCookie();
  }
  Module['run'] = Module.run = run;

  function exit(status, implicit) {
    if (implicit && Module['noExitRuntime']) {
      Module.printErr('exit(' + status + ') implicitly called by end of main(), but noExitRuntime, so not exiting the runtime (you can use emscripten_force_exit, if you want to force a true shutdown)');
      return;
    }

    if (Module['noExitRuntime']) {
      Module.printErr('exit(' + status + ') called, but noExitRuntime, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)');
    } else {

      ABORT = true;
      EXITSTATUS = status;
      STACKTOP = initialStackTop;

      exitRuntime();

      if (Module['onExit']) Module['onExit'](status);
    }

    if (ENVIRONMENT_IS_NODE) {
      process['exit'](status);
    }
    Module['quit'](status, new ExitStatus(status));
  }
  Module['exit'] = Module.exit = exit;

  var abortDecorators = [];

  function abort(what) {
    if (Module['onAbort']) {
      Module['onAbort'](what);
    }

    if (what !== undefined) {
      Module.print(what);
      Module.printErr(what);
      what = JSON.stringify(what);
    } else {
      what = '';
    }

    ABORT = true;
    EXITSTATUS = 1;

    var extra = '';

    var output = 'abort(' + what + ') at ' + stackTrace() + extra;
    if (abortDecorators) {
      abortDecorators.forEach(function (decorator) {
        output = decorator(output, what);
      });
    }
    throw output;
  }
  Module['abort'] = Module.abort = abort;

  // {{PRE_RUN_ADDITIONS}}

  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
    while (Module['preInit'].length > 0) {
      Module['preInit'].pop()();
    }
  }

  // shouldRunNow refers to calling main(), not run().
  var shouldRunNow = true;
  if (Module['noInitialRun']) {
    shouldRunNow = false;
  }

  run();

  // {{POST_RUN_ADDITIONS}}


  // {{MODULE_ADDITIONS}}


  return Module;
};
if (( false ? 'undefined' : _typeof(module)) === "object" && module.exports) {
  module['exports'] = Module;
};
/* harmony default export */ __webpack_exports__["a"] = (Module);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(4)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzA3ZDUzZDU5Mzk2NGQ3OGM1YmUiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vV29ybGRXZWIuanMiLCJ3ZWJwYWNrOi8vLy4uL3dhc20vd29ybGQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wYXRoLWJyb3dzZXJpZnkvaW5kZXguanMiXSwibmFtZXMiOlsiV29ybGRXZWIiLCJpc0luaXRpYWxpemVkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiRXJyb3IiLCJzdGF0dXNUZXh0IiwiYXJyYXlCdWZmZXIiLCJVaW50OEFycmF5IiwiYnVmZmVyIiwibW9kdWxlQXJncyIsIndhc21CaW5hcnkiLCJiaW5hcnkiLCJvblJ1bnRpbWVJbml0aWFsaXplZCIsImFzc2lnbkZ1bmN0aW9ucyIsIm1vZHVsZSIsIk1vZHVsZSIsImNhdGNoIiwiZXJyIiwiZnVuY3Rpb25zIiwiR2V0RjBMZW5ndGgiLCJjd3JhcCIsIkdldEZGVFNpemUiLCJHZXRTcGVlY2hGZWF0dXJlcyIsIkdldFN5bnRoZXNpc0Zvcm1MZW5ndGgiLCJHZXRTeW50aGVzaXNGb3JtIiwidW5kZWZpbmVkIiwieF9sZW5ndGgiLCJmcyIsImNoZWNrTW9kdWxlRW5hYmxlZCIsIngiLCJmMF9sZW5ndGgiLCJmZnRfc2l6ZSIsImxlbmd0aCIsInBvaW50ZXJfeCIsIl9tYWxsb2MiLCJvZmZzZXRfeCIsIkhFQVBGNjQiLCJzZXQiLCJwb2ludGVyX2YwIiwib2Zmc2V0X2YwIiwicG9pbnRlcl9zcCIsIm9mZnNldF9zcCIsInBvaW50ZXJfYXAiLCJvZmZzZXRfYXAiLCJmMCIsIkZsb2F0NjRBcnJheSIsInNwIiwiYXAiLCJfZnJlZSIsIndvcmxkX3BhcmFtZXRlcnMiLCJtb2R1bGVPdmVycmlkZXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsIkVOVklST05NRU5UX0lTX1dFQiIsIkVOVklST05NRU5UX0lTX1dPUktFUiIsIkVOVklST05NRU5UX0lTX05PREUiLCJFTlZJUk9OTUVOVF9JU19TSEVMTCIsIndpbmRvdyIsImltcG9ydFNjcmlwdHMiLCJwcm9jZXNzIiwiY29uc29sZSIsImxvZyIsIndhcm4iLCJub2RlRlMiLCJub2RlUGF0aCIsInNoZWxsX3JlYWQiLCJmaWxlbmFtZSIsInJlcXVpcmUiLCJyZXQiLCJ0b1N0cmluZyIsInJlYWRCaW5hcnkiLCJhc3NlcnQiLCJsb2FkIiwiZiIsImdsb2JhbEV2YWwiLCJyZWFkIiwicmVwbGFjZSIsInNsaWNlIiwiZXgiLCJFeGl0U3RhdHVzIiwicHJpbnQiLCJwcmludEVyciIsInJlYWRidWZmZXIiLCJkYXRhIiwic2NyaXB0QXJncyIsImFyZ3VtZW50cyIsInF1aXQiLCJzdGF0dXMiLCJ0b1Rocm93IiwidXJsIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2VuZCIsInJlc3BvbnNlVGV4dCIsInJlc3BvbnNlVHlwZSIsInJlYWRBc3luYyIsIm9ubG9hZCIsIm9uZXJyb3IiLCJ4aHJfb25sb2FkIiwic2hlbGxfcHJpbnQiLCJzaGVsbF9wcmludEVyciIsIlRSWV9VU0VfRFVNUCIsImR1bXAiLCJ0aXRsZSIsImRvY3VtZW50IiwiZXZhbCIsImNhbGwiLCJSdW50aW1lIiwic2V0VGVtcFJldDAiLCJ2YWx1ZSIsInRlbXBSZXQwIiwiZ2V0VGVtcFJldDAiLCJzdGFja1NhdmUiLCJTVEFDS1RPUCIsInN0YWNrUmVzdG9yZSIsInN0YWNrVG9wIiwiZ2V0TmF0aXZlVHlwZVNpemUiLCJ0eXBlIiwiUVVBTlRVTV9TSVpFIiwiYml0cyIsInBhcnNlSW50Iiwic3Vic3RyIiwiZ2V0TmF0aXZlRmllbGRTaXplIiwiTWF0aCIsIm1heCIsIlNUQUNLX0FMSUdOIiwicHJlcFZhcmFyZyIsInB0ciIsImdldEFsaWduU2l6ZSIsInNpemUiLCJ2YXJhcmciLCJtaW4iLCJkeW5DYWxsIiwic2lnIiwiYXJncyIsImFwcGx5IiwiY29uY2F0IiwiZnVuY3Rpb25Qb2ludGVycyIsImFkZEZ1bmN0aW9uIiwiZnVuYyIsImkiLCJyZW1vdmVGdW5jdGlvbiIsImluZGV4Iiwid2Fybk9uY2UiLCJ0ZXh0Iiwic2hvd24iLCJmdW5jV3JhcHBlcnMiLCJnZXRGdW5jV3JhcHBlciIsInNpZ0NhY2hlIiwiZHluQ2FsbF93cmFwcGVyIiwiYXJnIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJnZXRDb21waWxlclNldHRpbmciLCJuYW1lIiwic3RhY2tBbGxvYyIsIlNUQUNLX01BWCIsInN0YXRpY0FsbG9jIiwiU1RBVElDVE9QIiwic3RhdGljU2VhbGVkIiwiZHluYW1pY0FsbG9jIiwiRFlOQU1JQ1RPUF9QVFIiLCJIRUFQMzIiLCJlbmQiLCJUT1RBTF9NRU1PUlkiLCJzdWNjZXNzIiwiZW5sYXJnZU1lbW9yeSIsImFsaWduTWVtb3J5IiwicXVhbnR1bSIsImNlaWwiLCJtYWtlQmlnSW50IiwibG93IiwiaGlnaCIsInVuc2lnbmVkIiwiR0xPQkFMX0JBU0UiLCJfX2R1bW15X18iLCJBQk9SVCIsIkVYSVRTVEFUVVMiLCJjb25kaXRpb24iLCJhYm9ydCIsImdsb2JhbFNjb3BlIiwiZ2V0Q0Z1bmMiLCJpZGVudCIsImUiLCJjY2FsbCIsIkpTZnVuY3MiLCJhcnIiLCJ3cml0ZUFycmF5VG9NZW1vcnkiLCJzdHIiLCJsZW4iLCJzdHJpbmdUb1VURjgiLCJ0b0MiLCJjY2FsbEZ1bmMiLCJyZXR1cm5UeXBlIiwiYXJnVHlwZXMiLCJvcHRzIiwiY0FyZ3MiLCJzdGFjayIsImNvbnZlcnRlciIsImFzeW5jIiwiRW10ZXJwcmV0ZXJBc3luYyIsInN0YXRlIiwiUG9pbnRlcl9zdHJpbmdpZnkiLCJhc3luY0ZpbmFsaXplcnMiLCJwdXNoIiwic291cmNlUmVnZXgiLCJwYXJzZUpTRnVuYyIsImpzZnVuYyIsInBhcnNlZCIsIm1hdGNoIiwiYm9keSIsInJldHVyblZhbHVlIiwiSlNzb3VyY2UiLCJlbnN1cmVKU3NvdXJjZSIsImZ1biIsImNmdW5jIiwibnVtZXJpY0FyZ3MiLCJldmVyeSIsIm51bWVyaWNSZXQiLCJhcmdOYW1lcyIsIm1hcCIsImZ1bmNzdHIiLCJqb2luIiwibmFyZ3MiLCJjb252ZXJ0Q29kZSIsImNmdW5jbmFtZSIsInN0cmdmeSIsInNldFZhbHVlIiwibm9TYWZlIiwiY2hhckF0IiwiSEVBUDgiLCJIRUFQMTYiLCJ0ZW1wSTY0IiwidGVtcERvdWJsZSIsIk1hdGhfYWJzIiwiTWF0aF9taW4iLCJNYXRoX2Zsb29yIiwiTWF0aF9jZWlsIiwiSEVBUEYzMiIsImdldFZhbHVlIiwiQUxMT0NfTk9STUFMIiwiQUxMT0NfU1RBQ0siLCJBTExPQ19TVEFUSUMiLCJBTExPQ19EWU5BTUlDIiwiQUxMT0NfTk9ORSIsImFsbG9jYXRlIiwic2xhYiIsInR5cGVzIiwiYWxsb2NhdG9yIiwiemVyb2luaXQiLCJzaW5nbGVUeXBlIiwic3RvcCIsInN1YmFycmF5IiwiSEVBUFU4IiwidHlwZVNpemUiLCJwcmV2aW91c1R5cGUiLCJjdXJyIiwiZ2V0RnVuY3Rpb25JbmRleCIsImdldE1lbW9yeSIsInJ1bnRpbWVJbml0aWFsaXplZCIsImhhc1V0ZiIsInQiLCJNQVhfQ0hVTksiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJBc2NpaVRvU3RyaW5nIiwiY2giLCJzdHJpbmdUb0FzY2lpIiwib3V0UHRyIiwid3JpdGVBc2NpaVRvTWVtb3J5IiwiVVRGOERlY29kZXIiLCJUZXh0RGVjb2RlciIsIlVURjhBcnJheVRvU3RyaW5nIiwidThBcnJheSIsImlkeCIsImVuZFB0ciIsImRlY29kZSIsInUwIiwidTEiLCJ1MiIsInUzIiwidTQiLCJ1NSIsIlVURjhUb1N0cmluZyIsInN0cmluZ1RvVVRGOEFycmF5Iiwib3V0VThBcnJheSIsIm91dElkeCIsIm1heEJ5dGVzVG9Xcml0ZSIsInN0YXJ0SWR4IiwiZW5kSWR4IiwidSIsImNoYXJDb2RlQXQiLCJsZW5ndGhCeXRlc1VURjgiLCJVVEYxNkRlY29kZXIiLCJVVEYxNlRvU3RyaW5nIiwiY29kZVVuaXQiLCJzdHJpbmdUb1VURjE2Iiwic3RhcnRQdHIiLCJudW1DaGFyc1RvV3JpdGUiLCJsZW5ndGhCeXRlc1VURjE2IiwiVVRGMzJUb1N0cmluZyIsInV0ZjMyIiwic3RyaW5nVG9VVEYzMiIsInRyYWlsU3Vycm9nYXRlIiwibGVuZ3RoQnl0ZXNVVEYzMiIsImRlbWFuZ2xlIiwiX19jeGFfZGVtYW5nbGVfZnVuYyIsInMiLCJidWYiLCJkZW1hbmdsZUFsbCIsInJlZ2V4IiwieSIsImpzU3RhY2tUcmFjZSIsInN0YWNrVHJhY2UiLCJqcyIsIlBBR0VfU0laRSIsIldBU01fUEFHRV9TSVpFIiwiQVNNSlNfUEFHRV9TSVpFIiwiTUlOX1RPVEFMX01FTU9SWSIsImFsaWduVXAiLCJtdWx0aXBsZSIsIkhFQVAiLCJIRUFQVTE2IiwiSEVBUFUzMiIsInVwZGF0ZUdsb2JhbEJ1ZmZlciIsInVwZGF0ZUdsb2JhbEJ1ZmZlclZpZXdzIiwiSW50OEFycmF5IiwiSW50MTZBcnJheSIsIkludDMyQXJyYXkiLCJVaW50MTZBcnJheSIsIlVpbnQzMkFycmF5IiwiRmxvYXQzMkFycmF5IiwiU1RBVElDX0JBU0UiLCJTVEFDS19CQVNFIiwiRFlOQU1JQ19CQVNFIiwid3JpdGVTdGFja0Nvb2tpZSIsImNoZWNrU3RhY2tDb29raWUiLCJhYm9ydFN0YWNrT3ZlcmZsb3ciLCJhbGxvY1NpemUiLCJhYm9ydE9uQ2Fubm90R3Jvd01lbW9yeSIsIlRPVEFMX1NUQUNLIiwiYnl0ZUxlbmd0aCIsIldlYkFzc2VtYmx5IiwiTWVtb3J5IiwiQXJyYXlCdWZmZXIiLCJnZXRUb3RhbE1lbW9yeSIsImNhbGxSdW50aW1lQ2FsbGJhY2tzIiwiY2FsbGJhY2tzIiwiY2FsbGJhY2siLCJzaGlmdCIsIl9fQVRQUkVSVU5fXyIsIl9fQVRJTklUX18iLCJfX0FUTUFJTl9fIiwiX19BVEVYSVRfXyIsIl9fQVRQT1NUUlVOX18iLCJydW50aW1lRXhpdGVkIiwicHJlUnVuIiwiYWRkT25QcmVSdW4iLCJlbnN1cmVJbml0UnVudGltZSIsInByZU1haW4iLCJleGl0UnVudGltZSIsInBvc3RSdW4iLCJhZGRPblBvc3RSdW4iLCJjYiIsInVuc2hpZnQiLCJhZGRPbkluaXQiLCJhZGRPblByZU1haW4iLCJhZGRPbkV4aXQiLCJpbnRBcnJheUZyb21TdHJpbmciLCJzdHJpbmd5IiwiZG9udEFkZE51bGwiLCJ1OGFycmF5IiwibnVtQnl0ZXNXcml0dGVuIiwiaW50QXJyYXlUb1N0cmluZyIsImFycmF5IiwiY2hyIiwid3JpdGVTdHJpbmdUb01lbW9yeSIsInN0cmluZyIsImxhc3RDaGFyIiwiSW5maW5pdHkiLCJ1blNpZ24iLCJpZ25vcmUiLCJhYnMiLCJwb3ciLCJyZVNpZ24iLCJoYWxmIiwiaW11bCIsImEiLCJiIiwiYWgiLCJhbCIsImJoIiwiYmwiLCJmcm91bmRCdWZmZXIiLCJmcm91bmQiLCJjbHozMiIsImZsb29yIiwidHJ1bmMiLCJNYXRoX2NvcyIsImNvcyIsIk1hdGhfc2luIiwic2luIiwiTWF0aF90YW4iLCJ0YW4iLCJNYXRoX2Fjb3MiLCJhY29zIiwiTWF0aF9hc2luIiwiYXNpbiIsIk1hdGhfYXRhbiIsImF0YW4iLCJNYXRoX2F0YW4yIiwiYXRhbjIiLCJNYXRoX2V4cCIsImV4cCIsIk1hdGhfbG9nIiwiTWF0aF9zcXJ0Iiwic3FydCIsIk1hdGhfcG93IiwiTWF0aF9pbXVsIiwiTWF0aF9mcm91bmQiLCJNYXRoX3JvdW5kIiwicm91bmQiLCJNYXRoX2NsejMyIiwiTWF0aF90cnVuYyIsInJ1bkRlcGVuZGVuY2llcyIsInJ1bkRlcGVuZGVuY3lXYXRjaGVyIiwiZGVwZW5kZW5jaWVzRnVsZmlsbGVkIiwicnVuRGVwZW5kZW5jeVRyYWNraW5nIiwiZ2V0VW5pcXVlUnVuRGVwZW5kZW5jeSIsImlkIiwib3JpZyIsInJhbmRvbSIsImFkZFJ1bkRlcGVuZGVuY3kiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJkZXAiLCJyZW1vdmVSdW5EZXBlbmRlbmN5IiwibWVtb3J5SW5pdGlhbGl6ZXIiLCJGUyIsImVycm9yIiwiaW5pdCIsImNyZWF0ZURhdGFGaWxlIiwiY3JlYXRlUHJlbG9hZGVkRmlsZSIsImNyZWF0ZUxhenlGaWxlIiwibWtkZXYiLCJyZWdpc3RlckRldmljZSIsImFuYWx5emVQYXRoIiwibG9hZEZpbGVzRnJvbURCIiwiRXJybm9FcnJvciIsImludGVncmF0ZVdhc21KUyIsIm1ldGhvZCIsIndhc21UZXh0RmlsZSIsIndhc21CaW5hcnlGaWxlIiwiYXNtanNDb2RlRmlsZSIsIndhc21QYWdlU2l6ZSIsImFzbTJ3YXNtSW1wb3J0cyIsImluZm8iLCJleHBvcnRzIiwibG9va3VwSW1wb3J0IiwibW9kIiwiYmFzZSIsImxvb2t1cCIsImluZGV4T2YiLCJwYXJ0cyIsInNwbGl0IiwibWVyZ2VNZW1vcnkiLCJuZXdCdWZmZXIiLCJvbGRCdWZmZXIiLCJvbGRWaWV3IiwibmV3VmlldyIsIldhc21UeXBlcyIsIm5vbmUiLCJpMzIiLCJpNjQiLCJmMzIiLCJmNjQiLCJmaXhJbXBvcnRzIiwiaW1wb3J0cyIsImZpeGVkIiwiZ2V0QmluYXJ5IiwiZ2V0QmluYXJ5UHJvbWlzZSIsImNyZWRlbnRpYWxzIiwiZG9KdXN0QXNtIiwiZ2xvYmFsIiwiZW52IiwicHJvdmlkZWRCdWZmZXIiLCJtZXRob2RIYW5kbGVyIiwiZG9OYXRpdmVXYXNtIiwiTmFOIiwicmVjZWl2ZUluc3RhbmNlIiwiaW5zdGFuY2UiLCJtZW1vcnkiLCJpbnN0YW50aWF0ZSIsIm91dHB1dCIsInJlYXNvbiIsImRvV2FzbVBvbHlmaWxsIiwiV2FzbUpTIiwid2FzbUpTIiwiY29kZSIsInRlbXAiLCJhc21qc1JlYWxsb2NCdWZmZXIiLCJ3YXNtUmVhbGxvY0J1ZmZlciIsIlBBR0VfTVVMVElQTEUiLCJvbGQiLCJvbGRTaXplIiwicmVzdWx0IiwiZ3JvdyIsImZpbmFsTWV0aG9kIiwiVEFCTEVfU0laRSIsIk1BWF9UQUJMRV9TSVpFIiwiVGFibGUiLCJlbGVtZW50IiwiQVNNX0NPTlNUUyIsIlNUQVRJQ19CVU1QIiwidGVtcERvdWJsZVB0ciIsImNvcHlUZW1wRmxvYXQiLCJjb3B5VGVtcERvdWJsZSIsIl9fWlN0MTh1bmNhdWdodF9leGNlcHRpb252IiwidW5jYXVnaHRfZXhjZXB0aW9uIiwiRVhDRVBUSU9OUyIsImxhc3QiLCJjYXVnaHQiLCJpbmZvcyIsImRlQWRqdXN0IiwiYWRqdXN0ZWQiLCJhZGRSZWYiLCJyZWZjb3VudCIsImRlY1JlZiIsInJldGhyb3duIiwiZGVzdHJ1Y3RvciIsIl9fX2N4YV9mcmVlX2V4Y2VwdGlvbiIsImNsZWFyUmVmIiwiX19fcmVzdW1lRXhjZXB0aW9uIiwiX19fY3hhX2ZpbmRfbWF0Y2hpbmdfY2F0Y2giLCJ0aHJvd24iLCJ0aHJvd250eXBlIiwidHlwZUFycmF5IiwicG9pbnRlciIsIl9fX2N4YV90aHJvdyIsIl9fX2xvY2siLCJfX191bmxvY2siLCJfbGx2bV9wb3dfZjY0IiwiX19fc2V0RXJyTm8iLCJTWVNDQUxMUyIsInZhcmFyZ3MiLCJnZXQiLCJnZXRTdHIiLCJnZXQ2NCIsImdldFplcm8iLCJfX19zeXNjYWxsMTQ2Iiwid2hpY2giLCJzdHJlYW0iLCJpb3YiLCJpb3ZjbnQiLCJidWZmZXJzIiwicHJpbnRDaGFyIiwiaiIsImVycm5vIiwiX19fZ3h4X3BlcnNvbmFsaXR5X3YwIiwiX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZyIsImRlc3QiLCJzcmMiLCJudW0iLCJfX19zeXNjYWxsMTQwIiwiZ2V0U3RyZWFtRnJvbUZEIiwib2Zmc2V0X2hpZ2giLCJvZmZzZXRfbG93Iiwid2hlbmNlIiwib2Zmc2V0IiwibGxzZWVrIiwicG9zaXRpb24iLCJnZXRkZW50cyIsIl9fX3N5c2NhbGw2IiwiY2xvc2UiLCJfX19jeGFfYWxsb2NhdGVfZXhjZXB0aW9uIiwiX19fc3lzY2FsbDU0IiwiZmZsdXNoIiwibnVsbEZ1bmNfaWlpaSIsIm51bGxGdW5jX3ZpaWlpaSIsIm51bGxGdW5jX3ZpIiwibnVsbEZ1bmNfaWkiLCJudWxsRnVuY192IiwibnVsbEZ1bmNfdmlpaWlpaSIsIm51bGxGdW5jX3ZpaWlpIiwiaW52b2tlX2lpaWkiLCJhMSIsImEyIiwiYTMiLCJpbnZva2VfdmlpaWlpIiwiYTQiLCJhNSIsImludm9rZV92aSIsImludm9rZV9paSIsImludm9rZV92IiwiaW52b2tlX3ZpaWlpaWkiLCJhNiIsImludm9rZV92aWlpaSIsImFzbUdsb2JhbEFyZyIsImFzbUxpYnJhcnlBcmciLCJhc20iLCJyZWFsX19HZXRTcGVlY2hGZWF0dXJlcyIsInJlYWxfX21hbGxvYyIsInJlYWxfc3RhY2tTYXZlIiwicmVhbF9nZXRUZW1wUmV0MCIsInJlYWxfX2ZyZWUiLCJyZWFsX3NldFRlbXBSZXQwIiwicmVhbF9lc3RhYmxpc2hTdGFja1NwYWNlIiwicmVhbF9fR2V0U3ludGhlc2lzRm9ybUxlbmd0aCIsInJlYWxfX0dldEYwTGVuZ3RoIiwicmVhbF9fc2JyayIsInJlYWxfX0dldFN5bnRoZXNpc0Zvcm0iLCJyZWFsX19lbXNjcmlwdGVuX2dldF9nbG9iYWxfbGliYyIsInJlYWxfc3RhY2tBbGxvYyIsInJlYWxfc2V0VGhyZXciLCJyZWFsX19mZmx1c2giLCJyZWFsX3N0YWNrUmVzdG9yZSIsInJlYWxfX19fZXJybm9fbG9jYXRpb24iLCJyZWFsX19HZXRGRlRTaXplIiwiX0dldFNwZWVjaEZlYXR1cmVzIiwicnVuUG9zdFNldHMiLCJlc3RhYmxpc2hTdGFja1NwYWNlIiwiX0dldFN5bnRoZXNpc0Zvcm1MZW5ndGgiLCJfbWVtc2V0IiwiX0dldEYwTGVuZ3RoIiwiX3NicmsiLCJfR2V0U3ludGhlc2lzRm9ybSIsIl9tZW1jcHkiLCJfZW1zY3JpcHRlbl9nZXRfZ2xvYmFsX2xpYmMiLCJzZXRUaHJldyIsIl9mZmx1c2giLCJfX19lcnJub19sb2NhdGlvbiIsIl9HZXRGRlRTaXplIiwiZHluQ2FsbF9paWlpIiwiZHluQ2FsbF92aWlpaWkiLCJkeW5DYWxsX3ZpIiwiZHluQ2FsbF9paSIsImR5bkNhbGxfdiIsImR5bkNhbGxfdmlpaWlpaSIsImR5bkNhbGxfdmlpaWkiLCJkb0Jyb3dzZXJMb2FkIiwiYXBwbHlNZW1vcnlJbml0aWFsaXplciIsInVzZVJlcXVlc3QiLCJyZXF1ZXN0Iiwic2V0VGltZW91dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtZXNzYWdlIiwiY29uc3RydWN0b3IiLCJpbml0aWFsU3RhY2tUb3AiLCJwcmVsb2FkU3RhcnRUaW1lIiwiY2FsbGVkTWFpbiIsInJ1bkNhbGxlciIsInJ1biIsImNhbGxNYWluIiwiYXJnYyIsInBhZCIsImFyZ3YiLCJleGl0IiwidG9Mb2ciLCJEYXRlIiwibm93IiwiZG9SdW4iLCJzaG91bGRSdW5Ob3ciLCJpbXBsaWNpdCIsImFib3J0RGVjb3JhdG9ycyIsIndoYXQiLCJKU09OIiwic3RyaW5naWZ5IiwiZXh0cmEiLCJmb3JFYWNoIiwiZGVjb3JhdG9yIiwicG9wIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Es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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzA3ZDUzZDU5Mzk2NGQ3OGM1YmUiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgTW9kdWxlIGZyb20gJy4uL3dhc20vd29ybGQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JsZFdlYiB7XG4gICAgc3RhdGljIEluaXRpYWxpemUoKSB7XG4gICAgICAgIFdvcmxkV2ViLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZmV0Y2goJy4vd2FzbS93b3JsZC53YXNtJykgLy8gZ2gtcGFnZXPlkJHjgZFcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihidWZmZXIgPT4gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcbiAgICAgICAgICAgIC50aGVuKGJpbmFyeSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1vZHVsZUFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHdhc21CaW5hcnk6IGJpbmFyeSxcbiAgICAgICAgICAgICAgICAgICAgb25SdW50aW1lSW5pdGlhbGl6ZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFdvcmxkV2ViLmFzc2lnbkZ1bmN0aW9ucygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgV29ybGRXZWIuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdvcmxkV2ViLm1vZHVsZSA9IE1vZHVsZShtb2R1bGVBcmdzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBhc3NpZ25GdW5jdGlvbnMoKSB7XG4gICAgICAgIGlmIChXb3JsZFdlYi5pc0luaXRpYWxpemVkKSByZXR1cm47XG5cbiAgICAgICAgV29ybGRXZWIuZnVuY3Rpb25zID0ge307XG4gICAgICAgIC8vIGludCBHZXRGMExlbmd0aChpbnQgeF9sZW5ndGgsIGludCBmcylcbiAgICAgICAgV29ybGRXZWIuZnVuY3Rpb25zLkdldEYwTGVuZ3RoID0gV29ybGRXZWIubW9kdWxlLmN3cmFwKCdHZXRGMExlbmd0aCcsICdudW1iZXInLCBbJ251bWJlcicsICdudW1iZXInXSk7XG4gICAgICAgIC8vIGludCBHZXRGRlRTaXplKGludCBmcylcbiAgICAgICAgV29ybGRXZWIuZnVuY3Rpb25zLkdldEZGVFNpemUgPSBXb3JsZFdlYi5tb2R1bGUuY3dyYXAoJ0dldEZGVFNpemUnLCAnbnVtYmVyJywgWydudW1iZXInXSk7XG4gICAgICAgIC8vIHZvaWQgR2V0U3BlZWNoRmVhdHVyZXMoY29uc3QgZG91YmxlKiB4LCBpbnQgeF9sZW5ndGgsIGludCBmcywgZG91YmxlKiBmMCwgaW50IGYwX2xlbmd0aCwgZG91YmxlKiBzcCwgZG91YmxlICphcCwgaW50IGZmdF9zaXplKVxuICAgICAgICBXb3JsZFdlYi5mdW5jdGlvbnMuR2V0U3BlZWNoRmVhdHVyZXMgPSBXb3JsZFdlYi5tb2R1bGUuY3dyYXAoJ0dldFNwZWVjaEZlYXR1cmVzJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ251bWJlcicsICdudW1iZXInLCAnbnVtYmVyJywgJ251bWJlcicsICdudW1iZXInLCAnbnVtYmVyJywgJ251bWJlciddKTtcbiAgICAgICAgLy8gaW50IEdldFN5bnRoZXNpc0Zvcm1MZW5ndGgoaW50IGYwX2xlbmd0aCwgaW50IGZzKVxuICAgICAgICBXb3JsZFdlYi5mdW5jdGlvbnMuR2V0U3ludGhlc2lzRm9ybUxlbmd0aCA9IFdvcmxkV2ViLm1vZHVsZS5jd3JhcCgnR2V0U3ludGhlc2lzRm9ybUxlbmd0aCcsICdudW1iZXInLCBbJ251bWJlcicsICdudW1iZXInXSk7XG4gICAgICAgIC8vIHZvaWQgR2V0U3ludGhlc2lzRm9ybShpbnQgZnMsIGNvbnN0IGRvdWJsZSogZjAsIGludCBmMF9sZW5ndGgsIGNvbnN0IGRvdWJsZSogc3AsIGNvbnN0IGRvdWJsZSogYXAsIGludCBmZnRfc2l6ZSwgZG91YmxlKiB5LCBpbnQgeV9sZW5ndGgpXG4gICAgICAgIFdvcmxkV2ViLmZ1bmN0aW9ucy5HZXRTeW50aGVzaXNGb3JtID0gV29ybGRXZWIubW9kdWxlLmN3cmFwKCdHZXRTeW50aGVzaXNGb3JtJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ251bWJlcicsICdudW1iZXInLCAnbnVtYmVyJywgJ251bWJlcicsICdudW1iZXInLCAnbnVtYmVyJywgJ251bWJlciddKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hlY2tNb2R1bGVFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gV29ybGRXZWIuaXNJbml0aWFsaXplZCAmJiBXb3JsZFdlYi5mdW5jdGlvbnMgIT0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN0YXRpYyBHZXRGMExlbmd0aCh4X2xlbmd0aCwgZnMpIHtcbiAgICAgICAgaWYgKCFXb3JsZFdlYi5jaGVja01vZHVsZUVuYWJsZWQoKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBXb3JsZFdlYi5mdW5jdGlvbnMuR2V0RjBMZW5ndGgoeF9sZW5ndGgsIGZzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgR2V0RkZUU2l6ZShmcykge1xuICAgICAgICBpZiAoIVdvcmxkV2ViLmNoZWNrTW9kdWxlRW5hYmxlZCgpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIFdvcmxkV2ViLmZ1bmN0aW9ucy5HZXRGRlRTaXplKGZzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgR2V0U3BlZWNoRmVhdHVyZXMoeCwgZnMsIGYwX2xlbmd0aCwgZmZ0X3NpemUpIHtcbiAgICAgICAgaWYgKCFXb3JsZFdlYi5jaGVja01vZHVsZUVuYWJsZWQoKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmIChmMF9sZW5ndGggPT09IHVuZGVmaW5lZCkgZjBfbGVuZ3RoID0gV29ybGRXZWIuR2V0RjBMZW5ndGgoeC5sZW5ndGgsIGZzKTtcbiAgICAgICAgaWYgKGZmdF9zaXplID09PSB1bmRlZmluZWQpIGZmdF9zaXplID0gV29ybGRXZWIuR2V0RkZUU2l6ZShmcyk7XG5cbiAgICAgICAgLy8gWCAtIGlucHV0IHdhdmVmb3JtXG4gICAgICAgIGxldCBwb2ludGVyX3ggPSBXb3JsZFdlYi5tb2R1bGUuX21hbGxvYyh4Lmxlbmd0aCAqIDgpOyAvLyA2NGJpdCA9PiA4Ynl0ZVxuICAgICAgICBsZXQgb2Zmc2V0X3ggPSBwb2ludGVyX3ggLyA4O1xuICAgICAgICBXb3JsZFdlYi5tb2R1bGUuSEVBUEY2NC5zZXQoeCwgb2Zmc2V0X3gpO1xuXG4gICAgICAgIC8vIEYwXG4gICAgICAgIGxldCBwb2ludGVyX2YwID0gV29ybGRXZWIubW9kdWxlLl9tYWxsb2MoZjBfbGVuZ3RoICogOCk7XG4gICAgICAgIGxldCBvZmZzZXRfZjAgPSBwb2ludGVyX2YwIC8gODtcblxuICAgICAgICAvLyBTcGVjdHJvZ3JhbVxuICAgICAgICBsZXQgcG9pbnRlcl9zcCA9IFdvcmxkV2ViLm1vZHVsZS5fbWFsbG9jKChmMF9sZW5ndGggKiAoZmZ0X3NpemUgLyAyICsgMSkpICogOCk7XG4gICAgICAgIGxldCBvZmZzZXRfc3AgPSBwb2ludGVyX3NwIC8gODtcblxuICAgICAgICAvLyBGMFxuICAgICAgICBsZXQgcG9pbnRlcl9hcCA9IFdvcmxkV2ViLm1vZHVsZS5fbWFsbG9jKChmMF9sZW5ndGggKiAoZmZ0X3NpemUgLyAyICsgMSkpICogOCk7XG4gICAgICAgIGxldCBvZmZzZXRfYXAgPSBwb2ludGVyX2FwIC8gODtcblxuICAgICAgICBXb3JsZFdlYi5mdW5jdGlvbnMuR2V0U3BlZWNoRmVhdHVyZXMocG9pbnRlcl94LCB4Lmxlbmd0aCwgZnMsIHBvaW50ZXJfZjAsIGYwX2xlbmd0aCwgcG9pbnRlcl9zcCwgcG9pbnRlcl9hcCwgZmZ0X3NpemUpO1xuXG4gICAgICAgIC8vIEhlYXAgdG8gSlMgVHlwZWRBcnJheVxuICAgICAgICBsZXQgZjAgPSBuZXcgRmxvYXQ2NEFycmF5KFdvcmxkV2ViLm1vZHVsZS5IRUFQRjY0LmJ1ZmZlciwgcG9pbnRlcl9mMCwgZjBfbGVuZ3RoKTtcbiAgICAgICAgbGV0IHNwID0gbmV3IEZsb2F0NjRBcnJheShXb3JsZFdlYi5tb2R1bGUuSEVBUEY2NC5idWZmZXIsIHBvaW50ZXJfc3AsIGYwX2xlbmd0aCAqIChmZnRfc2l6ZSAvIDIgKyAxKSk7XG4gICAgICAgIGxldCBhcCA9IG5ldyBGbG9hdDY0QXJyYXkoV29ybGRXZWIubW9kdWxlLkhFQVBGNjQuYnVmZmVyLCBwb2ludGVyX2FwLCBmMF9sZW5ndGggKiAoZmZ0X3NpemUgLyAyICsgMSkpO1xuXG4gICAgICAgIC8vIEZyZWUgbWVtb3J5XG4gICAgICAgIFdvcmxkV2ViLm1vZHVsZS5fZnJlZShwb2ludGVyX3gpO1xuICAgICAgICBXb3JsZFdlYi5tb2R1bGUuX2ZyZWUocG9pbnRlcl9mMCk7XG4gICAgICAgIFdvcmxkV2ViLm1vZHVsZS5fZnJlZShwb2ludGVyX3NwKTtcbiAgICAgICAgV29ybGRXZWIubW9kdWxlLl9mcmVlKHBvaW50ZXJfYXApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmczogZnMsXG4gICAgICAgICAgICBmMF9sZW5ndGg6IGYwX2xlbmd0aCxcbiAgICAgICAgICAgIGZmdF9zaXplOiBmZnRfc2l6ZSxcbiAgICAgICAgICAgIGYwOiBmMCxcbiAgICAgICAgICAgIHNwOiBzcCxcbiAgICAgICAgICAgIGFwOiBhcFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBHZXRTeW50aGVzaXNGb3JtTGVuZ3RoKGYwX2xlbmd0aCwgZnMpIHtcbiAgICAgICAgaWYgKCFXb3JsZFdlYi5jaGVja01vZHVsZUVuYWJsZWQoKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBXb3JsZFdlYi5mdW5jdGlvbnMuR2V0U3ludGhlc2lzRm9ybUxlbmd0aChmMF9sZW5ndGgsIGZzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgR2V0U3ludGhlc2lzRm9ybSh3b3JsZF9wYXJhbWV0ZXJzKSB7XG5cbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vV29ybGRXZWIuanMiLCJ2YXIgTW9kdWxlID0gZnVuY3Rpb24oTW9kdWxlKSB7XG4gIE1vZHVsZSA9IE1vZHVsZSB8fCB7fTtcbiAgdmFyIE1vZHVsZSA9IE1vZHVsZTtcblxuLy8gVGhlIE1vZHVsZSBvYmplY3Q6IE91ciBpbnRlcmZhY2UgdG8gdGhlIG91dHNpZGUgd29ybGQuIFdlIGltcG9ydFxuLy8gYW5kIGV4cG9ydCB2YWx1ZXMgb24gaXQsIGFuZCBkbyB0aGUgd29yayB0byBnZXQgdGhhdCB0aHJvdWdoXG4vLyBjbG9zdXJlIGNvbXBpbGVyIGlmIG5lY2Vzc2FyeS4gVGhlcmUgYXJlIHZhcmlvdXMgd2F5cyBNb2R1bGUgY2FuIGJlIHVzZWQ6XG4vLyAxLiBOb3QgZGVmaW5lZC4gV2UgY3JlYXRlIGl0IGhlcmVcbi8vIDIuIEEgZnVuY3Rpb24gcGFyYW1ldGVyLCBmdW5jdGlvbihNb2R1bGUpIHsgLi5nZW5lcmF0ZWQgY29kZS4uIH1cbi8vIDMuIHByZS1ydW4gYXBwZW5kZWQgaXQsIHZhciBNb2R1bGUgPSB7fTsgLi5nZW5lcmF0ZWQgY29kZS4uXG4vLyA0LiBFeHRlcm5hbCBzY3JpcHQgdGFnIGRlZmluZXMgdmFyIE1vZHVsZS5cbi8vIFdlIG5lZWQgdG8gZG8gYW4gZXZhbCBpbiBvcmRlciB0byBoYW5kbGUgdGhlIGNsb3N1cmUgY29tcGlsZXJcbi8vIGNhc2UsIHdoZXJlIHRoaXMgY29kZSBoZXJlIGlzIG1pbmlmaWVkIGJ1dCBNb2R1bGUgd2FzIGRlZmluZWRcbi8vIGVsc2V3aGVyZSAoZS5nLiBjYXNlIDQgYWJvdmUpLiBXZSBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgTW9kdWxlXG4vLyBhbHJlYWR5IGV4aXN0cyAoZS5nLiBjYXNlIDMgYWJvdmUpLlxuLy8gTm90ZSB0aGF0IGlmIHlvdSB3YW50IHRvIHJ1biBjbG9zdXJlLCBhbmQgYWxzbyB0byB1c2UgTW9kdWxlXG4vLyBhZnRlciB0aGUgZ2VuZXJhdGVkIGNvZGUsIHlvdSB3aWxsIG5lZWQgdG8gZGVmaW5lICAgdmFyIE1vZHVsZSA9IHt9O1xuLy8gYmVmb3JlIHRoZSBjb2RlLiBUaGVuIHRoYXQgb2JqZWN0IHdpbGwgYmUgdXNlZCBpbiB0aGUgY29kZSwgYW5kIHlvdVxuLy8gY2FuIGNvbnRpbnVlIHRvIHVzZSBNb2R1bGUgYWZ0ZXJ3YXJkcyBhcyB3ZWxsLlxudmFyIE1vZHVsZTtcbmlmICghTW9kdWxlKSBNb2R1bGUgPSAodHlwZW9mIE1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBNb2R1bGUgOiBudWxsKSB8fCB7fTtcblxuLy8gU29tZXRpbWVzIGFuIGV4aXN0aW5nIE1vZHVsZSBvYmplY3QgZXhpc3RzIHdpdGggcHJvcGVydGllc1xuLy8gbWVhbnQgdG8gb3ZlcndyaXRlIHRoZSBkZWZhdWx0IG1vZHVsZSBmdW5jdGlvbmFsaXR5LiBIZXJlXG4vLyB3ZSBjb2xsZWN0IHRob3NlIHByb3BlcnRpZXMgYW5kIHJlYXBwbHkgX2FmdGVyXyB3ZSBjb25maWd1cmVcbi8vIHRoZSBjdXJyZW50IGVudmlyb25tZW50J3MgZGVmYXVsdHMgdG8gYXZvaWQgaGF2aW5nIHRvIGJlIHNvXG4vLyBkZWZlbnNpdmUgZHVyaW5nIGluaXRpYWxpemF0aW9uLlxudmFyIG1vZHVsZU92ZXJyaWRlcyA9IHt9O1xuZm9yICh2YXIga2V5IGluIE1vZHVsZSkge1xuICBpZiAoTW9kdWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBtb2R1bGVPdmVycmlkZXNba2V5XSA9IE1vZHVsZVtrZXldO1xuICB9XG59XG5cbi8vIFRoZSBlbnZpcm9ubWVudCBzZXR1cCBjb2RlIGJlbG93IGlzIGN1c3RvbWl6ZWQgdG8gdXNlIE1vZHVsZS5cbi8vICoqKiBFbnZpcm9ubWVudCBzZXR1cCBjb2RlICoqKlxudmFyIEVOVklST05NRU5UX0lTX1dFQiA9IGZhbHNlO1xudmFyIEVOVklST05NRU5UX0lTX1dPUktFUiA9IGZhbHNlO1xudmFyIEVOVklST05NRU5UX0lTX05PREUgPSBmYWxzZTtcbnZhciBFTlZJUk9OTUVOVF9JU19TSEVMTCA9IGZhbHNlO1xuXG4vLyBUaHJlZSBjb25maWd1cmF0aW9ucyB3ZSBjYW4gYmUgcnVubmluZyBpbjpcbi8vIDEpIFdlIGNvdWxkIGJlIHRoZSBhcHBsaWNhdGlvbiBtYWluKCkgdGhyZWFkIHJ1bm5pbmcgaW4gdGhlIG1haW4gSlMgVUkgdGhyZWFkLiAoRU5WSVJPTk1FTlRfSVNfV09SS0VSID09IGZhbHNlIGFuZCBFTlZJUk9OTUVOVF9JU19QVEhSRUFEID09IGZhbHNlKVxuLy8gMikgV2UgY291bGQgYmUgdGhlIGFwcGxpY2F0aW9uIG1haW4oKSB0aHJlYWQgcHJveGllZCB0byB3b3JrZXIuICh3aXRoIEVtc2NyaXB0ZW4gLXMgUFJPWFlfVE9fV09SS0VSPTEpIChFTlZJUk9OTUVOVF9JU19XT1JLRVIgPT0gdHJ1ZSwgRU5WSVJPTk1FTlRfSVNfUFRIUkVBRCA9PSBmYWxzZSlcbi8vIDMpIFdlIGNvdWxkIGJlIGFuIGFwcGxpY2F0aW9uIHB0aHJlYWQgcnVubmluZyBpbiBhIHdvcmtlci4gKEVOVklST05NRU5UX0lTX1dPUktFUiA9PSB0cnVlIGFuZCBFTlZJUk9OTUVOVF9JU19QVEhSRUFEID09IHRydWUpXG5cbmlmIChNb2R1bGVbJ0VOVklST05NRU5UJ10pIHtcbiAgaWYgKE1vZHVsZVsnRU5WSVJPTk1FTlQnXSA9PT0gJ1dFQicpIHtcbiAgICBFTlZJUk9OTUVOVF9JU19XRUIgPSB0cnVlO1xuICB9IGVsc2UgaWYgKE1vZHVsZVsnRU5WSVJPTk1FTlQnXSA9PT0gJ1dPUktFUicpIHtcbiAgICBFTlZJUk9OTUVOVF9JU19XT1JLRVIgPSB0cnVlO1xuICB9IGVsc2UgaWYgKE1vZHVsZVsnRU5WSVJPTk1FTlQnXSA9PT0gJ05PREUnKSB7XG4gICAgRU5WSVJPTk1FTlRfSVNfTk9ERSA9IHRydWU7XG4gIH0gZWxzZSBpZiAoTW9kdWxlWydFTlZJUk9OTUVOVCddID09PSAnU0hFTEwnKSB7XG4gICAgRU5WSVJPTk1FTlRfSVNfU0hFTEwgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlIHByb3ZpZGVkIE1vZHVsZVtcXCdFTlZJUk9OTUVOVFxcJ10gdmFsdWUgaXMgbm90IHZhbGlkLiBJdCBtdXN0IGJlIG9uZSBvZjogV0VCfFdPUktFUnxOT0RFfFNIRUxMLicpO1xuICB9XG59IGVsc2Uge1xuICBFTlZJUk9OTUVOVF9JU19XRUIgPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JztcbiAgRU5WSVJPTk1FTlRfSVNfV09SS0VSID0gdHlwZW9mIGltcG9ydFNjcmlwdHMgPT09ICdmdW5jdGlvbic7XG4gIEVOVklST05NRU5UX0lTX05PREUgPSB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHJlcXVpcmUgPT09ICdmdW5jdGlvbicgJiYgIUVOVklST05NRU5UX0lTX1dFQiAmJiAhRU5WSVJPTk1FTlRfSVNfV09SS0VSO1xuICBFTlZJUk9OTUVOVF9JU19TSEVMTCA9ICFFTlZJUk9OTUVOVF9JU19XRUIgJiYgIUVOVklST05NRU5UX0lTX05PREUgJiYgIUVOVklST05NRU5UX0lTX1dPUktFUjtcbn1cblxuXG5pZiAoRU5WSVJPTk1FTlRfSVNfTk9ERSkge1xuICAvLyBFeHBvc2UgZnVuY3Rpb25hbGl0eSBpbiB0aGUgc2FtZSBzaW1wbGUgd2F5IHRoYXQgdGhlIHNoZWxscyB3b3JrXG4gIC8vIE5vdGUgdGhhdCB3ZSBwb2xsdXRlIHRoZSBnbG9iYWwgbmFtZXNwYWNlIGhlcmUsIG90aGVyd2lzZSB3ZSBicmVhayBpbiBub2RlXG4gIGlmICghTW9kdWxlWydwcmludCddKSBNb2R1bGVbJ3ByaW50J10gPSBjb25zb2xlLmxvZztcbiAgaWYgKCFNb2R1bGVbJ3ByaW50RXJyJ10pIE1vZHVsZVsncHJpbnRFcnInXSA9IGNvbnNvbGUud2FybjtcblxuICB2YXIgbm9kZUZTO1xuICB2YXIgbm9kZVBhdGg7XG5cbiAgTW9kdWxlWydyZWFkJ10gPSBmdW5jdGlvbiBzaGVsbF9yZWFkKGZpbGVuYW1lLCBiaW5hcnkpIHtcbiAgICBpZiAoIW5vZGVGUykgbm9kZUZTID0gcmVxdWlyZSgnZnMnKTtcbiAgICBpZiAoIW5vZGVQYXRoKSBub2RlUGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbiAgICBmaWxlbmFtZSA9IG5vZGVQYXRoWydub3JtYWxpemUnXShmaWxlbmFtZSk7XG4gICAgdmFyIHJldCA9IG5vZGVGU1sncmVhZEZpbGVTeW5jJ10oZmlsZW5hbWUpO1xuICAgIHJldHVybiBiaW5hcnkgPyByZXQgOiByZXQudG9TdHJpbmcoKTtcbiAgfTtcblxuICBNb2R1bGVbJ3JlYWRCaW5hcnknXSA9IGZ1bmN0aW9uIHJlYWRCaW5hcnkoZmlsZW5hbWUpIHtcbiAgICB2YXIgcmV0ID0gTW9kdWxlWydyZWFkJ10oZmlsZW5hbWUsIHRydWUpO1xuICAgIGlmICghcmV0LmJ1ZmZlcikge1xuICAgICAgcmV0ID0gbmV3IFVpbnQ4QXJyYXkocmV0KTtcbiAgICB9XG4gICAgYXNzZXJ0KHJldC5idWZmZXIpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgTW9kdWxlWydsb2FkJ10gPSBmdW5jdGlvbiBsb2FkKGYpIHtcbiAgICBnbG9iYWxFdmFsKHJlYWQoZikpO1xuICB9O1xuXG4gIGlmICghTW9kdWxlWyd0aGlzUHJvZ3JhbSddKSB7XG4gICAgaWYgKHByb2Nlc3NbJ2FyZ3YnXS5sZW5ndGggPiAxKSB7XG4gICAgICBNb2R1bGVbJ3RoaXNQcm9ncmFtJ10gPSBwcm9jZXNzWydhcmd2J11bMV0ucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBNb2R1bGVbJ3RoaXNQcm9ncmFtJ10gPSAndW5rbm93bi1wcm9ncmFtJztcbiAgICB9XG4gIH1cblxuICBNb2R1bGVbJ2FyZ3VtZW50cyddID0gcHJvY2Vzc1snYXJndiddLnNsaWNlKDIpO1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZVsnZXhwb3J0cyddID0gTW9kdWxlO1xuICB9XG5cbiAgcHJvY2Vzc1snb24nXSgndW5jYXVnaHRFeGNlcHRpb24nLCBmdW5jdGlvbihleCkge1xuICAgIC8vIHN1cHByZXNzIEV4aXRTdGF0dXMgZXhjZXB0aW9ucyBmcm9tIHNob3dpbmcgYW4gZXJyb3JcbiAgICBpZiAoIShleCBpbnN0YW5jZW9mIEV4aXRTdGF0dXMpKSB7XG4gICAgICB0aHJvdyBleDtcbiAgICB9XG4gIH0pO1xuXG4gIE1vZHVsZVsnaW5zcGVjdCddID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJ1tFbXNjcmlwdGVuIE1vZHVsZSBvYmplY3RdJzsgfTtcbn1cbmVsc2UgaWYgKEVOVklST05NRU5UX0lTX1NIRUxMKSB7XG4gIGlmICghTW9kdWxlWydwcmludCddKSBNb2R1bGVbJ3ByaW50J10gPSBwcmludDtcbiAgaWYgKHR5cGVvZiBwcmludEVyciAhPSAndW5kZWZpbmVkJykgTW9kdWxlWydwcmludEVyciddID0gcHJpbnRFcnI7IC8vIG5vdCBwcmVzZW50IGluIHY4IG9yIG9sZGVyIHNtXG5cbiAgaWYgKHR5cGVvZiByZWFkICE9ICd1bmRlZmluZWQnKSB7XG4gICAgTW9kdWxlWydyZWFkJ10gPSByZWFkO1xuICB9IGVsc2Uge1xuICAgIE1vZHVsZVsncmVhZCddID0gZnVuY3Rpb24gc2hlbGxfcmVhZCgpIHsgdGhyb3cgJ25vIHJlYWQoKSBhdmFpbGFibGUnIH07XG4gIH1cblxuICBNb2R1bGVbJ3JlYWRCaW5hcnknXSA9IGZ1bmN0aW9uIHJlYWRCaW5hcnkoZikge1xuICAgIGlmICh0eXBlb2YgcmVhZGJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHJlYWRidWZmZXIoZikpO1xuICAgIH1cbiAgICB2YXIgZGF0YSA9IHJlYWQoZiwgJ2JpbmFyeScpO1xuICAgIGFzc2VydCh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpO1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIGlmICh0eXBlb2Ygc2NyaXB0QXJncyAhPSAndW5kZWZpbmVkJykge1xuICAgIE1vZHVsZVsnYXJndW1lbnRzJ10gPSBzY3JpcHRBcmdzO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudHMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBNb2R1bGVbJ2FyZ3VtZW50cyddID0gYXJndW1lbnRzO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBxdWl0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgTW9kdWxlWydxdWl0J10gPSBmdW5jdGlvbihzdGF0dXMsIHRvVGhyb3cpIHtcbiAgICAgIHF1aXQoc3RhdHVzKTtcbiAgICB9XG4gIH1cblxufVxuZWxzZSBpZiAoRU5WSVJPTk1FTlRfSVNfV0VCIHx8IEVOVklST05NRU5UX0lTX1dPUktFUikge1xuICBNb2R1bGVbJ3JlYWQnXSA9IGZ1bmN0aW9uIHNoZWxsX3JlYWQodXJsKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIGZhbHNlKTtcbiAgICB4aHIuc2VuZChudWxsKTtcbiAgICByZXR1cm4geGhyLnJlc3BvbnNlVGV4dDtcbiAgfTtcblxuICBpZiAoRU5WSVJPTk1FTlRfSVNfV09SS0VSKSB7XG4gICAgTW9kdWxlWydyZWFkQmluYXJ5J10gPSBmdW5jdGlvbiByZWFkQmluYXJ5KHVybCkge1xuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgZmFsc2UpO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICB4aHIuc2VuZChudWxsKTtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh4aHIucmVzcG9uc2UpO1xuICAgIH07XG4gIH1cblxuICBNb2R1bGVbJ3JlYWRBc3luYyddID0gZnVuY3Rpb24gcmVhZEFzeW5jKHVybCwgb25sb2FkLCBvbmVycm9yKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiB4aHJfb25sb2FkKCkge1xuICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwIHx8ICh4aHIuc3RhdHVzID09IDAgJiYgeGhyLnJlc3BvbnNlKSkgeyAvLyBmaWxlIFVSTHMgY2FuIHJldHVybiAwXG4gICAgICAgIG9ubG9hZCh4aHIucmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb25lcnJvcigpO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSBvbmVycm9yO1xuICAgIHhoci5zZW5kKG51bGwpO1xuICB9O1xuXG4gIGlmICh0eXBlb2YgYXJndW1lbnRzICE9ICd1bmRlZmluZWQnKSB7XG4gICAgTW9kdWxlWydhcmd1bWVudHMnXSA9IGFyZ3VtZW50cztcbiAgfVxuXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoIU1vZHVsZVsncHJpbnQnXSkgTW9kdWxlWydwcmludCddID0gZnVuY3Rpb24gc2hlbGxfcHJpbnQoeCkge1xuICAgICAgY29uc29sZS5sb2coeCk7XG4gICAgfTtcbiAgICBpZiAoIU1vZHVsZVsncHJpbnRFcnInXSkgTW9kdWxlWydwcmludEVyciddID0gZnVuY3Rpb24gc2hlbGxfcHJpbnRFcnIoeCkge1xuICAgICAgY29uc29sZS53YXJuKHgpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gUHJvYmFibHkgYSB3b3JrZXIsIGFuZCB3aXRob3V0IGNvbnNvbGUubG9nLiBXZSBjYW4gZG8gdmVyeSBsaXR0bGUgaGVyZS4uLlxuICAgIHZhciBUUllfVVNFX0RVTVAgPSBmYWxzZTtcbiAgICBpZiAoIU1vZHVsZVsncHJpbnQnXSkgTW9kdWxlWydwcmludCddID0gKFRSWV9VU0VfRFVNUCAmJiAodHlwZW9mKGR1bXApICE9PSBcInVuZGVmaW5lZFwiKSA/IChmdW5jdGlvbih4KSB7XG4gICAgICBkdW1wKHgpO1xuICAgIH0pIDogKGZ1bmN0aW9uKHgpIHtcbiAgICAgIC8vIHNlbGYucG9zdE1lc3NhZ2UoeCk7IC8vIGVuYWJsZSB0aGlzIGlmIHlvdSB3YW50IHN0ZG91dCB0byBiZSBzZW50IGFzIG1lc3NhZ2VzXG4gICAgfSkpO1xuICB9XG5cbiAgaWYgKEVOVklST05NRU5UX0lTX1dPUktFUikge1xuICAgIE1vZHVsZVsnbG9hZCddID0gaW1wb3J0U2NyaXB0cztcbiAgfVxuXG4gIGlmICh0eXBlb2YgTW9kdWxlWydzZXRXaW5kb3dUaXRsZSddID09PSAndW5kZWZpbmVkJykge1xuICAgIE1vZHVsZVsnc2V0V2luZG93VGl0bGUnXSA9IGZ1bmN0aW9uKHRpdGxlKSB7IGRvY3VtZW50LnRpdGxlID0gdGl0bGUgfTtcbiAgfVxufVxuZWxzZSB7XG4gIC8vIFVucmVhY2hhYmxlIGJlY2F1c2UgU0hFTEwgaXMgZGVwZW5kYW50IG9uIHRoZSBvdGhlcnNcbiAgdGhyb3cgJ1Vua25vd24gcnVudGltZSBlbnZpcm9ubWVudC4gV2hlcmUgYXJlIHdlPyc7XG59XG5cbmZ1bmN0aW9uIGdsb2JhbEV2YWwoeCkge1xuICBldmFsLmNhbGwobnVsbCwgeCk7XG59XG5pZiAoIU1vZHVsZVsnbG9hZCddICYmIE1vZHVsZVsncmVhZCddKSB7XG4gIE1vZHVsZVsnbG9hZCddID0gZnVuY3Rpb24gbG9hZChmKSB7XG4gICAgZ2xvYmFsRXZhbChNb2R1bGVbJ3JlYWQnXShmKSk7XG4gIH07XG59XG5pZiAoIU1vZHVsZVsncHJpbnQnXSkge1xuICBNb2R1bGVbJ3ByaW50J10gPSBmdW5jdGlvbigpe307XG59XG5pZiAoIU1vZHVsZVsncHJpbnRFcnInXSkge1xuICBNb2R1bGVbJ3ByaW50RXJyJ10gPSBNb2R1bGVbJ3ByaW50J107XG59XG5pZiAoIU1vZHVsZVsnYXJndW1lbnRzJ10pIHtcbiAgTW9kdWxlWydhcmd1bWVudHMnXSA9IFtdO1xufVxuaWYgKCFNb2R1bGVbJ3RoaXNQcm9ncmFtJ10pIHtcbiAgTW9kdWxlWyd0aGlzUHJvZ3JhbSddID0gJy4vdGhpcy5wcm9ncmFtJztcbn1cbmlmICghTW9kdWxlWydxdWl0J10pIHtcbiAgTW9kdWxlWydxdWl0J10gPSBmdW5jdGlvbihzdGF0dXMsIHRvVGhyb3cpIHtcbiAgICB0aHJvdyB0b1Rocm93O1xuICB9XG59XG5cbi8vICoqKiBFbnZpcm9ubWVudCBzZXR1cCBjb2RlICoqKlxuXG4vLyBDbG9zdXJlIGhlbHBlcnNcbk1vZHVsZS5wcmludCA9IE1vZHVsZVsncHJpbnQnXTtcbk1vZHVsZS5wcmludEVyciA9IE1vZHVsZVsncHJpbnRFcnInXTtcblxuLy8gQ2FsbGJhY2tzXG5Nb2R1bGVbJ3ByZVJ1biddID0gW107XG5Nb2R1bGVbJ3Bvc3RSdW4nXSA9IFtdO1xuXG4vLyBNZXJnZSBiYWNrIGluIHRoZSBvdmVycmlkZXNcbmZvciAodmFyIGtleSBpbiBtb2R1bGVPdmVycmlkZXMpIHtcbiAgaWYgKG1vZHVsZU92ZXJyaWRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgTW9kdWxlW2tleV0gPSBtb2R1bGVPdmVycmlkZXNba2V5XTtcbiAgfVxufVxuLy8gRnJlZSB0aGUgb2JqZWN0IGhpZXJhcmNoeSBjb250YWluZWQgaW4gdGhlIG92ZXJyaWRlcywgdGhpcyBsZXRzIHRoZSBHQ1xuLy8gcmVjbGFpbSBkYXRhIHVzZWQgZS5nLiBpbiBtZW1vcnlJbml0aWFsaXplclJlcXVlc3QsIHdoaWNoIGlzIGEgbGFyZ2UgdHlwZWQgYXJyYXkuXG5tb2R1bGVPdmVycmlkZXMgPSB1bmRlZmluZWQ7XG5cblxuXG4vLyB7e1BSRUFNQkxFX0FERElUSU9OU319XG5cbi8vID09PSBQcmVhbWJsZSBsaWJyYXJ5IHN0dWZmID09PVxuXG4vLyBEb2N1bWVudGF0aW9uIGZvciB0aGUgcHVibGljIEFQSXMgZGVmaW5lZCBpbiB0aGlzIGZpbGUgbXVzdCBiZSB1cGRhdGVkIGluOlxuLy8gICAgc2l0ZS9zb3VyY2UvZG9jcy9hcGlfcmVmZXJlbmNlL3ByZWFtYmxlLmpzLnJzdFxuLy8gQSBwcmVidWlsdCBsb2NhbCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudGF0aW9uIGlzIGF2YWlsYWJsZSBhdDpcbi8vICAgIHNpdGUvYnVpbGQvdGV4dC9kb2NzL2FwaV9yZWZlcmVuY2UvcHJlYW1ibGUuanMudHh0XG4vLyBZb3UgY2FuIGFsc28gYnVpbGQgZG9jcyBsb2NhbGx5IGFzIEhUTUwgb3Igb3RoZXIgZm9ybWF0cyBpbiBzaXRlL1xuLy8gQW4gb25saW5lIEhUTUwgdmVyc2lvbiAod2hpY2ggbWF5IGJlIG9mIGEgZGlmZmVyZW50IHZlcnNpb24gb2YgRW1zY3JpcHRlbilcbi8vICAgIGlzIHVwIGF0IGh0dHA6Ly9rcmlwa2VuLmdpdGh1Yi5pby9lbXNjcmlwdGVuLXNpdGUvZG9jcy9hcGlfcmVmZXJlbmNlL3ByZWFtYmxlLmpzLmh0bWxcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBSdW50aW1lIGNvZGUgc2hhcmVkIHdpdGggY29tcGlsZXJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgUnVudGltZSA9IHtcbiAgc2V0VGVtcFJldDA6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRlbXBSZXQwID0gdmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9LFxuICBnZXRUZW1wUmV0MDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0ZW1wUmV0MDtcbiAgfSxcbiAgc3RhY2tTYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFNUQUNLVE9QO1xuICB9LFxuICBzdGFja1Jlc3RvcmU6IGZ1bmN0aW9uIChzdGFja1RvcCkge1xuICAgIFNUQUNLVE9QID0gc3RhY2tUb3A7XG4gIH0sXG4gIGdldE5hdGl2ZVR5cGVTaXplOiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnaTEnOiBjYXNlICdpOCc6IHJldHVybiAxO1xuICAgICAgY2FzZSAnaTE2JzogcmV0dXJuIDI7XG4gICAgICBjYXNlICdpMzInOiByZXR1cm4gNDtcbiAgICAgIGNhc2UgJ2k2NCc6IHJldHVybiA4O1xuICAgICAgY2FzZSAnZmxvYXQnOiByZXR1cm4gNDtcbiAgICAgIGNhc2UgJ2RvdWJsZSc6IHJldHVybiA4O1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBpZiAodHlwZVt0eXBlLmxlbmd0aC0xXSA9PT0gJyonKSB7XG4gICAgICAgICAgcmV0dXJuIFJ1bnRpbWUuUVVBTlRVTV9TSVpFOyAvLyBBIHBvaW50ZXJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlWzBdID09PSAnaScpIHtcbiAgICAgICAgICB2YXIgYml0cyA9IHBhcnNlSW50KHR5cGUuc3Vic3RyKDEpKTtcbiAgICAgICAgICBhc3NlcnQoYml0cyAlIDggPT09IDApO1xuICAgICAgICAgIHJldHVybiBiaXRzLzg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGdldE5hdGl2ZUZpZWxkU2l6ZTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoUnVudGltZS5nZXROYXRpdmVUeXBlU2l6ZSh0eXBlKSwgUnVudGltZS5RVUFOVFVNX1NJWkUpO1xuICB9LFxuICBTVEFDS19BTElHTjogMTYsXG4gIHByZXBWYXJhcmc6IGZ1bmN0aW9uIChwdHIsIHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PT0gJ2RvdWJsZScgfHwgdHlwZSA9PT0gJ2k2NCcpIHtcbiAgICAgIC8vIG1vdmUgc28gdGhlIGxvYWQgaXMgYWxpZ25lZFxuICAgICAgaWYgKHB0ciAmIDcpIHtcbiAgICAgICAgYXNzZXJ0KChwdHIgJiA3KSA9PT0gNCk7XG4gICAgICAgIHB0ciArPSA0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQoKHB0ciAmIDMpID09PSAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHB0cjtcbiAgfSxcbiAgZ2V0QWxpZ25TaXplOiBmdW5jdGlvbiAodHlwZSwgc2l6ZSwgdmFyYXJnKSB7XG4gICAgLy8gd2UgYWxpZ24gaTY0cyBhbmQgZG91YmxlcyBvbiA2NC1iaXQgYm91bmRhcmllcywgdW5saWtlIHg4NlxuICAgIGlmICghdmFyYXJnICYmICh0eXBlID09ICdpNjQnIHx8IHR5cGUgPT0gJ2RvdWJsZScpKSByZXR1cm4gODtcbiAgICBpZiAoIXR5cGUpIHJldHVybiBNYXRoLm1pbihzaXplLCA4KTsgLy8gYWxpZ24gc3RydWN0dXJlcyBpbnRlcm5hbGx5IHRvIDY0IGJpdHNcbiAgICByZXR1cm4gTWF0aC5taW4oc2l6ZSB8fCAodHlwZSA/IFJ1bnRpbWUuZ2V0TmF0aXZlRmllbGRTaXplKHR5cGUpIDogMCksIFJ1bnRpbWUuUVVBTlRVTV9TSVpFKTtcbiAgfSxcbiAgZHluQ2FsbDogZnVuY3Rpb24gKHNpZywgcHRyLCBhcmdzKSB7XG4gICAgaWYgKGFyZ3MgJiYgYXJncy5sZW5ndGgpIHtcbiAgICAgIGFzc2VydChhcmdzLmxlbmd0aCA9PSBzaWcubGVuZ3RoLTEpO1xuICAgICAgYXNzZXJ0KCgnZHluQ2FsbF8nICsgc2lnKSBpbiBNb2R1bGUsICdiYWQgZnVuY3Rpb24gcG9pbnRlciB0eXBlIC0gbm8gdGFibGUgZm9yIHNpZyBcXCcnICsgc2lnICsgJ1xcJycpO1xuICAgICAgcmV0dXJuIE1vZHVsZVsnZHluQ2FsbF8nICsgc2lnXS5hcHBseShudWxsLCBbcHRyXS5jb25jYXQoYXJncykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQoc2lnLmxlbmd0aCA9PSAxKTtcbiAgICAgIGFzc2VydCgoJ2R5bkNhbGxfJyArIHNpZykgaW4gTW9kdWxlLCAnYmFkIGZ1bmN0aW9uIHBvaW50ZXIgdHlwZSAtIG5vIHRhYmxlIGZvciBzaWcgXFwnJyArIHNpZyArICdcXCcnKTtcbiAgICAgIHJldHVybiBNb2R1bGVbJ2R5bkNhbGxfJyArIHNpZ10uY2FsbChudWxsLCBwdHIpO1xuICAgIH1cbiAgfSxcbiAgZnVuY3Rpb25Qb2ludGVyczogW10sXG4gIGFkZEZ1bmN0aW9uOiBmdW5jdGlvbiAoZnVuYykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgUnVudGltZS5mdW5jdGlvblBvaW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIVJ1bnRpbWUuZnVuY3Rpb25Qb2ludGVyc1tpXSkge1xuICAgICAgICBSdW50aW1lLmZ1bmN0aW9uUG9pbnRlcnNbaV0gPSBmdW5jO1xuICAgICAgICByZXR1cm4gMiooMSArIGkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyAnRmluaXNoZWQgdXAgYWxsIHJlc2VydmVkIGZ1bmN0aW9uIHBvaW50ZXJzLiBVc2UgYSBoaWdoZXIgdmFsdWUgZm9yIFJFU0VSVkVEX0ZVTkNUSU9OX1BPSU5URVJTLic7XG4gIH0sXG4gIHJlbW92ZUZ1bmN0aW9uOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBSdW50aW1lLmZ1bmN0aW9uUG9pbnRlcnNbKGluZGV4LTIpLzJdID0gbnVsbDtcbiAgfSxcbiAgd2Fybk9uY2U6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgaWYgKCFSdW50aW1lLndhcm5PbmNlLnNob3duKSBSdW50aW1lLndhcm5PbmNlLnNob3duID0ge307XG4gICAgaWYgKCFSdW50aW1lLndhcm5PbmNlLnNob3duW3RleHRdKSB7XG4gICAgICBSdW50aW1lLndhcm5PbmNlLnNob3duW3RleHRdID0gMTtcbiAgICAgIE1vZHVsZS5wcmludEVycih0ZXh0KTtcbiAgICB9XG4gIH0sXG4gIGZ1bmNXcmFwcGVyczoge30sXG4gIGdldEZ1bmNXcmFwcGVyOiBmdW5jdGlvbiAoZnVuYywgc2lnKSB7XG4gICAgYXNzZXJ0KHNpZyk7XG4gICAgaWYgKCFSdW50aW1lLmZ1bmNXcmFwcGVyc1tzaWddKSB7XG4gICAgICBSdW50aW1lLmZ1bmNXcmFwcGVyc1tzaWddID0ge307XG4gICAgfVxuICAgIHZhciBzaWdDYWNoZSA9IFJ1bnRpbWUuZnVuY1dyYXBwZXJzW3NpZ107XG4gICAgaWYgKCFzaWdDYWNoZVtmdW5jXSkge1xuICAgICAgLy8gb3B0aW1pemUgYXdheSBhcmd1bWVudHMgdXNhZ2UgaW4gY29tbW9uIGNhc2VzXG4gICAgICBpZiAoc2lnLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBzaWdDYWNoZVtmdW5jXSA9IGZ1bmN0aW9uIGR5bkNhbGxfd3JhcHBlcigpIHtcbiAgICAgICAgICByZXR1cm4gUnVudGltZS5keW5DYWxsKHNpZywgZnVuYyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKHNpZy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgc2lnQ2FjaGVbZnVuY10gPSBmdW5jdGlvbiBkeW5DYWxsX3dyYXBwZXIoYXJnKSB7XG4gICAgICAgICAgcmV0dXJuIFJ1bnRpbWUuZHluQ2FsbChzaWcsIGZ1bmMsIFthcmddKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGdlbmVyYWwgY2FzZVxuICAgICAgICBzaWdDYWNoZVtmdW5jXSA9IGZ1bmN0aW9uIGR5bkNhbGxfd3JhcHBlcigpIHtcbiAgICAgICAgICByZXR1cm4gUnVudGltZS5keW5DYWxsKHNpZywgZnVuYywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaWdDYWNoZVtmdW5jXTtcbiAgfSxcbiAgZ2V0Q29tcGlsZXJTZXR0aW5nOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93ICdZb3UgbXVzdCBidWlsZCB3aXRoIC1zIFJFVEFJTl9DT01QSUxFUl9TRVRUSU5HUz0xIGZvciBSdW50aW1lLmdldENvbXBpbGVyU2V0dGluZyBvciBlbXNjcmlwdGVuX2dldF9jb21waWxlcl9zZXR0aW5nIHRvIHdvcmsnO1xuICB9LFxuICBzdGFja0FsbG9jOiBmdW5jdGlvbiAoc2l6ZSkgeyB2YXIgcmV0ID0gU1RBQ0tUT1A7U1RBQ0tUT1AgPSAoU1RBQ0tUT1AgKyBzaXplKXwwO1NUQUNLVE9QID0gKCgoU1RBQ0tUT1ApKzE1KSYtMTYpOyhhc3NlcnQoKCgoU1RBQ0tUT1B8MCkgPCAoU1RBQ0tfTUFYfDApKXwwKSl8MCk7IHJldHVybiByZXQ7IH0sXG4gIHN0YXRpY0FsbG9jOiBmdW5jdGlvbiAoc2l6ZSkgeyB2YXIgcmV0ID0gU1RBVElDVE9QO1NUQVRJQ1RPUCA9IChTVEFUSUNUT1AgKyAoYXNzZXJ0KCFzdGF0aWNTZWFsZWQpLHNpemUpKXwwO1NUQVRJQ1RPUCA9ICgoKFNUQVRJQ1RPUCkrMTUpJi0xNik7IHJldHVybiByZXQ7IH0sXG4gIGR5bmFtaWNBbGxvYzogZnVuY3Rpb24gKHNpemUpIHsgYXNzZXJ0KERZTkFNSUNUT1BfUFRSKTt2YXIgcmV0ID0gSEVBUDMyW0RZTkFNSUNUT1BfUFRSPj4yXTt2YXIgZW5kID0gKCgocmV0ICsgc2l6ZSArIDE1KXwwKSAmIC0xNik7SEVBUDMyW0RZTkFNSUNUT1BfUFRSPj4yXSA9IGVuZDtpZiAoZW5kID49IFRPVEFMX01FTU9SWSkge3ZhciBzdWNjZXNzID0gZW5sYXJnZU1lbW9yeSgpO2lmICghc3VjY2Vzcykge0hFQVAzMltEWU5BTUlDVE9QX1BUUj4+Ml0gPSByZXQ7cmV0dXJuIDA7fX1yZXR1cm4gcmV0O30sXG4gIGFsaWduTWVtb3J5OiBmdW5jdGlvbiAoc2l6ZSxxdWFudHVtKSB7IHZhciByZXQgPSBzaXplID0gTWF0aC5jZWlsKChzaXplKS8ocXVhbnR1bSA/IHF1YW50dW0gOiAxNikpKihxdWFudHVtID8gcXVhbnR1bSA6IDE2KTsgcmV0dXJuIHJldDsgfSxcbiAgbWFrZUJpZ0ludDogZnVuY3Rpb24gKGxvdyxoaWdoLHVuc2lnbmVkKSB7IHZhciByZXQgPSAodW5zaWduZWQgPyAoKCsoKGxvdz4+PjApKSkrKCgrKChoaWdoPj4+MCkpKSo0Mjk0OTY3Mjk2LjApKSA6ICgoKygobG93Pj4+MCkpKSsoKCsoKGhpZ2h8MCkpKSo0Mjk0OTY3Mjk2LjApKSk7IHJldHVybiByZXQ7IH0sXG4gIEdMT0JBTF9CQVNFOiAxMDI0LFxuICBRVUFOVFVNX1NJWkU6IDQsXG4gIF9fZHVtbXlfXzogMFxufVxuXG5cblxuTW9kdWxlW1wiUnVudGltZVwiXSA9IFJ1bnRpbWU7XG5cblxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFJ1bnRpbWUgZXNzZW50aWFsc1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnZhciBBQk9SVCA9IDA7IC8vIHdoZXRoZXIgd2UgYXJlIHF1aXR0aW5nIHRoZSBhcHBsaWNhdGlvbi4gbm8gY29kZSBzaG91bGQgcnVuIGFmdGVyIHRoaXMuIHNldCBpbiBleGl0KCkgYW5kIGFib3J0KClcbnZhciBFWElUU1RBVFVTID0gMDtcblxuLyoqIEB0eXBlIHtmdW5jdGlvbigqLCBzdHJpbmc9KX0gKi9cbmZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIHRleHQpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICBhYm9ydCgnQXNzZXJ0aW9uIGZhaWxlZDogJyArIHRleHQpO1xuICB9XG59XG5cbnZhciBnbG9iYWxTY29wZSA9IHRoaXM7XG5cbi8vIFJldHVybnMgdGhlIEMgZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCBpZGVudGlmaWVyIChmb3IgQysrLCB5b3UgbmVlZCB0byBkbyBtYW51YWwgbmFtZSBtYW5nbGluZylcbmZ1bmN0aW9uIGdldENGdW5jKGlkZW50KSB7XG4gIHZhciBmdW5jID0gTW9kdWxlWydfJyArIGlkZW50XTsgLy8gY2xvc3VyZSBleHBvcnRlZCBmdW5jdGlvblxuICBpZiAoIWZ1bmMpIHtcbiAgICB0cnkgeyBmdW5jID0gZXZhbCgnXycgKyBpZGVudCk7IH0gY2F0Y2goZSkge31cbiAgfVxuICBhc3NlcnQoZnVuYywgJ0Nhbm5vdCBjYWxsIHVua25vd24gZnVuY3Rpb24gJyArIGlkZW50ICsgJyAocGVyaGFwcyBMTFZNIG9wdGltaXphdGlvbnMgb3IgY2xvc3VyZSByZW1vdmVkIGl0PyknKTtcbiAgcmV0dXJuIGZ1bmM7XG59XG5cbnZhciBjd3JhcCwgY2NhbGw7XG4oZnVuY3Rpb24oKXtcbiAgdmFyIEpTZnVuY3MgPSB7XG4gICAgLy8gSGVscGVycyBmb3IgY3dyYXAgLS0gaXQgY2FuJ3QgcmVmZXIgdG8gUnVudGltZSBkaXJlY3RseSBiZWNhdXNlIGl0IG1pZ2h0XG4gICAgLy8gYmUgcmVuYW1lZCBieSBjbG9zdXJlLCBpbnN0ZWFkIGl0IGNhbGxzIEpTZnVuY3NbJ3N0YWNrU2F2ZSddLmJvZHkgdG8gZmluZFxuICAgIC8vIG91dCB3aGF0IHRoZSBtaW5pZmllZCBmdW5jdGlvbiBuYW1lIGlzLlxuICAgICdzdGFja1NhdmUnOiBmdW5jdGlvbigpIHtcbiAgICAgIFJ1bnRpbWUuc3RhY2tTYXZlKClcbiAgICB9LFxuICAgICdzdGFja1Jlc3RvcmUnOiBmdW5jdGlvbigpIHtcbiAgICAgIFJ1bnRpbWUuc3RhY2tSZXN0b3JlKClcbiAgICB9LFxuICAgIC8vIHR5cGUgY29udmVyc2lvbiBmcm9tIGpzIHRvIGNcbiAgICAnYXJyYXlUb0MnIDogZnVuY3Rpb24oYXJyKSB7XG4gICAgICB2YXIgcmV0ID0gUnVudGltZS5zdGFja0FsbG9jKGFyci5sZW5ndGgpO1xuICAgICAgd3JpdGVBcnJheVRvTWVtb3J5KGFyciwgcmV0KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbiAgICAnc3RyaW5nVG9DJyA6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgdmFyIHJldCA9IDA7XG4gICAgICBpZiAoc3RyICE9PSBudWxsICYmIHN0ciAhPT0gdW5kZWZpbmVkICYmIHN0ciAhPT0gMCkgeyAvLyBudWxsIHN0cmluZ1xuICAgICAgICAvLyBhdCBtb3N0IDQgYnl0ZXMgcGVyIFVURi04IGNvZGUgcG9pbnQsICsxIGZvciB0aGUgdHJhaWxpbmcgJ1xcMCdcbiAgICAgICAgdmFyIGxlbiA9IChzdHIubGVuZ3RoIDw8IDIpICsgMTtcbiAgICAgICAgcmV0ID0gUnVudGltZS5zdGFja0FsbG9jKGxlbik7XG4gICAgICAgIHN0cmluZ1RvVVRGOChzdHIsIHJldCwgbGVuKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICB9O1xuICAvLyBGb3IgZmFzdCBsb29rdXAgb2YgY29udmVyc2lvbiBmdW5jdGlvbnNcbiAgdmFyIHRvQyA9IHsnc3RyaW5nJyA6IEpTZnVuY3NbJ3N0cmluZ1RvQyddLCAnYXJyYXknIDogSlNmdW5jc1snYXJyYXlUb0MnXX07XG5cbiAgLy8gQyBjYWxsaW5nIGludGVyZmFjZS5cbiAgY2NhbGwgPSBmdW5jdGlvbiBjY2FsbEZ1bmMoaWRlbnQsIHJldHVyblR5cGUsIGFyZ1R5cGVzLCBhcmdzLCBvcHRzKSB7XG4gICAgdmFyIGZ1bmMgPSBnZXRDRnVuYyhpZGVudCk7XG4gICAgdmFyIGNBcmdzID0gW107XG4gICAgdmFyIHN0YWNrID0gMDtcbiAgICBhc3NlcnQocmV0dXJuVHlwZSAhPT0gJ2FycmF5JywgJ1JldHVybiB0eXBlIHNob3VsZCBub3QgYmUgXCJhcnJheVwiLicpO1xuICAgIGlmIChhcmdzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvbnZlcnRlciA9IHRvQ1thcmdUeXBlc1tpXV07XG4gICAgICAgIGlmIChjb252ZXJ0ZXIpIHtcbiAgICAgICAgICBpZiAoc3RhY2sgPT09IDApIHN0YWNrID0gUnVudGltZS5zdGFja1NhdmUoKTtcbiAgICAgICAgICBjQXJnc1tpXSA9IGNvbnZlcnRlcihhcmdzW2ldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjQXJnc1tpXSA9IGFyZ3NbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHJldCA9IGZ1bmMuYXBwbHkobnVsbCwgY0FyZ3MpO1xuICAgIGlmICgoIW9wdHMgfHwgIW9wdHMuYXN5bmMpICYmIHR5cGVvZiBFbXRlcnByZXRlckFzeW5jID09PSAnb2JqZWN0Jykge1xuICAgICAgYXNzZXJ0KCFFbXRlcnByZXRlckFzeW5jLnN0YXRlLCAnY2Fubm90IHN0YXJ0IGFzeW5jIG9wIHdpdGggbm9ybWFsIEpTIGNhbGxpbmcgY2NhbGwnKTtcbiAgICB9XG4gICAgaWYgKG9wdHMgJiYgb3B0cy5hc3luYykgYXNzZXJ0KCFyZXR1cm5UeXBlLCAnYXN5bmMgY2NhbGxzIGNhbm5vdCByZXR1cm4gdmFsdWVzJyk7XG4gICAgaWYgKHJldHVyblR5cGUgPT09ICdzdHJpbmcnKSByZXQgPSBQb2ludGVyX3N0cmluZ2lmeShyZXQpO1xuICAgIGlmIChzdGFjayAhPT0gMCkge1xuICAgICAgaWYgKG9wdHMgJiYgb3B0cy5hc3luYykge1xuICAgICAgICBFbXRlcnByZXRlckFzeW5jLmFzeW5jRmluYWxpemVycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIFJ1bnRpbWUuc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFJ1bnRpbWUuc3RhY2tSZXN0b3JlKHN0YWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHZhciBzb3VyY2VSZWdleCA9IC9eZnVuY3Rpb25cXHMqW2EtekEtWiRfMC05XSpcXHMqXFwoKFteKV0qKVxcKVxccyp7XFxzKihbXipdKj8pW1xccztdKig/OnJldHVyblxccyooLio/KVs7XFxzXSopP30kLztcbiAgZnVuY3Rpb24gcGFyc2VKU0Z1bmMoanNmdW5jKSB7XG4gICAgLy8gTWF0Y2ggdGhlIGJvZHkgYW5kIHRoZSByZXR1cm4gdmFsdWUgb2YgYSBqYXZhc2NyaXB0IGZ1bmN0aW9uIHNvdXJjZVxuICAgIHZhciBwYXJzZWQgPSBqc2Z1bmMudG9TdHJpbmcoKS5tYXRjaChzb3VyY2VSZWdleCkuc2xpY2UoMSk7XG4gICAgcmV0dXJuIHthcmd1bWVudHMgOiBwYXJzZWRbMF0sIGJvZHkgOiBwYXJzZWRbMV0sIHJldHVyblZhbHVlOiBwYXJzZWRbMl19XG4gIH1cblxuICAvLyBzb3VyY2VzIG9mIHVzZWZ1bCBmdW5jdGlvbnMuIHdlIGNyZWF0ZSB0aGlzIGxhemlseSBhcyBpdCBjYW4gdHJpZ2dlciBhIHNvdXJjZSBkZWNvbXByZXNzaW9uIG9uIHRoaXMgZW50aXJlIGZpbGVcbiAgdmFyIEpTc291cmNlID0gbnVsbDtcbiAgZnVuY3Rpb24gZW5zdXJlSlNzb3VyY2UoKSB7XG4gICAgaWYgKCFKU3NvdXJjZSkge1xuICAgICAgSlNzb3VyY2UgPSB7fTtcbiAgICAgIGZvciAodmFyIGZ1biBpbiBKU2Z1bmNzKSB7XG4gICAgICAgIGlmIChKU2Z1bmNzLmhhc093blByb3BlcnR5KGZ1bikpIHtcbiAgICAgICAgICAvLyBFbGVtZW50cyBvZiB0b0Nzb3VyY2UgYXJlIGFycmF5cyBvZiB0aHJlZSBpdGVtczpcbiAgICAgICAgICAvLyB0aGUgY29kZSwgYW5kIHRoZSByZXR1cm4gdmFsdWVcbiAgICAgICAgICBKU3NvdXJjZVtmdW5dID0gcGFyc2VKU0Z1bmMoSlNmdW5jc1tmdW5dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGN3cmFwID0gZnVuY3Rpb24gY3dyYXAoaWRlbnQsIHJldHVyblR5cGUsIGFyZ1R5cGVzKSB7XG4gICAgYXJnVHlwZXMgPSBhcmdUeXBlcyB8fCBbXTtcbiAgICB2YXIgY2Z1bmMgPSBnZXRDRnVuYyhpZGVudCk7XG4gICAgLy8gV2hlbiB0aGUgZnVuY3Rpb24gdGFrZXMgbnVtYmVycyBhbmQgcmV0dXJucyBhIG51bWJlciwgd2UgY2FuIGp1c3QgcmV0dXJuXG4gICAgLy8gdGhlIG9yaWdpbmFsIGZ1bmN0aW9uXG4gICAgdmFyIG51bWVyaWNBcmdzID0gYXJnVHlwZXMuZXZlcnkoZnVuY3Rpb24odHlwZSl7IHJldHVybiB0eXBlID09PSAnbnVtYmVyJ30pO1xuICAgIHZhciBudW1lcmljUmV0ID0gKHJldHVyblR5cGUgIT09ICdzdHJpbmcnKTtcbiAgICBpZiAoIG51bWVyaWNSZXQgJiYgbnVtZXJpY0FyZ3MpIHtcbiAgICAgIHJldHVybiBjZnVuYztcbiAgICB9XG4gICAgLy8gQ3JlYXRpb24gb2YgdGhlIGFyZ3VtZW50cyBsaXN0IChbXCIkMVwiLFwiJDJcIiwuLi4sXCIkbmFyZ3NcIl0pXG4gICAgdmFyIGFyZ05hbWVzID0gYXJnVHlwZXMubWFwKGZ1bmN0aW9uKHgsaSl7cmV0dXJuICckJytpfSk7XG4gICAgdmFyIGZ1bmNzdHIgPSBcIihmdW5jdGlvbihcIiArIGFyZ05hbWVzLmpvaW4oJywnKSArIFwiKSB7XCI7XG4gICAgdmFyIG5hcmdzID0gYXJnVHlwZXMubGVuZ3RoO1xuICAgIGlmICghbnVtZXJpY0FyZ3MpIHtcbiAgICAgIC8vIEdlbmVyYXRlIHRoZSBjb2RlIG5lZWRlZCB0byBjb252ZXJ0IHRoZSBhcmd1bWVudHMgZnJvbSBqYXZhc2NyaXB0XG4gICAgICAvLyB2YWx1ZXMgdG8gcG9pbnRlcnNcbiAgICAgIGVuc3VyZUpTc291cmNlKCk7XG4gICAgICBmdW5jc3RyICs9ICd2YXIgc3RhY2sgPSAnICsgSlNzb3VyY2VbJ3N0YWNrU2F2ZSddLmJvZHkgKyAnOyc7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hcmdzOyBpKyspIHtcbiAgICAgICAgdmFyIGFyZyA9IGFyZ05hbWVzW2ldLCB0eXBlID0gYXJnVHlwZXNbaV07XG4gICAgICAgIGlmICh0eXBlID09PSAnbnVtYmVyJykgY29udGludWU7XG4gICAgICAgIHZhciBjb252ZXJ0Q29kZSA9IEpTc291cmNlW3R5cGUgKyAnVG9DJ107IC8vIFtjb2RlLCByZXR1cm5dXG4gICAgICAgIGZ1bmNzdHIgKz0gJ3ZhciAnICsgY29udmVydENvZGUuYXJndW1lbnRzICsgJyA9ICcgKyBhcmcgKyAnOyc7XG4gICAgICAgIGZ1bmNzdHIgKz0gY29udmVydENvZGUuYm9keSArICc7JztcbiAgICAgICAgZnVuY3N0ciArPSBhcmcgKyAnPSgnICsgY29udmVydENvZGUucmV0dXJuVmFsdWUgKyAnKTsnO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdoZW4gdGhlIGNvZGUgaXMgY29tcHJlc3NlZCwgdGhlIG5hbWUgb2YgY2Z1bmMgaXMgbm90IGxpdGVyYWxseSAnY2Z1bmMnIGFueW1vcmVcbiAgICB2YXIgY2Z1bmNuYW1lID0gcGFyc2VKU0Z1bmMoZnVuY3Rpb24oKXtyZXR1cm4gY2Z1bmN9KS5yZXR1cm5WYWx1ZTtcbiAgICAvLyBDYWxsIHRoZSBmdW5jdGlvblxuICAgIGZ1bmNzdHIgKz0gJ3ZhciByZXQgPSAnICsgY2Z1bmNuYW1lICsgJygnICsgYXJnTmFtZXMuam9pbignLCcpICsgJyk7JztcbiAgICBpZiAoIW51bWVyaWNSZXQpIHsgLy8gUmV0dXJuIHR5cGUgY2FuIG9ubHkgYnkgJ3N0cmluZycgb3IgJ251bWJlcidcbiAgICAgIC8vIENvbnZlcnQgdGhlIHJlc3VsdCB0byBhIHN0cmluZ1xuICAgICAgdmFyIHN0cmdmeSA9IHBhcnNlSlNGdW5jKGZ1bmN0aW9uKCl7cmV0dXJuIFBvaW50ZXJfc3RyaW5naWZ5fSkucmV0dXJuVmFsdWU7XG4gICAgICBmdW5jc3RyICs9ICdyZXQgPSAnICsgc3RyZ2Z5ICsgJyhyZXQpOyc7XG4gICAgfVxuICAgIGZ1bmNzdHIgKz0gXCJpZiAodHlwZW9mIEVtdGVycHJldGVyQXN5bmMgPT09ICdvYmplY3QnKSB7IGFzc2VydCghRW10ZXJwcmV0ZXJBc3luYy5zdGF0ZSwgJ2Nhbm5vdCBzdGFydCBhc3luYyBvcCB3aXRoIG5vcm1hbCBKUyBjYWxsaW5nIGN3cmFwJykgfVwiO1xuICAgIGlmICghbnVtZXJpY0FyZ3MpIHtcbiAgICAgIC8vIElmIHdlIGhhZCBhIHN0YWNrLCByZXN0b3JlIGl0XG4gICAgICBlbnN1cmVKU3NvdXJjZSgpO1xuICAgICAgZnVuY3N0ciArPSBKU3NvdXJjZVsnc3RhY2tSZXN0b3JlJ10uYm9keS5yZXBsYWNlKCcoKScsICcoc3RhY2spJykgKyAnOyc7XG4gICAgfVxuICAgIGZ1bmNzdHIgKz0gJ3JldHVybiByZXR9KSc7XG4gICAgcmV0dXJuIGV2YWwoZnVuY3N0cik7XG4gIH07XG59KSgpO1xuTW9kdWxlW1wiY2NhbGxcIl0gPSBjY2FsbDtcbk1vZHVsZVtcImN3cmFwXCJdID0gY3dyYXA7XG5cbi8qKiBAdHlwZSB7ZnVuY3Rpb24obnVtYmVyLCBudW1iZXIsIHN0cmluZywgYm9vbGVhbj0pfSAqL1xuZnVuY3Rpb24gc2V0VmFsdWUocHRyLCB2YWx1ZSwgdHlwZSwgbm9TYWZlKSB7XG4gIHR5cGUgPSB0eXBlIHx8ICdpOCc7XG4gIGlmICh0eXBlLmNoYXJBdCh0eXBlLmxlbmd0aC0xKSA9PT0gJyonKSB0eXBlID0gJ2kzMic7IC8vIHBvaW50ZXJzIGFyZSAzMi1iaXRcbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgY2FzZSAnaTEnOiBIRUFQOFsoKHB0cik+PjApXT12YWx1ZTsgYnJlYWs7XG4gICAgICBjYXNlICdpOCc6IEhFQVA4WygocHRyKT4+MCldPXZhbHVlOyBicmVhaztcbiAgICAgIGNhc2UgJ2kxNic6IEhFQVAxNlsoKHB0cik+PjEpXT12YWx1ZTsgYnJlYWs7XG4gICAgICBjYXNlICdpMzInOiBIRUFQMzJbKChwdHIpPj4yKV09dmFsdWU7IGJyZWFrO1xuICAgICAgY2FzZSAnaTY0JzogKHRlbXBJNjQgPSBbdmFsdWU+Pj4wLCh0ZW1wRG91YmxlPXZhbHVlLCgrKE1hdGhfYWJzKHRlbXBEb3VibGUpKSkgPj0gMS4wID8gKHRlbXBEb3VibGUgPiAwLjAgPyAoKE1hdGhfbWluKCgrKE1hdGhfZmxvb3IoKHRlbXBEb3VibGUpLzQyOTQ5NjcyOTYuMCkpKSwgNDI5NDk2NzI5NS4wKSl8MCk+Pj4wIDogKH5+KCgrKE1hdGhfY2VpbCgodGVtcERvdWJsZSAtICsoKCh+fih0ZW1wRG91YmxlKSkpPj4+MCkpLzQyOTQ5NjcyOTYuMCkpKSkpPj4+MCkgOiAwKV0sSEVBUDMyWygocHRyKT4+MildPXRlbXBJNjRbMF0sSEVBUDMyWygoKHB0cikrKDQpKT4+MildPXRlbXBJNjRbMV0pOyBicmVhaztcbiAgICAgIGNhc2UgJ2Zsb2F0JzogSEVBUEYzMlsoKHB0cik+PjIpXT12YWx1ZTsgYnJlYWs7XG4gICAgICBjYXNlICdkb3VibGUnOiBIRUFQRjY0WygocHRyKT4+MyldPXZhbHVlOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6IGFib3J0KCdpbnZhbGlkIHR5cGUgZm9yIHNldFZhbHVlOiAnICsgdHlwZSk7XG4gICAgfVxufVxuTW9kdWxlW1wic2V0VmFsdWVcIl0gPSBzZXRWYWx1ZTtcblxuLyoqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIsIHN0cmluZywgYm9vbGVhbj0pfSAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUocHRyLCB0eXBlLCBub1NhZmUpIHtcbiAgdHlwZSA9IHR5cGUgfHwgJ2k4JztcbiAgaWYgKHR5cGUuY2hhckF0KHR5cGUubGVuZ3RoLTEpID09PSAnKicpIHR5cGUgPSAnaTMyJzsgLy8gcG9pbnRlcnMgYXJlIDMyLWJpdFxuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlICdpMSc6IHJldHVybiBIRUFQOFsoKHB0cik+PjApXTtcbiAgICAgIGNhc2UgJ2k4JzogcmV0dXJuIEhFQVA4WygocHRyKT4+MCldO1xuICAgICAgY2FzZSAnaTE2JzogcmV0dXJuIEhFQVAxNlsoKHB0cik+PjEpXTtcbiAgICAgIGNhc2UgJ2kzMic6IHJldHVybiBIRUFQMzJbKChwdHIpPj4yKV07XG4gICAgICBjYXNlICdpNjQnOiByZXR1cm4gSEVBUDMyWygocHRyKT4+MildO1xuICAgICAgY2FzZSAnZmxvYXQnOiByZXR1cm4gSEVBUEYzMlsoKHB0cik+PjIpXTtcbiAgICAgIGNhc2UgJ2RvdWJsZSc6IHJldHVybiBIRUFQRjY0WygocHRyKT4+MyldO1xuICAgICAgZGVmYXVsdDogYWJvcnQoJ2ludmFsaWQgdHlwZSBmb3Igc2V0VmFsdWU6ICcgKyB0eXBlKTtcbiAgICB9XG4gIHJldHVybiBudWxsO1xufVxuTW9kdWxlW1wiZ2V0VmFsdWVcIl0gPSBnZXRWYWx1ZTtcblxudmFyIEFMTE9DX05PUk1BTCA9IDA7IC8vIFRyaWVzIHRvIHVzZSBfbWFsbG9jKClcbnZhciBBTExPQ19TVEFDSyA9IDE7IC8vIExpdmVzIGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIGN1cnJlbnQgZnVuY3Rpb24gY2FsbFxudmFyIEFMTE9DX1NUQVRJQyA9IDI7IC8vIENhbm5vdCBiZSBmcmVlZFxudmFyIEFMTE9DX0RZTkFNSUMgPSAzOyAvLyBDYW5ub3QgYmUgZnJlZWQgZXhjZXB0IHRocm91Z2ggc2Jya1xudmFyIEFMTE9DX05PTkUgPSA0OyAvLyBEbyBub3QgYWxsb2NhdGVcbk1vZHVsZVtcIkFMTE9DX05PUk1BTFwiXSA9IEFMTE9DX05PUk1BTDtcbk1vZHVsZVtcIkFMTE9DX1NUQUNLXCJdID0gQUxMT0NfU1RBQ0s7XG5Nb2R1bGVbXCJBTExPQ19TVEFUSUNcIl0gPSBBTExPQ19TVEFUSUM7XG5Nb2R1bGVbXCJBTExPQ19EWU5BTUlDXCJdID0gQUxMT0NfRFlOQU1JQztcbk1vZHVsZVtcIkFMTE9DX05PTkVcIl0gPSBBTExPQ19OT05FO1xuXG4vLyBhbGxvY2F0ZSgpOiBUaGlzIGlzIGZvciBpbnRlcm5hbCB1c2UuIFlvdSBjYW4gdXNlIGl0IHlvdXJzZWxmIGFzIHdlbGwsIGJ1dCB0aGUgaW50ZXJmYWNlXG4vLyAgICAgICAgICAgICBpcyBhIGxpdHRsZSB0cmlja3kgKHNlZSBkb2NzIHJpZ2h0IGJlbG93KS4gVGhlIHJlYXNvbiBpcyB0aGF0IGl0IGlzIG9wdGltaXplZFxuLy8gICAgICAgICAgICAgZm9yIG11bHRpcGxlIHN5bnRheGVzIHRvIHNhdmUgc3BhY2UgaW4gZ2VuZXJhdGVkIGNvZGUuIFNvIHlvdSBzaG91bGRcbi8vICAgICAgICAgICAgIG5vcm1hbGx5IG5vdCB1c2UgYWxsb2NhdGUoKSwgYW5kIGluc3RlYWQgYWxsb2NhdGUgbWVtb3J5IHVzaW5nIF9tYWxsb2MoKSxcbi8vICAgICAgICAgICAgIGluaXRpYWxpemUgaXQgd2l0aCBzZXRWYWx1ZSgpLCBhbmQgc28gZm9ydGguXG4vLyBAc2xhYjogQW4gYXJyYXkgb2YgZGF0YSwgb3IgYSBudW1iZXIuIElmIGEgbnVtYmVyLCB0aGVuIHRoZSBzaXplIG9mIHRoZSBibG9jayB0byBhbGxvY2F0ZSxcbi8vICAgICAgICBpbiAqYnl0ZXMqIChub3RlIHRoYXQgdGhpcyBpcyBzb21ldGltZXMgY29uZnVzaW5nOiB0aGUgbmV4dCBwYXJhbWV0ZXIgZG9lcyBub3Rcbi8vICAgICAgICBhZmZlY3QgdGhpcyEpXG4vLyBAdHlwZXM6IEVpdGhlciBhbiBhcnJheSBvZiB0eXBlcywgb25lIGZvciBlYWNoIGJ5dGUgKG9yIDAgaWYgbm8gdHlwZSBhdCB0aGF0IHBvc2l0aW9uKSxcbi8vICAgICAgICAgb3IgYSBzaW5nbGUgdHlwZSB3aGljaCBpcyB1c2VkIGZvciB0aGUgZW50aXJlIGJsb2NrLiBUaGlzIG9ubHkgbWF0dGVycyBpZiB0aGVyZVxuLy8gICAgICAgICBpcyBpbml0aWFsIGRhdGEgLSBpZiBAc2xhYiBpcyBhIG51bWJlciwgdGhlbiB0aGlzIGRvZXMgbm90IG1hdHRlciBhdCBhbGwgYW5kIGlzXG4vLyAgICAgICAgIGlnbm9yZWQuXG4vLyBAYWxsb2NhdG9yOiBIb3cgdG8gYWxsb2NhdGUgbWVtb3J5LCBzZWUgQUxMT0NfKlxuLyoqIEB0eXBlIHtmdW5jdGlvbigoVHlwZWRBcnJheXxBcnJheTxudW1iZXI+fG51bWJlciksIHN0cmluZywgbnVtYmVyLCBudW1iZXI9KX0gKi9cbmZ1bmN0aW9uIGFsbG9jYXRlKHNsYWIsIHR5cGVzLCBhbGxvY2F0b3IsIHB0cikge1xuICB2YXIgemVyb2luaXQsIHNpemU7XG4gIGlmICh0eXBlb2Ygc2xhYiA9PT0gJ251bWJlcicpIHtcbiAgICB6ZXJvaW5pdCA9IHRydWU7XG4gICAgc2l6ZSA9IHNsYWI7XG4gIH0gZWxzZSB7XG4gICAgemVyb2luaXQgPSBmYWxzZTtcbiAgICBzaXplID0gc2xhYi5sZW5ndGg7XG4gIH1cblxuICB2YXIgc2luZ2xlVHlwZSA9IHR5cGVvZiB0eXBlcyA9PT0gJ3N0cmluZycgPyB0eXBlcyA6IG51bGw7XG5cbiAgdmFyIHJldDtcbiAgaWYgKGFsbG9jYXRvciA9PSBBTExPQ19OT05FKSB7XG4gICAgcmV0ID0gcHRyO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IFt0eXBlb2YgX21hbGxvYyA9PT0gJ2Z1bmN0aW9uJyA/IF9tYWxsb2MgOiBSdW50aW1lLnN0YXRpY0FsbG9jLCBSdW50aW1lLnN0YWNrQWxsb2MsIFJ1bnRpbWUuc3RhdGljQWxsb2MsIFJ1bnRpbWUuZHluYW1pY0FsbG9jXVthbGxvY2F0b3IgPT09IHVuZGVmaW5lZCA/IEFMTE9DX1NUQVRJQyA6IGFsbG9jYXRvcl0oTWF0aC5tYXgoc2l6ZSwgc2luZ2xlVHlwZSA/IDEgOiB0eXBlcy5sZW5ndGgpKTtcbiAgfVxuXG4gIGlmICh6ZXJvaW5pdCkge1xuICAgIHZhciBwdHIgPSByZXQsIHN0b3A7XG4gICAgYXNzZXJ0KChyZXQgJiAzKSA9PSAwKTtcbiAgICBzdG9wID0gcmV0ICsgKHNpemUgJiB+Myk7XG4gICAgZm9yICg7IHB0ciA8IHN0b3A7IHB0ciArPSA0KSB7XG4gICAgICBIRUFQMzJbKChwdHIpPj4yKV09MDtcbiAgICB9XG4gICAgc3RvcCA9IHJldCArIHNpemU7XG4gICAgd2hpbGUgKHB0ciA8IHN0b3ApIHtcbiAgICAgIEhFQVA4WygocHRyKyspPj4wKV09MDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGlmIChzaW5nbGVUeXBlID09PSAnaTgnKSB7XG4gICAgaWYgKHNsYWIuc3ViYXJyYXkgfHwgc2xhYi5zbGljZSkge1xuICAgICAgSEVBUFU4LnNldCgvKiogQHR5cGUgeyFVaW50OEFycmF5fSAqLyAoc2xhYiksIHJldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoc2xhYiksIHJldCk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICB2YXIgaSA9IDAsIHR5cGUsIHR5cGVTaXplLCBwcmV2aW91c1R5cGU7XG4gIHdoaWxlIChpIDwgc2l6ZSkge1xuICAgIHZhciBjdXJyID0gc2xhYltpXTtcblxuICAgIGlmICh0eXBlb2YgY3VyciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VyciA9IFJ1bnRpbWUuZ2V0RnVuY3Rpb25JbmRleChjdXJyKTtcbiAgICB9XG5cbiAgICB0eXBlID0gc2luZ2xlVHlwZSB8fCB0eXBlc1tpXTtcbiAgICBpZiAodHlwZSA9PT0gMCkge1xuICAgICAgaSsrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGFzc2VydCh0eXBlLCAnTXVzdCBrbm93IHdoYXQgdHlwZSB0byBzdG9yZSBpbiBhbGxvY2F0ZSEnKTtcblxuICAgIGlmICh0eXBlID09ICdpNjQnKSB0eXBlID0gJ2kzMic7IC8vIHNwZWNpYWwgY2FzZTogd2UgaGF2ZSBvbmUgaTMyIGhlcmUsIGFuZCBvbmUgaTMyIGxhdGVyXG5cbiAgICBzZXRWYWx1ZShyZXQraSwgY3VyciwgdHlwZSk7XG5cbiAgICAvLyBubyBuZWVkIHRvIGxvb2sgdXAgc2l6ZSB1bmxlc3MgdHlwZSBjaGFuZ2VzLCBzbyBjYWNoZSBpdFxuICAgIGlmIChwcmV2aW91c1R5cGUgIT09IHR5cGUpIHtcbiAgICAgIHR5cGVTaXplID0gUnVudGltZS5nZXROYXRpdmVUeXBlU2l6ZSh0eXBlKTtcbiAgICAgIHByZXZpb3VzVHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGkgKz0gdHlwZVNpemU7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufVxuTW9kdWxlW1wiYWxsb2NhdGVcIl0gPSBhbGxvY2F0ZTtcblxuLy8gQWxsb2NhdGUgbWVtb3J5IGR1cmluZyBhbnkgc3RhZ2Ugb2Ygc3RhcnR1cCAtIHN0YXRpYyBtZW1vcnkgZWFybHkgb24sIGR5bmFtaWMgbWVtb3J5IGxhdGVyLCBtYWxsb2Mgd2hlbiByZWFkeVxuZnVuY3Rpb24gZ2V0TWVtb3J5KHNpemUpIHtcbiAgaWYgKCFzdGF0aWNTZWFsZWQpIHJldHVybiBSdW50aW1lLnN0YXRpY0FsbG9jKHNpemUpO1xuICBpZiAoIXJ1bnRpbWVJbml0aWFsaXplZCkgcmV0dXJuIFJ1bnRpbWUuZHluYW1pY0FsbG9jKHNpemUpO1xuICByZXR1cm4gX21hbGxvYyhzaXplKTtcbn1cbk1vZHVsZVtcImdldE1lbW9yeVwiXSA9IGdldE1lbW9yeTtcblxuLyoqIEB0eXBlIHtmdW5jdGlvbihudW1iZXIsIG51bWJlcj0pfSAqL1xuZnVuY3Rpb24gUG9pbnRlcl9zdHJpbmdpZnkocHRyLCBsZW5ndGgpIHtcbiAgaWYgKGxlbmd0aCA9PT0gMCB8fCAhcHRyKSByZXR1cm4gJyc7XG4gIC8vIFRPRE86IHVzZSBUZXh0RGVjb2RlclxuICAvLyBGaW5kIHRoZSBsZW5ndGgsIGFuZCBjaGVjayBmb3IgVVRGIHdoaWxlIGRvaW5nIHNvXG4gIHZhciBoYXNVdGYgPSAwO1xuICB2YXIgdDtcbiAgdmFyIGkgPSAwO1xuICB3aGlsZSAoMSkge1xuICAgIGFzc2VydChwdHIgKyBpIDwgVE9UQUxfTUVNT1JZKTtcbiAgICB0ID0gSEVBUFU4WygoKHB0cikrKGkpKT4+MCldO1xuICAgIGhhc1V0ZiB8PSB0O1xuICAgIGlmICh0ID09IDAgJiYgIWxlbmd0aCkgYnJlYWs7XG4gICAgaSsrO1xuICAgIGlmIChsZW5ndGggJiYgaSA9PSBsZW5ndGgpIGJyZWFrO1xuICB9XG4gIGlmICghbGVuZ3RoKSBsZW5ndGggPSBpO1xuXG4gIHZhciByZXQgPSAnJztcblxuICBpZiAoaGFzVXRmIDwgMTI4KSB7XG4gICAgdmFyIE1BWF9DSFVOSyA9IDEwMjQ7IC8vIHNwbGl0IHVwIGludG8gY2h1bmtzLCBiZWNhdXNlIC5hcHBseSBvbiBhIGh1Z2Ugc3RyaW5nIGNhbiBvdmVyZmxvdyB0aGUgc3RhY2tcbiAgICB2YXIgY3VycjtcbiAgICB3aGlsZSAobGVuZ3RoID4gMCkge1xuICAgICAgY3VyciA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBIRUFQVTguc3ViYXJyYXkocHRyLCBwdHIgKyBNYXRoLm1pbihsZW5ndGgsIE1BWF9DSFVOSykpKTtcbiAgICAgIHJldCA9IHJldCA/IHJldCArIGN1cnIgOiBjdXJyO1xuICAgICAgcHRyICs9IE1BWF9DSFVOSztcbiAgICAgIGxlbmd0aCAtPSBNQVhfQ0hVTks7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgcmV0dXJuIE1vZHVsZVsnVVRGOFRvU3RyaW5nJ10ocHRyKTtcbn1cbk1vZHVsZVtcIlBvaW50ZXJfc3RyaW5naWZ5XCJdID0gUG9pbnRlcl9zdHJpbmdpZnk7XG5cbi8vIEdpdmVuIGEgcG9pbnRlciAncHRyJyB0byBhIG51bGwtdGVybWluYXRlZCBBU0NJSS1lbmNvZGVkIHN0cmluZyBpbiB0aGUgZW1zY3JpcHRlbiBIRUFQLCByZXR1cm5zXG4vLyBhIGNvcHkgb2YgdGhhdCBzdHJpbmcgYXMgYSBKYXZhc2NyaXB0IFN0cmluZyBvYmplY3QuXG5cbmZ1bmN0aW9uIEFzY2lpVG9TdHJpbmcocHRyKSB7XG4gIHZhciBzdHIgPSAnJztcbiAgd2hpbGUgKDEpIHtcbiAgICB2YXIgY2ggPSBIRUFQOFsoKHB0cisrKT4+MCldO1xuICAgIGlmICghY2gpIHJldHVybiBzdHI7XG4gICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY2gpO1xuICB9XG59XG5Nb2R1bGVbXCJBc2NpaVRvU3RyaW5nXCJdID0gQXNjaWlUb1N0cmluZztcblxuLy8gQ29waWVzIHRoZSBnaXZlbiBKYXZhc2NyaXB0IFN0cmluZyBvYmplY3QgJ3N0cicgdG8gdGhlIGVtc2NyaXB0ZW4gSEVBUCBhdCBhZGRyZXNzICdvdXRQdHInLFxuLy8gbnVsbC10ZXJtaW5hdGVkIGFuZCBlbmNvZGVkIGluIEFTQ0lJIGZvcm0uIFRoZSBjb3B5IHdpbGwgcmVxdWlyZSBhdCBtb3N0IHN0ci5sZW5ndGgrMSBieXRlcyBvZiBzcGFjZSBpbiB0aGUgSEVBUC5cblxuZnVuY3Rpb24gc3RyaW5nVG9Bc2NpaShzdHIsIG91dFB0cikge1xuICByZXR1cm4gd3JpdGVBc2NpaVRvTWVtb3J5KHN0ciwgb3V0UHRyLCBmYWxzZSk7XG59XG5Nb2R1bGVbXCJzdHJpbmdUb0FzY2lpXCJdID0gc3RyaW5nVG9Bc2NpaTtcblxuLy8gR2l2ZW4gYSBwb2ludGVyICdwdHInIHRvIGEgbnVsbC10ZXJtaW5hdGVkIFVURjgtZW5jb2RlZCBzdHJpbmcgaW4gdGhlIGdpdmVuIGFycmF5IHRoYXQgY29udGFpbnMgdWludDggdmFsdWVzLCByZXR1cm5zXG4vLyBhIGNvcHkgb2YgdGhhdCBzdHJpbmcgYXMgYSBKYXZhc2NyaXB0IFN0cmluZyBvYmplY3QuXG5cbnZhciBVVEY4RGVjb2RlciA9IHR5cGVvZiBUZXh0RGVjb2RlciAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgVGV4dERlY29kZXIoJ3V0ZjgnKSA6IHVuZGVmaW5lZDtcbmZ1bmN0aW9uIFVURjhBcnJheVRvU3RyaW5nKHU4QXJyYXksIGlkeCkge1xuICB2YXIgZW5kUHRyID0gaWR4O1xuICAvLyBUZXh0RGVjb2RlciBuZWVkcyB0byBrbm93IHRoZSBieXRlIGxlbmd0aCBpbiBhZHZhbmNlLCBpdCBkb2Vzbid0IHN0b3Agb24gbnVsbCB0ZXJtaW5hdG9yIGJ5IGl0c2VsZi5cbiAgLy8gQWxzbywgdXNlIHRoZSBsZW5ndGggaW5mbyB0byBhdm9pZCBydW5uaW5nIHRpbnkgc3RyaW5ncyB0aHJvdWdoIFRleHREZWNvZGVyLCBzaW5jZSAuc3ViYXJyYXkoKSBhbGxvY2F0ZXMgZ2FyYmFnZS5cbiAgd2hpbGUgKHU4QXJyYXlbZW5kUHRyXSkgKytlbmRQdHI7XG5cbiAgaWYgKGVuZFB0ciAtIGlkeCA+IDE2ICYmIHU4QXJyYXkuc3ViYXJyYXkgJiYgVVRGOERlY29kZXIpIHtcbiAgICByZXR1cm4gVVRGOERlY29kZXIuZGVjb2RlKHU4QXJyYXkuc3ViYXJyYXkoaWR4LCBlbmRQdHIpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdTAsIHUxLCB1MiwgdTMsIHU0LCB1NTtcblxuICAgIHZhciBzdHIgPSAnJztcbiAgICB3aGlsZSAoMSkge1xuICAgICAgLy8gRm9yIFVURjggYnl0ZSBzdHJ1Y3R1cmUsIHNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VURi04I0Rlc2NyaXB0aW9uIGFuZCBodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMjI3OS50eHQgYW5kIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNjI5XG4gICAgICB1MCA9IHU4QXJyYXlbaWR4KytdO1xuICAgICAgaWYgKCF1MCkgcmV0dXJuIHN0cjtcbiAgICAgIGlmICghKHUwICYgMHg4MCkpIHsgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodTApOyBjb250aW51ZTsgfVxuICAgICAgdTEgPSB1OEFycmF5W2lkeCsrXSAmIDYzO1xuICAgICAgaWYgKCh1MCAmIDB4RTApID09IDB4QzApIHsgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKCh1MCAmIDMxKSA8PCA2KSB8IHUxKTsgY29udGludWU7IH1cbiAgICAgIHUyID0gdThBcnJheVtpZHgrK10gJiA2MztcbiAgICAgIGlmICgodTAgJiAweEYwKSA9PSAweEUwKSB7XG4gICAgICAgIHUwID0gKCh1MCAmIDE1KSA8PCAxMikgfCAodTEgPDwgNikgfCB1MjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHUzID0gdThBcnJheVtpZHgrK10gJiA2MztcbiAgICAgICAgaWYgKCh1MCAmIDB4RjgpID09IDB4RjApIHtcbiAgICAgICAgICB1MCA9ICgodTAgJiA3KSA8PCAxOCkgfCAodTEgPDwgMTIpIHwgKHUyIDw8IDYpIHwgdTM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdTQgPSB1OEFycmF5W2lkeCsrXSAmIDYzO1xuICAgICAgICAgIGlmICgodTAgJiAweEZDKSA9PSAweEY4KSB7XG4gICAgICAgICAgICB1MCA9ICgodTAgJiAzKSA8PCAyNCkgfCAodTEgPDwgMTgpIHwgKHUyIDw8IDEyKSB8ICh1MyA8PCA2KSB8IHU0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1NSA9IHU4QXJyYXlbaWR4KytdICYgNjM7XG4gICAgICAgICAgICB1MCA9ICgodTAgJiAxKSA8PCAzMCkgfCAodTEgPDwgMjQpIHwgKHUyIDw8IDE4KSB8ICh1MyA8PCAxMikgfCAodTQgPDwgNikgfCB1NTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh1MCA8IDB4MTAwMDApIHtcbiAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNoID0gdTAgLSAweDEwMDAwO1xuICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgweEQ4MDAgfCAoY2ggPj4gMTApLCAweERDMDAgfCAoY2ggJiAweDNGRikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuTW9kdWxlW1wiVVRGOEFycmF5VG9TdHJpbmdcIl0gPSBVVEY4QXJyYXlUb1N0cmluZztcblxuLy8gR2l2ZW4gYSBwb2ludGVyICdwdHInIHRvIGEgbnVsbC10ZXJtaW5hdGVkIFVURjgtZW5jb2RlZCBzdHJpbmcgaW4gdGhlIGVtc2NyaXB0ZW4gSEVBUCwgcmV0dXJuc1xuLy8gYSBjb3B5IG9mIHRoYXQgc3RyaW5nIGFzIGEgSmF2YXNjcmlwdCBTdHJpbmcgb2JqZWN0LlxuXG5mdW5jdGlvbiBVVEY4VG9TdHJpbmcocHRyKSB7XG4gIHJldHVybiBVVEY4QXJyYXlUb1N0cmluZyhIRUFQVTgscHRyKTtcbn1cbk1vZHVsZVtcIlVURjhUb1N0cmluZ1wiXSA9IFVURjhUb1N0cmluZztcblxuLy8gQ29waWVzIHRoZSBnaXZlbiBKYXZhc2NyaXB0IFN0cmluZyBvYmplY3QgJ3N0cicgdG8gdGhlIGdpdmVuIGJ5dGUgYXJyYXkgYXQgYWRkcmVzcyAnb3V0SWR4Jyxcbi8vIGVuY29kZWQgaW4gVVRGOCBmb3JtIGFuZCBudWxsLXRlcm1pbmF0ZWQuIFRoZSBjb3B5IHdpbGwgcmVxdWlyZSBhdCBtb3N0IHN0ci5sZW5ndGgqNCsxIGJ5dGVzIG9mIHNwYWNlIGluIHRoZSBIRUFQLlxuLy8gVXNlIHRoZSBmdW5jdGlvbiBsZW5ndGhCeXRlc1VURjggdG8gY29tcHV0ZSB0aGUgZXhhY3QgbnVtYmVyIG9mIGJ5dGVzIChleGNsdWRpbmcgbnVsbCB0ZXJtaW5hdG9yKSB0aGF0IHRoaXMgZnVuY3Rpb24gd2lsbCB3cml0ZS5cbi8vIFBhcmFtZXRlcnM6XG4vLyAgIHN0cjogdGhlIEphdmFzY3JpcHQgc3RyaW5nIHRvIGNvcHkuXG4vLyAgIG91dFU4QXJyYXk6IHRoZSBhcnJheSB0byBjb3B5IHRvLiBFYWNoIGluZGV4IGluIHRoaXMgYXJyYXkgaXMgYXNzdW1lZCB0byBiZSBvbmUgOC1ieXRlIGVsZW1lbnQuXG4vLyAgIG91dElkeDogVGhlIHN0YXJ0aW5nIG9mZnNldCBpbiB0aGUgYXJyYXkgdG8gYmVnaW4gdGhlIGNvcHlpbmcuXG4vLyAgIG1heEJ5dGVzVG9Xcml0ZTogVGhlIG1heGltdW0gbnVtYmVyIG9mIGJ5dGVzIHRoaXMgZnVuY3Rpb24gY2FuIHdyaXRlIHRvIHRoZSBhcnJheS4gVGhpcyBjb3VudCBzaG91bGQgaW5jbHVkZSB0aGUgbnVsbFxuLy8gICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0b3IsIGkuZS4gaWYgbWF4Qnl0ZXNUb1dyaXRlPTEsIG9ubHkgdGhlIG51bGwgdGVybWluYXRvciB3aWxsIGJlIHdyaXR0ZW4gYW5kIG5vdGhpbmcgZWxzZS5cbi8vICAgICAgICAgICAgICAgICAgICBtYXhCeXRlc1RvV3JpdGU9MCBkb2VzIG5vdCB3cml0ZSBhbnkgYnl0ZXMgdG8gdGhlIG91dHB1dCwgbm90IGV2ZW4gdGhlIG51bGwgdGVybWluYXRvci5cbi8vIFJldHVybnMgdGhlIG51bWJlciBvZiBieXRlcyB3cml0dGVuLCBFWENMVURJTkcgdGhlIG51bGwgdGVybWluYXRvci5cblxuZnVuY3Rpb24gc3RyaW5nVG9VVEY4QXJyYXkoc3RyLCBvdXRVOEFycmF5LCBvdXRJZHgsIG1heEJ5dGVzVG9Xcml0ZSkge1xuICBpZiAoIShtYXhCeXRlc1RvV3JpdGUgPiAwKSkgLy8gUGFyYW1ldGVyIG1heEJ5dGVzVG9Xcml0ZSBpcyBub3Qgb3B0aW9uYWwuIE5lZ2F0aXZlIHZhbHVlcywgMCwgbnVsbCwgdW5kZWZpbmVkIGFuZCBmYWxzZSBlYWNoIGRvbid0IHdyaXRlIG91dCBhbnkgYnl0ZXMuXG4gICAgcmV0dXJuIDA7XG5cbiAgdmFyIHN0YXJ0SWR4ID0gb3V0SWR4O1xuICB2YXIgZW5kSWR4ID0gb3V0SWR4ICsgbWF4Qnl0ZXNUb1dyaXRlIC0gMTsgLy8gLTEgZm9yIHN0cmluZyBudWxsIHRlcm1pbmF0b3IuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gR290Y2hhOiBjaGFyQ29kZUF0IHJldHVybnMgYSAxNi1iaXQgd29yZCB0aGF0IGlzIGEgVVRGLTE2IGVuY29kZWQgY29kZSB1bml0LCBub3QgYSBVbmljb2RlIGNvZGUgcG9pbnQgb2YgdGhlIGNoYXJhY3RlciEgU28gZGVjb2RlIFVURjE2LT5VVEYzMi0+VVRGOC5cbiAgICAvLyBTZWUgaHR0cDovL3VuaWNvZGUub3JnL2ZhcS91dGZfYm9tLmh0bWwjdXRmMTYtM1xuICAgIC8vIEZvciBVVEY4IGJ5dGUgc3RydWN0dXJlLCBzZWUgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9VVEYtOCNEZXNjcmlwdGlvbiBhbmQgaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzIyNzkudHh0IGFuZCBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzYyOVxuICAgIHZhciB1ID0gc3RyLmNoYXJDb2RlQXQoaSk7IC8vIHBvc3NpYmx5IGEgbGVhZCBzdXJyb2dhdGVcbiAgICBpZiAodSA+PSAweEQ4MDAgJiYgdSA8PSAweERGRkYpIHUgPSAweDEwMDAwICsgKCh1ICYgMHgzRkYpIDw8IDEwKSB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHgzRkYpO1xuICAgIGlmICh1IDw9IDB4N0YpIHtcbiAgICAgIGlmIChvdXRJZHggPj0gZW5kSWR4KSBicmVhaztcbiAgICAgIG91dFU4QXJyYXlbb3V0SWR4KytdID0gdTtcbiAgICB9IGVsc2UgaWYgKHUgPD0gMHg3RkYpIHtcbiAgICAgIGlmIChvdXRJZHggKyAxID49IGVuZElkeCkgYnJlYWs7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4QzAgfCAodSA+PiA2KTtcbiAgICAgIG91dFU4QXJyYXlbb3V0SWR4KytdID0gMHg4MCB8ICh1ICYgNjMpO1xuICAgIH0gZWxzZSBpZiAodSA8PSAweEZGRkYpIHtcbiAgICAgIGlmIChvdXRJZHggKyAyID49IGVuZElkeCkgYnJlYWs7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4RTAgfCAodSA+PiAxMik7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4ODAgfCAoKHUgPj4gNikgJiA2Myk7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4ODAgfCAodSAmIDYzKTtcbiAgICB9IGVsc2UgaWYgKHUgPD0gMHgxRkZGRkYpIHtcbiAgICAgIGlmIChvdXRJZHggKyAzID49IGVuZElkeCkgYnJlYWs7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4RjAgfCAodSA+PiAxOCk7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4ODAgfCAoKHUgPj4gMTIpICYgNjMpO1xuICAgICAgb3V0VThBcnJheVtvdXRJZHgrK10gPSAweDgwIHwgKCh1ID4+IDYpICYgNjMpO1xuICAgICAgb3V0VThBcnJheVtvdXRJZHgrK10gPSAweDgwIHwgKHUgJiA2Myk7XG4gICAgfSBlbHNlIGlmICh1IDw9IDB4M0ZGRkZGRikge1xuICAgICAgaWYgKG91dElkeCArIDQgPj0gZW5kSWR4KSBicmVhaztcbiAgICAgIG91dFU4QXJyYXlbb3V0SWR4KytdID0gMHhGOCB8ICh1ID4+IDI0KTtcbiAgICAgIG91dFU4QXJyYXlbb3V0SWR4KytdID0gMHg4MCB8ICgodSA+PiAxOCkgJiA2Myk7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4ODAgfCAoKHUgPj4gMTIpICYgNjMpO1xuICAgICAgb3V0VThBcnJheVtvdXRJZHgrK10gPSAweDgwIHwgKCh1ID4+IDYpICYgNjMpO1xuICAgICAgb3V0VThBcnJheVtvdXRJZHgrK10gPSAweDgwIHwgKHUgJiA2Myk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvdXRJZHggKyA1ID49IGVuZElkeCkgYnJlYWs7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4RkMgfCAodSA+PiAzMCk7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4ODAgfCAoKHUgPj4gMjQpICYgNjMpO1xuICAgICAgb3V0VThBcnJheVtvdXRJZHgrK10gPSAweDgwIHwgKCh1ID4+IDE4KSAmIDYzKTtcbiAgICAgIG91dFU4QXJyYXlbb3V0SWR4KytdID0gMHg4MCB8ICgodSA+PiAxMikgJiA2Myk7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4ODAgfCAoKHUgPj4gNikgJiA2Myk7XG4gICAgICBvdXRVOEFycmF5W291dElkeCsrXSA9IDB4ODAgfCAodSAmIDYzKTtcbiAgICB9XG4gIH1cbiAgLy8gTnVsbC10ZXJtaW5hdGUgdGhlIHBvaW50ZXIgdG8gdGhlIGJ1ZmZlci5cbiAgb3V0VThBcnJheVtvdXRJZHhdID0gMDtcbiAgcmV0dXJuIG91dElkeCAtIHN0YXJ0SWR4O1xufVxuTW9kdWxlW1wic3RyaW5nVG9VVEY4QXJyYXlcIl0gPSBzdHJpbmdUb1VURjhBcnJheTtcblxuLy8gQ29waWVzIHRoZSBnaXZlbiBKYXZhc2NyaXB0IFN0cmluZyBvYmplY3QgJ3N0cicgdG8gdGhlIGVtc2NyaXB0ZW4gSEVBUCBhdCBhZGRyZXNzICdvdXRQdHInLFxuLy8gbnVsbC10ZXJtaW5hdGVkIGFuZCBlbmNvZGVkIGluIFVURjggZm9ybS4gVGhlIGNvcHkgd2lsbCByZXF1aXJlIGF0IG1vc3Qgc3RyLmxlbmd0aCo0KzEgYnl0ZXMgb2Ygc3BhY2UgaW4gdGhlIEhFQVAuXG4vLyBVc2UgdGhlIGZ1bmN0aW9uIGxlbmd0aEJ5dGVzVVRGOCB0byBjb21wdXRlIHRoZSBleGFjdCBudW1iZXIgb2YgYnl0ZXMgKGV4Y2x1ZGluZyBudWxsIHRlcm1pbmF0b3IpIHRoYXQgdGhpcyBmdW5jdGlvbiB3aWxsIHdyaXRlLlxuLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGJ5dGVzIHdyaXR0ZW4sIEVYQ0xVRElORyB0aGUgbnVsbCB0ZXJtaW5hdG9yLlxuXG5mdW5jdGlvbiBzdHJpbmdUb1VURjgoc3RyLCBvdXRQdHIsIG1heEJ5dGVzVG9Xcml0ZSkge1xuICBhc3NlcnQodHlwZW9mIG1heEJ5dGVzVG9Xcml0ZSA9PSAnbnVtYmVyJywgJ3N0cmluZ1RvVVRGOChzdHIsIG91dFB0ciwgbWF4Qnl0ZXNUb1dyaXRlKSBpcyBtaXNzaW5nIHRoZSB0aGlyZCBwYXJhbWV0ZXIgdGhhdCBzcGVjaWZpZXMgdGhlIGxlbmd0aCBvZiB0aGUgb3V0cHV0IGJ1ZmZlciEnKTtcbiAgcmV0dXJuIHN0cmluZ1RvVVRGOEFycmF5KHN0ciwgSEVBUFU4LG91dFB0ciwgbWF4Qnl0ZXNUb1dyaXRlKTtcbn1cbk1vZHVsZVtcInN0cmluZ1RvVVRGOFwiXSA9IHN0cmluZ1RvVVRGODtcblxuLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBnaXZlbiBKYXZhc2NyaXB0IHN0cmluZyB0YWtlcyBpZiBlbmNvZGVkIGFzIGEgVVRGOCBieXRlIGFycmF5LCBFWENMVURJTkcgdGhlIG51bGwgdGVybWluYXRvciBieXRlLlxuXG5mdW5jdGlvbiBsZW5ndGhCeXRlc1VURjgoc3RyKSB7XG4gIHZhciBsZW4gPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIEdvdGNoYTogY2hhckNvZGVBdCByZXR1cm5zIGEgMTYtYml0IHdvcmQgdGhhdCBpcyBhIFVURi0xNiBlbmNvZGVkIGNvZGUgdW5pdCwgbm90IGEgVW5pY29kZSBjb2RlIHBvaW50IG9mIHRoZSBjaGFyYWN0ZXIhIFNvIGRlY29kZSBVVEYxNi0+VVRGMzItPlVURjguXG4gICAgLy8gU2VlIGh0dHA6Ly91bmljb2RlLm9yZy9mYXEvdXRmX2JvbS5odG1sI3V0ZjE2LTNcbiAgICB2YXIgdSA9IHN0ci5jaGFyQ29kZUF0KGkpOyAvLyBwb3NzaWJseSBhIGxlYWQgc3Vycm9nYXRlXG4gICAgaWYgKHUgPj0gMHhEODAwICYmIHUgPD0gMHhERkZGKSB1ID0gMHgxMDAwMCArICgodSAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4M0ZGKTtcbiAgICBpZiAodSA8PSAweDdGKSB7XG4gICAgICArK2xlbjtcbiAgICB9IGVsc2UgaWYgKHUgPD0gMHg3RkYpIHtcbiAgICAgIGxlbiArPSAyO1xuICAgIH0gZWxzZSBpZiAodSA8PSAweEZGRkYpIHtcbiAgICAgIGxlbiArPSAzO1xuICAgIH0gZWxzZSBpZiAodSA8PSAweDFGRkZGRikge1xuICAgICAgbGVuICs9IDQ7XG4gICAgfSBlbHNlIGlmICh1IDw9IDB4M0ZGRkZGRikge1xuICAgICAgbGVuICs9IDU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbiArPSA2O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGVuO1xufVxuTW9kdWxlW1wibGVuZ3RoQnl0ZXNVVEY4XCJdID0gbGVuZ3RoQnl0ZXNVVEY4O1xuXG4vLyBHaXZlbiBhIHBvaW50ZXIgJ3B0cicgdG8gYSBudWxsLXRlcm1pbmF0ZWQgVVRGMTZMRS1lbmNvZGVkIHN0cmluZyBpbiB0aGUgZW1zY3JpcHRlbiBIRUFQLCByZXR1cm5zXG4vLyBhIGNvcHkgb2YgdGhhdCBzdHJpbmcgYXMgYSBKYXZhc2NyaXB0IFN0cmluZyBvYmplY3QuXG5cbnZhciBVVEYxNkRlY29kZXIgPSB0eXBlb2YgVGV4dERlY29kZXIgIT09ICd1bmRlZmluZWQnID8gbmV3IFRleHREZWNvZGVyKCd1dGYtMTZsZScpIDogdW5kZWZpbmVkO1xuZnVuY3Rpb24gVVRGMTZUb1N0cmluZyhwdHIpIHtcbiAgYXNzZXJ0KHB0ciAlIDIgPT0gMCwgJ1BvaW50ZXIgcGFzc2VkIHRvIFVURjE2VG9TdHJpbmcgbXVzdCBiZSBhbGlnbmVkIHRvIHR3byBieXRlcyEnKTtcbiAgdmFyIGVuZFB0ciA9IHB0cjtcbiAgLy8gVGV4dERlY29kZXIgbmVlZHMgdG8ga25vdyB0aGUgYnl0ZSBsZW5ndGggaW4gYWR2YW5jZSwgaXQgZG9lc24ndCBzdG9wIG9uIG51bGwgdGVybWluYXRvciBieSBpdHNlbGYuXG4gIC8vIEFsc28sIHVzZSB0aGUgbGVuZ3RoIGluZm8gdG8gYXZvaWQgcnVubmluZyB0aW55IHN0cmluZ3MgdGhyb3VnaCBUZXh0RGVjb2Rlciwgc2luY2UgLnN1YmFycmF5KCkgYWxsb2NhdGVzIGdhcmJhZ2UuXG4gIHZhciBpZHggPSBlbmRQdHIgPj4gMTtcbiAgd2hpbGUgKEhFQVAxNltpZHhdKSArK2lkeDtcbiAgZW5kUHRyID0gaWR4IDw8IDE7XG5cbiAgaWYgKGVuZFB0ciAtIHB0ciA+IDMyICYmIFVURjE2RGVjb2Rlcikge1xuICAgIHJldHVybiBVVEYxNkRlY29kZXIuZGVjb2RlKEhFQVBVOC5zdWJhcnJheShwdHIsIGVuZFB0cikpO1xuICB9IGVsc2Uge1xuICAgIHZhciBpID0gMDtcblxuICAgIHZhciBzdHIgPSAnJztcbiAgICB3aGlsZSAoMSkge1xuICAgICAgdmFyIGNvZGVVbml0ID0gSEVBUDE2WygoKHB0cikrKGkqMikpPj4xKV07XG4gICAgICBpZiAoY29kZVVuaXQgPT0gMCkgcmV0dXJuIHN0cjtcbiAgICAgICsraTtcbiAgICAgIC8vIGZyb21DaGFyQ29kZSBjb25zdHJ1Y3RzIGEgY2hhcmFjdGVyIGZyb20gYSBVVEYtMTYgY29kZSB1bml0LCBzbyB3ZSBjYW4gcGFzcyB0aGUgVVRGMTYgc3RyaW5nIHJpZ2h0IHRocm91Z2guXG4gICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlVW5pdCk7XG4gICAgfVxuICB9XG59XG5cblxuLy8gQ29waWVzIHRoZSBnaXZlbiBKYXZhc2NyaXB0IFN0cmluZyBvYmplY3QgJ3N0cicgdG8gdGhlIGVtc2NyaXB0ZW4gSEVBUCBhdCBhZGRyZXNzICdvdXRQdHInLFxuLy8gbnVsbC10ZXJtaW5hdGVkIGFuZCBlbmNvZGVkIGluIFVURjE2IGZvcm0uIFRoZSBjb3B5IHdpbGwgcmVxdWlyZSBhdCBtb3N0IHN0ci5sZW5ndGgqNCsyIGJ5dGVzIG9mIHNwYWNlIGluIHRoZSBIRUFQLlxuLy8gVXNlIHRoZSBmdW5jdGlvbiBsZW5ndGhCeXRlc1VURjE2KCkgdG8gY29tcHV0ZSB0aGUgZXhhY3QgbnVtYmVyIG9mIGJ5dGVzIChleGNsdWRpbmcgbnVsbCB0ZXJtaW5hdG9yKSB0aGF0IHRoaXMgZnVuY3Rpb24gd2lsbCB3cml0ZS5cbi8vIFBhcmFtZXRlcnM6XG4vLyAgIHN0cjogdGhlIEphdmFzY3JpcHQgc3RyaW5nIHRvIGNvcHkuXG4vLyAgIG91dFB0cjogQnl0ZSBhZGRyZXNzIGluIEVtc2NyaXB0ZW4gSEVBUCB3aGVyZSB0byB3cml0ZSB0aGUgc3RyaW5nIHRvLlxuLy8gICBtYXhCeXRlc1RvV3JpdGU6IFRoZSBtYXhpbXVtIG51bWJlciBvZiBieXRlcyB0aGlzIGZ1bmN0aW9uIGNhbiB3cml0ZSB0byB0aGUgYXJyYXkuIFRoaXMgY291bnQgc2hvdWxkIGluY2x1ZGUgdGhlIG51bGxcbi8vICAgICAgICAgICAgICAgICAgICB0ZXJtaW5hdG9yLCBpLmUuIGlmIG1heEJ5dGVzVG9Xcml0ZT0yLCBvbmx5IHRoZSBudWxsIHRlcm1pbmF0b3Igd2lsbCBiZSB3cml0dGVuIGFuZCBub3RoaW5nIGVsc2UuXG4vLyAgICAgICAgICAgICAgICAgICAgbWF4Qnl0ZXNUb1dyaXRlPDIgZG9lcyBub3Qgd3JpdGUgYW55IGJ5dGVzIHRvIHRoZSBvdXRwdXQsIG5vdCBldmVuIHRoZSBudWxsIHRlcm1pbmF0b3IuXG4vLyBSZXR1cm5zIHRoZSBudW1iZXIgb2YgYnl0ZXMgd3JpdHRlbiwgRVhDTFVESU5HIHRoZSBudWxsIHRlcm1pbmF0b3IuXG5cbmZ1bmN0aW9uIHN0cmluZ1RvVVRGMTYoc3RyLCBvdXRQdHIsIG1heEJ5dGVzVG9Xcml0ZSkge1xuICBhc3NlcnQob3V0UHRyICUgMiA9PSAwLCAnUG9pbnRlciBwYXNzZWQgdG8gc3RyaW5nVG9VVEYxNiBtdXN0IGJlIGFsaWduZWQgdG8gdHdvIGJ5dGVzIScpO1xuICBhc3NlcnQodHlwZW9mIG1heEJ5dGVzVG9Xcml0ZSA9PSAnbnVtYmVyJywgJ3N0cmluZ1RvVVRGMTYoc3RyLCBvdXRQdHIsIG1heEJ5dGVzVG9Xcml0ZSkgaXMgbWlzc2luZyB0aGUgdGhpcmQgcGFyYW1ldGVyIHRoYXQgc3BlY2lmaWVzIHRoZSBsZW5ndGggb2YgdGhlIG91dHB1dCBidWZmZXIhJyk7XG4gIC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5OiBpZiBtYXggYnl0ZXMgaXMgbm90IHNwZWNpZmllZCwgYXNzdW1lIHVuc2FmZSB1bmJvdW5kZWQgd3JpdGUgaXMgYWxsb3dlZC5cbiAgaWYgKG1heEJ5dGVzVG9Xcml0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4Qnl0ZXNUb1dyaXRlID0gMHg3RkZGRkZGRjtcbiAgfVxuICBpZiAobWF4Qnl0ZXNUb1dyaXRlIDwgMikgcmV0dXJuIDA7XG4gIG1heEJ5dGVzVG9Xcml0ZSAtPSAyOyAvLyBOdWxsIHRlcm1pbmF0b3IuXG4gIHZhciBzdGFydFB0ciA9IG91dFB0cjtcbiAgdmFyIG51bUNoYXJzVG9Xcml0ZSA9IChtYXhCeXRlc1RvV3JpdGUgPCBzdHIubGVuZ3RoKjIpID8gKG1heEJ5dGVzVG9Xcml0ZSAvIDIpIDogc3RyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1DaGFyc1RvV3JpdGU7ICsraSkge1xuICAgIC8vIGNoYXJDb2RlQXQgcmV0dXJucyBhIFVURi0xNiBlbmNvZGVkIGNvZGUgdW5pdCwgc28gaXQgY2FuIGJlIGRpcmVjdGx5IHdyaXR0ZW4gdG8gdGhlIEhFQVAuXG4gICAgdmFyIGNvZGVVbml0ID0gc3RyLmNoYXJDb2RlQXQoaSk7IC8vIHBvc3NpYmx5IGEgbGVhZCBzdXJyb2dhdGVcbiAgICBIRUFQMTZbKChvdXRQdHIpPj4xKV09Y29kZVVuaXQ7XG4gICAgb3V0UHRyICs9IDI7XG4gIH1cbiAgLy8gTnVsbC10ZXJtaW5hdGUgdGhlIHBvaW50ZXIgdG8gdGhlIEhFQVAuXG4gIEhFQVAxNlsoKG91dFB0cik+PjEpXT0wO1xuICByZXR1cm4gb3V0UHRyIC0gc3RhcnRQdHI7XG59XG5cblxuLy8gUmV0dXJucyB0aGUgbnVtYmVyIG9mIGJ5dGVzIHRoZSBnaXZlbiBKYXZhc2NyaXB0IHN0cmluZyB0YWtlcyBpZiBlbmNvZGVkIGFzIGEgVVRGMTYgYnl0ZSBhcnJheSwgRVhDTFVESU5HIHRoZSBudWxsIHRlcm1pbmF0b3IgYnl0ZS5cblxuZnVuY3Rpb24gbGVuZ3RoQnl0ZXNVVEYxNihzdHIpIHtcbiAgcmV0dXJuIHN0ci5sZW5ndGgqMjtcbn1cblxuXG5mdW5jdGlvbiBVVEYzMlRvU3RyaW5nKHB0cikge1xuICBhc3NlcnQocHRyICUgNCA9PSAwLCAnUG9pbnRlciBwYXNzZWQgdG8gVVRGMzJUb1N0cmluZyBtdXN0IGJlIGFsaWduZWQgdG8gZm91ciBieXRlcyEnKTtcbiAgdmFyIGkgPSAwO1xuXG4gIHZhciBzdHIgPSAnJztcbiAgd2hpbGUgKDEpIHtcbiAgICB2YXIgdXRmMzIgPSBIRUFQMzJbKCgocHRyKSsoaSo0KSk+PjIpXTtcbiAgICBpZiAodXRmMzIgPT0gMClcbiAgICAgIHJldHVybiBzdHI7XG4gICAgKytpO1xuICAgIC8vIEdvdGNoYTogZnJvbUNoYXJDb2RlIGNvbnN0cnVjdHMgYSBjaGFyYWN0ZXIgZnJvbSBhIFVURi0xNiBlbmNvZGVkIGNvZGUgKHBhaXIpLCBub3QgZnJvbSBhIFVuaWNvZGUgY29kZSBwb2ludCEgU28gZW5jb2RlIHRoZSBjb2RlIHBvaW50IHRvIFVURi0xNiBmb3IgY29uc3RydWN0aW5nLlxuICAgIC8vIFNlZSBodHRwOi8vdW5pY29kZS5vcmcvZmFxL3V0Zl9ib20uaHRtbCN1dGYxNi0zXG4gICAgaWYgKHV0ZjMyID49IDB4MTAwMDApIHtcbiAgICAgIHZhciBjaCA9IHV0ZjMyIC0gMHgxMDAwMDtcbiAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RDgwMCB8IChjaCA+PiAxMCksIDB4REMwMCB8IChjaCAmIDB4M0ZGKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHV0ZjMyKTtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBDb3BpZXMgdGhlIGdpdmVuIEphdmFzY3JpcHQgU3RyaW5nIG9iamVjdCAnc3RyJyB0byB0aGUgZW1zY3JpcHRlbiBIRUFQIGF0IGFkZHJlc3MgJ291dFB0cicsXG4vLyBudWxsLXRlcm1pbmF0ZWQgYW5kIGVuY29kZWQgaW4gVVRGMzIgZm9ybS4gVGhlIGNvcHkgd2lsbCByZXF1aXJlIGF0IG1vc3Qgc3RyLmxlbmd0aCo0KzQgYnl0ZXMgb2Ygc3BhY2UgaW4gdGhlIEhFQVAuXG4vLyBVc2UgdGhlIGZ1bmN0aW9uIGxlbmd0aEJ5dGVzVVRGMzIoKSB0byBjb21wdXRlIHRoZSBleGFjdCBudW1iZXIgb2YgYnl0ZXMgKGV4Y2x1ZGluZyBudWxsIHRlcm1pbmF0b3IpIHRoYXQgdGhpcyBmdW5jdGlvbiB3aWxsIHdyaXRlLlxuLy8gUGFyYW1ldGVyczpcbi8vICAgc3RyOiB0aGUgSmF2YXNjcmlwdCBzdHJpbmcgdG8gY29weS5cbi8vICAgb3V0UHRyOiBCeXRlIGFkZHJlc3MgaW4gRW1zY3JpcHRlbiBIRUFQIHdoZXJlIHRvIHdyaXRlIHRoZSBzdHJpbmcgdG8uXG4vLyAgIG1heEJ5dGVzVG9Xcml0ZTogVGhlIG1heGltdW0gbnVtYmVyIG9mIGJ5dGVzIHRoaXMgZnVuY3Rpb24gY2FuIHdyaXRlIHRvIHRoZSBhcnJheS4gVGhpcyBjb3VudCBzaG91bGQgaW5jbHVkZSB0aGUgbnVsbFxuLy8gICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0b3IsIGkuZS4gaWYgbWF4Qnl0ZXNUb1dyaXRlPTQsIG9ubHkgdGhlIG51bGwgdGVybWluYXRvciB3aWxsIGJlIHdyaXR0ZW4gYW5kIG5vdGhpbmcgZWxzZS5cbi8vICAgICAgICAgICAgICAgICAgICBtYXhCeXRlc1RvV3JpdGU8NCBkb2VzIG5vdCB3cml0ZSBhbnkgYnl0ZXMgdG8gdGhlIG91dHB1dCwgbm90IGV2ZW4gdGhlIG51bGwgdGVybWluYXRvci5cbi8vIFJldHVybnMgdGhlIG51bWJlciBvZiBieXRlcyB3cml0dGVuLCBFWENMVURJTkcgdGhlIG51bGwgdGVybWluYXRvci5cblxuZnVuY3Rpb24gc3RyaW5nVG9VVEYzMihzdHIsIG91dFB0ciwgbWF4Qnl0ZXNUb1dyaXRlKSB7XG4gIGFzc2VydChvdXRQdHIgJSA0ID09IDAsICdQb2ludGVyIHBhc3NlZCB0byBzdHJpbmdUb1VURjMyIG11c3QgYmUgYWxpZ25lZCB0byBmb3VyIGJ5dGVzIScpO1xuICBhc3NlcnQodHlwZW9mIG1heEJ5dGVzVG9Xcml0ZSA9PSAnbnVtYmVyJywgJ3N0cmluZ1RvVVRGMzIoc3RyLCBvdXRQdHIsIG1heEJ5dGVzVG9Xcml0ZSkgaXMgbWlzc2luZyB0aGUgdGhpcmQgcGFyYW1ldGVyIHRoYXQgc3BlY2lmaWVzIHRoZSBsZW5ndGggb2YgdGhlIG91dHB1dCBidWZmZXIhJyk7XG4gIC8vIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5OiBpZiBtYXggYnl0ZXMgaXMgbm90IHNwZWNpZmllZCwgYXNzdW1lIHVuc2FmZSB1bmJvdW5kZWQgd3JpdGUgaXMgYWxsb3dlZC5cbiAgaWYgKG1heEJ5dGVzVG9Xcml0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbWF4Qnl0ZXNUb1dyaXRlID0gMHg3RkZGRkZGRjtcbiAgfVxuICBpZiAobWF4Qnl0ZXNUb1dyaXRlIDwgNCkgcmV0dXJuIDA7XG4gIHZhciBzdGFydFB0ciA9IG91dFB0cjtcbiAgdmFyIGVuZFB0ciA9IHN0YXJ0UHRyICsgbWF4Qnl0ZXNUb1dyaXRlIC0gNDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBHb3RjaGE6IGNoYXJDb2RlQXQgcmV0dXJucyBhIDE2LWJpdCB3b3JkIHRoYXQgaXMgYSBVVEYtMTYgZW5jb2RlZCBjb2RlIHVuaXQsIG5vdCBhIFVuaWNvZGUgY29kZSBwb2ludCBvZiB0aGUgY2hhcmFjdGVyISBXZSBtdXN0IGRlY29kZSB0aGUgc3RyaW5nIHRvIFVURi0zMiB0byB0aGUgaGVhcC5cbiAgICAvLyBTZWUgaHR0cDovL3VuaWNvZGUub3JnL2ZhcS91dGZfYm9tLmh0bWwjdXRmMTYtM1xuICAgIHZhciBjb2RlVW5pdCA9IHN0ci5jaGFyQ29kZUF0KGkpOyAvLyBwb3NzaWJseSBhIGxlYWQgc3Vycm9nYXRlXG4gICAgaWYgKGNvZGVVbml0ID49IDB4RDgwMCAmJiBjb2RlVW5pdCA8PSAweERGRkYpIHtcbiAgICAgIHZhciB0cmFpbFN1cnJvZ2F0ZSA9IHN0ci5jaGFyQ29kZUF0KCsraSk7XG4gICAgICBjb2RlVW5pdCA9IDB4MTAwMDAgKyAoKGNvZGVVbml0ICYgMHgzRkYpIDw8IDEwKSB8ICh0cmFpbFN1cnJvZ2F0ZSAmIDB4M0ZGKTtcbiAgICB9XG4gICAgSEVBUDMyWygob3V0UHRyKT4+MildPWNvZGVVbml0O1xuICAgIG91dFB0ciArPSA0O1xuICAgIGlmIChvdXRQdHIgKyA0ID4gZW5kUHRyKSBicmVhaztcbiAgfVxuICAvLyBOdWxsLXRlcm1pbmF0ZSB0aGUgcG9pbnRlciB0byB0aGUgSEVBUC5cbiAgSEVBUDMyWygob3V0UHRyKT4+MildPTA7XG4gIHJldHVybiBvdXRQdHIgLSBzdGFydFB0cjtcbn1cblxuXG4vLyBSZXR1cm5zIHRoZSBudW1iZXIgb2YgYnl0ZXMgdGhlIGdpdmVuIEphdmFzY3JpcHQgc3RyaW5nIHRha2VzIGlmIGVuY29kZWQgYXMgYSBVVEYxNiBieXRlIGFycmF5LCBFWENMVURJTkcgdGhlIG51bGwgdGVybWluYXRvciBieXRlLlxuXG5mdW5jdGlvbiBsZW5ndGhCeXRlc1VURjMyKHN0cikge1xuICB2YXIgbGVuID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBHb3RjaGE6IGNoYXJDb2RlQXQgcmV0dXJucyBhIDE2LWJpdCB3b3JkIHRoYXQgaXMgYSBVVEYtMTYgZW5jb2RlZCBjb2RlIHVuaXQsIG5vdCBhIFVuaWNvZGUgY29kZSBwb2ludCBvZiB0aGUgY2hhcmFjdGVyISBXZSBtdXN0IGRlY29kZSB0aGUgc3RyaW5nIHRvIFVURi0zMiB0byB0aGUgaGVhcC5cbiAgICAvLyBTZWUgaHR0cDovL3VuaWNvZGUub3JnL2ZhcS91dGZfYm9tLmh0bWwjdXRmMTYtM1xuICAgIHZhciBjb2RlVW5pdCA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChjb2RlVW5pdCA+PSAweEQ4MDAgJiYgY29kZVVuaXQgPD0gMHhERkZGKSArK2k7IC8vIHBvc3NpYmx5IGEgbGVhZCBzdXJyb2dhdGUsIHNvIHNraXAgb3ZlciB0aGUgdGFpbCBzdXJyb2dhdGUuXG4gICAgbGVuICs9IDQ7XG4gIH1cblxuICByZXR1cm4gbGVuO1xufVxuXG5cbmZ1bmN0aW9uIGRlbWFuZ2xlKGZ1bmMpIHtcbiAgdmFyIF9fY3hhX2RlbWFuZ2xlX2Z1bmMgPSBNb2R1bGVbJ19fX2N4YV9kZW1hbmdsZSddIHx8IE1vZHVsZVsnX19jeGFfZGVtYW5nbGUnXTtcbiAgaWYgKF9fY3hhX2RlbWFuZ2xlX2Z1bmMpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHMgPVxuICAgICAgICBmdW5jLnN1YnN0cigxKTtcbiAgICAgIHZhciBsZW4gPSBsZW5ndGhCeXRlc1VURjgocykrMTtcbiAgICAgIHZhciBidWYgPSBfbWFsbG9jKGxlbik7XG4gICAgICBzdHJpbmdUb1VURjgocywgYnVmLCBsZW4pO1xuICAgICAgdmFyIHN0YXR1cyA9IF9tYWxsb2MoNCk7XG4gICAgICB2YXIgcmV0ID0gX19jeGFfZGVtYW5nbGVfZnVuYyhidWYsIDAsIDAsIHN0YXR1cyk7XG4gICAgICBpZiAoZ2V0VmFsdWUoc3RhdHVzLCAnaTMyJykgPT09IDAgJiYgcmV0KSB7XG4gICAgICAgIHJldHVybiBQb2ludGVyX3N0cmluZ2lmeShyZXQpO1xuICAgICAgfVxuICAgICAgLy8gb3RoZXJ3aXNlLCBsaWJjeHhhYmkgZmFpbGVkXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyBpZ25vcmUgcHJvYmxlbXMgaGVyZVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoYnVmKSBfZnJlZShidWYpO1xuICAgICAgaWYgKHN0YXR1cykgX2ZyZWUoc3RhdHVzKTtcbiAgICAgIGlmIChyZXQpIF9mcmVlKHJldCk7XG4gICAgfVxuICAgIC8vIGZhaWx1cmUgd2hlbiB1c2luZyBsaWJjeHhhYmksIGRvbid0IGRlbWFuZ2xlXG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgUnVudGltZS53YXJuT25jZSgnd2FybmluZzogYnVpbGQgd2l0aCAgLXMgREVNQU5HTEVfU1VQUE9SVD0xICB0byBsaW5rIGluIGxpYmN4eGFiaSBkZW1hbmdsaW5nJyk7XG4gIHJldHVybiBmdW5jO1xufVxuXG5mdW5jdGlvbiBkZW1hbmdsZUFsbCh0ZXh0KSB7XG4gIHZhciByZWdleCA9XG4gICAgL19fWltcXHdcXGRfXSsvZztcbiAgcmV0dXJuIHRleHQucmVwbGFjZShyZWdleCxcbiAgICBmdW5jdGlvbih4KSB7XG4gICAgICB2YXIgeSA9IGRlbWFuZ2xlKHgpO1xuICAgICAgcmV0dXJuIHggPT09IHkgPyB4IDogKHggKyAnIFsnICsgeSArICddJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGpzU3RhY2tUcmFjZSgpIHtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuICBpZiAoIWVyci5zdGFjaykge1xuICAgIC8vIElFMTArIHNwZWNpYWwgY2FzZXM6IEl0IGRvZXMgaGF2ZSBjYWxsc3RhY2sgaW5mbywgYnV0IGl0IGlzIG9ubHkgcG9wdWxhdGVkIGlmIGFuIEVycm9yIG9iamVjdCBpcyB0aHJvd24sXG4gICAgLy8gc28gdHJ5IHRoYXQgYXMgYSBzcGVjaWFsLWNhc2UuXG4gICAgdHJ5IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigwKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IGU7XG4gICAgfVxuICAgIGlmICghZXJyLnN0YWNrKSB7XG4gICAgICByZXR1cm4gJyhubyBzdGFjayB0cmFjZSBhdmFpbGFibGUpJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVyci5zdGFjay50b1N0cmluZygpO1xufVxuXG5mdW5jdGlvbiBzdGFja1RyYWNlKCkge1xuICB2YXIganMgPSBqc1N0YWNrVHJhY2UoKTtcbiAgaWYgKE1vZHVsZVsnZXh0cmFTdGFja1RyYWNlJ10pIGpzICs9ICdcXG4nICsgTW9kdWxlWydleHRyYVN0YWNrVHJhY2UnXSgpO1xuICByZXR1cm4gZGVtYW5nbGVBbGwoanMpO1xufVxuTW9kdWxlW1wic3RhY2tUcmFjZVwiXSA9IHN0YWNrVHJhY2U7XG5cbi8vIE1lbW9yeSBtYW5hZ2VtZW50XG5cbnZhciBQQUdFX1NJWkUgPSAxNjM4NDtcbnZhciBXQVNNX1BBR0VfU0laRSA9IDY1NTM2O1xudmFyIEFTTUpTX1BBR0VfU0laRSA9IDE2Nzc3MjE2O1xudmFyIE1JTl9UT1RBTF9NRU1PUlkgPSAxNjc3NzIxNjtcblxuZnVuY3Rpb24gYWxpZ25VcCh4LCBtdWx0aXBsZSkge1xuICBpZiAoeCAlIG11bHRpcGxlID4gMCkge1xuICAgIHggKz0gbXVsdGlwbGUgLSAoeCAlIG11bHRpcGxlKTtcbiAgfVxuICByZXR1cm4geDtcbn1cblxudmFyIEhFQVAsXG4vKiogQHR5cGUge0FycmF5QnVmZmVyfSAqL1xuICBidWZmZXIsXG4vKiogQHR5cGUge0ludDhBcnJheX0gKi9cbiAgSEVBUDgsXG4vKiogQHR5cGUge1VpbnQ4QXJyYXl9ICovXG4gIEhFQVBVOCxcbi8qKiBAdHlwZSB7SW50MTZBcnJheX0gKi9cbiAgSEVBUDE2LFxuLyoqIEB0eXBlIHtVaW50MTZBcnJheX0gKi9cbiAgSEVBUFUxNixcbi8qKiBAdHlwZSB7SW50MzJBcnJheX0gKi9cbiAgSEVBUDMyLFxuLyoqIEB0eXBlIHtVaW50MzJBcnJheX0gKi9cbiAgSEVBUFUzMixcbi8qKiBAdHlwZSB7RmxvYXQzMkFycmF5fSAqL1xuICBIRUFQRjMyLFxuLyoqIEB0eXBlIHtGbG9hdDY0QXJyYXl9ICovXG4gIEhFQVBGNjQ7XG5cbmZ1bmN0aW9uIHVwZGF0ZUdsb2JhbEJ1ZmZlcihidWYpIHtcbiAgTW9kdWxlWydidWZmZXInXSA9IGJ1ZmZlciA9IGJ1Zjtcbn1cblxuZnVuY3Rpb24gdXBkYXRlR2xvYmFsQnVmZmVyVmlld3MoKSB7XG4gIE1vZHVsZVsnSEVBUDgnXSA9IEhFQVA4ID0gbmV3IEludDhBcnJheShidWZmZXIpO1xuICBNb2R1bGVbJ0hFQVAxNiddID0gSEVBUDE2ID0gbmV3IEludDE2QXJyYXkoYnVmZmVyKTtcbiAgTW9kdWxlWydIRUFQMzInXSA9IEhFQVAzMiA9IG5ldyBJbnQzMkFycmF5KGJ1ZmZlcik7XG4gIE1vZHVsZVsnSEVBUFU4J10gPSBIRUFQVTggPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICBNb2R1bGVbJ0hFQVBVMTYnXSA9IEhFQVBVMTYgPSBuZXcgVWludDE2QXJyYXkoYnVmZmVyKTtcbiAgTW9kdWxlWydIRUFQVTMyJ10gPSBIRUFQVTMyID0gbmV3IFVpbnQzMkFycmF5KGJ1ZmZlcik7XG4gIE1vZHVsZVsnSEVBUEYzMiddID0gSEVBUEYzMiA9IG5ldyBGbG9hdDMyQXJyYXkoYnVmZmVyKTtcbiAgTW9kdWxlWydIRUFQRjY0J10gPSBIRUFQRjY0ID0gbmV3IEZsb2F0NjRBcnJheShidWZmZXIpO1xufVxuXG52YXIgU1RBVElDX0JBU0UsIFNUQVRJQ1RPUCwgc3RhdGljU2VhbGVkOyAvLyBzdGF0aWMgYXJlYVxudmFyIFNUQUNLX0JBU0UsIFNUQUNLVE9QLCBTVEFDS19NQVg7IC8vIHN0YWNrIGFyZWFcbnZhciBEWU5BTUlDX0JBU0UsIERZTkFNSUNUT1BfUFRSOyAvLyBkeW5hbWljIGFyZWEgaGFuZGxlZCBieSBzYnJrXG5cbiAgU1RBVElDX0JBU0UgPSBTVEFUSUNUT1AgPSBTVEFDS19CQVNFID0gU1RBQ0tUT1AgPSBTVEFDS19NQVggPSBEWU5BTUlDX0JBU0UgPSBEWU5BTUlDVE9QX1BUUiA9IDA7XG4gIHN0YXRpY1NlYWxlZCA9IGZhbHNlO1xuXG5cbi8vIEluaXRpYWxpemVzIHRoZSBzdGFjayBjb29raWUuIENhbGxlZCBhdCB0aGUgc3RhcnR1cCBvZiBtYWluIGFuZCBhdCB0aGUgc3RhcnR1cCBvZiBlYWNoIHRocmVhZCBpbiBwdGhyZWFkcyBtb2RlLlxuZnVuY3Rpb24gd3JpdGVTdGFja0Nvb2tpZSgpIHtcbiAgYXNzZXJ0KChTVEFDS19NQVggJiAzKSA9PSAwKTtcbiAgSEVBUFUzMlsoU1RBQ0tfTUFYID4+IDIpLTFdID0gMHgwMjEzNTQ2NztcbiAgSEVBUFUzMlsoU1RBQ0tfTUFYID4+IDIpLTJdID0gMHg4OUJBQ0RGRTtcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGFja0Nvb2tpZSgpIHtcbiAgaWYgKEhFQVBVMzJbKFNUQUNLX01BWCA+PiAyKS0xXSAhPSAweDAyMTM1NDY3IHx8IEhFQVBVMzJbKFNUQUNLX01BWCA+PiAyKS0yXSAhPSAweDg5QkFDREZFKSB7XG4gICAgYWJvcnQoJ1N0YWNrIG92ZXJmbG93ISBTdGFjayBjb29raWUgaGFzIGJlZW4gb3ZlcndyaXR0ZW4sIGV4cGVjdGVkIGhleCBkd29yZHMgMHg4OUJBQ0RGRSBhbmQgMHgwMjEzNTQ2NywgYnV0IHJlY2VpdmVkIDB4JyArIEhFQVBVMzJbKFNUQUNLX01BWCA+PiAyKS0yXS50b1N0cmluZygxNikgKyAnICcgKyBIRUFQVTMyWyhTVEFDS19NQVggPj4gMiktMV0udG9TdHJpbmcoMTYpKTtcbiAgfVxuICAvLyBBbHNvIHRlc3QgdGhlIGdsb2JhbCBhZGRyZXNzIDAgZm9yIGludGVncml0eS4gVGhpcyBjaGVjayBpcyBub3QgY29tcGF0aWJsZSB3aXRoIFNBRkVfU1BMSVRfTUVNT1JZIHRob3VnaCwgc2luY2UgdGhhdCBtb2RlIGFscmVhZHkgdGVzdHMgYWxsIGFkZHJlc3MgMCBhY2Nlc3NlcyBvbiBpdHMgb3duLlxuICBpZiAoSEVBUDMyWzBdICE9PSAweDYzNzM2ZDY1IC8qICdlbXNjJyAqLykgdGhyb3cgJ1J1bnRpbWUgZXJyb3I6IFRoZSBhcHBsaWNhdGlvbiBoYXMgY29ycnVwdGVkIGl0cyBoZWFwIG1lbW9yeSBhcmVhIChhZGRyZXNzIHplcm8pISc7XG59XG5cbmZ1bmN0aW9uIGFib3J0U3RhY2tPdmVyZmxvdyhhbGxvY1NpemUpIHtcbiAgYWJvcnQoJ1N0YWNrIG92ZXJmbG93ISBBdHRlbXB0ZWQgdG8gYWxsb2NhdGUgJyArIGFsbG9jU2l6ZSArICcgYnl0ZXMgb24gdGhlIHN0YWNrLCBidXQgc3RhY2sgaGFzIG9ubHkgJyArIChTVEFDS19NQVggLSBNb2R1bGVbJ2FzbSddLnN0YWNrU2F2ZSgpICsgYWxsb2NTaXplKSArICcgYnl0ZXMgYXZhaWxhYmxlIScpO1xufVxuXG5mdW5jdGlvbiBhYm9ydE9uQ2Fubm90R3Jvd01lbW9yeSgpIHtcbiAgYWJvcnQoJ0Nhbm5vdCBlbmxhcmdlIG1lbW9yeSBhcnJheXMuIEVpdGhlciAoMSkgY29tcGlsZSB3aXRoICAtcyBUT1RBTF9NRU1PUlk9WCAgd2l0aCBYIGhpZ2hlciB0aGFuIHRoZSBjdXJyZW50IHZhbHVlICcgKyBUT1RBTF9NRU1PUlkgKyAnLCAoMikgY29tcGlsZSB3aXRoICAtcyBBTExPV19NRU1PUllfR1JPV1RIPTEgIHdoaWNoIGFsbG93cyBpbmNyZWFzaW5nIHRoZSBzaXplIGF0IHJ1bnRpbWUsIG9yICgzKSBpZiB5b3Ugd2FudCBtYWxsb2MgdG8gcmV0dXJuIE5VTEwgKDApIGluc3RlYWQgb2YgdGhpcyBhYm9ydCwgY29tcGlsZSB3aXRoICAtcyBBQk9SVElOR19NQUxMT0M9MCAnKTtcbn1cblxuXG5mdW5jdGlvbiBlbmxhcmdlTWVtb3J5KCkge1xuICBhYm9ydE9uQ2Fubm90R3Jvd01lbW9yeSgpO1xufVxuXG5cbnZhciBUT1RBTF9TVEFDSyA9IE1vZHVsZVsnVE9UQUxfU1RBQ0snXSB8fCA1MjQyODgwO1xudmFyIFRPVEFMX01FTU9SWSA9IE1vZHVsZVsnVE9UQUxfTUVNT1JZJ10gfHwgMTY3NzcyMTY7XG5pZiAoVE9UQUxfTUVNT1JZIDwgVE9UQUxfU1RBQ0spIE1vZHVsZS5wcmludEVycignVE9UQUxfTUVNT1JZIHNob3VsZCBiZSBsYXJnZXIgdGhhbiBUT1RBTF9TVEFDSywgd2FzICcgKyBUT1RBTF9NRU1PUlkgKyAnISAoVE9UQUxfU1RBQ0s9JyArIFRPVEFMX1NUQUNLICsgJyknKTtcblxuLy8gSW5pdGlhbGl6ZSB0aGUgcnVudGltZSdzIG1lbW9yeVxuLy8gY2hlY2sgZm9yIGZ1bGwgZW5naW5lIHN1cHBvcnQgKHVzZSBzdHJpbmcgJ3N1YmFycmF5JyB0byBhdm9pZCBjbG9zdXJlIGNvbXBpbGVyIGNvbmZ1c2lvbilcbmFzc2VydCh0eXBlb2YgSW50MzJBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEZsb2F0NjRBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgSW50MzJBcnJheS5wcm90b3R5cGUuc3ViYXJyYXkgIT09IHVuZGVmaW5lZCAmJiBJbnQzMkFycmF5LnByb3RvdHlwZS5zZXQgIT09IHVuZGVmaW5lZCxcbiAgICAgICAnSlMgZW5naW5lIGRvZXMgbm90IHByb3ZpZGUgZnVsbCB0eXBlZCBhcnJheSBzdXBwb3J0Jyk7XG5cblxuXG4vLyBVc2UgYSBwcm92aWRlZCBidWZmZXIsIGlmIHRoZXJlIGlzIG9uZSwgb3IgZWxzZSBhbGxvY2F0ZSBhIG5ldyBvbmVcbmlmIChNb2R1bGVbJ2J1ZmZlciddKSB7XG4gIGJ1ZmZlciA9IE1vZHVsZVsnYnVmZmVyJ107XG4gIGFzc2VydChidWZmZXIuYnl0ZUxlbmd0aCA9PT0gVE9UQUxfTUVNT1JZLCAncHJvdmlkZWQgYnVmZmVyIHNob3VsZCBiZSAnICsgVE9UQUxfTUVNT1JZICsgJyBieXRlcywgYnV0IGl0IGlzICcgKyBidWZmZXIuYnl0ZUxlbmd0aCk7XG59IGVsc2Uge1xuICAvLyBVc2UgYSBXZWJBc3NlbWJseSBtZW1vcnkgd2hlcmUgYXZhaWxhYmxlXG4gIGlmICh0eXBlb2YgV2ViQXNzZW1ibHkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBXZWJBc3NlbWJseS5NZW1vcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBhc3NlcnQoVE9UQUxfTUVNT1JZICUgV0FTTV9QQUdFX1NJWkUgPT09IDApO1xuICAgIE1vZHVsZVsnd2FzbU1lbW9yeSddID0gbmV3IFdlYkFzc2VtYmx5Lk1lbW9yeSh7ICdpbml0aWFsJzogVE9UQUxfTUVNT1JZIC8gV0FTTV9QQUdFX1NJWkUsICdtYXhpbXVtJzogVE9UQUxfTUVNT1JZIC8gV0FTTV9QQUdFX1NJWkUgfSk7XG4gICAgYnVmZmVyID0gTW9kdWxlWyd3YXNtTWVtb3J5J10uYnVmZmVyO1xuICB9IGVsc2VcbiAge1xuICAgIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihUT1RBTF9NRU1PUlkpO1xuICB9XG4gIGFzc2VydChidWZmZXIuYnl0ZUxlbmd0aCA9PT0gVE9UQUxfTUVNT1JZKTtcbn1cbnVwZGF0ZUdsb2JhbEJ1ZmZlclZpZXdzKCk7XG5cblxuZnVuY3Rpb24gZ2V0VG90YWxNZW1vcnkoKSB7XG4gIHJldHVybiBUT1RBTF9NRU1PUlk7XG59XG5cbi8vIEVuZGlhbm5lc3MgY2hlY2sgKG5vdGU6IGFzc3VtZXMgY29tcGlsZXIgYXJjaCB3YXMgbGl0dGxlLWVuZGlhbilcbiAgSEVBUDMyWzBdID0gMHg2MzczNmQ2NTsgLyogJ2Vtc2MnICovXG5IRUFQMTZbMV0gPSAweDYzNzM7XG5pZiAoSEVBUFU4WzJdICE9PSAweDczIHx8IEhFQVBVOFszXSAhPT0gMHg2MykgdGhyb3cgJ1J1bnRpbWUgZXJyb3I6IGV4cGVjdGVkIHRoZSBzeXN0ZW0gdG8gYmUgbGl0dGxlLWVuZGlhbiEnO1xuXG5Nb2R1bGVbJ0hFQVAnXSA9IEhFQVA7XG5Nb2R1bGVbJ2J1ZmZlciddID0gYnVmZmVyO1xuTW9kdWxlWydIRUFQOCddID0gSEVBUDg7XG5Nb2R1bGVbJ0hFQVAxNiddID0gSEVBUDE2O1xuTW9kdWxlWydIRUFQMzInXSA9IEhFQVAzMjtcbk1vZHVsZVsnSEVBUFU4J10gPSBIRUFQVTg7XG5Nb2R1bGVbJ0hFQVBVMTYnXSA9IEhFQVBVMTY7XG5Nb2R1bGVbJ0hFQVBVMzInXSA9IEhFQVBVMzI7XG5Nb2R1bGVbJ0hFQVBGMzInXSA9IEhFQVBGMzI7XG5Nb2R1bGVbJ0hFQVBGNjQnXSA9IEhFQVBGNjQ7XG5cbmZ1bmN0aW9uIGNhbGxSdW50aW1lQ2FsbGJhY2tzKGNhbGxiYWNrcykge1xuICB3aGlsZShjYWxsYmFja3MubGVuZ3RoID4gMCkge1xuICAgIHZhciBjYWxsYmFjayA9IGNhbGxiYWNrcy5zaGlmdCgpO1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgZnVuYyA9IGNhbGxiYWNrLmZ1bmM7XG4gICAgaWYgKHR5cGVvZiBmdW5jID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKGNhbGxiYWNrLmFyZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE1vZHVsZVsnZHluQ2FsbF92J10oZnVuYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNb2R1bGVbJ2R5bkNhbGxfdmknXShmdW5jLCBjYWxsYmFjay5hcmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jKGNhbGxiYWNrLmFyZyA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNhbGxiYWNrLmFyZyk7XG4gICAgfVxuICB9XG59XG5cbnZhciBfX0FUUFJFUlVOX18gID0gW107IC8vIGZ1bmN0aW9ucyBjYWxsZWQgYmVmb3JlIHRoZSBydW50aW1lIGlzIGluaXRpYWxpemVkXG52YXIgX19BVElOSVRfXyAgICA9IFtdOyAvLyBmdW5jdGlvbnMgY2FsbGVkIGR1cmluZyBzdGFydHVwXG52YXIgX19BVE1BSU5fXyAgICA9IFtdOyAvLyBmdW5jdGlvbnMgY2FsbGVkIHdoZW4gbWFpbigpIGlzIHRvIGJlIHJ1blxudmFyIF9fQVRFWElUX18gICAgPSBbXTsgLy8gZnVuY3Rpb25zIGNhbGxlZCBkdXJpbmcgc2h1dGRvd25cbnZhciBfX0FUUE9TVFJVTl9fID0gW107IC8vIGZ1bmN0aW9ucyBjYWxsZWQgYWZ0ZXIgdGhlIHJ1bnRpbWUgaGFzIGV4aXRlZFxuXG52YXIgcnVudGltZUluaXRpYWxpemVkID0gZmFsc2U7XG52YXIgcnVudGltZUV4aXRlZCA9IGZhbHNlO1xuXG5cbmZ1bmN0aW9uIHByZVJ1bigpIHtcbiAgLy8gY29tcGF0aWJpbGl0eSAtIG1lcmdlIGluIGFueXRoaW5nIGZyb20gTW9kdWxlWydwcmVSdW4nXSBhdCB0aGlzIHRpbWVcbiAgaWYgKE1vZHVsZVsncHJlUnVuJ10pIHtcbiAgICBpZiAodHlwZW9mIE1vZHVsZVsncHJlUnVuJ10gPT0gJ2Z1bmN0aW9uJykgTW9kdWxlWydwcmVSdW4nXSA9IFtNb2R1bGVbJ3ByZVJ1biddXTtcbiAgICB3aGlsZSAoTW9kdWxlWydwcmVSdW4nXS5sZW5ndGgpIHtcbiAgICAgIGFkZE9uUHJlUnVuKE1vZHVsZVsncHJlUnVuJ10uc2hpZnQoKSk7XG4gICAgfVxuICB9XG4gIGNhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRQUkVSVU5fXyk7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZUluaXRSdW50aW1lKCkge1xuICBjaGVja1N0YWNrQ29va2llKCk7XG4gIGlmIChydW50aW1lSW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgcnVudGltZUluaXRpYWxpemVkID0gdHJ1ZTtcbiAgY2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVElOSVRfXyk7XG59XG5cbmZ1bmN0aW9uIHByZU1haW4oKSB7XG4gIGNoZWNrU3RhY2tDb29raWUoKTtcbiAgY2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVE1BSU5fXyk7XG59XG5cbmZ1bmN0aW9uIGV4aXRSdW50aW1lKCkge1xuICBjaGVja1N0YWNrQ29va2llKCk7XG4gIGNhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRFWElUX18pO1xuICBydW50aW1lRXhpdGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcG9zdFJ1bigpIHtcbiAgY2hlY2tTdGFja0Nvb2tpZSgpO1xuICAvLyBjb21wYXRpYmlsaXR5IC0gbWVyZ2UgaW4gYW55dGhpbmcgZnJvbSBNb2R1bGVbJ3Bvc3RSdW4nXSBhdCB0aGlzIHRpbWVcbiAgaWYgKE1vZHVsZVsncG9zdFJ1biddKSB7XG4gICAgaWYgKHR5cGVvZiBNb2R1bGVbJ3Bvc3RSdW4nXSA9PSAnZnVuY3Rpb24nKSBNb2R1bGVbJ3Bvc3RSdW4nXSA9IFtNb2R1bGVbJ3Bvc3RSdW4nXV07XG4gICAgd2hpbGUgKE1vZHVsZVsncG9zdFJ1biddLmxlbmd0aCkge1xuICAgICAgYWRkT25Qb3N0UnVuKE1vZHVsZVsncG9zdFJ1biddLnNoaWZ0KCkpO1xuICAgIH1cbiAgfVxuICBjYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUUE9TVFJVTl9fKTtcbn1cblxuZnVuY3Rpb24gYWRkT25QcmVSdW4oY2IpIHtcbiAgX19BVFBSRVJVTl9fLnVuc2hpZnQoY2IpO1xufVxuTW9kdWxlW1wiYWRkT25QcmVSdW5cIl0gPSBhZGRPblByZVJ1bjtcblxuZnVuY3Rpb24gYWRkT25Jbml0KGNiKSB7XG4gIF9fQVRJTklUX18udW5zaGlmdChjYik7XG59XG5Nb2R1bGVbXCJhZGRPbkluaXRcIl0gPSBhZGRPbkluaXQ7XG5cbmZ1bmN0aW9uIGFkZE9uUHJlTWFpbihjYikge1xuICBfX0FUTUFJTl9fLnVuc2hpZnQoY2IpO1xufVxuTW9kdWxlW1wiYWRkT25QcmVNYWluXCJdID0gYWRkT25QcmVNYWluO1xuXG5mdW5jdGlvbiBhZGRPbkV4aXQoY2IpIHtcbiAgX19BVEVYSVRfXy51bnNoaWZ0KGNiKTtcbn1cbk1vZHVsZVtcImFkZE9uRXhpdFwiXSA9IGFkZE9uRXhpdDtcblxuZnVuY3Rpb24gYWRkT25Qb3N0UnVuKGNiKSB7XG4gIF9fQVRQT1NUUlVOX18udW5zaGlmdChjYik7XG59XG5Nb2R1bGVbXCJhZGRPblBvc3RSdW5cIl0gPSBhZGRPblBvc3RSdW47XG5cbi8vIFRvb2xzXG5cbi8qKiBAdHlwZSB7ZnVuY3Rpb24oc3RyaW5nLCBib29sZWFuPSwgbnVtYmVyPSl9ICovXG5mdW5jdGlvbiBpbnRBcnJheUZyb21TdHJpbmcoc3RyaW5neSwgZG9udEFkZE51bGwsIGxlbmd0aCkge1xuICB2YXIgbGVuID0gbGVuZ3RoID4gMCA/IGxlbmd0aCA6IGxlbmd0aEJ5dGVzVVRGOChzdHJpbmd5KSsxO1xuICB2YXIgdThhcnJheSA9IG5ldyBBcnJheShsZW4pO1xuICB2YXIgbnVtQnl0ZXNXcml0dGVuID0gc3RyaW5nVG9VVEY4QXJyYXkoc3RyaW5neSwgdThhcnJheSwgMCwgdThhcnJheS5sZW5ndGgpO1xuICBpZiAoZG9udEFkZE51bGwpIHU4YXJyYXkubGVuZ3RoID0gbnVtQnl0ZXNXcml0dGVuO1xuICByZXR1cm4gdThhcnJheTtcbn1cbk1vZHVsZVtcImludEFycmF5RnJvbVN0cmluZ1wiXSA9IGludEFycmF5RnJvbVN0cmluZztcblxuZnVuY3Rpb24gaW50QXJyYXlUb1N0cmluZyhhcnJheSkge1xuICB2YXIgcmV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2hyID0gYXJyYXlbaV07XG4gICAgaWYgKGNociA+IDB4RkYpIHtcbiAgICAgIGFzc2VydChmYWxzZSwgJ0NoYXJhY3RlciBjb2RlICcgKyBjaHIgKyAnICgnICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIpICsgJykgIGF0IG9mZnNldCAnICsgaSArICcgbm90IGluIDB4MDAtMHhGRi4nKTtcbiAgICAgIGNociAmPSAweEZGO1xuICAgIH1cbiAgICByZXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGNocikpO1xuICB9XG4gIHJldHVybiByZXQuam9pbignJyk7XG59XG5Nb2R1bGVbXCJpbnRBcnJheVRvU3RyaW5nXCJdID0gaW50QXJyYXlUb1N0cmluZztcblxuLy8gRGVwcmVjYXRlZDogVGhpcyBmdW5jdGlvbiBzaG91bGQgbm90IGJlIGNhbGxlZCBiZWNhdXNlIGl0IGlzIHVuc2FmZSBhbmQgZG9lcyBub3QgcHJvdmlkZVxuLy8gYSBtYXhpbXVtIGxlbmd0aCBsaW1pdCBvZiBob3cgbWFueSBieXRlcyBpdCBpcyBhbGxvd2VkIHRvIHdyaXRlLiBQcmVmZXIgY2FsbGluZyB0aGVcbi8vIGZ1bmN0aW9uIHN0cmluZ1RvVVRGOEFycmF5KCkgaW5zdGVhZCwgd2hpY2ggdGFrZXMgaW4gYSBtYXhpbXVtIGxlbmd0aCB0aGF0IGNhbiBiZSB1c2VkXG4vLyB0byBiZSBzZWN1cmUgZnJvbSBvdXQgb2YgYm91bmRzIHdyaXRlcy5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gd3JpdGVTdHJpbmdUb01lbW9yeShzdHJpbmcsIGJ1ZmZlciwgZG9udEFkZE51bGwpIHtcbiAgUnVudGltZS53YXJuT25jZSgnd3JpdGVTdHJpbmdUb01lbW9yeSBpcyBkZXByZWNhdGVkIGFuZCBzaG91bGQgbm90IGJlIGNhbGxlZCEgVXNlIHN0cmluZ1RvVVRGOCgpIGluc3RlYWQhJyk7XG5cbiAgdmFyIC8qKiBAdHlwZSB7bnVtYmVyfSAqLyBsYXN0Q2hhciwgLyoqIEB0eXBlIHtudW1iZXJ9ICovIGVuZDtcbiAgaWYgKGRvbnRBZGROdWxsKSB7XG4gICAgLy8gc3RyaW5nVG9VVEY4QXJyYXkgYWx3YXlzIGFwcGVuZHMgbnVsbC4gSWYgd2UgZG9uJ3Qgd2FudCB0byBkbyB0aGF0LCByZW1lbWJlciB0aGVcbiAgICAvLyBjaGFyYWN0ZXIgdGhhdCBleGlzdGVkIGF0IHRoZSBsb2NhdGlvbiB3aGVyZSB0aGUgbnVsbCB3aWxsIGJlIHBsYWNlZCwgYW5kIHJlc3RvcmVcbiAgICAvLyB0aGF0IGFmdGVyIHRoZSB3cml0ZSAoYmVsb3cpLlxuICAgIGVuZCA9IGJ1ZmZlciArIGxlbmd0aEJ5dGVzVVRGOChzdHJpbmcpO1xuICAgIGxhc3RDaGFyID0gSEVBUDhbZW5kXTtcbiAgfVxuICBzdHJpbmdUb1VURjgoc3RyaW5nLCBidWZmZXIsIEluZmluaXR5KTtcbiAgaWYgKGRvbnRBZGROdWxsKSBIRUFQOFtlbmRdID0gbGFzdENoYXI7IC8vIFJlc3RvcmUgdGhlIHZhbHVlIHVuZGVyIHRoZSBudWxsIGNoYXJhY3Rlci5cbn1cbk1vZHVsZVtcIndyaXRlU3RyaW5nVG9NZW1vcnlcIl0gPSB3cml0ZVN0cmluZ1RvTWVtb3J5O1xuXG5mdW5jdGlvbiB3cml0ZUFycmF5VG9NZW1vcnkoYXJyYXksIGJ1ZmZlcikge1xuICBhc3NlcnQoYXJyYXkubGVuZ3RoID49IDAsICd3cml0ZUFycmF5VG9NZW1vcnkgYXJyYXkgbXVzdCBoYXZlIGEgbGVuZ3RoIChzaG91bGQgYmUgYW4gYXJyYXkgb3IgdHlwZWQgYXJyYXkpJylcbiAgSEVBUDguc2V0KGFycmF5LCBidWZmZXIpO1xufVxuTW9kdWxlW1wid3JpdGVBcnJheVRvTWVtb3J5XCJdID0gd3JpdGVBcnJheVRvTWVtb3J5O1xuXG5mdW5jdGlvbiB3cml0ZUFzY2lpVG9NZW1vcnkoc3RyLCBidWZmZXIsIGRvbnRBZGROdWxsKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgYXNzZXJ0KHN0ci5jaGFyQ29kZUF0KGkpID09PSBzdHIuY2hhckNvZGVBdChpKSYweGZmKTtcbiAgICBIRUFQOFsoKGJ1ZmZlcisrKT4+MCldPXN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIC8vIE51bGwtdGVybWluYXRlIHRoZSBwb2ludGVyIHRvIHRoZSBIRUFQLlxuICBpZiAoIWRvbnRBZGROdWxsKSBIRUFQOFsoKGJ1ZmZlcik+PjApXT0wO1xufVxuTW9kdWxlW1wid3JpdGVBc2NpaVRvTWVtb3J5XCJdID0gd3JpdGVBc2NpaVRvTWVtb3J5O1xuXG5mdW5jdGlvbiB1blNpZ24odmFsdWUsIGJpdHMsIGlnbm9yZSkge1xuICBpZiAodmFsdWUgPj0gMCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gYml0cyA8PSAzMiA/IDIqTWF0aC5hYnMoMSA8PCAoYml0cy0xKSkgKyB2YWx1ZSAvLyBOZWVkIHNvbWUgdHJpY2tlcnksIHNpbmNlIGlmIGJpdHMgPT0gMzIsIHdlIGFyZSByaWdodCBhdCB0aGUgbGltaXQgb2YgdGhlIGJpdHMgSlMgdXNlcyBpbiBiaXRzaGlmdHNcbiAgICAgICAgICAgICAgICAgICAgOiBNYXRoLnBvdygyLCBiaXRzKSAgICAgICAgICsgdmFsdWU7XG59XG5mdW5jdGlvbiByZVNpZ24odmFsdWUsIGJpdHMsIGlnbm9yZSkge1xuICBpZiAodmFsdWUgPD0gMCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgaGFsZiA9IGJpdHMgPD0gMzIgPyBNYXRoLmFicygxIDw8IChiaXRzLTEpKSAvLyBhYnMgaXMgbmVlZGVkIGlmIGJpdHMgPT0gMzJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogTWF0aC5wb3coMiwgYml0cy0xKTtcbiAgaWYgKHZhbHVlID49IGhhbGYgJiYgKGJpdHMgPD0gMzIgfHwgdmFsdWUgPiBoYWxmKSkgeyAvLyBmb3IgaHVnZSB2YWx1ZXMsIHdlIGNhbiBoaXQgdGhlIHByZWNpc2lvbiBsaW1pdCBhbmQgYWx3YXlzIGdldCB0cnVlIGhlcmUuIHNvIGRvbid0IGRvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQsIGluIGdlbmVyYWwgdGhlcmUgaXMgbm8gcGVyZmVjdCBzb2x1dGlvbiBoZXJlLiBXaXRoIDY0LWJpdCBpbnRzLCB3ZSBnZXQgcm91bmRpbmcgYW5kIGVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IEluIGk2NCBtb2RlIDEsIHJlc2lnbiB0aGUgdHdvIHBhcnRzIHNlcGFyYXRlbHkgYW5kIHNhZmVseVxuICAgIHZhbHVlID0gLTIqaGFsZiArIHZhbHVlOyAvLyBDYW5ub3QgYml0c2hpZnQgaGFsZiwgYXMgaXQgbWF5IGJlIGF0IHRoZSBsaW1pdCBvZiB0aGUgYml0cyBKUyB1c2VzIGluIGJpdHNoaWZ0c1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLy8gY2hlY2sgZm9yIGltdWwgc3VwcG9ydCwgYW5kIGFsc28gZm9yIGNvcnJlY3RuZXNzICggaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTEyNjM0NSApXG5pZiAoIU1hdGhbJ2ltdWwnXSB8fCBNYXRoWydpbXVsJ10oMHhmZmZmZmZmZiwgNSkgIT09IC01KSBNYXRoWydpbXVsJ10gPSBmdW5jdGlvbiBpbXVsKGEsIGIpIHtcbiAgdmFyIGFoICA9IGEgPj4+IDE2O1xuICB2YXIgYWwgPSBhICYgMHhmZmZmO1xuICB2YXIgYmggID0gYiA+Pj4gMTY7XG4gIHZhciBibCA9IGIgJiAweGZmZmY7XG4gIHJldHVybiAoYWwqYmwgKyAoKGFoKmJsICsgYWwqYmgpIDw8IDE2KSl8MDtcbn07XG5NYXRoLmltdWwgPSBNYXRoWydpbXVsJ107XG5cbmlmICghTWF0aFsnZnJvdW5kJ10pIHtcbiAgdmFyIGZyb3VuZEJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoMSk7XG4gIE1hdGhbJ2Zyb3VuZCddID0gZnVuY3Rpb24oeCkgeyBmcm91bmRCdWZmZXJbMF0gPSB4OyByZXR1cm4gZnJvdW5kQnVmZmVyWzBdIH07XG59XG5NYXRoLmZyb3VuZCA9IE1hdGhbJ2Zyb3VuZCddO1xuXG5pZiAoIU1hdGhbJ2NsejMyJ10pIE1hdGhbJ2NsejMyJ10gPSBmdW5jdGlvbih4KSB7XG4gIHggPSB4ID4+PiAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICBpZiAoeCAmICgxIDw8ICgzMSAtIGkpKSkgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIDMyO1xufTtcbk1hdGguY2x6MzIgPSBNYXRoWydjbHozMiddXG5cbmlmICghTWF0aFsndHJ1bmMnXSkgTWF0aFsndHJ1bmMnXSA9IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggPCAwID8gTWF0aC5jZWlsKHgpIDogTWF0aC5mbG9vcih4KTtcbn07XG5NYXRoLnRydW5jID0gTWF0aFsndHJ1bmMnXTtcblxudmFyIE1hdGhfYWJzID0gTWF0aC5hYnM7XG52YXIgTWF0aF9jb3MgPSBNYXRoLmNvcztcbnZhciBNYXRoX3NpbiA9IE1hdGguc2luO1xudmFyIE1hdGhfdGFuID0gTWF0aC50YW47XG52YXIgTWF0aF9hY29zID0gTWF0aC5hY29zO1xudmFyIE1hdGhfYXNpbiA9IE1hdGguYXNpbjtcbnZhciBNYXRoX2F0YW4gPSBNYXRoLmF0YW47XG52YXIgTWF0aF9hdGFuMiA9IE1hdGguYXRhbjI7XG52YXIgTWF0aF9leHAgPSBNYXRoLmV4cDtcbnZhciBNYXRoX2xvZyA9IE1hdGgubG9nO1xudmFyIE1hdGhfc3FydCA9IE1hdGguc3FydDtcbnZhciBNYXRoX2NlaWwgPSBNYXRoLmNlaWw7XG52YXIgTWF0aF9mbG9vciA9IE1hdGguZmxvb3I7XG52YXIgTWF0aF9wb3cgPSBNYXRoLnBvdztcbnZhciBNYXRoX2ltdWwgPSBNYXRoLmltdWw7XG52YXIgTWF0aF9mcm91bmQgPSBNYXRoLmZyb3VuZDtcbnZhciBNYXRoX3JvdW5kID0gTWF0aC5yb3VuZDtcbnZhciBNYXRoX21pbiA9IE1hdGgubWluO1xudmFyIE1hdGhfY2x6MzIgPSBNYXRoLmNsejMyO1xudmFyIE1hdGhfdHJ1bmMgPSBNYXRoLnRydW5jO1xuXG4vLyBBIGNvdW50ZXIgb2YgZGVwZW5kZW5jaWVzIGZvciBjYWxsaW5nIHJ1bigpLiBJZiB3ZSBuZWVkIHRvXG4vLyBkbyBhc3luY2hyb25vdXMgd29yayBiZWZvcmUgcnVubmluZywgaW5jcmVtZW50IHRoaXMgYW5kXG4vLyBkZWNyZW1lbnQgaXQuIEluY3JlbWVudGluZyBtdXN0IGhhcHBlbiBpbiBhIHBsYWNlIGxpa2Vcbi8vIFBSRV9SVU5fQURESVRJT05TICh1c2VkIGJ5IGVtY2MgdG8gYWRkIGZpbGUgcHJlbG9hZGluZykuXG4vLyBOb3RlIHRoYXQgeW91IGNhbiBhZGQgZGVwZW5kZW5jaWVzIGluIHByZVJ1biwgZXZlbiB0aG91Z2hcbi8vIGl0IGhhcHBlbnMgcmlnaHQgYmVmb3JlIHJ1biAtIHJ1biB3aWxsIGJlIHBvc3Rwb25lZCB1bnRpbFxuLy8gdGhlIGRlcGVuZGVuY2llcyBhcmUgbWV0LlxudmFyIHJ1bkRlcGVuZGVuY2llcyA9IDA7XG52YXIgcnVuRGVwZW5kZW5jeVdhdGNoZXIgPSBudWxsO1xudmFyIGRlcGVuZGVuY2llc0Z1bGZpbGxlZCA9IG51bGw7IC8vIG92ZXJyaWRkZW4gdG8gdGFrZSBkaWZmZXJlbnQgYWN0aW9ucyB3aGVuIGFsbCBydW4gZGVwZW5kZW5jaWVzIGFyZSBmdWxmaWxsZWRcbnZhciBydW5EZXBlbmRlbmN5VHJhY2tpbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0VW5pcXVlUnVuRGVwZW5kZW5jeShpZCkge1xuICB2YXIgb3JpZyA9IGlkO1xuICB3aGlsZSAoMSkge1xuICAgIGlmICghcnVuRGVwZW5kZW5jeVRyYWNraW5nW2lkXSkgcmV0dXJuIGlkO1xuICAgIGlkID0gb3JpZyArIE1hdGgucmFuZG9tKCk7XG4gIH1cbiAgcmV0dXJuIGlkO1xufVxuXG5mdW5jdGlvbiBhZGRSdW5EZXBlbmRlbmN5KGlkKSB7XG4gIHJ1bkRlcGVuZGVuY2llcysrO1xuICBpZiAoTW9kdWxlWydtb25pdG9yUnVuRGVwZW5kZW5jaWVzJ10pIHtcbiAgICBNb2R1bGVbJ21vbml0b3JSdW5EZXBlbmRlbmNpZXMnXShydW5EZXBlbmRlbmNpZXMpO1xuICB9XG4gIGlmIChpZCkge1xuICAgIGFzc2VydCghcnVuRGVwZW5kZW5jeVRyYWNraW5nW2lkXSk7XG4gICAgcnVuRGVwZW5kZW5jeVRyYWNraW5nW2lkXSA9IDE7XG4gICAgaWYgKHJ1bkRlcGVuZGVuY3lXYXRjaGVyID09PSBudWxsICYmIHR5cGVvZiBzZXRJbnRlcnZhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIENoZWNrIGZvciBtaXNzaW5nIGRlcGVuZGVuY2llcyBldmVyeSBmZXcgc2Vjb25kc1xuICAgICAgcnVuRGVwZW5kZW5jeVdhdGNoZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEFCT1JUKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChydW5EZXBlbmRlbmN5V2F0Y2hlcik7XG4gICAgICAgICAgcnVuRGVwZW5kZW5jeVdhdGNoZXIgPSBudWxsO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvd24gPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgZGVwIGluIHJ1bkRlcGVuZGVuY3lUcmFja2luZykge1xuICAgICAgICAgIGlmICghc2hvd24pIHtcbiAgICAgICAgICAgIHNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgIE1vZHVsZS5wcmludEVycignc3RpbGwgd2FpdGluZyBvbiBydW4gZGVwZW5kZW5jaWVzOicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBNb2R1bGUucHJpbnRFcnIoJ2RlcGVuZGVuY3k6ICcgKyBkZXApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaG93bikge1xuICAgICAgICAgIE1vZHVsZS5wcmludEVycignKGVuZCBvZiBsaXN0KScpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwMCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIE1vZHVsZS5wcmludEVycignd2FybmluZzogcnVuIGRlcGVuZGVuY3kgYWRkZWQgd2l0aG91dCBJRCcpO1xuICB9XG59XG5Nb2R1bGVbXCJhZGRSdW5EZXBlbmRlbmN5XCJdID0gYWRkUnVuRGVwZW5kZW5jeTtcblxuZnVuY3Rpb24gcmVtb3ZlUnVuRGVwZW5kZW5jeShpZCkge1xuICBydW5EZXBlbmRlbmNpZXMtLTtcbiAgaWYgKE1vZHVsZVsnbW9uaXRvclJ1bkRlcGVuZGVuY2llcyddKSB7XG4gICAgTW9kdWxlWydtb25pdG9yUnVuRGVwZW5kZW5jaWVzJ10ocnVuRGVwZW5kZW5jaWVzKTtcbiAgfVxuICBpZiAoaWQpIHtcbiAgICBhc3NlcnQocnVuRGVwZW5kZW5jeVRyYWNraW5nW2lkXSk7XG4gICAgZGVsZXRlIHJ1bkRlcGVuZGVuY3lUcmFja2luZ1tpZF07XG4gIH0gZWxzZSB7XG4gICAgTW9kdWxlLnByaW50RXJyKCd3YXJuaW5nOiBydW4gZGVwZW5kZW5jeSByZW1vdmVkIHdpdGhvdXQgSUQnKTtcbiAgfVxuICBpZiAocnVuRGVwZW5kZW5jaWVzID09IDApIHtcbiAgICBpZiAocnVuRGVwZW5kZW5jeVdhdGNoZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocnVuRGVwZW5kZW5jeVdhdGNoZXIpO1xuICAgICAgcnVuRGVwZW5kZW5jeVdhdGNoZXIgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoZGVwZW5kZW5jaWVzRnVsZmlsbGVkKSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBkZXBlbmRlbmNpZXNGdWxmaWxsZWQ7XG4gICAgICBkZXBlbmRlbmNpZXNGdWxmaWxsZWQgPSBudWxsO1xuICAgICAgY2FsbGJhY2soKTsgLy8gY2FuIGFkZCBhbm90aGVyIGRlcGVuZGVuY2llc0Z1bGZpbGxlZFxuICAgIH1cbiAgfVxufVxuTW9kdWxlW1wicmVtb3ZlUnVuRGVwZW5kZW5jeVwiXSA9IHJlbW92ZVJ1bkRlcGVuZGVuY3k7XG5cbk1vZHVsZVtcInByZWxvYWRlZEltYWdlc1wiXSA9IHt9OyAvLyBtYXBzIHVybCB0byBpbWFnZSBkYXRhXG5Nb2R1bGVbXCJwcmVsb2FkZWRBdWRpb3NcIl0gPSB7fTsgLy8gbWFwcyB1cmwgdG8gYXVkaW8gZGF0YVxuXG5cblxudmFyIG1lbW9yeUluaXRpYWxpemVyID0gbnVsbDtcblxuXG5cbnZhciAvKiBzaG93IGVycm9ycyBvbiBsaWtlbHkgY2FsbHMgdG8gRlMgd2hlbiBpdCB3YXMgbm90IGluY2x1ZGVkICovIEZTID0ge1xuICBlcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgYWJvcnQoJ0ZpbGVzeXN0ZW0gc3VwcG9ydCAoRlMpIHdhcyBub3QgaW5jbHVkZWQuIFRoZSBwcm9ibGVtIGlzIHRoYXQgeW91IGFyZSB1c2luZyBmaWxlcyBmcm9tIEpTLCBidXQgZmlsZXMgd2VyZSBub3QgdXNlZCBmcm9tIEMvQysrLCBzbyBmaWxlc3lzdGVtIHN1cHBvcnQgd2FzIG5vdCBhdXRvLWluY2x1ZGVkLiBZb3UgY2FuIGZvcmNlLWluY2x1ZGUgZmlsZXN5c3RlbSBzdXBwb3J0IHdpdGggIC1zIEZPUkNFX0ZJTEVTWVNURU09MScpO1xuICB9LFxuICBpbml0OiBmdW5jdGlvbigpIHsgRlMuZXJyb3IoKSB9LFxuICBjcmVhdGVEYXRhRmlsZTogZnVuY3Rpb24oKSB7IEZTLmVycm9yKCkgfSxcbiAgY3JlYXRlUHJlbG9hZGVkRmlsZTogZnVuY3Rpb24oKSB7IEZTLmVycm9yKCkgfSxcbiAgY3JlYXRlTGF6eUZpbGU6IGZ1bmN0aW9uKCkgeyBGUy5lcnJvcigpIH0sXG4gIG9wZW46IGZ1bmN0aW9uKCkgeyBGUy5lcnJvcigpIH0sXG4gIG1rZGV2OiBmdW5jdGlvbigpIHsgRlMuZXJyb3IoKSB9LFxuICByZWdpc3RlckRldmljZTogZnVuY3Rpb24oKSB7IEZTLmVycm9yKCkgfSxcbiAgYW5hbHl6ZVBhdGg6IGZ1bmN0aW9uKCkgeyBGUy5lcnJvcigpIH0sXG4gIGxvYWRGaWxlc0Zyb21EQjogZnVuY3Rpb24oKSB7IEZTLmVycm9yKCkgfSxcblxuICBFcnJub0Vycm9yOiBmdW5jdGlvbiBFcnJub0Vycm9yKCkgeyBGUy5lcnJvcigpIH0sXG59O1xuTW9kdWxlWydGU19jcmVhdGVEYXRhRmlsZSddID0gRlMuY3JlYXRlRGF0YUZpbGU7XG5Nb2R1bGVbJ0ZTX2NyZWF0ZVByZWxvYWRlZEZpbGUnXSA9IEZTLmNyZWF0ZVByZWxvYWRlZEZpbGU7XG5cblxuZnVuY3Rpb24gaW50ZWdyYXRlV2FzbUpTKE1vZHVsZSkge1xuICAvLyB3YXNtLmpzIGhhcyBzZXZlcmFsIG1ldGhvZHMgZm9yIGNyZWF0aW5nIHRoZSBjb21waWxlZCBjb2RlIG1vZHVsZSBoZXJlOlxuICAvLyAgKiAnbmF0aXZlLXdhc20nIDogdXNlIG5hdGl2ZSBXZWJBc3NlbWJseSBzdXBwb3J0IGluIHRoZSBicm93c2VyXG4gIC8vICAqICdpbnRlcnByZXQtcy1leHByJzogbG9hZCBzLWV4cHJlc3Npb24gY29kZSBmcm9tIGEgLndhc3QgYW5kIGludGVycHJldFxuICAvLyAgKiAnaW50ZXJwcmV0LWJpbmFyeSc6IGxvYWQgYmluYXJ5IHdhc20gYW5kIGludGVycHJldFxuICAvLyAgKiAnaW50ZXJwcmV0LWFzbTJ3YXNtJzogbG9hZCBhc20uanMgY29kZSwgdHJhbnNsYXRlIHRvIHdhc20sIGFuZCBpbnRlcnByZXRcbiAgLy8gICogJ2FzbWpzJzogbm8gd2FzbSwganVzdCBsb2FkIHRoZSBhc20uanMgY29kZSBhbmQgdXNlIHRoYXQgKGdvb2QgZm9yIHRlc3RpbmcpXG4gIC8vIFRoZSBtZXRob2QgY2FuIGJlIHNldCBhdCBjb21waWxlIHRpbWUgKEJJTkFSWUVOX01FVEhPRCksIG9yIHJ1bnRpbWUgYnkgc2V0dGluZyBNb2R1bGVbJ3dhc21KU01ldGhvZCddLlxuICAvLyBUaGUgbWV0aG9kIGNhbiBiZSBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0LCBpbiB3aGljaCBjYXNlLCB3ZSB3aWxsIHRyeSB0aGVcbiAgLy8gb3B0aW9ucyBvbmUgYnkgb25lLiBTb21lIG9mIHRoZW0gY2FuIGZhaWwgZ3JhY2VmdWxseSwgYW5kIHRoZW4gd2UgY2FuIHRyeVxuICAvLyB0aGUgbmV4dC5cblxuICAvLyBpbnB1dHNcblxuICB2YXIgbWV0aG9kID0gTW9kdWxlWyd3YXNtSlNNZXRob2QnXSB8fCAnbmF0aXZlLXdhc20nO1xuICBNb2R1bGVbJ3dhc21KU01ldGhvZCddID0gbWV0aG9kO1xuXG4gIHZhciB3YXNtVGV4dEZpbGUgPSBNb2R1bGVbJ3dhc21UZXh0RmlsZSddIHx8ICd3b3JsZC53YXN0JztcbiAgdmFyIHdhc21CaW5hcnlGaWxlID0gTW9kdWxlWyd3YXNtQmluYXJ5RmlsZSddIHx8ICd3b3JsZC53YXNtJztcbiAgdmFyIGFzbWpzQ29kZUZpbGUgPSBNb2R1bGVbJ2FzbWpzQ29kZUZpbGUnXSB8fCAnd29ybGQudGVtcC5hc20uanMnO1xuXG4gIGlmICh0eXBlb2YgTW9kdWxlWydsb2NhdGVGaWxlJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICB3YXNtVGV4dEZpbGUgPSBNb2R1bGVbJ2xvY2F0ZUZpbGUnXSh3YXNtVGV4dEZpbGUpO1xuICAgIHdhc21CaW5hcnlGaWxlID0gTW9kdWxlWydsb2NhdGVGaWxlJ10od2FzbUJpbmFyeUZpbGUpO1xuICAgIGFzbWpzQ29kZUZpbGUgPSBNb2R1bGVbJ2xvY2F0ZUZpbGUnXShhc21qc0NvZGVGaWxlKTtcbiAgfVxuXG4gIC8vIHV0aWxpdGllc1xuXG4gIHZhciB3YXNtUGFnZVNpemUgPSA2NCoxMDI0O1xuXG4gIHZhciBhc20yd2FzbUltcG9ydHMgPSB7IC8vIHNwZWNpYWwgYXNtMndhc20gaW1wb3J0c1xuICAgIFwiZjY0LXJlbVwiOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4geCAlIHk7XG4gICAgfSxcbiAgICBcImY2NC10by1pbnRcIjogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHggfCAwO1xuICAgIH0sXG4gICAgXCJpMzJzLWRpdlwiOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4gKCh4IHwgMCkgLyAoeSB8IDApKSB8IDA7XG4gICAgfSxcbiAgICBcImkzMnUtZGl2XCI6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIHJldHVybiAoKHggPj4+IDApIC8gKHkgPj4+IDApKSA+Pj4gMDtcbiAgICB9LFxuICAgIFwiaTMycy1yZW1cIjogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgcmV0dXJuICgoeCB8IDApICUgKHkgfCAwKSkgfCAwO1xuICAgIH0sXG4gICAgXCJpMzJ1LXJlbVwiOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4gKCh4ID4+PiAwKSAlICh5ID4+PiAwKSkgPj4+IDA7XG4gICAgfSxcbiAgICBcImRlYnVnZ2VyXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgZGVidWdnZXI7XG4gICAgfSxcbiAgfTtcblxuICB2YXIgaW5mbyA9IHtcbiAgICAnZ2xvYmFsJzogbnVsbCxcbiAgICAnZW52JzogbnVsbCxcbiAgICAnYXNtMndhc20nOiBhc20yd2FzbUltcG9ydHMsXG4gICAgJ3BhcmVudCc6IE1vZHVsZSAvLyBNb2R1bGUgaW5zaWRlIHdhc20tanMuY3BwIHJlZmVycyB0byB3YXNtLWpzLmNwcDsgdGhpcyBhbGxvd3MgYWNjZXNzIHRvIHRoZSBvdXRzaWRlIHByb2dyYW0uXG4gIH07XG5cbiAgdmFyIGV4cG9ydHMgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIGxvb2t1cEltcG9ydChtb2QsIGJhc2UpIHtcbiAgICB2YXIgbG9va3VwID0gaW5mbztcbiAgICBpZiAobW9kLmluZGV4T2YoJy4nKSA8IDApIHtcbiAgICAgIGxvb2t1cCA9IChsb29rdXAgfHwge30pW21vZF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IG1vZC5zcGxpdCgnLicpO1xuICAgICAgbG9va3VwID0gKGxvb2t1cCB8fCB7fSlbcGFydHNbMF1dO1xuICAgICAgbG9va3VwID0gKGxvb2t1cCB8fCB7fSlbcGFydHNbMV1dO1xuICAgIH1cbiAgICBpZiAoYmFzZSkge1xuICAgICAgbG9va3VwID0gKGxvb2t1cCB8fCB7fSlbYmFzZV07XG4gICAgfVxuICAgIGlmIChsb29rdXAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYWJvcnQoJ2JhZCBsb29rdXBJbXBvcnQgdG8gKCcgKyBtb2QgKyAnKS4nICsgYmFzZSk7XG4gICAgfVxuICAgIHJldHVybiBsb29rdXA7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZU1lbW9yeShuZXdCdWZmZXIpIHtcbiAgICAvLyBUaGUgd2FzbSBpbnN0YW5jZSBjcmVhdGVzIGl0cyBtZW1vcnkuIEJ1dCBzdGF0aWMgaW5pdCBjb2RlIG1pZ2h0IGhhdmUgd3JpdHRlbiB0b1xuICAgIC8vIGJ1ZmZlciBhbHJlYWR5LCBpbmNsdWRpbmcgdGhlIG1lbSBpbml0IGZpbGUsIGFuZCB3ZSBtdXN0IGNvcHkgaXQgb3ZlciBpbiBhIHByb3BlciBtZXJnZS5cbiAgICAvLyBUT0RPOiBhdm9pZCB0aGlzIGNvcHksIGJ5IGF2b2lkaW5nIHN1Y2ggc3RhdGljIGluaXQgd3JpdGVzXG4gICAgLy8gVE9ETzogaW4gc2hvcnRlciB0ZXJtLCBqdXN0IGNvcHkgdXAgdG8gdGhlIGxhc3Qgc3RhdGljIGluaXQgd3JpdGVcbiAgICB2YXIgb2xkQnVmZmVyID0gTW9kdWxlWydidWZmZXInXTtcbiAgICBpZiAobmV3QnVmZmVyLmJ5dGVMZW5ndGggPCBvbGRCdWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgICAgTW9kdWxlWydwcmludEVyciddKCd0aGUgbmV3IGJ1ZmZlciBpbiBtZXJnZU1lbW9yeSBpcyBzbWFsbGVyIHRoYW4gdGhlIHByZXZpb3VzIG9uZS4gaW4gbmF0aXZlIHdhc20sIHdlIHNob3VsZCBncm93IG1lbW9yeSBoZXJlJyk7XG4gICAgfVxuICAgIHZhciBvbGRWaWV3ID0gbmV3IEludDhBcnJheShvbGRCdWZmZXIpO1xuICAgIHZhciBuZXdWaWV3ID0gbmV3IEludDhBcnJheShuZXdCdWZmZXIpO1xuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIG1lbSBpbml0IGZpbGUsIGRvIG5vdCB0cmFtcGxlIGl0XG4gICAgaWYgKCFtZW1vcnlJbml0aWFsaXplcikge1xuICAgICAgb2xkVmlldy5zZXQobmV3Vmlldy5zdWJhcnJheShNb2R1bGVbJ1NUQVRJQ19CQVNFJ10sIE1vZHVsZVsnU1RBVElDX0JBU0UnXSArIE1vZHVsZVsnU1RBVElDX0JVTVAnXSksIE1vZHVsZVsnU1RBVElDX0JBU0UnXSk7XG4gICAgfVxuXG4gICAgbmV3Vmlldy5zZXQob2xkVmlldyk7XG4gICAgdXBkYXRlR2xvYmFsQnVmZmVyKG5ld0J1ZmZlcik7XG4gICAgdXBkYXRlR2xvYmFsQnVmZmVyVmlld3MoKTtcbiAgfVxuXG4gIHZhciBXYXNtVHlwZXMgPSB7XG4gICAgbm9uZTogMCxcbiAgICBpMzI6IDEsXG4gICAgaTY0OiAyLFxuICAgIGYzMjogMyxcbiAgICBmNjQ6IDRcbiAgfTtcblxuICBmdW5jdGlvbiBmaXhJbXBvcnRzKGltcG9ydHMpIHtcbiAgICBpZiAoITApIHJldHVybiBpbXBvcnRzO1xuICAgIHZhciByZXQgPSB7fTtcbiAgICBmb3IgKHZhciBpIGluIGltcG9ydHMpIHtcbiAgICAgIHZhciBmaXhlZCA9IGk7XG4gICAgICBpZiAoZml4ZWRbMF0gPT0gJ18nKSBmaXhlZCA9IGZpeGVkLnN1YnN0cigxKTtcbiAgICAgIHJldFtmaXhlZF0gPSBpbXBvcnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QmluYXJ5KCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgYmluYXJ5O1xuICAgICAgaWYgKE1vZHVsZVsnd2FzbUJpbmFyeSddKSB7XG4gICAgICAgIGJpbmFyeSA9IE1vZHVsZVsnd2FzbUJpbmFyeSddO1xuICAgICAgICBiaW5hcnkgPSBuZXcgVWludDhBcnJheShiaW5hcnkpO1xuICAgICAgfSBlbHNlIGlmIChNb2R1bGVbJ3JlYWRCaW5hcnknXSkge1xuICAgICAgICBiaW5hcnkgPSBNb2R1bGVbJ3JlYWRCaW5hcnknXSh3YXNtQmluYXJ5RmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBcIm9uIHRoZSB3ZWIsIHdlIG5lZWQgdGhlIHdhc20gYmluYXJ5IHRvIGJlIHByZWxvYWRlZCBhbmQgc2V0IG9uIE1vZHVsZVsnd2FzbUJpbmFyeSddLiBlbWNjLnB5IHdpbGwgZG8gdGhhdCBmb3IgeW91IHdoZW4gZ2VuZXJhdGluZyBIVE1MIChidXQgbm90IEpTKVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJpbmFyeTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgYWJvcnQoZXJyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCaW5hcnlQcm9taXNlKCkge1xuICAgIC8vIGlmIHdlIGRvbid0IGhhdmUgdGhlIGJpbmFyeSB5ZXQsIGFuZCBoYXZlIHRoZSBGZXRjaCBhcGksIHVzZSB0aGF0XG4gICAgaWYgKCFNb2R1bGVbJ3dhc21CaW5hcnknXSAmJiB0eXBlb2YgZmV0Y2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBmZXRjaCh3YXNtQmluYXJ5RmlsZSwgeyBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2VbJ29rJ10pIHtcbiAgICAgICAgICB0aHJvdyBcImZhaWxlZCB0byBsb2FkIHdhc20gYmluYXJ5IGZpbGUgYXQgJ1wiICsgd2FzbUJpbmFyeUZpbGUgKyBcIidcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VbJ2FycmF5QnVmZmVyJ10oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBPdGhlcndpc2UsIGdldEJpbmFyeSBzaG91bGQgYmUgYWJsZSB0byBnZXQgaXQgc3luY2hyb25vdXNseVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlc29sdmUoZ2V0QmluYXJ5KCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gZG8tbWV0aG9kIGZ1bmN0aW9uc1xuXG4gIGZ1bmN0aW9uIGRvSnVzdEFzbShnbG9iYWwsIGVudiwgcHJvdmlkZWRCdWZmZXIpIHtcbiAgICAvLyBpZiBubyBNb2R1bGUuYXNtLCBvciBpdCdzIHRoZSBtZXRob2QgaGFuZGxlciBoZWxwZXIgKHNlZSBiZWxvdyksIHRoZW4gYXBwbHlcbiAgICAvLyB0aGUgYXNtanNcbiAgICBpZiAodHlwZW9mIE1vZHVsZVsnYXNtJ10gIT09ICdmdW5jdGlvbicgfHwgTW9kdWxlWydhc20nXSA9PT0gbWV0aG9kSGFuZGxlcikge1xuICAgICAgaWYgKCFNb2R1bGVbJ2FzbVByZWxvYWQnXSkge1xuICAgICAgICAvLyB5b3UgY2FuIGxvYWQgdGhlIC5hc20uanMgZmlsZSBiZWZvcmUgdGhpcywgdG8gYXZvaWQgdGhpcyBzeW5jIHhociBhbmQgZXZhbFxuICAgICAgICBldmFsKE1vZHVsZVsncmVhZCddKGFzbWpzQ29kZUZpbGUpKTsgLy8gc2V0IE1vZHVsZS5hc21cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE1vZHVsZVsnYXNtJ10gPSBNb2R1bGVbJ2FzbVByZWxvYWQnXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBNb2R1bGVbJ2FzbSddICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBNb2R1bGVbJ3ByaW50RXJyJ10oJ2FzbSBldmFsbGluZyBkaWQgbm90IHNldCB0aGUgbW9kdWxlIHByb3Blcmx5Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBNb2R1bGVbJ2FzbSddKGdsb2JhbCwgZW52LCBwcm92aWRlZEJ1ZmZlcik7XG4gIH1cblxuICBmdW5jdGlvbiBkb05hdGl2ZVdhc20oZ2xvYmFsLCBlbnYsIHByb3ZpZGVkQnVmZmVyKSB7XG4gICAgaWYgKHR5cGVvZiBXZWJBc3NlbWJseSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIE1vZHVsZVsncHJpbnRFcnInXSgnbm8gbmF0aXZlIHdhc20gc3VwcG9ydCBkZXRlY3RlZCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBwcmVwYXJlIG1lbW9yeSBpbXBvcnRcbiAgICBpZiAoIShNb2R1bGVbJ3dhc21NZW1vcnknXSBpbnN0YW5jZW9mIFdlYkFzc2VtYmx5Lk1lbW9yeSkpIHtcbiAgICAgIE1vZHVsZVsncHJpbnRFcnInXSgnbm8gbmF0aXZlIHdhc20gTWVtb3J5IGluIHVzZScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbnZbJ21lbW9yeSddID0gTW9kdWxlWyd3YXNtTWVtb3J5J107XG4gICAgLy8gTG9hZCB0aGUgd2FzbSBtb2R1bGUgYW5kIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiB1c2luZyBuYXRpdmUgc3VwcG9ydCBpbiB0aGUgSlMgZW5naW5lLlxuICAgIGluZm9bJ2dsb2JhbCddID0ge1xuICAgICAgJ05hTic6IE5hTixcbiAgICAgICdJbmZpbml0eSc6IEluZmluaXR5XG4gICAgfTtcbiAgICBpbmZvWydnbG9iYWwuTWF0aCddID0gZ2xvYmFsLk1hdGg7XG4gICAgaW5mb1snZW52J10gPSBlbnY7XG4gICAgLy8gaGFuZGxlIGEgZ2VuZXJhdGVkIHdhc20gaW5zdGFuY2UsIHJlY2VpdmluZyBpdHMgZXhwb3J0cyBhbmRcbiAgICAvLyBwZXJmb3JtaW5nIG90aGVyIG5lY2Vzc2FyeSBzZXR1cFxuICAgIGZ1bmN0aW9uIHJlY2VpdmVJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgICAgZXhwb3J0cyA9IGluc3RhbmNlLmV4cG9ydHM7XG4gICAgICBpZiAoZXhwb3J0cy5tZW1vcnkpIG1lcmdlTWVtb3J5KGV4cG9ydHMubWVtb3J5KTtcbiAgICAgIE1vZHVsZVsnYXNtJ10gPSBleHBvcnRzO1xuICAgICAgTW9kdWxlW1widXNpbmdXYXNtXCJdID0gdHJ1ZTtcbiAgICAgIHJlbW92ZVJ1bkRlcGVuZGVuY3koJ3dhc20taW5zdGFudGlhdGUnKTtcbiAgICB9XG5cbiAgICBhZGRSdW5EZXBlbmRlbmN5KCd3YXNtLWluc3RhbnRpYXRlJyk7IC8vIHdlIGNhbid0IHJ1biB5ZXRcblxuICAgIC8vIFVzZXIgc2hlbGwgcGFnZXMgY2FuIHdyaXRlIHRoZWlyIG93biBNb2R1bGUuaW5zdGFudGlhdGVXYXNtID0gZnVuY3Rpb24oaW1wb3J0cywgc3VjY2Vzc0NhbGxiYWNrKSBjYWxsYmFja1xuICAgIC8vIHRvIG1hbnVhbGx5IGluc3RhbnRpYXRlIHRoZSBXYXNtIG1vZHVsZSB0aGVtc2VsdmVzLiBUaGlzIGFsbG93cyBwYWdlcyB0byBydW4gdGhlIGluc3RhbnRpYXRpb24gcGFyYWxsZWxcbiAgICAvLyB0byBhbnkgb3RoZXIgYXN5bmMgc3RhcnR1cCBhY3Rpb25zIHRoZXkgYXJlIHBlcmZvcm1pbmcuXG4gICAgaWYgKE1vZHVsZVsnaW5zdGFudGlhdGVXYXNtJ10pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBNb2R1bGVbJ2luc3RhbnRpYXRlV2FzbSddKGluZm8sIHJlY2VpdmVJbnN0YW5jZSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgTW9kdWxlWydwcmludEVyciddKCdNb2R1bGUuaW5zdGFudGlhdGVXYXNtIGNhbGxiYWNrIGZhaWxlZCB3aXRoIGVycm9yOiAnICsgZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRCaW5hcnlQcm9taXNlKCkudGhlbihmdW5jdGlvbihiaW5hcnkpIHtcbiAgICAgIHJldHVybiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShiaW5hcnksIGluZm8pXG4gICAgfSkudGhlbihmdW5jdGlvbihvdXRwdXQpIHtcbiAgICAgIC8vIHJlY2VpdmVJbnN0YW5jZSgpIHdpbGwgc3dhcCBpbiB0aGUgZXhwb3J0cyAodG8gTW9kdWxlLmFzbSkgc28gdGhleSBjYW4gYmUgY2FsbGVkXG4gICAgICByZWNlaXZlSW5zdGFuY2Uob3V0cHV0WydpbnN0YW5jZSddKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgIE1vZHVsZVsncHJpbnRFcnInXSgnZmFpbGVkIHRvIGFzeW5jaHJvbm91c2x5IHByZXBhcmUgd2FzbTogJyArIHJlYXNvbik7XG4gICAgICBhYm9ydChyZWFzb24pO1xuICAgIH0pO1xuICAgIHJldHVybiB7fTsgLy8gbm8gZXhwb3J0cyB5ZXQ7IHdlJ2xsIGZpbGwgdGhlbSBpbiBsYXRlclxuICB9XG5cbiAgZnVuY3Rpb24gZG9XYXNtUG9seWZpbGwoZ2xvYmFsLCBlbnYsIHByb3ZpZGVkQnVmZmVyLCBtZXRob2QpIHtcbiAgICBpZiAodHlwZW9mIFdhc21KUyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgTW9kdWxlWydwcmludEVyciddKCdXYXNtSlMgbm90IGRldGVjdGVkIC0gcG9seWZpbGwgbm90IGJ1bmRsZWQ/Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVXNlIHdhc20uanMgdG8gcG9seWZpbGwgYW5kIGV4ZWN1dGUgY29kZSBpbiBhIHdhc20gaW50ZXJwcmV0ZXIuXG4gICAgdmFyIHdhc21KUyA9IFdhc21KUyh7fSk7XG5cbiAgICAvLyBYWFggZG9uJ3QgYmUgY29uZnVzZWQuIE1vZHVsZSBoZXJlIGlzIGluIHRoZSBvdXRzaWRlIHByb2dyYW0uIHdhc21KUyBpcyB0aGUgaW5uZXIgd2FzbS1qcy5jcHAuXG4gICAgd2FzbUpTWydvdXRzaWRlJ10gPSBNb2R1bGU7IC8vIEluc2lkZSB3YXNtLWpzLmNwcCwgTW9kdWxlWydvdXRzaWRlJ10gcmVhY2hlcyB0aGUgb3V0c2lkZSBtb2R1bGUuXG5cbiAgICAvLyBJbmZvcm1hdGlvbiBmb3IgdGhlIGluc3RhbmNlIG9mIHRoZSBtb2R1bGUuXG4gICAgd2FzbUpTWydpbmZvJ10gPSBpbmZvO1xuXG4gICAgd2FzbUpTWydsb29rdXBJbXBvcnQnXSA9IGxvb2t1cEltcG9ydDtcblxuICAgIGFzc2VydChwcm92aWRlZEJ1ZmZlciA9PT0gTW9kdWxlWydidWZmZXInXSk7IC8vIHdlIHNob3VsZCBub3QgZXZlbiBuZWVkIHRvIHBhc3MgaXQgYXMgYSAzcmQgYXJnIGZvciB3YXNtLCBidXQgdGhhdCdzIHRoZSBhc20uanMgd2F5LlxuXG4gICAgaW5mby5nbG9iYWwgPSBnbG9iYWw7XG4gICAgaW5mby5lbnYgPSBlbnY7XG5cbiAgICAvLyBwb2x5ZmlsbCBpbnRlcnByZXRlciBleHBlY3RzIGFuIEFycmF5QnVmZmVyXG4gICAgYXNzZXJ0KHByb3ZpZGVkQnVmZmVyID09PSBNb2R1bGVbJ2J1ZmZlciddKTtcbiAgICBlbnZbJ21lbW9yeSddID0gcHJvdmlkZWRCdWZmZXI7XG4gICAgYXNzZXJ0KGVudlsnbWVtb3J5J10gaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG5cbiAgICB3YXNtSlNbJ3Byb3ZpZGVkVG90YWxNZW1vcnknXSA9IE1vZHVsZVsnYnVmZmVyJ10uYnl0ZUxlbmd0aDtcblxuICAgIC8vIFByZXBhcmUgdG8gZ2VuZXJhdGUgd2FzbSwgdXNpbmcgZWl0aGVyIGFzbTJ3YXNtIG9yIHMtZXhwcnNcbiAgICB2YXIgY29kZTtcbiAgICBpZiAobWV0aG9kID09PSAnaW50ZXJwcmV0LWJpbmFyeScpIHtcbiAgICAgIGNvZGUgPSBnZXRCaW5hcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29kZSA9IE1vZHVsZVsncmVhZCddKG1ldGhvZCA9PSAnaW50ZXJwcmV0LWFzbTJ3YXNtJyA/IGFzbWpzQ29kZUZpbGUgOiB3YXNtVGV4dEZpbGUpO1xuICAgIH1cbiAgICB2YXIgdGVtcDtcbiAgICBpZiAobWV0aG9kID09ICdpbnRlcnByZXQtYXNtMndhc20nKSB7XG4gICAgICB0ZW1wID0gd2FzbUpTWydfbWFsbG9jJ10oY29kZS5sZW5ndGggKyAxKTtcbiAgICAgIHdhc21KU1snd3JpdGVBc2NpaVRvTWVtb3J5J10oY29kZSwgdGVtcCk7XG4gICAgICB3YXNtSlNbJ19sb2FkX2FzbTJ3YXNtJ10odGVtcCk7XG4gICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdpbnRlcnByZXQtcy1leHByJykge1xuICAgICAgdGVtcCA9IHdhc21KU1snX21hbGxvYyddKGNvZGUubGVuZ3RoICsgMSk7XG4gICAgICB3YXNtSlNbJ3dyaXRlQXNjaWlUb01lbW9yeSddKGNvZGUsIHRlbXApO1xuICAgICAgd2FzbUpTWydfbG9hZF9zX2V4cHIyd2FzbSddKHRlbXApO1xuICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSAnaW50ZXJwcmV0LWJpbmFyeScpIHtcbiAgICAgIHRlbXAgPSB3YXNtSlNbJ19tYWxsb2MnXShjb2RlLmxlbmd0aCk7XG4gICAgICB3YXNtSlNbJ0hFQVBVOCddLnNldChjb2RlLCB0ZW1wKTtcbiAgICAgIHdhc21KU1snX2xvYWRfYmluYXJ5Mndhc20nXSh0ZW1wLCBjb2RlLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93ICd3aGF0PyAnICsgbWV0aG9kO1xuICAgIH1cbiAgICB3YXNtSlNbJ19mcmVlJ10odGVtcCk7XG5cbiAgICB3YXNtSlNbJ19pbnN0YW50aWF0ZSddKHRlbXApO1xuXG4gICAgaWYgKE1vZHVsZVsnbmV3QnVmZmVyJ10pIHtcbiAgICAgIG1lcmdlTWVtb3J5KE1vZHVsZVsnbmV3QnVmZmVyJ10pO1xuICAgICAgTW9kdWxlWyduZXdCdWZmZXInXSA9IG51bGw7XG4gICAgfVxuXG4gICAgZXhwb3J0cyA9IHdhc21KU1snYXNtRXhwb3J0cyddO1xuXG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH1cblxuICAvLyBXZSBtYXkgaGF2ZSBhIHByZWxvYWRlZCB2YWx1ZSBpbiBNb2R1bGUuYXNtLCBzYXZlIGl0XG4gIE1vZHVsZVsnYXNtUHJlbG9hZCddID0gTW9kdWxlWydhc20nXTtcblxuICAvLyBNZW1vcnkgZ3Jvd3RoIGludGVncmF0aW9uIGNvZGVcblxuICB2YXIgYXNtanNSZWFsbG9jQnVmZmVyID0gTW9kdWxlWydyZWFsbG9jQnVmZmVyJ107XG5cbiAgdmFyIHdhc21SZWFsbG9jQnVmZmVyID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHZhciBQQUdFX01VTFRJUExFID0gTW9kdWxlW1widXNpbmdXYXNtXCJdID8gV0FTTV9QQUdFX1NJWkUgOiBBU01KU19QQUdFX1NJWkU7IC8vIEluIHdhc20sIGhlYXAgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjRLQi4gSW4gYXNtLmpzLCB0aGV5IG5lZWQgdG8gYmUgbXVsdGlwbGVzIG9mIDE2TUIuXG4gICAgc2l6ZSA9IGFsaWduVXAoc2l6ZSwgUEFHRV9NVUxUSVBMRSk7IC8vIHJvdW5kIHVwIHRvIHdhc20gcGFnZSBzaXplXG4gICAgdmFyIG9sZCA9IE1vZHVsZVsnYnVmZmVyJ107XG4gICAgdmFyIG9sZFNpemUgPSBvbGQuYnl0ZUxlbmd0aDtcbiAgICBpZiAoTW9kdWxlW1widXNpbmdXYXNtXCJdKSB7XG4gICAgICAvLyBuYXRpdmUgd2FzbSBzdXBwb3J0XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gTW9kdWxlWyd3YXNtTWVtb3J5J10uZ3Jvdygoc2l6ZSAtIG9sZFNpemUpIC8gd2FzbVBhZ2VTaXplKTsgLy8gLmdyb3coKSB0YWtlcyBhIGRlbHRhIGNvbXBhcmVkIHRvIHRoZSBwcmV2aW91cyBzaXplXG4gICAgICAgIGlmIChyZXN1bHQgIT09ICgtMSB8IDApKSB7XG4gICAgICAgICAgLy8gc3VjY2VzcyBpbiBuYXRpdmUgd2FzbSBtZW1vcnkgZ3Jvd3RoLCBnZXQgdGhlIGJ1ZmZlciBmcm9tIHRoZSBtZW1vcnlcbiAgICAgICAgICByZXR1cm4gTW9kdWxlWydidWZmZXInXSA9IE1vZHVsZVsnd2FzbU1lbW9yeSddLmJ1ZmZlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01vZHVsZS5yZWFsbG9jQnVmZmVyOiBBdHRlbXB0ZWQgdG8gZ3JvdyBmcm9tICcgKyBvbGRTaXplICArICcgYnl0ZXMgdG8gJyArIHNpemUgKyAnIGJ5dGVzLCBidXQgZ290IGVycm9yOiAnICsgZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB3YXNtIGludGVycHJldGVyIHN1cHBvcnRcbiAgICAgIGV4cG9ydHNbJ19fZ3Jvd1dhc21NZW1vcnknXSgoc2l6ZSAtIG9sZFNpemUpIC8gd2FzbVBhZ2VTaXplKTsgLy8gdGlueSB3YXNtIG1ldGhvZCB0aGF0IGp1c3QgZG9lcyBncm93X21lbW9yeVxuICAgICAgLy8gaW4gaW50ZXJwcmV0ZXIsIHdlIHJlcGxhY2UgTW9kdWxlLmJ1ZmZlciBpZiB3ZSBhbGxvY2F0ZVxuICAgICAgcmV0dXJuIE1vZHVsZVsnYnVmZmVyJ10gIT09IG9sZCA/IE1vZHVsZVsnYnVmZmVyJ10gOiBudWxsOyAvLyBpZiBpdCB3YXMgcmVhbGxvY2F0ZWQsIGl0IGNoYW5nZWRcbiAgICB9XG4gIH07XG5cbiAgTW9kdWxlWydyZWFsbG9jQnVmZmVyJ10gPSBmdW5jdGlvbihzaXplKSB7XG4gICAgaWYgKGZpbmFsTWV0aG9kID09PSAnYXNtanMnKSB7XG4gICAgICByZXR1cm4gYXNtanNSZWFsbG9jQnVmZmVyKHNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gd2FzbVJlYWxsb2NCdWZmZXIoc2l6ZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIHdlIG1heSB0cnkgbW9yZSB0aGFuIG9uZTsgdGhpcyBpcyB0aGUgZmluYWwgb25lLCB0aGF0IHdvcmtlZCBhbmQgd2UgYXJlIHVzaW5nXG4gIHZhciBmaW5hbE1ldGhvZCA9ICcnO1xuXG4gIC8vIFByb3ZpZGUgYW4gXCJhc20uanMgZnVuY3Rpb25cIiBmb3IgdGhlIGFwcGxpY2F0aW9uLCBjYWxsZWQgdG8gXCJsaW5rXCIgdGhlIGFzbS5qcyBtb2R1bGUuIFdlIGluc3RhbnRpYXRlXG4gIC8vIHRoZSB3YXNtIG1vZHVsZSBhdCB0aGF0IHRpbWUsIGFuZCBpdCByZWNlaXZlcyBpbXBvcnRzIGFuZCBwcm92aWRlcyBleHBvcnRzIGFuZCBzbyBmb3J0aCwgdGhlIGFwcFxuICAvLyBkb2Vzbid0IG5lZWQgdG8gY2FyZSB0aGF0IGl0IGlzIHdhc20gb3Igb2x5ZmlsbGVkIHdhc20gb3IgYXNtLmpzLlxuXG4gIE1vZHVsZVsnYXNtJ10gPSBmdW5jdGlvbihnbG9iYWwsIGVudiwgcHJvdmlkZWRCdWZmZXIpIHtcbiAgICBnbG9iYWwgPSBmaXhJbXBvcnRzKGdsb2JhbCk7XG4gICAgZW52ID0gZml4SW1wb3J0cyhlbnYpO1xuXG4gICAgLy8gaW1wb3J0IHRhYmxlXG4gICAgaWYgKCFlbnZbJ3RhYmxlJ10pIHtcbiAgICAgIHZhciBUQUJMRV9TSVpFID0gTW9kdWxlWyd3YXNtVGFibGVTaXplJ107XG4gICAgICBpZiAoVEFCTEVfU0laRSA9PT0gdW5kZWZpbmVkKSBUQUJMRV9TSVpFID0gMTAyNDsgLy8gd29ya3MgaW4gYmluYXJ5ZW4gaW50ZXJwcmV0ZXIgYXQgbGVhc3RcbiAgICAgIHZhciBNQVhfVEFCTEVfU0laRSA9IE1vZHVsZVsnd2FzbU1heFRhYmxlU2l6ZSddO1xuICAgICAgaWYgKHR5cGVvZiBXZWJBc3NlbWJseSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIFdlYkFzc2VtYmx5LlRhYmxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChNQVhfVEFCTEVfU0laRSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZW52Wyd0YWJsZSddID0gbmV3IFdlYkFzc2VtYmx5LlRhYmxlKHsgJ2luaXRpYWwnOiBUQUJMRV9TSVpFLCAnbWF4aW11bSc6IE1BWF9UQUJMRV9TSVpFLCAnZWxlbWVudCc6ICdhbnlmdW5jJyB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbnZbJ3RhYmxlJ10gPSBuZXcgV2ViQXNzZW1ibHkuVGFibGUoeyAnaW5pdGlhbCc6IFRBQkxFX1NJWkUsIGVsZW1lbnQ6ICdhbnlmdW5jJyB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW52Wyd0YWJsZSddID0gbmV3IEFycmF5KFRBQkxFX1NJWkUpOyAvLyB3b3JrcyBpbiBiaW5hcnllbiBpbnRlcnByZXRlciBhdCBsZWFzdFxuICAgICAgfVxuICAgICAgTW9kdWxlWyd3YXNtVGFibGUnXSA9IGVudlsndGFibGUnXTtcbiAgICB9XG5cbiAgICBpZiAoIWVudlsnbWVtb3J5QmFzZSddKSB7XG4gICAgICBlbnZbJ21lbW9yeUJhc2UnXSA9IE1vZHVsZVsnU1RBVElDX0JBU0UnXTsgLy8gdGVsbCB0aGUgbWVtb3J5IHNlZ21lbnRzIHdoZXJlIHRvIHBsYWNlIHRoZW1zZWx2ZXNcbiAgICB9XG4gICAgaWYgKCFlbnZbJ3RhYmxlQmFzZSddKSB7XG4gICAgICBlbnZbJ3RhYmxlQmFzZSddID0gMDsgLy8gdGFibGUgc3RhcnRzIGF0IDAgYnkgZGVmYXVsdCwgaW4gZHluYW1pYyBsaW5raW5nIHRoaXMgd2lsbCBjaGFuZ2VcbiAgICB9XG5cbiAgICAvLyB0cnkgdGhlIG1ldGhvZHMuIGVhY2ggc2hvdWxkIHJldHVybiB0aGUgZXhwb3J0cyBpZiBpdCBzdWNjZWVkZWRcblxuICAgIHZhciBleHBvcnRzO1xuICAgIGV4cG9ydHMgPSBkb05hdGl2ZVdhc20oZ2xvYmFsLCBlbnYsIHByb3ZpZGVkQnVmZmVyKTtcblxuXG4gICAgcmV0dXJuIGV4cG9ydHM7XG4gIH07XG5cbiAgdmFyIG1ldGhvZEhhbmRsZXIgPSBNb2R1bGVbJ2FzbSddOyAvLyBub3RlIG91ciBtZXRob2QgaGFuZGxlciwgYXMgd2UgbWF5IG1vZGlmeSBNb2R1bGVbJ2FzbSddIGxhdGVyXG59XG5cbmludGVncmF0ZVdhc21KUyhNb2R1bGUpO1xuXG4vLyA9PT0gQm9keSA9PT1cblxudmFyIEFTTV9DT05TVFMgPSBbXTtcblxuXG5cblxuU1RBVElDX0JBU0UgPSBSdW50aW1lLkdMT0JBTF9CQVNFO1xuXG5TVEFUSUNUT1AgPSBTVEFUSUNfQkFTRSArIDM4MjQ7XG4vKiBnbG9iYWwgaW5pdGlhbGl6ZXJzICovICBfX0FUSU5JVF9fLnB1c2goKTtcblxuXG5tZW1vcnlJbml0aWFsaXplciA9IE1vZHVsZVtcIndhc21KU01ldGhvZFwiXS5pbmRleE9mKFwiYXNtanNcIikgPj0gMCB8fCBNb2R1bGVbXCJ3YXNtSlNNZXRob2RcIl0uaW5kZXhPZihcImludGVycHJldC1hc20yd2FzbVwiKSA+PSAwID8gXCJ3b3JsZC5qcy5tZW1cIiA6IG51bGw7XG5cblxuXG5cbnZhciBTVEFUSUNfQlVNUCA9IDM4MjQ7XG5Nb2R1bGVbXCJTVEFUSUNfQkFTRVwiXSA9IFNUQVRJQ19CQVNFO1xuTW9kdWxlW1wiU1RBVElDX0JVTVBcIl0gPSBTVEFUSUNfQlVNUDtcblxuLyogbm8gbWVtb3J5IGluaXRpYWxpemVyICovXG52YXIgdGVtcERvdWJsZVB0ciA9IFNUQVRJQ1RPUDsgU1RBVElDVE9QICs9IDE2O1xuXG5hc3NlcnQodGVtcERvdWJsZVB0ciAlIDggPT0gMCk7XG5cbmZ1bmN0aW9uIGNvcHlUZW1wRmxvYXQocHRyKSB7IC8vIGZ1bmN0aW9ucywgYmVjYXVzZSBpbmxpbmluZyB0aGlzIGNvZGUgaW5jcmVhc2VzIGNvZGUgc2l6ZSB0b28gbXVjaFxuXG4gIEhFQVA4W3RlbXBEb3VibGVQdHJdID0gSEVBUDhbcHRyXTtcblxuICBIRUFQOFt0ZW1wRG91YmxlUHRyKzFdID0gSEVBUDhbcHRyKzFdO1xuXG4gIEhFQVA4W3RlbXBEb3VibGVQdHIrMl0gPSBIRUFQOFtwdHIrMl07XG5cbiAgSEVBUDhbdGVtcERvdWJsZVB0ciszXSA9IEhFQVA4W3B0ciszXTtcblxufVxuXG5mdW5jdGlvbiBjb3B5VGVtcERvdWJsZShwdHIpIHtcblxuICBIRUFQOFt0ZW1wRG91YmxlUHRyXSA9IEhFQVA4W3B0cl07XG5cbiAgSEVBUDhbdGVtcERvdWJsZVB0cisxXSA9IEhFQVA4W3B0cisxXTtcblxuICBIRUFQOFt0ZW1wRG91YmxlUHRyKzJdID0gSEVBUDhbcHRyKzJdO1xuXG4gIEhFQVA4W3RlbXBEb3VibGVQdHIrM10gPSBIRUFQOFtwdHIrM107XG5cbiAgSEVBUDhbdGVtcERvdWJsZVB0cis0XSA9IEhFQVA4W3B0cis0XTtcblxuICBIRUFQOFt0ZW1wRG91YmxlUHRyKzVdID0gSEVBUDhbcHRyKzVdO1xuXG4gIEhFQVA4W3RlbXBEb3VibGVQdHIrNl0gPSBIRUFQOFtwdHIrNl07XG5cbiAgSEVBUDhbdGVtcERvdWJsZVB0cis3XSA9IEhFQVA4W3B0cis3XTtcblxufVxuXG4vLyB7e1BSRV9MSUJSQVJZfX1cblxuXG4gIFxuICBmdW5jdGlvbiBfX1pTdDE4dW5jYXVnaHRfZXhjZXB0aW9udigpIHsgLy8gc3RkOjp1bmNhdWdodF9leGNlcHRpb24oKVxuICAgICAgcmV0dXJuICEhX19aU3QxOHVuY2F1Z2h0X2V4Y2VwdGlvbnYudW5jYXVnaHRfZXhjZXB0aW9uO1xuICAgIH1cbiAgXG4gIFxuICBcbiAgdmFyIEVYQ0VQVElPTlM9e2xhc3Q6MCxjYXVnaHQ6W10saW5mb3M6e30sZGVBZGp1c3Q6ZnVuY3Rpb24gKGFkanVzdGVkKSB7XG4gICAgICAgIGlmICghYWRqdXN0ZWQgfHwgRVhDRVBUSU9OUy5pbmZvc1thZGp1c3RlZF0pIHJldHVybiBhZGp1c3RlZDtcbiAgICAgICAgZm9yICh2YXIgcHRyIGluIEVYQ0VQVElPTlMuaW5mb3MpIHtcbiAgICAgICAgICB2YXIgaW5mbyA9IEVYQ0VQVElPTlMuaW5mb3NbcHRyXTtcbiAgICAgICAgICBpZiAoaW5mby5hZGp1c3RlZCA9PT0gYWRqdXN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwdHI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhZGp1c3RlZDtcbiAgICAgIH0sYWRkUmVmOmZ1bmN0aW9uIChwdHIpIHtcbiAgICAgICAgaWYgKCFwdHIpIHJldHVybjtcbiAgICAgICAgdmFyIGluZm8gPSBFWENFUFRJT05TLmluZm9zW3B0cl07XG4gICAgICAgIGluZm8ucmVmY291bnQrKztcbiAgICAgIH0sZGVjUmVmOmZ1bmN0aW9uIChwdHIpIHtcbiAgICAgICAgaWYgKCFwdHIpIHJldHVybjtcbiAgICAgICAgdmFyIGluZm8gPSBFWENFUFRJT05TLmluZm9zW3B0cl07XG4gICAgICAgIGFzc2VydChpbmZvLnJlZmNvdW50ID4gMCk7XG4gICAgICAgIGluZm8ucmVmY291bnQtLTtcbiAgICAgICAgLy8gQSByZXRocm93biBleGNlcHRpb24gY2FuIHJlYWNoIHJlZmNvdW50IDA7IGl0IG11c3Qgbm90IGJlIGRpc2NhcmRlZFxuICAgICAgICAvLyBJdHMgbmV4dCBoYW5kbGVyIHdpbGwgY2xlYXIgdGhlIHJldGhyb3duIGZsYWcgYW5kIGFkZFJlZiBpdCwgcHJpb3IgdG9cbiAgICAgICAgLy8gZmluYWwgZGVjUmVmIGFuZCBkZXN0cnVjdGlvbiBoZXJlXG4gICAgICAgIGlmIChpbmZvLnJlZmNvdW50ID09PSAwICYmICFpbmZvLnJldGhyb3duKSB7XG4gICAgICAgICAgaWYgKGluZm8uZGVzdHJ1Y3Rvcikge1xuICAgICAgICAgICAgTW9kdWxlWydkeW5DYWxsX3ZpJ10oaW5mby5kZXN0cnVjdG9yLCBwdHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgRVhDRVBUSU9OUy5pbmZvc1twdHJdO1xuICAgICAgICAgIF9fX2N4YV9mcmVlX2V4Y2VwdGlvbihwdHIpO1xuICAgICAgICB9XG4gICAgICB9LGNsZWFyUmVmOmZ1bmN0aW9uIChwdHIpIHtcbiAgICAgICAgaWYgKCFwdHIpIHJldHVybjtcbiAgICAgICAgdmFyIGluZm8gPSBFWENFUFRJT05TLmluZm9zW3B0cl07XG4gICAgICAgIGluZm8ucmVmY291bnQgPSAwO1xuICAgICAgfX07XG4gIGZ1bmN0aW9uIF9fX3Jlc3VtZUV4Y2VwdGlvbihwdHIpIHtcbiAgICAgIGlmICghRVhDRVBUSU9OUy5sYXN0KSB7IEVYQ0VQVElPTlMubGFzdCA9IHB0cjsgfVxuICAgICAgdGhyb3cgcHRyO1xuICAgIH1mdW5jdGlvbiBfX19jeGFfZmluZF9tYXRjaGluZ19jYXRjaCgpIHtcbiAgICAgIHZhciB0aHJvd24gPSBFWENFUFRJT05TLmxhc3Q7XG4gICAgICBpZiAoIXRocm93bikge1xuICAgICAgICAvLyBqdXN0IHBhc3MgdGhyb3VnaCB0aGUgbnVsbCBwdHJcbiAgICAgICAgcmV0dXJuICgoUnVudGltZS5zZXRUZW1wUmV0MCgwKSwwKXwwKTtcbiAgICAgIH1cbiAgICAgIHZhciBpbmZvID0gRVhDRVBUSU9OUy5pbmZvc1t0aHJvd25dO1xuICAgICAgdmFyIHRocm93bnR5cGUgPSBpbmZvLnR5cGU7XG4gICAgICBpZiAoIXRocm93bnR5cGUpIHtcbiAgICAgICAgLy8ganVzdCBwYXNzIHRocm91Z2ggdGhlIHRocm93biBwdHJcbiAgICAgICAgcmV0dXJuICgoUnVudGltZS5zZXRUZW1wUmV0MCgwKSx0aHJvd24pfDApO1xuICAgICAgfVxuICAgICAgdmFyIHR5cGVBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIFxuICAgICAgdmFyIHBvaW50ZXIgPSBNb2R1bGVbJ19fX2N4YV9pc19wb2ludGVyX3R5cGUnXSh0aHJvd250eXBlKTtcbiAgICAgIC8vIGNhbl9jYXRjaCByZWNlaXZlcyBhICoqLCBhZGQgaW5kaXJlY3Rpb25cbiAgICAgIGlmICghX19fY3hhX2ZpbmRfbWF0Y2hpbmdfY2F0Y2guYnVmZmVyKSBfX19jeGFfZmluZF9tYXRjaGluZ19jYXRjaC5idWZmZXIgPSBfbWFsbG9jKDQpO1xuICAgICAgSEVBUDMyWygoX19fY3hhX2ZpbmRfbWF0Y2hpbmdfY2F0Y2guYnVmZmVyKT4+MildPXRocm93bjtcbiAgICAgIHRocm93biA9IF9fX2N4YV9maW5kX21hdGNoaW5nX2NhdGNoLmJ1ZmZlcjtcbiAgICAgIC8vIFRoZSBkaWZmZXJlbnQgY2F0Y2ggYmxvY2tzIGFyZSBkZW5vdGVkIGJ5IGRpZmZlcmVudCB0eXBlcy5cbiAgICAgIC8vIER1ZSB0byBpbmhlcml0YW5jZSwgdGhvc2UgdHlwZXMgbWF5IG5vdCBwcmVjaXNlbHkgbWF0Y2ggdGhlXG4gICAgICAvLyB0eXBlIG9mIHRoZSB0aHJvd24gb2JqZWN0LiBGaW5kIG9uZSB3aGljaCBtYXRjaGVzLCBhbmRcbiAgICAgIC8vIHJldHVybiB0aGUgdHlwZSBvZiB0aGUgY2F0Y2ggYmxvY2sgd2hpY2ggc2hvdWxkIGJlIGNhbGxlZC5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlQXJyYXlbaV0gJiYgTW9kdWxlWydfX19jeGFfY2FuX2NhdGNoJ10odHlwZUFycmF5W2ldLCB0aHJvd250eXBlLCB0aHJvd24pKSB7XG4gICAgICAgICAgdGhyb3duID0gSEVBUDMyWygodGhyb3duKT4+MildOyAvLyB1bmRvIGluZGlyZWN0aW9uXG4gICAgICAgICAgaW5mby5hZGp1c3RlZCA9IHRocm93bjtcbiAgICAgICAgICByZXR1cm4gKChSdW50aW1lLnNldFRlbXBSZXQwKHR5cGVBcnJheVtpXSksdGhyb3duKXwwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU2hvdWxkbid0IGhhcHBlbiB1bmxlc3Mgd2UgaGF2ZSBib2d1cyBkYXRhIGluIHR5cGVBcnJheVxuICAgICAgLy8gb3IgZW5jb3VudGVyIGEgdHlwZSBmb3Igd2hpY2ggZW1zY3JpcHRlbiBkb2Vzbid0IGhhdmUgc3VpdGFibGVcbiAgICAgIC8vIHR5cGVpbmZvIGRlZmluZWQuIEJlc3QtZWZmb3J0cyBtYXRjaCBqdXN0IGluIGNhc2UuXG4gICAgICB0aHJvd24gPSBIRUFQMzJbKCh0aHJvd24pPj4yKV07IC8vIHVuZG8gaW5kaXJlY3Rpb25cbiAgICAgIHJldHVybiAoKFJ1bnRpbWUuc2V0VGVtcFJldDAodGhyb3dudHlwZSksdGhyb3duKXwwKTtcbiAgICB9ZnVuY3Rpb24gX19fY3hhX3Rocm93KHB0ciwgdHlwZSwgZGVzdHJ1Y3Rvcikge1xuICAgICAgRVhDRVBUSU9OUy5pbmZvc1twdHJdID0ge1xuICAgICAgICBwdHI6IHB0cixcbiAgICAgICAgYWRqdXN0ZWQ6IHB0cixcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgZGVzdHJ1Y3RvcjogZGVzdHJ1Y3RvcixcbiAgICAgICAgcmVmY291bnQ6IDAsXG4gICAgICAgIGNhdWdodDogZmFsc2UsXG4gICAgICAgIHJldGhyb3duOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIEVYQ0VQVElPTlMubGFzdCA9IHB0cjtcbiAgICAgIGlmICghKFwidW5jYXVnaHRfZXhjZXB0aW9uXCIgaW4gX19aU3QxOHVuY2F1Z2h0X2V4Y2VwdGlvbnYpKSB7XG4gICAgICAgIF9fWlN0MTh1bmNhdWdodF9leGNlcHRpb252LnVuY2F1Z2h0X2V4Y2VwdGlvbiA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfX1pTdDE4dW5jYXVnaHRfZXhjZXB0aW9udi51bmNhdWdodF9leGNlcHRpb24rKztcbiAgICAgIH1cbiAgICAgIHRocm93IHB0cjtcbiAgICB9XG5cbiAgIFxuXG4gIGZ1bmN0aW9uIF9fX2xvY2soKSB7fVxuXG4gIGZ1bmN0aW9uIF9fX3VubG9jaygpIHt9XG5cbiAgdmFyIF9sbHZtX3Bvd19mNjQ9TWF0aF9wb3c7XG5cbiAgXG4gIGZ1bmN0aW9uIF9fX3NldEVyck5vKHZhbHVlKSB7XG4gICAgICBpZiAoTW9kdWxlWydfX19lcnJub19sb2NhdGlvbiddKSBIRUFQMzJbKChNb2R1bGVbJ19fX2Vycm5vX2xvY2F0aW9uJ10oKSk+PjIpXT12YWx1ZTtcbiAgICAgIGVsc2UgTW9kdWxlLnByaW50RXJyKCdmYWlsZWQgdG8gc2V0IGVycm5vIGZyb20gSlMnKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IFxuXG4gIFxuICB2YXIgU1lTQ0FMTFM9e3ZhcmFyZ3M6MCxnZXQ6ZnVuY3Rpb24gKHZhcmFyZ3MpIHtcbiAgICAgICAgU1lTQ0FMTFMudmFyYXJncyArPSA0O1xuICAgICAgICB2YXIgcmV0ID0gSEVBUDMyWygoKFNZU0NBTExTLnZhcmFyZ3MpLSg0KSk+PjIpXTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sZ2V0U3RyOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldCA9IFBvaW50ZXJfc3RyaW5naWZ5KFNZU0NBTExTLmdldCgpKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sZ2V0NjQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbG93ID0gU1lTQ0FMTFMuZ2V0KCksIGhpZ2ggPSBTWVNDQUxMUy5nZXQoKTtcbiAgICAgICAgaWYgKGxvdyA+PSAwKSBhc3NlcnQoaGlnaCA9PT0gMCk7XG4gICAgICAgIGVsc2UgYXNzZXJ0KGhpZ2ggPT09IC0xKTtcbiAgICAgICAgcmV0dXJuIGxvdztcbiAgICAgIH0sZ2V0WmVybzpmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFzc2VydChTWVNDQUxMUy5nZXQoKSA9PT0gMCk7XG4gICAgICB9fTtmdW5jdGlvbiBfX19zeXNjYWxsMTQ2KHdoaWNoLCB2YXJhcmdzKSB7U1lTQ0FMTFMudmFyYXJncyA9IHZhcmFyZ3M7XG4gIHRyeSB7XG4gICAvLyB3cml0ZXZcbiAgICAgIC8vIGhhY2sgdG8gc3VwcG9ydCBwcmludGYgaW4gTk9fRklMRVNZU1RFTVxuICAgICAgdmFyIHN0cmVhbSA9IFNZU0NBTExTLmdldCgpLCBpb3YgPSBTWVNDQUxMUy5nZXQoKSwgaW92Y250ID0gU1lTQ0FMTFMuZ2V0KCk7XG4gICAgICB2YXIgcmV0ID0gMDtcbiAgICAgIGlmICghX19fc3lzY2FsbDE0Ni5idWZmZXIpIHtcbiAgICAgICAgX19fc3lzY2FsbDE0Ni5idWZmZXJzID0gW251bGwsIFtdLCBbXV07IC8vIDEgPT4gc3Rkb3V0LCAyID0+IHN0ZGVyclxuICAgICAgICBfX19zeXNjYWxsMTQ2LnByaW50Q2hhciA9IGZ1bmN0aW9uKHN0cmVhbSwgY3Vycikge1xuICAgICAgICAgIHZhciBidWZmZXIgPSBfX19zeXNjYWxsMTQ2LmJ1ZmZlcnNbc3RyZWFtXTtcbiAgICAgICAgICBhc3NlcnQoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoY3VyciA9PT0gMCB8fCBjdXJyID09PSAxMCkge1xuICAgICAgICAgICAgKHN0cmVhbSA9PT0gMSA/IE1vZHVsZVsncHJpbnQnXSA6IE1vZHVsZVsncHJpbnRFcnInXSkoVVRGOEFycmF5VG9TdHJpbmcoYnVmZmVyLCAwKSk7XG4gICAgICAgICAgICBidWZmZXIubGVuZ3RoID0gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnVmZmVyLnB1c2goY3Vycik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpb3ZjbnQ7IGkrKykge1xuICAgICAgICB2YXIgcHRyID0gSEVBUDMyWygoKGlvdikrKGkqOCkpPj4yKV07XG4gICAgICAgIHZhciBsZW4gPSBIRUFQMzJbKCgoaW92KSsoaSo4ICsgNCkpPj4yKV07XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICBfX19zeXNjYWxsMTQ2LnByaW50Q2hhcihzdHJlYW0sIEhFQVBVOFtwdHIral0pO1xuICAgICAgICB9XG4gICAgICAgIHJldCArPSBsZW47XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAodHlwZW9mIEZTID09PSAndW5kZWZpbmVkJyB8fCAhKGUgaW5zdGFuY2VvZiBGUy5FcnJub0Vycm9yKSkgYWJvcnQoZSk7XG4gICAgcmV0dXJuIC1lLmVycm5vO1xuICB9XG4gIH1cblxuICBmdW5jdGlvbiBfX19neHhfcGVyc29uYWxpdHlfdjAoKSB7XG4gICAgfVxuXG4gIFxuICBmdW5jdGlvbiBfZW1zY3JpcHRlbl9tZW1jcHlfYmlnKGRlc3QsIHNyYywgbnVtKSB7XG4gICAgICBIRUFQVTguc2V0KEhFQVBVOC5zdWJhcnJheShzcmMsIHNyYytudW0pLCBkZXN0KTtcbiAgICAgIHJldHVybiBkZXN0O1xuICAgIH0gXG5cbiAgZnVuY3Rpb24gX19fc3lzY2FsbDE0MCh3aGljaCwgdmFyYXJncykge1NZU0NBTExTLnZhcmFyZ3MgPSB2YXJhcmdzO1xuICB0cnkge1xuICAgLy8gbGxzZWVrXG4gICAgICB2YXIgc3RyZWFtID0gU1lTQ0FMTFMuZ2V0U3RyZWFtRnJvbUZEKCksIG9mZnNldF9oaWdoID0gU1lTQ0FMTFMuZ2V0KCksIG9mZnNldF9sb3cgPSBTWVNDQUxMUy5nZXQoKSwgcmVzdWx0ID0gU1lTQ0FMTFMuZ2V0KCksIHdoZW5jZSA9IFNZU0NBTExTLmdldCgpO1xuICAgICAgLy8gTk9URTogb2Zmc2V0X2hpZ2ggaXMgdW51c2VkIC0gRW1zY3JpcHRlbidzIG9mZl90IGlzIDMyLWJpdFxuICAgICAgdmFyIG9mZnNldCA9IG9mZnNldF9sb3c7XG4gICAgICBGUy5sbHNlZWsoc3RyZWFtLCBvZmZzZXQsIHdoZW5jZSk7XG4gICAgICBIRUFQMzJbKChyZXN1bHQpPj4yKV09c3RyZWFtLnBvc2l0aW9uO1xuICAgICAgaWYgKHN0cmVhbS5nZXRkZW50cyAmJiBvZmZzZXQgPT09IDAgJiYgd2hlbmNlID09PSAwKSBzdHJlYW0uZ2V0ZGVudHMgPSBudWxsOyAvLyByZXNldCByZWFkZGlyIHN0YXRlXG4gICAgICByZXR1cm4gMDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHR5cGVvZiBGUyA9PT0gJ3VuZGVmaW5lZCcgfHwgIShlIGluc3RhbmNlb2YgRlMuRXJybm9FcnJvcikpIGFib3J0KGUpO1xuICAgIHJldHVybiAtZS5lcnJubztcbiAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX19fc3lzY2FsbDYod2hpY2gsIHZhcmFyZ3MpIHtTWVNDQUxMUy52YXJhcmdzID0gdmFyYXJncztcbiAgdHJ5IHtcbiAgIC8vIGNsb3NlXG4gICAgICB2YXIgc3RyZWFtID0gU1lTQ0FMTFMuZ2V0U3RyZWFtRnJvbUZEKCk7XG4gICAgICBGUy5jbG9zZShzdHJlYW0pO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIGlmICh0eXBlb2YgRlMgPT09ICd1bmRlZmluZWQnIHx8ICEoZSBpbnN0YW5jZW9mIEZTLkVycm5vRXJyb3IpKSBhYm9ydChlKTtcbiAgICByZXR1cm4gLWUuZXJybm87XG4gIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9fX2N4YV9hbGxvY2F0ZV9leGNlcHRpb24oc2l6ZSkge1xuICAgICAgcmV0dXJuIF9tYWxsb2Moc2l6ZSk7XG4gICAgfVxuXG4gIGZ1bmN0aW9uIF9fX3N5c2NhbGw1NCh3aGljaCwgdmFyYXJncykge1NZU0NBTExTLnZhcmFyZ3MgPSB2YXJhcmdzO1xuICB0cnkge1xuICAgLy8gaW9jdGxcbiAgICAgIHJldHVybiAwO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAodHlwZW9mIEZTID09PSAndW5kZWZpbmVkJyB8fCAhKGUgaW5zdGFuY2VvZiBGUy5FcnJub0Vycm9yKSkgYWJvcnQoZSk7XG4gICAgcmV0dXJuIC1lLmVycm5vO1xuICB9XG4gIH1cbi8qIGZsdXNoIGFueXRoaW5nIHJlbWFpbmluZyBpbiB0aGUgYnVmZmVyIGR1cmluZyBzaHV0ZG93biAqLyBfX0FURVhJVF9fLnB1c2goZnVuY3Rpb24oKSB7IHZhciBmZmx1c2ggPSBNb2R1bGVbXCJfZmZsdXNoXCJdOyBpZiAoZmZsdXNoKSBmZmx1c2goMCk7IHZhciBwcmludENoYXIgPSBfX19zeXNjYWxsMTQ2LnByaW50Q2hhcjsgaWYgKCFwcmludENoYXIpIHJldHVybjsgdmFyIGJ1ZmZlcnMgPSBfX19zeXNjYWxsMTQ2LmJ1ZmZlcnM7IGlmIChidWZmZXJzWzFdLmxlbmd0aCkgcHJpbnRDaGFyKDEsIDEwKTsgaWYgKGJ1ZmZlcnNbMl0ubGVuZ3RoKSBwcmludENoYXIoMiwgMTApOyB9KTs7XG5EWU5BTUlDVE9QX1BUUiA9IGFsbG9jYXRlKDEsIFwiaTMyXCIsIEFMTE9DX1NUQVRJQyk7XG5cblNUQUNLX0JBU0UgPSBTVEFDS1RPUCA9IFJ1bnRpbWUuYWxpZ25NZW1vcnkoU1RBVElDVE9QKTtcblxuU1RBQ0tfTUFYID0gU1RBQ0tfQkFTRSArIFRPVEFMX1NUQUNLO1xuXG5EWU5BTUlDX0JBU0UgPSBSdW50aW1lLmFsaWduTWVtb3J5KFNUQUNLX01BWCk7XG5cbkhFQVAzMltEWU5BTUlDVE9QX1BUUj4+Ml0gPSBEWU5BTUlDX0JBU0U7XG5cbnN0YXRpY1NlYWxlZCA9IHRydWU7IC8vIHNlYWwgdGhlIHN0YXRpYyBwb3J0aW9uIG9mIG1lbW9yeVxuXG5hc3NlcnQoRFlOQU1JQ19CQVNFIDwgVE9UQUxfTUVNT1JZLCBcIlRPVEFMX01FTU9SWSBub3QgYmlnIGVub3VnaCBmb3Igc3RhY2tcIik7XG5cblxuZnVuY3Rpb24gbnVsbEZ1bmNfaWlpaSh4KSB7IE1vZHVsZVtcInByaW50RXJyXCJdKFwiSW52YWxpZCBmdW5jdGlvbiBwb2ludGVyIGNhbGxlZCB3aXRoIHNpZ25hdHVyZSAnaWlpaScuIFBlcmhhcHMgdGhpcyBpcyBhbiBpbnZhbGlkIHZhbHVlIChlLmcuIGNhdXNlZCBieSBjYWxsaW5nIGEgdmlydHVhbCBtZXRob2Qgb24gYSBOVUxMIHBvaW50ZXIpPyBPciBjYWxsaW5nIGEgZnVuY3Rpb24gd2l0aCBhbiBpbmNvcnJlY3QgdHlwZSwgd2hpY2ggd2lsbCBmYWlsPyAoaXQgaXMgd29ydGggYnVpbGRpbmcgeW91ciBzb3VyY2UgZmlsZXMgd2l0aCAtV2Vycm9yICh3YXJuaW5ncyBhcmUgZXJyb3JzKSwgYXMgd2FybmluZ3MgY2FuIGluZGljYXRlIHVuZGVmaW5lZCBiZWhhdmlvciB3aGljaCBjYW4gY2F1c2UgdGhpcylcIik7ICBNb2R1bGVbXCJwcmludEVyclwiXShcIkJ1aWxkIHdpdGggQVNTRVJUSU9OUz0yIGZvciBtb3JlIGluZm8uXCIpO2Fib3J0KHgpIH1cblxuZnVuY3Rpb24gbnVsbEZ1bmNfdmlpaWlpKHgpIHsgTW9kdWxlW1wicHJpbnRFcnJcIl0oXCJJbnZhbGlkIGZ1bmN0aW9uIHBvaW50ZXIgY2FsbGVkIHdpdGggc2lnbmF0dXJlICd2aWlpaWknLiBQZXJoYXBzIHRoaXMgaXMgYW4gaW52YWxpZCB2YWx1ZSAoZS5nLiBjYXVzZWQgYnkgY2FsbGluZyBhIHZpcnR1YWwgbWV0aG9kIG9uIGEgTlVMTCBwb2ludGVyKT8gT3IgY2FsbGluZyBhIGZ1bmN0aW9uIHdpdGggYW4gaW5jb3JyZWN0IHR5cGUsIHdoaWNoIHdpbGwgZmFpbD8gKGl0IGlzIHdvcnRoIGJ1aWxkaW5nIHlvdXIgc291cmNlIGZpbGVzIHdpdGggLVdlcnJvciAod2FybmluZ3MgYXJlIGVycm9ycyksIGFzIHdhcm5pbmdzIGNhbiBpbmRpY2F0ZSB1bmRlZmluZWQgYmVoYXZpb3Igd2hpY2ggY2FuIGNhdXNlIHRoaXMpXCIpOyAgTW9kdWxlW1wicHJpbnRFcnJcIl0oXCJCdWlsZCB3aXRoIEFTU0VSVElPTlM9MiBmb3IgbW9yZSBpbmZvLlwiKTthYm9ydCh4KSB9XG5cbmZ1bmN0aW9uIG51bGxGdW5jX3ZpKHgpIHsgTW9kdWxlW1wicHJpbnRFcnJcIl0oXCJJbnZhbGlkIGZ1bmN0aW9uIHBvaW50ZXIgY2FsbGVkIHdpdGggc2lnbmF0dXJlICd2aScuIFBlcmhhcHMgdGhpcyBpcyBhbiBpbnZhbGlkIHZhbHVlIChlLmcuIGNhdXNlZCBieSBjYWxsaW5nIGEgdmlydHVhbCBtZXRob2Qgb24gYSBOVUxMIHBvaW50ZXIpPyBPciBjYWxsaW5nIGEgZnVuY3Rpb24gd2l0aCBhbiBpbmNvcnJlY3QgdHlwZSwgd2hpY2ggd2lsbCBmYWlsPyAoaXQgaXMgd29ydGggYnVpbGRpbmcgeW91ciBzb3VyY2UgZmlsZXMgd2l0aCAtV2Vycm9yICh3YXJuaW5ncyBhcmUgZXJyb3JzKSwgYXMgd2FybmluZ3MgY2FuIGluZGljYXRlIHVuZGVmaW5lZCBiZWhhdmlvciB3aGljaCBjYW4gY2F1c2UgdGhpcylcIik7ICBNb2R1bGVbXCJwcmludEVyclwiXShcIkJ1aWxkIHdpdGggQVNTRVJUSU9OUz0yIGZvciBtb3JlIGluZm8uXCIpO2Fib3J0KHgpIH1cblxuZnVuY3Rpb24gbnVsbEZ1bmNfaWkoeCkgeyBNb2R1bGVbXCJwcmludEVyclwiXShcIkludmFsaWQgZnVuY3Rpb24gcG9pbnRlciBjYWxsZWQgd2l0aCBzaWduYXR1cmUgJ2lpJy4gUGVyaGFwcyB0aGlzIGlzIGFuIGludmFsaWQgdmFsdWUgKGUuZy4gY2F1c2VkIGJ5IGNhbGxpbmcgYSB2aXJ0dWFsIG1ldGhvZCBvbiBhIE5VTEwgcG9pbnRlcik/IE9yIGNhbGxpbmcgYSBmdW5jdGlvbiB3aXRoIGFuIGluY29ycmVjdCB0eXBlLCB3aGljaCB3aWxsIGZhaWw/IChpdCBpcyB3b3J0aCBidWlsZGluZyB5b3VyIHNvdXJjZSBmaWxlcyB3aXRoIC1XZXJyb3IgKHdhcm5pbmdzIGFyZSBlcnJvcnMpLCBhcyB3YXJuaW5ncyBjYW4gaW5kaWNhdGUgdW5kZWZpbmVkIGJlaGF2aW9yIHdoaWNoIGNhbiBjYXVzZSB0aGlzKVwiKTsgIE1vZHVsZVtcInByaW50RXJyXCJdKFwiQnVpbGQgd2l0aCBBU1NFUlRJT05TPTIgZm9yIG1vcmUgaW5mby5cIik7YWJvcnQoeCkgfVxuXG5mdW5jdGlvbiBudWxsRnVuY192KHgpIHsgTW9kdWxlW1wicHJpbnRFcnJcIl0oXCJJbnZhbGlkIGZ1bmN0aW9uIHBvaW50ZXIgY2FsbGVkIHdpdGggc2lnbmF0dXJlICd2Jy4gUGVyaGFwcyB0aGlzIGlzIGFuIGludmFsaWQgdmFsdWUgKGUuZy4gY2F1c2VkIGJ5IGNhbGxpbmcgYSB2aXJ0dWFsIG1ldGhvZCBvbiBhIE5VTEwgcG9pbnRlcik/IE9yIGNhbGxpbmcgYSBmdW5jdGlvbiB3aXRoIGFuIGluY29ycmVjdCB0eXBlLCB3aGljaCB3aWxsIGZhaWw/IChpdCBpcyB3b3J0aCBidWlsZGluZyB5b3VyIHNvdXJjZSBmaWxlcyB3aXRoIC1XZXJyb3IgKHdhcm5pbmdzIGFyZSBlcnJvcnMpLCBhcyB3YXJuaW5ncyBjYW4gaW5kaWNhdGUgdW5kZWZpbmVkIGJlaGF2aW9yIHdoaWNoIGNhbiBjYXVzZSB0aGlzKVwiKTsgIE1vZHVsZVtcInByaW50RXJyXCJdKFwiQnVpbGQgd2l0aCBBU1NFUlRJT05TPTIgZm9yIG1vcmUgaW5mby5cIik7YWJvcnQoeCkgfVxuXG5mdW5jdGlvbiBudWxsRnVuY192aWlpaWlpKHgpIHsgTW9kdWxlW1wicHJpbnRFcnJcIl0oXCJJbnZhbGlkIGZ1bmN0aW9uIHBvaW50ZXIgY2FsbGVkIHdpdGggc2lnbmF0dXJlICd2aWlpaWlpJy4gUGVyaGFwcyB0aGlzIGlzIGFuIGludmFsaWQgdmFsdWUgKGUuZy4gY2F1c2VkIGJ5IGNhbGxpbmcgYSB2aXJ0dWFsIG1ldGhvZCBvbiBhIE5VTEwgcG9pbnRlcik/IE9yIGNhbGxpbmcgYSBmdW5jdGlvbiB3aXRoIGFuIGluY29ycmVjdCB0eXBlLCB3aGljaCB3aWxsIGZhaWw/IChpdCBpcyB3b3J0aCBidWlsZGluZyB5b3VyIHNvdXJjZSBmaWxlcyB3aXRoIC1XZXJyb3IgKHdhcm5pbmdzIGFyZSBlcnJvcnMpLCBhcyB3YXJuaW5ncyBjYW4gaW5kaWNhdGUgdW5kZWZpbmVkIGJlaGF2aW9yIHdoaWNoIGNhbiBjYXVzZSB0aGlzKVwiKTsgIE1vZHVsZVtcInByaW50RXJyXCJdKFwiQnVpbGQgd2l0aCBBU1NFUlRJT05TPTIgZm9yIG1vcmUgaW5mby5cIik7YWJvcnQoeCkgfVxuXG5mdW5jdGlvbiBudWxsRnVuY192aWlpaSh4KSB7IE1vZHVsZVtcInByaW50RXJyXCJdKFwiSW52YWxpZCBmdW5jdGlvbiBwb2ludGVyIGNhbGxlZCB3aXRoIHNpZ25hdHVyZSAndmlpaWknLiBQZXJoYXBzIHRoaXMgaXMgYW4gaW52YWxpZCB2YWx1ZSAoZS5nLiBjYXVzZWQgYnkgY2FsbGluZyBhIHZpcnR1YWwgbWV0aG9kIG9uIGEgTlVMTCBwb2ludGVyKT8gT3IgY2FsbGluZyBhIGZ1bmN0aW9uIHdpdGggYW4gaW5jb3JyZWN0IHR5cGUsIHdoaWNoIHdpbGwgZmFpbD8gKGl0IGlzIHdvcnRoIGJ1aWxkaW5nIHlvdXIgc291cmNlIGZpbGVzIHdpdGggLVdlcnJvciAod2FybmluZ3MgYXJlIGVycm9ycyksIGFzIHdhcm5pbmdzIGNhbiBpbmRpY2F0ZSB1bmRlZmluZWQgYmVoYXZpb3Igd2hpY2ggY2FuIGNhdXNlIHRoaXMpXCIpOyAgTW9kdWxlW1wicHJpbnRFcnJcIl0oXCJCdWlsZCB3aXRoIEFTU0VSVElPTlM9MiBmb3IgbW9yZSBpbmZvLlwiKTthYm9ydCh4KSB9XG5cbk1vZHVsZVsnd2FzbVRhYmxlU2l6ZSddID0gMTQ1O1xuXG5Nb2R1bGVbJ3dhc21NYXhUYWJsZVNpemUnXSA9IDE0NTtcblxuZnVuY3Rpb24gaW52b2tlX2lpaWkoaW5kZXgsYTEsYTIsYTMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gTW9kdWxlW1wiZHluQ2FsbF9paWlpXCJdKGluZGV4LGExLGEyLGEzKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgaWYgKHR5cGVvZiBlICE9PSAnbnVtYmVyJyAmJiBlICE9PSAnbG9uZ2ptcCcpIHRocm93IGU7XG4gICAgTW9kdWxlW1wic2V0VGhyZXdcIl0oMSwgMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW52b2tlX3ZpaWlpaShpbmRleCxhMSxhMixhMyxhNCxhNSkge1xuICB0cnkge1xuICAgIE1vZHVsZVtcImR5bkNhbGxfdmlpaWlpXCJdKGluZGV4LGExLGEyLGEzLGE0LGE1KTtcbiAgfSBjYXRjaChlKSB7XG4gICAgaWYgKHR5cGVvZiBlICE9PSAnbnVtYmVyJyAmJiBlICE9PSAnbG9uZ2ptcCcpIHRocm93IGU7XG4gICAgTW9kdWxlW1wic2V0VGhyZXdcIl0oMSwgMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW52b2tlX3ZpKGluZGV4LGExKSB7XG4gIHRyeSB7XG4gICAgTW9kdWxlW1wiZHluQ2FsbF92aVwiXShpbmRleCxhMSk7XG4gIH0gY2F0Y2goZSkge1xuICAgIGlmICh0eXBlb2YgZSAhPT0gJ251bWJlcicgJiYgZSAhPT0gJ2xvbmdqbXAnKSB0aHJvdyBlO1xuICAgIE1vZHVsZVtcInNldFRocmV3XCJdKDEsIDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGludm9rZV9paShpbmRleCxhMSkge1xuICB0cnkge1xuICAgIHJldHVybiBNb2R1bGVbXCJkeW5DYWxsX2lpXCJdKGluZGV4LGExKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgaWYgKHR5cGVvZiBlICE9PSAnbnVtYmVyJyAmJiBlICE9PSAnbG9uZ2ptcCcpIHRocm93IGU7XG4gICAgTW9kdWxlW1wic2V0VGhyZXdcIl0oMSwgMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW52b2tlX3YoaW5kZXgpIHtcbiAgdHJ5IHtcbiAgICBNb2R1bGVbXCJkeW5DYWxsX3ZcIl0oaW5kZXgpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBpZiAodHlwZW9mIGUgIT09ICdudW1iZXInICYmIGUgIT09ICdsb25nam1wJykgdGhyb3cgZTtcbiAgICBNb2R1bGVbXCJzZXRUaHJld1wiXSgxLCAwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnZva2VfdmlpaWlpaShpbmRleCxhMSxhMixhMyxhNCxhNSxhNikge1xuICB0cnkge1xuICAgIE1vZHVsZVtcImR5bkNhbGxfdmlpaWlpaVwiXShpbmRleCxhMSxhMixhMyxhNCxhNSxhNik7XG4gIH0gY2F0Y2goZSkge1xuICAgIGlmICh0eXBlb2YgZSAhPT0gJ251bWJlcicgJiYgZSAhPT0gJ2xvbmdqbXAnKSB0aHJvdyBlO1xuICAgIE1vZHVsZVtcInNldFRocmV3XCJdKDEsIDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGludm9rZV92aWlpaShpbmRleCxhMSxhMixhMyxhNCkge1xuICB0cnkge1xuICAgIE1vZHVsZVtcImR5bkNhbGxfdmlpaWlcIl0oaW5kZXgsYTEsYTIsYTMsYTQpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBpZiAodHlwZW9mIGUgIT09ICdudW1iZXInICYmIGUgIT09ICdsb25nam1wJykgdGhyb3cgZTtcbiAgICBNb2R1bGVbXCJzZXRUaHJld1wiXSgxLCAwKTtcbiAgfVxufVxuXG5Nb2R1bGUuYXNtR2xvYmFsQXJnID0geyBcIk1hdGhcIjogTWF0aCwgXCJJbnQ4QXJyYXlcIjogSW50OEFycmF5LCBcIkludDE2QXJyYXlcIjogSW50MTZBcnJheSwgXCJJbnQzMkFycmF5XCI6IEludDMyQXJyYXksIFwiVWludDhBcnJheVwiOiBVaW50OEFycmF5LCBcIlVpbnQxNkFycmF5XCI6IFVpbnQxNkFycmF5LCBcIlVpbnQzMkFycmF5XCI6IFVpbnQzMkFycmF5LCBcIkZsb2F0MzJBcnJheVwiOiBGbG9hdDMyQXJyYXksIFwiRmxvYXQ2NEFycmF5XCI6IEZsb2F0NjRBcnJheSwgXCJOYU5cIjogTmFOLCBcIkluZmluaXR5XCI6IEluZmluaXR5IH07XG5cbk1vZHVsZS5hc21MaWJyYXJ5QXJnID0geyBcImFib3J0XCI6IGFib3J0LCBcImFzc2VydFwiOiBhc3NlcnQsIFwiZW5sYXJnZU1lbW9yeVwiOiBlbmxhcmdlTWVtb3J5LCBcImdldFRvdGFsTWVtb3J5XCI6IGdldFRvdGFsTWVtb3J5LCBcImFib3J0T25DYW5ub3RHcm93TWVtb3J5XCI6IGFib3J0T25DYW5ub3RHcm93TWVtb3J5LCBcImFib3J0U3RhY2tPdmVyZmxvd1wiOiBhYm9ydFN0YWNrT3ZlcmZsb3csIFwibnVsbEZ1bmNfaWlpaVwiOiBudWxsRnVuY19paWlpLCBcIm51bGxGdW5jX3ZpaWlpaVwiOiBudWxsRnVuY192aWlpaWksIFwibnVsbEZ1bmNfdmlcIjogbnVsbEZ1bmNfdmksIFwibnVsbEZ1bmNfaWlcIjogbnVsbEZ1bmNfaWksIFwibnVsbEZ1bmNfdlwiOiBudWxsRnVuY192LCBcIm51bGxGdW5jX3ZpaWlpaWlcIjogbnVsbEZ1bmNfdmlpaWlpaSwgXCJudWxsRnVuY192aWlpaVwiOiBudWxsRnVuY192aWlpaSwgXCJpbnZva2VfaWlpaVwiOiBpbnZva2VfaWlpaSwgXCJpbnZva2VfdmlpaWlpXCI6IGludm9rZV92aWlpaWksIFwiaW52b2tlX3ZpXCI6IGludm9rZV92aSwgXCJpbnZva2VfaWlcIjogaW52b2tlX2lpLCBcImludm9rZV92XCI6IGludm9rZV92LCBcImludm9rZV92aWlpaWlpXCI6IGludm9rZV92aWlpaWlpLCBcImludm9rZV92aWlpaVwiOiBpbnZva2VfdmlpaWksIFwiX2xsdm1fcG93X2Y2NFwiOiBfbGx2bV9wb3dfZjY0LCBcIl9fX2N4YV90aHJvd1wiOiBfX19jeGFfdGhyb3csIFwiX19fbG9ja1wiOiBfX19sb2NrLCBcIl9fX3N5c2NhbGw2XCI6IF9fX3N5c2NhbGw2LCBcIl9fX3NldEVyck5vXCI6IF9fX3NldEVyck5vLCBcIl9fX3VubG9ja1wiOiBfX191bmxvY2ssIFwiX19fZ3h4X3BlcnNvbmFsaXR5X3YwXCI6IF9fX2d4eF9wZXJzb25hbGl0eV92MCwgXCJfX19zeXNjYWxsMTQ2XCI6IF9fX3N5c2NhbGwxNDYsIFwiX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZ1wiOiBfZW1zY3JpcHRlbl9tZW1jcHlfYmlnLCBcIl9fX3N5c2NhbGw1NFwiOiBfX19zeXNjYWxsNTQsIFwiX19fc3lzY2FsbDE0MFwiOiBfX19zeXNjYWxsMTQwLCBcIl9fX3Jlc3VtZUV4Y2VwdGlvblwiOiBfX19yZXN1bWVFeGNlcHRpb24sIFwiX19fY3hhX2ZpbmRfbWF0Y2hpbmdfY2F0Y2hcIjogX19fY3hhX2ZpbmRfbWF0Y2hpbmdfY2F0Y2gsIFwiX19fY3hhX2FsbG9jYXRlX2V4Y2VwdGlvblwiOiBfX19jeGFfYWxsb2NhdGVfZXhjZXB0aW9uLCBcIl9fWlN0MTh1bmNhdWdodF9leGNlcHRpb252XCI6IF9fWlN0MTh1bmNhdWdodF9leGNlcHRpb252LCBcIkRZTkFNSUNUT1BfUFRSXCI6IERZTkFNSUNUT1BfUFRSLCBcInRlbXBEb3VibGVQdHJcIjogdGVtcERvdWJsZVB0ciwgXCJBQk9SVFwiOiBBQk9SVCwgXCJTVEFDS1RPUFwiOiBTVEFDS1RPUCwgXCJTVEFDS19NQVhcIjogU1RBQ0tfTUFYIH07XG4vLyBFTVNDUklQVEVOX1NUQVJUX0FTTVxudmFyIGFzbSA9TW9kdWxlW1wiYXNtXCJdLy8gRU1TQ1JJUFRFTl9FTkRfQVNNXG4oTW9kdWxlLmFzbUdsb2JhbEFyZywgTW9kdWxlLmFzbUxpYnJhcnlBcmcsIGJ1ZmZlcik7XG5cbnZhciByZWFsX19HZXRTcGVlY2hGZWF0dXJlcyA9IGFzbVtcIl9HZXRTcGVlY2hGZWF0dXJlc1wiXTsgYXNtW1wiX0dldFNwZWVjaEZlYXR1cmVzXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gcmVhbF9fR2V0U3BlZWNoRmVhdHVyZXMuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn07XG5cbnZhciByZWFsX19tYWxsb2MgPSBhc21bXCJfbWFsbG9jXCJdOyBhc21bXCJfbWFsbG9jXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gcmVhbF9fbWFsbG9jLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59O1xuXG52YXIgcmVhbF9zdGFja1NhdmUgPSBhc21bXCJzdGFja1NhdmVcIl07IGFzbVtcInN0YWNrU2F2ZVwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIHJlYWxfc3RhY2tTYXZlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59O1xuXG52YXIgcmVhbF9nZXRUZW1wUmV0MCA9IGFzbVtcImdldFRlbXBSZXQwXCJdOyBhc21bXCJnZXRUZW1wUmV0MFwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIHJlYWxfZ2V0VGVtcFJldDAuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn07XG5cbnZhciByZWFsX19mcmVlID0gYXNtW1wiX2ZyZWVcIl07IGFzbVtcIl9mcmVlXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gcmVhbF9fZnJlZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIHJlYWxfc2V0VGVtcFJldDAgPSBhc21bXCJzZXRUZW1wUmV0MFwiXTsgYXNtW1wic2V0VGVtcFJldDBcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiByZWFsX3NldFRlbXBSZXQwLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59O1xuXG52YXIgcmVhbF9lc3RhYmxpc2hTdGFja1NwYWNlID0gYXNtW1wiZXN0YWJsaXNoU3RhY2tTcGFjZVwiXTsgYXNtW1wiZXN0YWJsaXNoU3RhY2tTcGFjZVwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIHJlYWxfZXN0YWJsaXNoU3RhY2tTcGFjZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIHJlYWxfX0dldFN5bnRoZXNpc0Zvcm1MZW5ndGggPSBhc21bXCJfR2V0U3ludGhlc2lzRm9ybUxlbmd0aFwiXTsgYXNtW1wiX0dldFN5bnRoZXNpc0Zvcm1MZW5ndGhcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiByZWFsX19HZXRTeW50aGVzaXNGb3JtTGVuZ3RoLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59O1xuXG52YXIgcmVhbF9fR2V0RjBMZW5ndGggPSBhc21bXCJfR2V0RjBMZW5ndGhcIl07IGFzbVtcIl9HZXRGMExlbmd0aFwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIHJlYWxfX0dldEYwTGVuZ3RoLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59O1xuXG52YXIgcmVhbF9fc2JyayA9IGFzbVtcIl9zYnJrXCJdOyBhc21bXCJfc2Jya1wiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIHJlYWxfX3NicmsuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn07XG5cbnZhciByZWFsX19HZXRTeW50aGVzaXNGb3JtID0gYXNtW1wiX0dldFN5bnRoZXNpc0Zvcm1cIl07IGFzbVtcIl9HZXRTeW50aGVzaXNGb3JtXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gcmVhbF9fR2V0U3ludGhlc2lzRm9ybS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIHJlYWxfX2Vtc2NyaXB0ZW5fZ2V0X2dsb2JhbF9saWJjID0gYXNtW1wiX2Vtc2NyaXB0ZW5fZ2V0X2dsb2JhbF9saWJjXCJdOyBhc21bXCJfZW1zY3JpcHRlbl9nZXRfZ2xvYmFsX2xpYmNcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiByZWFsX19lbXNjcmlwdGVuX2dldF9nbG9iYWxfbGliYy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIHJlYWxfc3RhY2tBbGxvYyA9IGFzbVtcInN0YWNrQWxsb2NcIl07IGFzbVtcInN0YWNrQWxsb2NcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiByZWFsX3N0YWNrQWxsb2MuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn07XG5cbnZhciByZWFsX3NldFRocmV3ID0gYXNtW1wic2V0VGhyZXdcIl07IGFzbVtcInNldFRocmV3XCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gcmVhbF9zZXRUaHJldy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIHJlYWxfX2ZmbHVzaCA9IGFzbVtcIl9mZmx1c2hcIl07IGFzbVtcIl9mZmx1c2hcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiByZWFsX19mZmx1c2guYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn07XG5cbnZhciByZWFsX3N0YWNrUmVzdG9yZSA9IGFzbVtcInN0YWNrUmVzdG9yZVwiXTsgYXNtW1wic3RhY2tSZXN0b3JlXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gcmVhbF9zdGFja1Jlc3RvcmUuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbn07XG5cbnZhciByZWFsX19fX2Vycm5vX2xvY2F0aW9uID0gYXNtW1wiX19fZXJybm9fbG9jYXRpb25cIl07IGFzbVtcIl9fX2Vycm5vX2xvY2F0aW9uXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gcmVhbF9fX19lcnJub19sb2NhdGlvbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIHJlYWxfX0dldEZGVFNpemUgPSBhc21bXCJfR2V0RkZUU2l6ZVwiXTsgYXNtW1wiX0dldEZGVFNpemVcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiByZWFsX19HZXRGRlRTaXplLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG59O1xuTW9kdWxlW1wiYXNtXCJdID0gYXNtO1xudmFyIF9HZXRTcGVlY2hGZWF0dXJlcyA9IE1vZHVsZVtcIl9HZXRTcGVlY2hGZWF0dXJlc1wiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcIl9HZXRTcGVlY2hGZWF0dXJlc1wiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgX21hbGxvYyA9IE1vZHVsZVtcIl9tYWxsb2NcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJfbWFsbG9jXCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBzdGFja1NhdmUgPSBNb2R1bGVbXCJzdGFja1NhdmVcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJzdGFja1NhdmVcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIGdldFRlbXBSZXQwID0gTW9kdWxlW1wiZ2V0VGVtcFJldDBcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJnZXRUZW1wUmV0MFwiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgX2ZyZWUgPSBNb2R1bGVbXCJfZnJlZVwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcIl9mcmVlXCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBydW5Qb3N0U2V0cyA9IE1vZHVsZVtcInJ1blBvc3RTZXRzXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wicnVuUG9zdFNldHNcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIHNldFRlbXBSZXQwID0gTW9kdWxlW1wic2V0VGVtcFJldDBcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJzZXRUZW1wUmV0MFwiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgZXN0YWJsaXNoU3RhY2tTcGFjZSA9IE1vZHVsZVtcImVzdGFibGlzaFN0YWNrU3BhY2VcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJlc3RhYmxpc2hTdGFja1NwYWNlXCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBfR2V0U3ludGhlc2lzRm9ybUxlbmd0aCA9IE1vZHVsZVtcIl9HZXRTeW50aGVzaXNGb3JtTGVuZ3RoXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wiX0dldFN5bnRoZXNpc0Zvcm1MZW5ndGhcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIF9tZW1zZXQgPSBNb2R1bGVbXCJfbWVtc2V0XCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wiX21lbXNldFwiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgX0dldEYwTGVuZ3RoID0gTW9kdWxlW1wiX0dldEYwTGVuZ3RoXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wiX0dldEYwTGVuZ3RoXCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBfc2JyayA9IE1vZHVsZVtcIl9zYnJrXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wiX3NicmtcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIF9HZXRTeW50aGVzaXNGb3JtID0gTW9kdWxlW1wiX0dldFN5bnRoZXNpc0Zvcm1cIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJfR2V0U3ludGhlc2lzRm9ybVwiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgX21lbWNweSA9IE1vZHVsZVtcIl9tZW1jcHlcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJfbWVtY3B5XCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBfZW1zY3JpcHRlbl9nZXRfZ2xvYmFsX2xpYmMgPSBNb2R1bGVbXCJfZW1zY3JpcHRlbl9nZXRfZ2xvYmFsX2xpYmNcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJfZW1zY3JpcHRlbl9nZXRfZ2xvYmFsX2xpYmNcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIHN0YWNrQWxsb2MgPSBNb2R1bGVbXCJzdGFja0FsbG9jXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wic3RhY2tBbGxvY1wiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgc2V0VGhyZXcgPSBNb2R1bGVbXCJzZXRUaHJld1wiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcInNldFRocmV3XCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBfZmZsdXNoID0gTW9kdWxlW1wiX2ZmbHVzaFwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcIl9mZmx1c2hcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIHN0YWNrUmVzdG9yZSA9IE1vZHVsZVtcInN0YWNrUmVzdG9yZVwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcInN0YWNrUmVzdG9yZVwiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgX19fZXJybm9fbG9jYXRpb24gPSBNb2R1bGVbXCJfX19lcnJub19sb2NhdGlvblwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcIl9fX2Vycm5vX2xvY2F0aW9uXCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBfR2V0RkZUU2l6ZSA9IE1vZHVsZVtcIl9HZXRGRlRTaXplXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wiX0dldEZGVFNpemVcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIGR5bkNhbGxfaWlpaSA9IE1vZHVsZVtcImR5bkNhbGxfaWlpaVwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcImR5bkNhbGxfaWlpaVwiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgZHluQ2FsbF92aWlpaWkgPSBNb2R1bGVbXCJkeW5DYWxsX3ZpaWlpaVwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcImR5bkNhbGxfdmlpaWlpXCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBkeW5DYWxsX3ZpID0gTW9kdWxlW1wiZHluQ2FsbF92aVwiXSA9IGZ1bmN0aW9uKCkge1xuICBhc3NlcnQocnVudGltZUluaXRpYWxpemVkLCAneW91IG5lZWQgdG8gd2FpdCBmb3IgdGhlIHJ1bnRpbWUgdG8gYmUgcmVhZHkgKGUuZy4gd2FpdCBmb3IgbWFpbigpIHRvIGJlIGNhbGxlZCknKTtcbiAgYXNzZXJ0KCFydW50aW1lRXhpdGVkLCAndGhlIHJ1bnRpbWUgd2FzIGV4aXRlZCAodXNlIE5PX0VYSVRfUlVOVElNRSB0byBrZWVwIGl0IGFsaXZlIGFmdGVyIG1haW4oKSBleGl0cyknKTtcbiAgcmV0dXJuIE1vZHVsZVtcImFzbVwiXVtcImR5bkNhbGxfdmlcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIGR5bkNhbGxfaWkgPSBNb2R1bGVbXCJkeW5DYWxsX2lpXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wiZHluQ2FsbF9paVwiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG52YXIgZHluQ2FsbF92ID0gTW9kdWxlW1wiZHluQ2FsbF92XCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wiZHluQ2FsbF92XCJdLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgfTtcbnZhciBkeW5DYWxsX3ZpaWlpaWkgPSBNb2R1bGVbXCJkeW5DYWxsX3ZpaWlpaWlcIl0gPSBmdW5jdGlvbigpIHtcbiAgYXNzZXJ0KHJ1bnRpbWVJbml0aWFsaXplZCwgJ3lvdSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBydW50aW1lIHRvIGJlIHJlYWR5IChlLmcuIHdhaXQgZm9yIG1haW4oKSB0byBiZSBjYWxsZWQpJyk7XG4gIGFzc2VydCghcnVudGltZUV4aXRlZCwgJ3RoZSBydW50aW1lIHdhcyBleGl0ZWQgKHVzZSBOT19FWElUX1JVTlRJTUUgdG8ga2VlcCBpdCBhbGl2ZSBhZnRlciBtYWluKCkgZXhpdHMpJyk7XG4gIHJldHVybiBNb2R1bGVbXCJhc21cIl1bXCJkeW5DYWxsX3ZpaWlpaWlcIl0uYXBwbHkobnVsbCwgYXJndW1lbnRzKSB9O1xudmFyIGR5bkNhbGxfdmlpaWkgPSBNb2R1bGVbXCJkeW5DYWxsX3ZpaWlpXCJdID0gZnVuY3Rpb24oKSB7XG4gIGFzc2VydChydW50aW1lSW5pdGlhbGl6ZWQsICd5b3UgbmVlZCB0byB3YWl0IGZvciB0aGUgcnVudGltZSB0byBiZSByZWFkeSAoZS5nLiB3YWl0IGZvciBtYWluKCkgdG8gYmUgY2FsbGVkKScpO1xuICBhc3NlcnQoIXJ1bnRpbWVFeGl0ZWQsICd0aGUgcnVudGltZSB3YXMgZXhpdGVkICh1c2UgTk9fRVhJVF9SVU5USU1FIHRvIGtlZXAgaXQgYWxpdmUgYWZ0ZXIgbWFpbigpIGV4aXRzKScpO1xuICByZXR1cm4gTW9kdWxlW1wiYXNtXCJdW1wiZHluQ2FsbF92aWlpaVwiXS5hcHBseShudWxsLCBhcmd1bWVudHMpIH07XG47XG5SdW50aW1lLnN0YWNrQWxsb2MgPSBNb2R1bGVbJ3N0YWNrQWxsb2MnXTtcblJ1bnRpbWUuc3RhY2tTYXZlID0gTW9kdWxlWydzdGFja1NhdmUnXTtcblJ1bnRpbWUuc3RhY2tSZXN0b3JlID0gTW9kdWxlWydzdGFja1Jlc3RvcmUnXTtcblJ1bnRpbWUuZXN0YWJsaXNoU3RhY2tTcGFjZSA9IE1vZHVsZVsnZXN0YWJsaXNoU3RhY2tTcGFjZSddO1xuUnVudGltZS5zZXRUZW1wUmV0MCA9IE1vZHVsZVsnc2V0VGVtcFJldDAnXTtcblJ1bnRpbWUuZ2V0VGVtcFJldDAgPSBNb2R1bGVbJ2dldFRlbXBSZXQwJ107XG5cblxuLy8gPT09IEF1dG8tZ2VuZXJhdGVkIHBvc3RhbWJsZSBzZXR1cCBlbnRyeSBzdHVmZiA9PT1cblxuTW9kdWxlWydhc20nXSA9IGFzbTtcblxuXG5cbmlmIChtZW1vcnlJbml0aWFsaXplcikge1xuICBpZiAodHlwZW9mIE1vZHVsZVsnbG9jYXRlRmlsZSddID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbWVtb3J5SW5pdGlhbGl6ZXIgPSBNb2R1bGVbJ2xvY2F0ZUZpbGUnXShtZW1vcnlJbml0aWFsaXplcik7XG4gIH0gZWxzZSBpZiAoTW9kdWxlWydtZW1vcnlJbml0aWFsaXplclByZWZpeFVSTCddKSB7XG4gICAgbWVtb3J5SW5pdGlhbGl6ZXIgPSBNb2R1bGVbJ21lbW9yeUluaXRpYWxpemVyUHJlZml4VVJMJ10gKyBtZW1vcnlJbml0aWFsaXplcjtcbiAgfVxuICBpZiAoRU5WSVJPTk1FTlRfSVNfTk9ERSB8fCBFTlZJUk9OTUVOVF9JU19TSEVMTCkge1xuICAgIHZhciBkYXRhID0gTW9kdWxlWydyZWFkQmluYXJ5J10obWVtb3J5SW5pdGlhbGl6ZXIpO1xuICAgIEhFQVBVOC5zZXQoZGF0YSwgUnVudGltZS5HTE9CQUxfQkFTRSk7XG4gIH0gZWxzZSB7XG4gICAgYWRkUnVuRGVwZW5kZW5jeSgnbWVtb3J5IGluaXRpYWxpemVyJyk7XG4gICAgdmFyIGFwcGx5TWVtb3J5SW5pdGlhbGl6ZXIgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBpZiAoZGF0YS5ieXRlTGVuZ3RoKSBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXNzZXJ0KEhFQVBVOFtSdW50aW1lLkdMT0JBTF9CQVNFICsgaV0gPT09IDAsIFwiYXJlYSBmb3IgbWVtb3J5IGluaXRpYWxpemVyIHNob3VsZCBub3QgaGF2ZSBiZWVuIHRvdWNoZWQgYmVmb3JlIGl0J3MgbG9hZGVkXCIpO1xuICAgICAgfVxuICAgICAgSEVBUFU4LnNldChkYXRhLCBSdW50aW1lLkdMT0JBTF9CQVNFKTtcbiAgICAgIC8vIERlbGV0ZSB0aGUgdHlwZWQgYXJyYXkgdGhhdCBjb250YWlucyB0aGUgbGFyZ2UgYmxvYiBvZiB0aGUgbWVtb3J5IGluaXRpYWxpemVyIHJlcXVlc3QgcmVzcG9uc2Ugc28gdGhhdFxuICAgICAgLy8gd2Ugd29uJ3Qga2VlcCB1bm5lY2Vzc2FyeSBtZW1vcnkgbHlpbmcgYXJvdW5kLiBIb3dldmVyLCBrZWVwIHRoZSBYSFIgb2JqZWN0IGl0c2VsZiBhbGl2ZSBzbyB0aGF0IGUuZy5cbiAgICAgIC8vIGl0cyAuc3RhdHVzIGZpZWxkIGNhbiBzdGlsbCBiZSBhY2Nlc3NlZCBsYXRlci5cbiAgICAgIGlmIChNb2R1bGVbJ21lbW9yeUluaXRpYWxpemVyUmVxdWVzdCddKSBkZWxldGUgTW9kdWxlWydtZW1vcnlJbml0aWFsaXplclJlcXVlc3QnXS5yZXNwb25zZTtcbiAgICAgIHJlbW92ZVJ1bkRlcGVuZGVuY3koJ21lbW9yeSBpbml0aWFsaXplcicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb0Jyb3dzZXJMb2FkKCkge1xuICAgICAgTW9kdWxlWydyZWFkQXN5bmMnXShtZW1vcnlJbml0aWFsaXplciwgYXBwbHlNZW1vcnlJbml0aWFsaXplciwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRocm93ICdjb3VsZCBub3QgbG9hZCBtZW1vcnkgaW5pdGlhbGl6ZXIgJyArIG1lbW9yeUluaXRpYWxpemVyO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChNb2R1bGVbJ21lbW9yeUluaXRpYWxpemVyUmVxdWVzdCddKSB7XG4gICAgICAvLyBhIG5ldHdvcmsgcmVxdWVzdCBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQsIGp1c3QgdXNlIHRoYXRcbiAgICAgIGZ1bmN0aW9uIHVzZVJlcXVlc3QoKSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gTW9kdWxlWydtZW1vcnlJbml0aWFsaXplclJlcXVlc3QnXTtcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDApIHtcbiAgICAgICAgICAvLyBJZiB5b3Ugc2VlIHRoaXMgd2FybmluZywgdGhlIGlzc3VlIG1heSBiZSB0aGF0IHlvdSBhcmUgdXNpbmcgbG9jYXRlRmlsZSBvciBtZW1vcnlJbml0aWFsaXplclByZWZpeFVSTCwgYW5kIGRlZmluaW5nIHRoZW0gaW4gSlMuIFRoYXRcbiAgICAgICAgICAvLyBtZWFucyB0aGF0IHRoZSBIVE1MIGZpbGUgZG9lc24ndCBrbm93IGFib3V0IHRoZW0sIGFuZCB3aGVuIGl0IHRyaWVzIHRvIGNyZWF0ZSB0aGUgbWVtIGluaXQgcmVxdWVzdCBlYXJseSwgZG9lcyBpdCB0byB0aGUgd3JvbmcgcGxhY2UuXG4gICAgICAgICAgLy8gTG9vayBpbiB5b3VyIGJyb3dzZXIncyBkZXZ0b29scyBuZXR3b3JrIGNvbnNvbGUgdG8gc2VlIHdoYXQncyBnb2luZyBvbi5cbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2EgcHJvYmxlbSBzZWVtcyB0byBoYXZlIGhhcHBlbmVkIHdpdGggTW9kdWxlLm1lbW9yeUluaXRpYWxpemVyUmVxdWVzdCwgc3RhdHVzOiAnICsgcmVxdWVzdC5zdGF0dXMgKyAnLCByZXRyeWluZyAnICsgbWVtb3J5SW5pdGlhbGl6ZXIpO1xuICAgICAgICAgIGRvQnJvd3NlckxvYWQoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXBwbHlNZW1vcnlJbml0aWFsaXplcihyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIGlmIChNb2R1bGVbJ21lbW9yeUluaXRpYWxpemVyUmVxdWVzdCddLnJlc3BvbnNlKSB7XG4gICAgICAgIHNldFRpbWVvdXQodXNlUmVxdWVzdCwgMCk7IC8vIGl0J3MgYWxyZWFkeSBoZXJlOyBidXQsIGFwcGx5IGl0IGFzeW5jaHJvbm91c2x5XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNb2R1bGVbJ21lbW9yeUluaXRpYWxpemVyUmVxdWVzdCddLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB1c2VSZXF1ZXN0KTsgLy8gd2FpdCBmb3IgaXRcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmV0Y2ggaXQgZnJvbSB0aGUgbmV0d29yayBvdXJzZWx2ZXNcbiAgICAgIGRvQnJvd3NlckxvYWQoKTtcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBNb2R1bGFyaXplIG1vZGUgcmV0dXJucyBhIGZ1bmN0aW9uLCB3aGljaCBjYW4gYmUgY2FsbGVkIHRvXG4vLyBjcmVhdGUgaW5zdGFuY2VzLiBUaGUgaW5zdGFuY2VzIHByb3ZpZGUgYSB0aGVuKCkgbWV0aG9kLFxuLy8gbXVzdCBsaWtlIGEgUHJvbWlzZSwgdGhhdCByZWNlaXZlcyBhIGNhbGxiYWNrLiBUaGUgY2FsbGJhY2tcbi8vIGlzIGNhbGxlZCB3aGVuIHRoZSBtb2R1bGUgaXMgcmVhZHkgdG8gcnVuLCB3aXRoIHRoZSBtb2R1bGVcbi8vIGFzIGEgcGFyYW1ldGVyLiAoTGlrZSBhIFByb21pc2UsIGl0IGFsc28gcmV0dXJucyB0aGUgbW9kdWxlXG4vLyBzbyB5b3UgY2FuIHVzZSB0aGUgb3V0cHV0IG9mIC50aGVuKC4uKSkuXG5Nb2R1bGVbJ3RoZW4nXSA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgLy8gV2UgbWF5IGFscmVhZHkgYmUgcmVhZHkgdG8gcnVuIGNvZGUgYXQgdGhpcyB0aW1lLiBpZlxuICAvLyBzbywganVzdCBxdWV1ZSBhIGNhbGwgdG8gdGhlIGNhbGxiYWNrLlxuICBpZiAoTW9kdWxlWydjYWxsZWRSdW4nXSkge1xuICAgIGZ1bmMoTW9kdWxlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB3ZSBhcmUgbm90IHJlYWR5IHRvIGNhbGwgdGhlbigpIHlldC4gd2UgbXVzdCBjYWxsIGl0XG4gICAgLy8gYXQgdGhlIHNhbWUgdGltZSB3ZSB3b3VsZCBjYWxsIG9uUnVudGltZUluaXRpYWxpemVkLlxuICAgIHZhciBvbGQgPSBNb2R1bGVbJ29uUnVudGltZUluaXRpYWxpemVkJ107XG4gICAgTW9kdWxlWydvblJ1bnRpbWVJbml0aWFsaXplZCddID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAob2xkKSBvbGQoKTtcbiAgICAgIGZ1bmMoTW9kdWxlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBNb2R1bGU7XG59O1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQGV4dGVuZHMge0Vycm9yfVxuICovXG5mdW5jdGlvbiBFeGl0U3RhdHVzKHN0YXR1cykge1xuICB0aGlzLm5hbWUgPSBcIkV4aXRTdGF0dXNcIjtcbiAgdGhpcy5tZXNzYWdlID0gXCJQcm9ncmFtIHRlcm1pbmF0ZWQgd2l0aCBleGl0KFwiICsgc3RhdHVzICsgXCIpXCI7XG4gIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xufTtcbkV4aXRTdGF0dXMucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5FeGl0U3RhdHVzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEV4aXRTdGF0dXM7XG5cbnZhciBpbml0aWFsU3RhY2tUb3A7XG52YXIgcHJlbG9hZFN0YXJ0VGltZSA9IG51bGw7XG52YXIgY2FsbGVkTWFpbiA9IGZhbHNlO1xuXG5kZXBlbmRlbmNpZXNGdWxmaWxsZWQgPSBmdW5jdGlvbiBydW5DYWxsZXIoKSB7XG4gIC8vIElmIHJ1biBoYXMgbmV2ZXIgYmVlbiBjYWxsZWQsIGFuZCB3ZSBzaG91bGQgY2FsbCBydW4gKElOVk9LRV9SVU4gaXMgdHJ1ZSwgYW5kIE1vZHVsZS5ub0luaXRpYWxSdW4gaXMgbm90IGZhbHNlKVxuICBpZiAoIU1vZHVsZVsnY2FsbGVkUnVuJ10pIHJ1bigpO1xuICBpZiAoIU1vZHVsZVsnY2FsbGVkUnVuJ10pIGRlcGVuZGVuY2llc0Z1bGZpbGxlZCA9IHJ1bkNhbGxlcjsgLy8gdHJ5IHRoaXMgYWdhaW4gbGF0ZXIsIGFmdGVyIG5ldyBkZXBzIGFyZSBmdWxmaWxsZWRcbn1cblxuTW9kdWxlWydjYWxsTWFpbiddID0gTW9kdWxlLmNhbGxNYWluID0gZnVuY3Rpb24gY2FsbE1haW4oYXJncykge1xuICBhc3NlcnQocnVuRGVwZW5kZW5jaWVzID09IDAsICdjYW5ub3QgY2FsbCBtYWluIHdoZW4gYXN5bmMgZGVwZW5kZW5jaWVzIHJlbWFpbiEgKGxpc3RlbiBvbiBfX0FUTUFJTl9fKScpO1xuICBhc3NlcnQoX19BVFBSRVJVTl9fLmxlbmd0aCA9PSAwLCAnY2Fubm90IGNhbGwgbWFpbiB3aGVuIHByZVJ1biBmdW5jdGlvbnMgcmVtYWluIHRvIGJlIGNhbGxlZCcpO1xuXG4gIGFyZ3MgPSBhcmdzIHx8IFtdO1xuXG4gIGVuc3VyZUluaXRSdW50aW1lKCk7XG5cbiAgdmFyIGFyZ2MgPSBhcmdzLmxlbmd0aCsxO1xuICBmdW5jdGlvbiBwYWQoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0LTE7IGkrKykge1xuICAgICAgYXJndi5wdXNoKDApO1xuICAgIH1cbiAgfVxuICB2YXIgYXJndiA9IFthbGxvY2F0ZShpbnRBcnJheUZyb21TdHJpbmcoTW9kdWxlWyd0aGlzUHJvZ3JhbSddKSwgJ2k4JywgQUxMT0NfTk9STUFMKSBdO1xuICBwYWQoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdjLTE7IGkgPSBpICsgMSkge1xuICAgIGFyZ3YucHVzaChhbGxvY2F0ZShpbnRBcnJheUZyb21TdHJpbmcoYXJnc1tpXSksICdpOCcsIEFMTE9DX05PUk1BTCkpO1xuICAgIHBhZCgpO1xuICB9XG4gIGFyZ3YucHVzaCgwKTtcbiAgYXJndiA9IGFsbG9jYXRlKGFyZ3YsICdpMzInLCBBTExPQ19OT1JNQUwpO1xuXG5cbiAgdHJ5IHtcblxuICAgIHZhciByZXQgPSBNb2R1bGVbJ19tYWluJ10oYXJnYywgYXJndiwgMCk7XG5cblxuICAgIC8vIGlmIHdlJ3JlIG5vdCBydW5uaW5nIGFuIGV2ZW50ZWQgbWFpbiBsb29wLCBpdCdzIHRpbWUgdG8gZXhpdFxuICAgIGV4aXQocmV0LCAvKiBpbXBsaWNpdCA9ICovIHRydWUpO1xuICB9XG4gIGNhdGNoKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEV4aXRTdGF0dXMpIHtcbiAgICAgIC8vIGV4aXQoKSB0aHJvd3MgdGhpcyBvbmNlIGl0J3MgZG9uZSB0byBtYWtlIHN1cmUgZXhlY3V0aW9uXG4gICAgICAvLyBoYXMgYmVlbiBzdG9wcGVkIGNvbXBsZXRlbHlcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGUgPT0gJ1NpbXVsYXRlSW5maW5pdGVMb29wJykge1xuICAgICAgLy8gcnVubmluZyBhbiBldmVudGVkIG1haW4gbG9vcCwgZG9uJ3QgaW1tZWRpYXRlbHkgZXhpdFxuICAgICAgTW9kdWxlWydub0V4aXRSdW50aW1lJ10gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9Mb2cgPSBlO1xuICAgICAgaWYgKGUgJiYgdHlwZW9mIGUgPT09ICdvYmplY3QnICYmIGUuc3RhY2spIHtcbiAgICAgICAgdG9Mb2cgPSBbZSwgZS5zdGFja107XG4gICAgICB9XG4gICAgICBNb2R1bGUucHJpbnRFcnIoJ2V4Y2VwdGlvbiB0aHJvd246ICcgKyB0b0xvZyk7XG4gICAgICBNb2R1bGVbJ3F1aXQnXSgxLCBlKTtcbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgY2FsbGVkTWFpbiA9IHRydWU7XG4gIH1cbn1cblxuXG5cblxuLyoqIEB0eXBlIHtmdW5jdGlvbihBcnJheT0pfSAqL1xuZnVuY3Rpb24gcnVuKGFyZ3MpIHtcbiAgYXJncyA9IGFyZ3MgfHwgTW9kdWxlWydhcmd1bWVudHMnXTtcblxuICBpZiAocHJlbG9hZFN0YXJ0VGltZSA9PT0gbnVsbCkgcHJlbG9hZFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cbiAgaWYgKHJ1bkRlcGVuZGVuY2llcyA+IDApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3cml0ZVN0YWNrQ29va2llKCk7XG5cbiAgcHJlUnVuKCk7XG5cbiAgaWYgKHJ1bkRlcGVuZGVuY2llcyA+IDApIHJldHVybjsgLy8gYSBwcmVSdW4gYWRkZWQgYSBkZXBlbmRlbmN5LCBydW4gd2lsbCBiZSBjYWxsZWQgbGF0ZXJcbiAgaWYgKE1vZHVsZVsnY2FsbGVkUnVuJ10pIHJldHVybjsgLy8gcnVuIG1heSBoYXZlIGp1c3QgYmVlbiBjYWxsZWQgdGhyb3VnaCBkZXBlbmRlbmNpZXMgYmVpbmcgZnVsZmlsbGVkIGp1c3QgaW4gdGhpcyB2ZXJ5IGZyYW1lXG5cbiAgZnVuY3Rpb24gZG9SdW4oKSB7XG4gICAgaWYgKE1vZHVsZVsnY2FsbGVkUnVuJ10pIHJldHVybjsgLy8gcnVuIG1heSBoYXZlIGp1c3QgYmVlbiBjYWxsZWQgd2hpbGUgdGhlIGFzeW5jIHNldFN0YXR1cyB0aW1lIGJlbG93IHdhcyBoYXBwZW5pbmdcbiAgICBNb2R1bGVbJ2NhbGxlZFJ1biddID0gdHJ1ZTtcblxuICAgIGlmIChBQk9SVCkgcmV0dXJuO1xuXG4gICAgZW5zdXJlSW5pdFJ1bnRpbWUoKTtcblxuICAgIHByZU1haW4oKTtcblxuICAgIGlmIChFTlZJUk9OTUVOVF9JU19XRUIgJiYgcHJlbG9hZFN0YXJ0VGltZSAhPT0gbnVsbCkge1xuICAgICAgTW9kdWxlLnByaW50RXJyKCdwcmUtbWFpbiBwcmVwIHRpbWU6ICcgKyAoRGF0ZS5ub3coKSAtIHByZWxvYWRTdGFydFRpbWUpICsgJyBtcycpO1xuICAgIH1cblxuICAgIGlmIChNb2R1bGVbJ29uUnVudGltZUluaXRpYWxpemVkJ10pIE1vZHVsZVsnb25SdW50aW1lSW5pdGlhbGl6ZWQnXSgpO1xuXG4gICAgaWYgKE1vZHVsZVsnX21haW4nXSAmJiBzaG91bGRSdW5Ob3cpIE1vZHVsZVsnY2FsbE1haW4nXShhcmdzKTtcblxuICAgIHBvc3RSdW4oKTtcbiAgfVxuXG4gIGlmIChNb2R1bGVbJ3NldFN0YXR1cyddKSB7XG4gICAgTW9kdWxlWydzZXRTdGF0dXMnXSgnUnVubmluZy4uLicpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBNb2R1bGVbJ3NldFN0YXR1cyddKCcnKTtcbiAgICAgIH0sIDEpO1xuICAgICAgZG9SdW4oKTtcbiAgICB9LCAxKTtcbiAgfSBlbHNlIHtcbiAgICBkb1J1bigpO1xuICB9XG4gIGNoZWNrU3RhY2tDb29raWUoKTtcbn1cbk1vZHVsZVsncnVuJ10gPSBNb2R1bGUucnVuID0gcnVuO1xuXG5mdW5jdGlvbiBleGl0KHN0YXR1cywgaW1wbGljaXQpIHtcbiAgaWYgKGltcGxpY2l0ICYmIE1vZHVsZVsnbm9FeGl0UnVudGltZSddKSB7XG4gICAgTW9kdWxlLnByaW50RXJyKCdleGl0KCcgKyBzdGF0dXMgKyAnKSBpbXBsaWNpdGx5IGNhbGxlZCBieSBlbmQgb2YgbWFpbigpLCBidXQgbm9FeGl0UnVudGltZSwgc28gbm90IGV4aXRpbmcgdGhlIHJ1bnRpbWUgKHlvdSBjYW4gdXNlIGVtc2NyaXB0ZW5fZm9yY2VfZXhpdCwgaWYgeW91IHdhbnQgdG8gZm9yY2UgYSB0cnVlIHNodXRkb3duKScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChNb2R1bGVbJ25vRXhpdFJ1bnRpbWUnXSkge1xuICAgIE1vZHVsZS5wcmludEVycignZXhpdCgnICsgc3RhdHVzICsgJykgY2FsbGVkLCBidXQgbm9FeGl0UnVudGltZSwgc28gaGFsdGluZyBleGVjdXRpb24gYnV0IG5vdCBleGl0aW5nIHRoZSBydW50aW1lIG9yIHByZXZlbnRpbmcgZnVydGhlciBhc3luYyBleGVjdXRpb24gKHlvdSBjYW4gdXNlIGVtc2NyaXB0ZW5fZm9yY2VfZXhpdCwgaWYgeW91IHdhbnQgdG8gZm9yY2UgYSB0cnVlIHNodXRkb3duKScpO1xuICB9IGVsc2Uge1xuXG4gICAgQUJPUlQgPSB0cnVlO1xuICAgIEVYSVRTVEFUVVMgPSBzdGF0dXM7XG4gICAgU1RBQ0tUT1AgPSBpbml0aWFsU3RhY2tUb3A7XG5cbiAgICBleGl0UnVudGltZSgpO1xuXG4gICAgaWYgKE1vZHVsZVsnb25FeGl0J10pIE1vZHVsZVsnb25FeGl0J10oc3RhdHVzKTtcbiAgfVxuXG4gIGlmIChFTlZJUk9OTUVOVF9JU19OT0RFKSB7XG4gICAgcHJvY2Vzc1snZXhpdCddKHN0YXR1cyk7XG4gIH1cbiAgTW9kdWxlWydxdWl0J10oc3RhdHVzLCBuZXcgRXhpdFN0YXR1cyhzdGF0dXMpKTtcbn1cbk1vZHVsZVsnZXhpdCddID0gTW9kdWxlLmV4aXQgPSBleGl0O1xuXG52YXIgYWJvcnREZWNvcmF0b3JzID0gW107XG5cbmZ1bmN0aW9uIGFib3J0KHdoYXQpIHtcbiAgaWYgKE1vZHVsZVsnb25BYm9ydCddKSB7XG4gICAgTW9kdWxlWydvbkFib3J0J10od2hhdCk7XG4gIH1cblxuICBpZiAod2hhdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgTW9kdWxlLnByaW50KHdoYXQpO1xuICAgIE1vZHVsZS5wcmludEVycih3aGF0KTtcbiAgICB3aGF0ID0gSlNPTi5zdHJpbmdpZnkod2hhdClcbiAgfSBlbHNlIHtcbiAgICB3aGF0ID0gJyc7XG4gIH1cblxuICBBQk9SVCA9IHRydWU7XG4gIEVYSVRTVEFUVVMgPSAxO1xuXG4gIHZhciBleHRyYSA9ICcnO1xuXG4gIHZhciBvdXRwdXQgPSAnYWJvcnQoJyArIHdoYXQgKyAnKSBhdCAnICsgc3RhY2tUcmFjZSgpICsgZXh0cmE7XG4gIGlmIChhYm9ydERlY29yYXRvcnMpIHtcbiAgICBhYm9ydERlY29yYXRvcnMuZm9yRWFjaChmdW5jdGlvbihkZWNvcmF0b3IpIHtcbiAgICAgIG91dHB1dCA9IGRlY29yYXRvcihvdXRwdXQsIHdoYXQpO1xuICAgIH0pO1xuICB9XG4gIHRocm93IG91dHB1dDtcbn1cbk1vZHVsZVsnYWJvcnQnXSA9IE1vZHVsZS5hYm9ydCA9IGFib3J0O1xuXG4vLyB7e1BSRV9SVU5fQURESVRJT05TfX1cblxuaWYgKE1vZHVsZVsncHJlSW5pdCddKSB7XG4gIGlmICh0eXBlb2YgTW9kdWxlWydwcmVJbml0J10gPT0gJ2Z1bmN0aW9uJykgTW9kdWxlWydwcmVJbml0J10gPSBbTW9kdWxlWydwcmVJbml0J11dO1xuICB3aGlsZSAoTW9kdWxlWydwcmVJbml0J10ubGVuZ3RoID4gMCkge1xuICAgIE1vZHVsZVsncHJlSW5pdCddLnBvcCgpKCk7XG4gIH1cbn1cblxuLy8gc2hvdWxkUnVuTm93IHJlZmVycyB0byBjYWxsaW5nIG1haW4oKSwgbm90IHJ1bigpLlxudmFyIHNob3VsZFJ1bk5vdyA9IHRydWU7XG5pZiAoTW9kdWxlWydub0luaXRpYWxSdW4nXSkge1xuICBzaG91bGRSdW5Ob3cgPSBmYWxzZTtcbn1cblxuXG5ydW4oKTtcblxuLy8ge3tQT1NUX1JVTl9BRERJVElPTlN9fVxuXG5cblxuXG5cbi8vIHt7TU9EVUxFX0FERElUSU9OU319XG5cblxuXG5cbiAgcmV0dXJuIE1vZHVsZTtcbn07XG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGVbJ2V4cG9ydHMnXSA9IE1vZHVsZTtcbn07XG5leHBvcnQgZGVmYXVsdCBNb2R1bGU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vd2FzbS93b3JsZC5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcclxuXHRpZighb3JpZ2luYWxNb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJleHBvcnRzXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cbi8vICdyb290JyBpcyBqdXN0IGEgc2xhc2gsIG9yIG5vdGhpbmcuXG52YXIgc3BsaXRQYXRoUmUgPVxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xudmFyIHNwbGl0UGF0aCA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcbn07XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcblxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcbn07XG5cbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSkuam9pbignLycpKTtcbn07XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcblxuICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcbiAgfVxuXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcblxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcbiAgfVxuXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XG5cbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcbn07XG5cbmV4cG9ydHMuc2VwID0gJy8nO1xuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XG5cbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIHJlc3VsdCA9IHNwbGl0UGF0aChwYXRoKSxcbiAgICAgIHJvb3QgPSByZXN1bHRbMF0sXG4gICAgICBkaXIgPSByZXN1bHRbMV07XG5cbiAgaWYgKCFyb290ICYmICFkaXIpIHtcbiAgICAvLyBObyBkaXJuYW1lIHdoYXRzb2V2ZXJcbiAgICByZXR1cm4gJy4nO1xuICB9XG5cbiAgaWYgKGRpcikge1xuICAgIC8vIEl0IGhhcyBhIGRpcm5hbWUsIHN0cmlwIHRyYWlsaW5nIHNsYXNoXG4gICAgZGlyID0gZGlyLnN1YnN0cigwLCBkaXIubGVuZ3RoIC0gMSk7XG4gIH1cblxuICByZXR1cm4gcm9vdCArIGRpcjtcbn07XG5cblxuZXhwb3J0cy5iYXNlbmFtZSA9IGZ1bmN0aW9uKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IHNwbGl0UGF0aChwYXRoKVsyXTtcbiAgLy8gVE9ETzogbWFrZSB0aGlzIGNvbXBhcmlzb24gY2FzZS1pbnNlbnNpdGl2ZSBvbiB3aW5kb3dzP1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIgKHhzLCBmKSB7XG4gICAgaWYgKHhzLmZpbHRlcikgcmV0dXJuIHhzLmZpbHRlcihmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZih4c1tpXSwgaSwgeHMpKSByZXMucHVzaCh4c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFN0cmluZy5wcm90b3R5cGUuc3Vic3RyIC0gbmVnYXRpdmUgaW5kZXggZG9uJ3Qgd29yayBpbiBJRThcbnZhciBzdWJzdHIgPSAnYWInLnN1YnN0cigtMSkgPT09ICdiJ1xuICAgID8gZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikgeyByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKSB9XG4gICAgOiBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7XG4gICAgICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gc3RyLmxlbmd0aCArIHN0YXJ0O1xuICAgICAgICByZXR1cm4gc3RyLnN1YnN0cihzdGFydCwgbGVuKTtcbiAgICB9XG47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=