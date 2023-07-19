module.exports = {
    detail: {
        protocol: 'geek-rpc',
        ip: '127.0.0.1',
        port: 4000,
        protobufFile: `${__dirname}/../proto/detail.proto`,
        requestStrust: 'ColumnRequest',
        responseStrust: 'ColumnResponse',
    },
    articles: {
        protocol: 'http',
        url: 'http://127.0.0.1:4003',
        before: function () {

        },
        then: function (res) {
            return json.parse(res)
        },
        catch: function () {

        }
    }
}