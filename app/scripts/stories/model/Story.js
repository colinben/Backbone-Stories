/**
 * Story Model
 */
(function(provide, require) {

  var Backbone = require('Backbone'),
      utils = require('stories.utils'),
      ls = require('stories.localStorage');

  var Story = Backbone.DeepModel.extend({
    //global
    defaults: {
        _id: "",
        audit: {
            likes: 0,
            views: 0,
            status: "published",
            date_created: "",
            author: {
                name: "",
                thumbnail: ""
            }
        },
        content: {
            type: "story",
            title: "",
            subtitle: "",
            body_text: "",
            images: [
            ]
        },
        tags: [
        ],
        reference: {
            user_id: ""
        }
    },

    parse: function(attrs, options) {
      return utils.convertToCamelCase(attrs);
    },
    sync: function(method, model) {
      console.log(model);
    }
  });

  provide('stories.model.Story', Story);

})(_provide, _require);
