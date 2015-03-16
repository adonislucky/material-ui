module.exports = {
  AppBar: require('./js/app-bar'),
  AppCanvas: require('./js/app-canvas'),
  Checkbox: require('./js/checkbox'),
  DatePicker: require('./js/date-picker/date-picker'),
  Dialog: require('./js/dialog'),
  DialogWindow: require('./js/dialog-window'),
  DropDownIcon: require('./js/drop-down-icon'),
  DropDownMenu: require('./js/drop-down-menu'),
  EnhancedButton: require('./js/enhanced-button'),
  FlatButton: require('./js/flat-button'),
  FloatingActionButton: require('./js/floating-action-button'),
  FontIcon: require('./js/font-icon'),
  IconButton: require('./js/icon-button'),
  LeftNav: require('./js/left-nav'),
  Menu: require('./js/menu/menu'),
  MenuItem: require('./js/menu/menu-item'),
  Mixins: {
    Classable: require('./js/mixins/classable'),
    ClickAwayable: require('./js/mixins/click-awayable'),
    WindowListenable: require('./js/mixins/window-listenable')
  },
  Paper: require('./js/paper'),
  RadioButton: require('./js/radio-button'),
  RadioButtonGroup: require('./js/radio-button-group'),
  RaisedButton: require('./js/raised-button'),
  Slider: require('./js/slider'),
  SvgIcon: require('./js/svg-icons/svg-icon'),
  Icons: {
    NavigationMenu: require('./js/svg-icons/navigation-menu'),
    NavigationChevronLeft: require('./js/svg-icons/navigation-chevron-left'),
    NavigationChevronRight: require('./js/svg-icons/navigation-chevron-right')
  },
  Styles: {
    Theme: require('./js/styles/theme').get(),
  },
  Snackbar: require('./js/snackbar'),
  Tab: require('./js/tabs/tab'),
  Tabs: require('./js/tabs/tabs'),
  Toggle: require('./js/toggle'),
  TextField: require('./js/text-field'),
  Toolbar: require('./js/toolbar'),
  ToolbarGroup: require('./js/toolbar-group'),
  Tooltip: require('./js/tooltip'),
  Utils: {
    CssEvent: require('./js/utils/css-event'),
    Dom: require('./js/utils/dom'),
    Events: require('./js/utils/events'),
    KeyCode: require('./js/utils/key-code'),
    KeyLine: require('./js/utils/key-line')
  }
};
