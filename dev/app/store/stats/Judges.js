Ext.define('MobileJudge.store.stats.Judges', {
    extend: 'Ext.data.Store',
    alias: 'store.judgestats',

    autoLoad: true,
    pageSize: 0,
    fields: [
        { name: 'id',      type: 'string', convert: null },
        { name: 'state',   type: 'int',    convert: null },
        { name: 'comment', type: 'string', convert: null },
        {
            name: 'value',
            type: 'int',
            convert: function(v) {
                return (v && Ext.isArray(v)) ? v[0] : v;
            }
        }
    ],
    proxy: {
        type: 'api',
        url: '/api/stats/judges'
    }
});
