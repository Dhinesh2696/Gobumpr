'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = exports.getField = exports.form = exports.batched = exports.modeled = exports.Fieldset = exports.Errors = exports.Form = exports.Control = exports.actionTypes = exports.actions = exports.initialFieldState = exports.combineForms = exports.modelReducer = exports.formReducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable react/prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _modelReducer = require('./reducers/model-reducer');

var _modelReducer2 = _interopRequireDefault(_modelReducer);

var _formReducer = require('./reducers/form-reducer');

var _formReducer2 = _interopRequireDefault(_formReducer);

var _modeledEnhancer = require('./enhancers/modeled-enhancer');

var _modeledEnhancer2 = _interopRequireDefault(_modeledEnhancer);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _formsReducer = require('./reducers/forms-reducer');

var _formsReducer2 = _interopRequireDefault(_formsReducer);

var _initialFieldState = require('./constants/initial-field-state');

var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

var _actionTypes = require('./action-types');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _formComponent = require('./components/form-component');

var _formComponent2 = _interopRequireDefault(_formComponent);

var _fieldsetComponent = require('./components/fieldset-component');

var _fieldsetComponent2 = _interopRequireDefault(_fieldsetComponent);

var _errorsComponent = require('./components/errors-component');

var _errorsComponent2 = _interopRequireDefault(_errorsComponent);

var _batchedEnhancer = require('./enhancers/batched-enhancer');

var _batchedEnhancer2 = _interopRequireDefault(_batchedEnhancer);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _track = require('./utils/track');

var _track2 = _interopRequireDefault(_track);

