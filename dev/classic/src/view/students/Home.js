Ext.define('MobileJudge.view.students.Home', {
	extend: 'Ext.container.Container',
	xtype: 'studenthome',

	requires: [
		'Ext.ux.layout.ResponsiveColumn'
	],

    controller: 'student',
    viewModel: {
        data: {
        }
    },
	layout: 'responsivecolumn',
	cls: 'userProfile-container',

	items: [
		{
			// Always 100% of container
			xtype: 'profile',
			userCls: 'big-100 small-100 shadow'
		}
	]

});
