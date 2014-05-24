/**
 * app
 */
(function (provide, require) {

    var _ = require('_'),
        Backbone = require('Backbone'),
        Router = require('stories.Router'),
        socket = require('stories.socket'),
        settings = require('stories.settings'),
        NotificationOptionModel = require('stories.model.NotificationOption'),
        OptionsModel = require('stories.model.Options'),
        utils = require('stories.utils'),
        service = require('stories.service'),
        ls = require('stories.localStorage');

    // init data models
    // make sure the save models if required so that other modules just get them via stories.localStorage#get
    function initDataModels(self) {
        this.promise = this.promise || new RSVP.Promise(function (resolve, reject) {
            resolve();
        });

        return this.promise;
    }

    function App() {
        this.initialize.apply(this, arguments);
    }

    _.extend(App.prototype, Backbone.Events);

    _.extend(App.prototype, {
        initialize: function () {
            $.debug('App init');
            var router = this.router = new Router({
                namespace: settings.get('controller.namespace')
            });

            initDataModels(this).then(function () {
                this.preloadSounds();
                router.start();
            }.bind(this));

            provide('stories.router', router);

            this.trigger('initialize');
        },
        preloadSounds: function() {
            var notify = require('notify');
            service.getSavedModels().then(function(models) {
                var model = models.optionsModel,
                    sound = model.get('notify').sound;
                this.preloadSound(model.get('notify').sound, function() {});

                notify.on('notify_start', function() {
                    this.playSound(sound, true);
                }.bind(this));

                notify.on('notify_end', function() {
                    this.playSound(sound, false);
                }.bind(this));

            }.bind(this));
        },
        preloadSound: function(sound, cb) {
            var id = btoa(sound).replace(/[^a-z0-9]/g,''),
                element = document.createElement('audio');
            element.id = 'audio_' + id;
            element.style.display = 'none';
            element.src = sound;
            element.oncanplaythrough = function() {
                cb();
            }
            document.body.appendChild(element);
        },
        playSound: function(sound, play) {
            function _play() {
                if (play) {
                    element.play();
                } else {
                    element.pause();
                }
            }
            var id = btoa(sound).replace(/[^a-z0-9]/g,''),
                element = document.getElementById('audio_' + id);
            if (element.length == 0) {
                this.preloadSound(sound, function() {
                    _play();
                });
            } else {
                _play();
            }
        }
    });

    provide('stories.App', App);

})(_provide, _require);
