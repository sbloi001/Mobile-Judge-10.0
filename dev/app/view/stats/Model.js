Ext.define('MobileJudge.view.stats.Model', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.stats',

	stores: {
		judges: {
			type: 'gradestats',
			storeId: 'statsJudgeStore',
			proxy: {
				type: 'api',
				url: '/api/stats/judges'
			}
		},
		students: {
			type: 'gradestats',
			storeId: 'statsStudentStore',
			proxy: {
				type: 'api',
				url: '/api/stats/students'
			}
		},
		graded: {
			type: 'gradestats',
			storeId: 'statsGradedStore',
			proxy: {
				type: 'api',
				url: '/api/stats/graded'
			}
		},
		accepted: {
			type: 'gradestats',
			storeId: 'statsAcceptedStore',
			proxy: {
				type: 'api',
				url: '/api/stats/accepted'
			}
		}
	}
});
