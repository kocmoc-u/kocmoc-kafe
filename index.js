'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
  const now = new Date();
  console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  switch (req.method) {
    case 'GET':
      const fs = require('fs');
      const rs = fs.createReadStream('./pl_americano_order.html'); // ←複数ページに亘って情報を取りたい
      rs.pipe(res);
      break;
    case 'POST':
// ここまで出来たが、ログとして出力することがこけている再挑戦
      let rawData = '';
      req.on('data', (chunk) => {
        rawData = rawData + chunk;
      }).on('end', () => {
// 以下の値のユーザーネームを文字情報として取得したいので書き換えする
      // console.info('[' + now + '] Data posted: ' + rawData);
      const decoded = decodeURIComponent(rawData);
      console.info('[' + now + '] 注文:' + decoded);
        res.end();
      });
      break;
    default:
      break;
  }

}).on('error', (e) => {
  console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
  console.error('[' + new Date() + '] Client Error', e);
});
const port = 8000;
server.listen(port, () => {
  console.info('[' + new Date() + '] Listening on ' + port);
});
