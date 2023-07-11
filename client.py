# -*- coding: utf-8 -*-
import json
import socket

# AF UNIXソケットのパス
socket_path = '/tmp/unix_socket.sock'

# ソケットの作成
client_socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

try:
    # サーバーに接続
    client_socket.connect(socket_path)

    # メソッドの選択
    #なぜ"Enter method (subt~は変数に格納されず、ユーザーのinputのみ変数に格納される
    method_input = raw_input("Enter method (subtract, floor, reverse, sort): ")
    #文字列ではなく、関数として実行してもらうため前後の空白を削除する
    method = method_input.strip()  

    # メソッドの存在チェック
    valid_methods = ["subtract", "floor", "reverse", "sort"]
    if method not in valid_methods:
        print("Invalid method.")
        exit()

    # パラメータの入力
    param1 = int(input("Enter param1: "))
    param2 = int(input("Enter param2: "))

    # リクエストの作成
    request = {
        "method": method,
        "params": [param1, param2],
        "param_types": ["int", "int"],
        "id": 1
    }
    request_json = json.dumps(request)

    # データの送信
    client_socket.sendall(request_json.encode())

    # データの受信
    response_json = client_socket.recv(1024).decode()
    response = json.loads(response_json)

    # レスポンスの処理
    print('Received from server:')
    print('Results:', response['results'])
    print('Result Type:', response['result_type'])

finally:
    # ソケットのクローズ
    client_socket.close()