var _omit = require('./utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _get2 = require('./utils/get');

var _get3 = _interopRequireDefault(_get2);

var _getFieldFromState = require('./utils/get-field-from-state');

var _getFieldFromState2 = _interopRequireDefault(_getFieldFromState);

var _controlComponentFactory = require('./components/control-component-factory');

var _controlComponentFactory2 = _interopRequireDefault(_controlComponentFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTextValue(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    return '' + value;
  }

  return '';
}

var noop = function noop() {
  return undefined;
};

var Control = (0, _controlComponentFactory2.default)({
  get: _get3.default,
  getFieldFromState: _getFieldFromState2.default,
  actions: _actions2.default
});

Control.MapView = function (props) {
  return _react2.default.createElement(Control, _extends({
    component: _reactNative.MapView,
    updateOn: 'blur',
    mapProps: _extends({
      onResponderGrant: function onResponderGrant(_ref) {
        var onFocus = _ref.onFocus;
        return onFocus;
      },
      onRegionChange: function onRegionChange(_ref2) {
        var onChange = _ref2.onChange;
        return onChange;
      },
      onRegionChangeComplete: function onRegionChangeComplete(_ref3) {
        var onBlur = _ref3.onBlur;
        return onBlur;
      },
      region: function region(_ref4) {
        var modelValue = _ref4.modelValue;
        return modelValue;
      }
    }, props.mapProps)
  }, (0, _omit2.default)(props, 'mapProps')));
};

Control.Picker = function (props) {
  return _react2.default.createElement(Control, _extends({
    component: _reactNative.Picker,
    mapProps: _extends({
      onResponderGrant: function onResponderGrant(_ref5) {
        var onFocus = _ref5.onFocus;
        return onFocus;
      },
      onResponderRelease: function onResponderRelease(_ref6) {
        var onBlur = _ref6.onBlur;
        return onBlur;
      },
      selectedValue: function selectedValue(_ref7) {
        var modelValue = _ref7.modelValue;
        return modelValue;
      },
      onValueChange: function onValueChange(_ref8) {
        var onChange = _ref8.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit2.default)(props, 'mapProps')));
};

Control.Switch = function (props) {
  return _react2.default.createElement(Control, _extends({
    component: _reactNative.Switch,
    mapProps: _extends({
      onResponderGrant: function onResponderGrant(_ref9) {
        var onFocus = _ref9.onFocus;
        return onFocus;
      },
      onResponderRelease: function onResponderRelease(_ref10) {
        var onBlur = _ref10.onBlur;
        return onBlur;
      },
      value: function value(_ref11) {
        var modelValue = _ref11.modelValue;
        return !!modelValue;
      },
      onValueChange: function onValueChange(_ref12) {
        var onChange = _ref12.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit2.default)(props, 'mapProps')));
};

Control.TextInput = function (props) {
  return _react2.default.createElement(Control, _extends({
    component: _reactNative.TextInput,
    mapProps: _extends({
      onResponderGrant: function onResponderGrant(_ref13) {
        var onFocus = _ref13.onFocus;
        return onFocus;
      },
      value: function value(_props) {
        return !_props.defaultValue && !_props.hasOwnProperty('value') ? getTextValue(_props.viewValue) : _props.value;
      },
      onChangeText: function onChangeText(_ref14) {
        var onChange = _ref14.onChange;
        return onChange;
      },
      onChange: noop,
      onBlur: function onBlur(_ref15) {
        var _onBlur = _ref15.onBlur,
            viewValue = _ref15.viewValue;
        return function () {
          return _onBlur(viewValue);
        };
      },
      onFocus: function onFocus(_ref16) {
        var _onFocus = _ref16.onFocus;
        return _onFocus;
      }
    }, props.mapProps)
  }, (0, _omit2.default)(props, 'mapProps')));
};

Control.DatePickerIOS = function (props) {
  return _react2.default.createElement(Control, _extends({
    component: _reactNative.DatePickerIOS,
    mapProps: _extends({
      onResponderGrant: function onResponderGrant(_ref17) {
        var onFocus = _ref17.onFocus;
        return onFocus;
      },
      onResponderRelease: function onResponderRelease(_ref18) {
        var onBlur = _ref18.onBlur;
        return onBlur;
      },
      date: function date(_ref19) {
        var modelValue = _ref19.modelValue;
        return modelValue;
      },
      onDateChange: function onDateChange(_ref20) {
        var onChange = _ref20.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit2.default)(props, 'mapProps')));
};

Control.SegmentedControlIOS = function (props) {
  return _react2.default.createElement(Control, _extends({
    component: _reactNative.SegmentedControlIOS,
    mapProps: _extends({
      onResponderGrant: function onResponderGrant(_ref21) {
        var onFocus = _ref21.onFocus;
        return onFocus;
      },
      selectedIndex: function selectedIndex(_ref22) {
        var values = _ref22.values,
            modelValue = _ref22.modelValue;
        return values.indexOf(modelValue);
      },
      onValueChange: function onValueChange(_ref23) {
        var onChange = _ref23.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit2.default)(props, 'mapProps')));
};

Control.Slider = function (props) {
  return _react2.default.createElement(Control, _extends({
    component: _reactNative.Slider,
    mapProps: _extends({
      value: function value(_ref24) {
        var modelValue = _ref24.modelValue;
        return modelValue;
      },
      onResponderGrant: function onResponderGrant(_ref25) {
        var onFocus = _ref25.onFocus;
        return onFocus;
      },
      onSlidingComplete: function onSlidingComplete(_ref26) {
        var onBlur = _ref26.onBlur;
        return onBlur;
      },
      onValueChange: function onValueChange(_ref27) {
        var onChange = _ref27.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit2.default)(props, 'mapProps')));
};

var NativeForm = function NativeForm(props) {
  return _react2.default.createElement(_formComponent2.default, _extends({ component: _reactNative.View }, (0, _omit2.default)(props, 'mapProps')));
};
var NativeFieldset = function NativeFieldset(props) {
  return _react2.default.createElement(_fieldsetComponent2.default, _extends({ component: _reactNative.View }, (0, _omit2.default)(props, 'mapProps')));
};
var NativeErrors = function NativeErrors(props) {
  return _react2.default.createElement(_errorsComponent2.default, _extends({
    wrapper: _reactNative.View,
    component: _reactNative.Text
  }, props));
};

exports.formReducer = _formReducer2.default;
exports.modelReducer = _modelReducer2.default;
exports.combineForms = _formsReducer2.default;
exports.initialFieldState = _initialFieldState2.default;
exports.actions = _actions2.default;
exports.actionTypes = _actionTypes2.default;
exports.Control = Control;
exports.Form = NativeForm;
exports.Errors = NativeErrors;
exports.Fieldset = NativeFieldset;
exports.modeled = _modeledEnhancer2.default;
exports.batched = _batchedEnhancer2.default;
exports.form = _form2.default;
exports.getField = _getFieldFromState2.default;
exports.track = _track2.default;