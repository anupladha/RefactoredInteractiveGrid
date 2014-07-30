Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
	items: [
		{
			xtype: 'container',
			itemId: 'pulldown-container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			}
		}
	],
	
	myStore: undefined,
	myGrid: undefined,
	
    launch: function() {
    	var me = this;
		console.log ('Our Second App!');
		
		me._loadIterations();
    },
	
	_loadIterations: function() {
		var me = this;
		var iterComboBox = Ext.create ('Rally.ui.combobox.IterationComboBox', {
			itemId: 'iteration-combobox',
			fieldLabel: 'Iteration',
			labelAlign: 'right',
			width: 300,
			listeners: {
				ready: me._loadSeverities,
				select: me._loadData,
				scope: me
			}
		});
		me.down('#pulldown-container').add(iterComboBox);
	},
	
	_loadSeverities: function() {
		var me = this;
		var severityComboBox = Ext.create ('Rally.ui.combobox.FieldValueComboBox', {
			itemId: 'severity-combobox',
			model: 'Defect',
			field: 'Severity',
			fieldLabel: 'Severity',
			labelAlign: 'right',
			listeners: {
				ready: me._loadData,
				select: me._loadData,
				scope: me
			}
		});
		me.down('#pulldown-container').add(severityComboBox);
	},
	
	//construct filters for defects with given iteration (ref) /severity values
	_getFilters: function(iterationValue, severityValue){
			var iterationFilter = Ext.create('Rally.data.wsapi.Filter', {
			property: 'Iteration',
			operation: '=',
			value: iterationValue
		});
		var severityFilter = Ext.create('Rally.data.wsapi.Filter', {
			property: 'Severity',
			operation: '=',
			value: severityValue
		});
		return iterationFilter.and(severityFilter);
	},

    //Get Data from Rally
	_loadData: function() {
		var me = this;
		var selectedIterRef = me.down('#iteration-combobox').getRecord().get('_ref');
		var selectedSeverityValue = me.down('#severity-combobox').getRecord().get('value');

		var myFilters = me._getFilters(selectedIterRef, selectedSeverityValue);

		console.log('my filter', myFilters.toString());
		
		//if store exists, just load the new data
		if (me.defectStore) {
			console.log('store exists');
			me.defectStore.setFilter(myFilters);
			me.defectStore.load();
		}
		//create store
		else {
			console.log('creating store');
			me.defectStore = Ext.create ('Rally.data.wsapi.Store', {
				model: 'Defect',
				autoLoad: true,
				filters: myFilters,			
				listeners: {
					load: function (myStore, myData, success) {
						console.log ('got data', myStore, myData, success);
						if (!me.myGrid)
							me._createGrid(myStore);
					},
					scope: me
				},
				fetch: ['FormattedID', 'Name', 'Severity', 'Iteration']
			});
		}
	},
    
    // Create & show a Grid of given stories
    _createGrid: function(myDefectStore) {
        var me = this;
		me.myGrid = Ext.create('Rally.ui.grid.Grid', {
        	store: myDefectStore,
        	columnCfgs: [
        	   'FormattedID', 'Name', 'Severity', 'Iteration'          
        	]                    	
        });
        console.log ('my grid', me.myGrid);
        me.add(me.myGrid);
    }   
});
