Ext.define('MobileJudge.store.stats.Grades', {
    extend: 'Ext.data.Store',
    alias: 'store.gradestats',

    fields: ['grade', 'total'],

    autoLoad: true,
    pageSize: 0
});
