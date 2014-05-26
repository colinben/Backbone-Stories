/** @jsx React.DOM */
(function(provide, require) {

  var React = require('React'),
      $ = require('jQuery'),
      utils = require('stories.utils');

  var IndexComponent = React.createClass({
    getInitialState: function() {
      return {component: ''};
    },
    showRenew: function() {
      this.setState({component: Renew({})});
    },

    initUi: function() {
      var self = this;
      utils.spinnerButtons($('input[type="submit"], input[type="button"]'));

      function _eachOnce($seletors, cb) {
        // prevent multi update
        if (!$seletors.data('flated')) {
          $seletors.data('flated', 1)
          $seletors.each(function (e) {
            cb($(this), e);
          });
        }
      }
      var $selects = $('select.select-block'),
          selectOptions = {style:'btn-primary', menuStyle: 'dropdown-inverse'};

      _eachOnce($selects, function($select) {
        $select.selectpicker(selectOptions);
      });

      var $checkboxs = $('.checkbox input[type="checkbox"]');

      _eachOnce($checkboxs, function($checkbox) {
        $checkbox.checkbox();
        $checkbox.on('click', function() {
          $checkbox.parents('.checkbox').toggleClass('checked');
        });
      });

      var $radios = $('.radio input[type="radio"]');

      _eachOnce($radios, function($radio) {
        $radio.radio();
        $radio.on('click', function() {
          $radios.parents('.radio').removeClass('checked');
          $radio.parents('.radio').addClass('checked');
        });
      });

      var $numbers = $('input.number-only'),
          maximum = 2; // fixed

      _eachOnce($numbers, function($number) {
        $number.on('input', function(e) {
          var value = $number.val(),
              passed = true;
          
          if (validator.isNumber(value)) {
            if (value.toString().replace('.', '').length > maximum) {
              passed = false;
            }
          } else {
            passed = false;
          }

          if (!passed) {
            $number.val(value.toString().slice(0, -1));
            if ($number.val() == '') return true; // allow empty
            return false;
          }
        });
      });

    },
    componentDidUpdate: function() {
      this.initUi();
    },
    componentDidMount: function() {
      this.initUi();
      $(document).off('click.checkbox.data-api', '[data-toggle^=checkbox], .checkbox');
      $(document).off('click.radio.data-api', '[data-toggle^=radio], .radio');
    },
    showBacktesting: function(collection) {
      var model = collection.findWhere({name: 'global'}),
          data = model.attributes;

      var component = <BackTesting model={data} parentModel={model} standAlone="true" marketplace="bitstamp" crypto="BTC"  onUpdate={function(){}} handleOnChange = {function(){}} />
      this.setState({component: component});
      component.setState({show: true})
    },
    render: function() {
      return (
          <div id="index">
            <div className="header">
              <NavBar />
            </div>
            <div className="index">{this.state.component}</div>
            <div className="footer">
              <Footer />
            </div>
          </div>
       );
    }
  });

  provide('IndexComponent', IndexComponent);
})(_provide, _require);
