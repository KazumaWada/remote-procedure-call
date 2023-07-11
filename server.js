//Node.js server listening on UNIX socket: /tmp/unix_socket.sock
//Client connected.
//Received from client: 
//{"param_types": ["int", "int"], "params": [42, 23], "method": "subtract", "id": 1}
const net = require('net');
const fs = require('fs');
// AF UNIXソケットのパス
const socketPath = '/tmp/unix_socket.sock';

// ソケットサーバーの作成
const server = net.createServer(socket => {
  console.log('Client connected.');

  // データの受信
  socket.on('data', data => {
    console.log('Received from client:', data.toString());

    // リクエストの解析
    const request = JSON.parse(data.toString());

    // リクエストの処理
    const method = request.method;
    const params = request.params;
    const result = performCalculation(method, params); // 任意の計算を実行する関数

    // レスポンスの作成
    const response = {
      results: result.toString(),
      result_type: typeof result,
      id: request.id
    };
    const response_json = JSON.stringify(response);

    // データの送信
    socket.write(response_json);
  });

  // 接続終了時の処理
  socket.on('end', () => {
    console.log('Client disconnected.');
  });
});

// ソケットファイルの削除（すでに存在する場合）
if (fs.existsSync(socketPath)) {
  fs.unlinkSync(socketPath);
}

// ソケットサーバーの起動
server.listen(socketPath, () => {
  console.log('Node.js server listening on UNIX socket:', socketPath);
});

// 任意の計算を実行する関数
function performCalculation(method, params) {
  //ここは重要では無いので、とりあえず何らかの数値を返すのみ
  if (method === 'subtract') {
    return params[0] - params[1];
  }
  if (method === 'floor') {
    return 1;
  }
  if (method === 'reverse') {
    return 1;
  }
  if (method === 'sort') {
    return 1;
  }
}
