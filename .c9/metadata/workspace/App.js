{"filter":false,"title":"App.js","tooltip":"/App.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":0,"column":0},"end":{"row":8,"column":0}},"nl":"\n","lines":["Ext.define('CustomApp', {","    extend: 'Rally.app.App',","    componentCls: 'app',","    items:{ html:'<a href=\"https://help.rallydev.com/apps/2.0rc3/doc/\">App SDK 2.0rc3 Docs</a>'},","    launch: function() {","        //Write app code here","    }","});"]},{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":25}},"text":"Ext.define('CustomApp', {"},{"action":"insertText","range":{"start":{"row":0,"column":25},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":122,"column":0}},"lines":["    extend: 'Rally.app.App',","    componentCls: 'app',","    ","\titems: [","\t\t{","\t\t\txtype: 'container',","\t\t\titemId: 'pulldown-container',","\t\t\tlayout: {","\t\t\t\ttype: 'hbox',","\t\t\t\talign: 'stretch'","\t\t\t}","\t\t}","\t],","\t","\tmyStore: undefined,","\tmyGrid: undefined,","\t","    launch: function() {","    \tvar me = this;","\t\tconsole.log ('Our Second App!');","\t\t","\t\tme._loadIterations();","    },","\t","\t_loadIterations: function() {","\t\tvar me = this;","\t\tvar iterComboBox = Ext.create ('Rally.ui.combobox.IterationComboBox', {","\t\t\titemId: 'iteration-combobox',","\t\t\tfieldLabel: 'Iteration',","\t\t\tlabelAlign: 'right',","\t\t\twidth: 300,","\t\t\tlisteners: {","\t\t\t\tready: me._loadSeverities,","\t\t\t\tselect: me._loadData,","\t\t\t\tscope: me","\t\t\t}","\t\t});","\t\tme.down('#pulldown-container').add(iterComboBox);","\t},","\t","\t_loadSeverities: function() {","\t\tvar me = this;","\t\tvar severityComboBox = Ext.create ('Rally.ui.combobox.FieldValueComboBox', {","\t\t\titemId: 'severity-combobox',","\t\t\tmodel: 'Defect',","\t\t\tfield: 'Severity',","\t\t\tfieldLabel: 'Severity',","\t\t\tlabelAlign: 'right',","\t\t\tlisteners: {","\t\t\t\tready: me._loadData,","\t\t\t\tselect: me._loadData,","\t\t\t\tscope: me","\t\t\t}","\t\t});","\t\tme.down('#pulldown-container').add(severityComboBox);","\t},","\t","\t//construct filters for defects with given iteration (ref) /severity values","\t_getFilters: function(iterationValue, severityValue){","\t\t\tvar iterationFilter = Ext.create('Rally.data.wsapi.Filter', {","\t\t\tproperty: 'Iteration',","\t\t\toperation: '=',","\t\t\tvalue: iterationValue","\t\t});","\t\tvar severityFilter = Ext.create('Rally.data.wsapi.Filter', {","\t\t\tproperty: 'Severity',","\t\t\toperation: '=',","\t\t\tvalue: severityValue","\t\t});","\t\treturn iterationFilter.and(severityFilter);","\t},","","    //Get Data from Rally","\t_loadData: function() {","\t\tvar me = this;","\t\tvar selectedIterRef = me.down('#iteration-combobox').getRecord().get('_ref');","\t\tvar selectedSeverityValue = me.down('#severity-combobox').getRecord().get('value');","","\t\tvar myFilters = me._getFilters(selectedIterRef, selectedSeverityValue);","","\t\tconsole.log('my filter', myFilters.toString());","\t\t","\t\t//if store exists, just load the new data","\t\tif (me.defectStore) {","\t\t\tconsole.log('store exists');","\t\t\tme.defectStore.setFilter(myFilters);","\t\t\tme.defectStore.load();","\t\t}","\t\t//create store","\t\telse {","\t\t\tconsole.log('creating store');","\t\t\tme.defectStore = Ext.create ('Rally.data.wsapi.Store', {","\t\t\t\tmodel: 'Defect',","\t\t\t\tautoLoad: true,","\t\t\t\tfilters: myFilters,\t\t\t","\t\t\t\tlisteners: {","\t\t\t\t\tload: function (myStore, myData, success) {","\t\t\t\t\t\tconsole.log ('got data', myStore, myData, success);","\t\t\t\t\t\tif (!me.myGrid)","\t\t\t\t\t\t\tme._createGrid(myStore);","\t\t\t\t\t},","\t\t\t\t\tscope: me","\t\t\t\t},","\t\t\t\tfetch: ['FormattedID', 'Name', 'Severity', 'Iteration']","\t\t\t});","\t\t}","\t},","    ","    // Create & show a Grid of given stories","    _createGrid: function(myDefectStore) {","        var me = this;","\t\tme.myGrid = Ext.create('Rally.ui.grid.Grid', {","        \tstore: myDefectStore,","        \tcolumnCfgs: [","        \t   'FormattedID', 'Name', 'Severity', 'Iteration'          ","        \t]                    \t","        });","        console.log ('my grid', me.myGrid);","        me.add(me.myGrid);","    }   ","});"]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":122,"column":0},"end":{"row":122,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1406718386013,"hash":"10aa43b331a29b6b1390cb3e5b34920dc2bd725a"}