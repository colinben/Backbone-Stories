// port from https://github.com/hoatle/webapp-template/blob/master/webapp/js/lib/vsf/vsf.js
(function(window) {

  /**
   * Exports a module (literal object or class) with a name space.
   *
   * A shortcut to create a namespace and maps that namespace to a defined object (usually, a literal object or a class).
   *
   * For example:
   *
   * var Test = function() {};
   *
   * //exports Test to vsf.test namespace
   * var vsf = window.vsf || {};
   * vsf.test = vsf.test || {};
   * vsf.test.Test = Test;
   *
   * The above code will be very compact and useful by using vsf.provide:
   *
   * var Test = function() {};
   * _provide('vsf.test.Test', Test);
   *
   * @param namespace the namespace with x.y.z format
   * @param module the associated object with the specified namespace
   */
  window._provide = function(namespace, module) {
    if (!namespace || !module) {
      return;
    }

    var names = namespace.split('.');
    var tempNamespace = window;

    for (var i = 0, len = names.length; i < len; i++) {
      if (i === (len - 1)) {
        //the last one
        tempNamespace[names[i]] = module;
      } else {
        tempNamespace = tempNamespace[names[i]] = tempNamespace[names[i]] || {};
      }
    }
  };

  /**
   * Requires a provided module
   *
   * For example:
   *
   * _require('vsf.test.Test')
   *
   * @param module
   */

  var moduleCache = {};

  window._require = function(module) {
    if (!moduleCache[module]) {

      var names = module.split('.'),
          tempNamespace = window;

      //TODO(hoatle): nicer error message instead of:
      // Uncaught TypeError: Cannot read property 'IndexView' of undefined
      // should do this:
      // Uncaught TypeError: Cannot read property 'IndexView' of a.b.c.d
      for (var i = 0, len = names.length; i < len; i++) {
        tempNamespace = tempNamespace[names[i]];
      }
      moduleCache[module] = tempNamespace;
    }

    return moduleCache[module];
  }


})(window);
