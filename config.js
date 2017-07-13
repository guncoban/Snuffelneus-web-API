var mysql = function localConnect()
{
    return require('mysql').createConnection
    ({
        hostname: 'localhost',
        user: 'hapiServer',
        password: 'SnBlaak2017Sn',
        database: 'snuffelneus'
    });
}
module.exports.localConnect = mysql;