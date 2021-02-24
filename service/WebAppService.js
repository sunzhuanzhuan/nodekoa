let fs = require('fs');
exports.get_search_data = function (key, start, end) {
    return function (cb) {

        let http = require('http');
        let qs = require('querystring');
        let data = {
            key: key,
            start: start,
            end: end
        };

        /*请求MobAPI里的火车票查询接口*/
        let content = qs.stringify(data);
        let http_request = {
            hostname: 'apicloud.mob.com',
            port: 80,
            path: '/train/tickets/queryByStationToStation?' + content,
            method: 'GET'
        };

        let req = http.request(http_request, function (response) {
            let body = '';
            response.setEncoding('utf-8');
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                cb(null, body);
            });
        });

        req.end();
    }
}