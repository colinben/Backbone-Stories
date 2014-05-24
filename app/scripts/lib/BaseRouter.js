/*
 * Copyright (C) hoatle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//port from https://github.com/hoatle/webapp-template/blob/master/webapp/js/router.js

/**
 * The application base router
 */
(function (provide, require) {

  var $ = require('jQuery'),
      _ = require('_'),
      Backbone = require('Backbone');

  var indexController,
      notFoundController;

  /**
   * Holds controller instance for caching purpose.
   *
   * @type {Object}
   */
  var cachedControllers = {

  };

  /**
   * Holds previous and current controller instance for detecting back/forward button
   */
  var navigationStack = [];

  function addToNavigationStack(controllerInstance) {
    if (navigationStack.length < (this.options.maxNavigationStackLength || 10)) {
      navigationStack.push(controllerInstance);
    } else {
      navigationStack.shift(controllerInstance);
      navigationStack.push(controllerInstance);
    }

    if (navigationStack.length > 1) {
      //set isBackNavigated
      var  controllerName = controllerInstance.name,
          controllerFlowInfo = this.findControllerFlowInfo(controllerName);

      $.debug('router::addNavigationStack | controllerFlowInfo', controllerFlowInfo);

      var previousNavigationStackName = navigationStack[navigationStack.length - 2].name;

      if (controllerFlowInfo.previous.name === previousNavigationStackName) {
        $.debug('router::addNavigationStack | controllerFlowInfo.previous.name matched', controllerFlowInfo.previous);
        controllerInstance.isBackNavigated = false;
      } else {
        controllerInstance.isBackNavigated = true;
      }
    }
  }

  var BaseRouter =  Backbone.Router.extend({
    /**
     * Controller mapping from controller name on url to controller name on 'controller' folder.
     *
     * For example: 'user' : 'User' => router will try to find module under: controller/UserController.
     */
    controllers: {

    },

    controllerFlow: {
      name: 'IndexController'
    },

    findControllerFlowInfo: function(controllerName) {

      var previousElement = {}, foundElement = {};

      function searchTree(element, matchingName) {
        if (element.name === matchingName) {
          foundElement = element;
        } else if (element.children) {
          var result;
          for (var i = 0, len = element.children.length; i < len; i++) {
            previousElement = element;
            result = searchTree(element.children[i], matchingName);
            if (result.found.name) {
              break;
            }
          }
          return result;
        }

        return {
          'previous': previousElement,
          'found': foundElement
        };
      }

      return searchTree(this.controllerFlow, controllerName);
    },

    /**
     * Dynamically configures controller mapping.
     *
     * This will override any previously defined controller.
     *
     * @param urlController the url controller name
     * @param controllerName the accordingly controller name
     */
    setController: function(urlController, controllerName) {
      if (this.controllers[urlController]) {
        $.warn('Router#setController: override ' + this.controllers[urlController]);
      }
      this.controllers[urlController] = controllerName;
    },

    /**
     * Dispatches to another controller by specifying urlController, optional action and optional params.
     *
     * @param urlController the url controller
     * @param options optional options which is the same as for router#route(fragment, opts) with 2 optional more params:
     *                action, params for constructing url fragment.
     */
    dispatch: function(urlController, options) {
      if (!urlController) {
        $.warn('Router#dispatch: not valid urlController', urlController);
        return;
      }
      options = options || {};
      var fragment = _getRouteFragment.call(this, urlController, options.action, options.params);
      this.navigate(fragment, options);
    },

    routes: {
      '(:controller)(/*params)': 'dispatchController'
    },

    initialize: function (options) {
      this.options = options || {};

      var IndexController = require(this.options.namespace + '.IndexController'),
          NotFoundController = require(this.options.namespace + '.NotFoundController');

      notFoundController = new NotFoundController({
        name: 'NotFoundController',
        router: this
      });

      addToNavigationStack.call(this, notFoundController);

      // default call for all uncreated controllers
      indexController = new IndexController({
        name: 'IndexController',
        router: this
      });

      addToNavigationStack.call(this, indexController);
    },

    dispatchController: function(controller, action, params) {
      var controllerName = this.controllers[controller];

      if (!controllerName) {
        controllerName = controller || 'Index';
      }
      controllerName += 'Controller';

      //if controllerName is not configured, try to find it with url controller
      //this is useful to introduce convention over configuration

      var cachedControllerInstance = cachedControllers[controllerName];

      if (cachedControllerInstance) {

        processController.call(this, cachedControllerInstance);

      } else {

        var Controller = require(this.options.namespace + '.' + controllerName);

        if (Controller) {
          var controllerInstance = new Controller({
            name: controllerName,
            router: this
          });

          cachedControllers[controllerName] = controllerInstance;
          processController.call(this, controllerInstance);
        } else if (indexController.processActions(controller) === false) {
          //not found controller
          this.onNotFoundController(controller, action, params);
        }
      }

      function processController(controllerInstance) {
        var self = this;
        function process() {
          controllerInstance.trigger('actionStart');

          if (action) {
            if (controllerInstance.processActions(action) === false) {
              self.onNotFoundController(controller, action, params);
            }
          } else {
            //default action
            controllerInstance.index();
          }

          controllerInstance.trigger('actionFinish');
        }

        addToNavigationStack.call(this, controllerInstance);

        // method will be called before action start
        if (controllerInstance.lazyStart) {
          controllerInstance.lazyStart(process);
          return;
        }
        process();
      }
    },

    onNotFoundController: function(params) {
      notFoundController.trigger('actionStart');
      notFoundController.index(params);
      notFoundController.trigger('actionFinish');
    },

    onIndexController: function(params) {
      indexController.trigger('actionStart');
      indexController.index(params);
      indexController.trigger('actionFinish');
    },

    /**
     * Gets the navigation route stack.
     * This could be used for work flow determination
     *
     * @return {Array}
     */
    getNavigationRouteStack: function() {
      return navigationStack;
    },

    //start the application
    start: function () {
      Backbone.history.start();
    }
  });

  function _getRouteFragment(controller, action, params) {
    var routeFragment = controller;
    if (action) {
      routeFragment += '/' + action;
    }
    if (params) {
      routeFragment += '/' + params;
    }
    return routeFragment;
  }

  provide('BaseRouter', BaseRouter);

})(_provide, _require);
