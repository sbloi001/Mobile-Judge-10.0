Ext.define('MobileJudge.store.stats.Students', {
    extend: 'Ext.data.Store',
    alias: 'store.studentstats',

    autoLoad: true,
    pageSize: 0,
    fields: [
        { name: 'id',               type: 'int',     convert: null },
        { name: 'fullName',         type: 'string',  convert: null },
        { name: 'project',          type: 'string',  convert: null },
        { name: 'total',            type: 'int',     convert: null },
        { name: 'graded',           type: 'int',     convert: null },
        { name: 'accepted',         type: 'int',     convert: null }
    ],
    proxy: {
        type: 'api',
        url: '/api/stats/students'
    }
});
