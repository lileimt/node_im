# node_im

curl -X POST -H "Content-Type:application/json" -d '{"username":"li","password":"123456"}' http://localhost:3000/v1/im/login

curl -X POST -H "Content-Type:application/json" -H "Authorization:Basic da3694ec2df4db81d86c6ebec218ca54" -d '{"sendname":"li","recvname":"zhang","content":"你好啊"}' http://localhost:3000/v1/im/chatmsg

curl -X GET -H "Authorization:Basic da3694ec2df4db81d86c6ebec218ca54" http://localhost:3000/v1/im/chatmsgs

curl -X DELETE -H "Authorization:Basic da3694ec2df4db81d86c6ebec218ca54" http://localhost:3000/v1/im/chatmsg/23

curl -X POST -H "Content-Type:application/json" -H "Authorization:Basic da3694ec2df4db81d86c6ebec218ca54" -d '{"sendname":"li","groupid":1,"content":"你好啊"}' http://localhost:3000/v1/im/groupmsg

curl -X GET -H "Authorization:Basic da3694ec2df4db81d86c6ebec218ca54" http://localhost:3000/v1/im/1/groupmsgs

curl -X GET -H "Authorization:Basic da3694ec2df4db81d86c6ebec218ca54" http://localhost:3000/v1/im/1/groupmsg/1

curl -X DELETE -H "Authorization:Basic da3694ec2df4db81d86c6ebec218ca54" http://localhost:3000/v1/im/groupmsg/2