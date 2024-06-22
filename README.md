# EVENT LOOP

[이벤트 루프 개념 설명](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

## 실행 방법

    1. 프로젝트 다운로드
    1-1. git clone https://github.com/ymh3190/event-loop.git
    1-2. https://github.com/ymh3190/event-loop/archive/refs/heads/main.zip

    2. 실행
    2-1. 다운받은 해당 프로젝트 폴더 경로에 쉘 환경으로 진입
    2-2. npm i
    2-3. npm start listening 상태

    3. parallel
    3-1. 2개 이상의 쉘 환경에서 각각 curl localhost:3000로 네트워크 요청
    3-2. 각 클라이언트와 독립적으로 3-ways handshake를 하고 establish 상태가 되며 [d.]스트림으로 데이터를 보냄
         데이터 전송이 끝나면 HTTP/1.1은 설정된 timeout 혹은 max에 따라 클라이언트가에서 FIN flag를 서버에 보냄(4-ways handshake)
         기존 Apache 서버는 이런 네트워크 시퀀스를 별도의 스레드로 할당(메모리에)해서 관리하기에 C10K 문제가 발생
         비동기(Event-Driven Asyncronus)는 네트워크 시퀀스를 메모리에 할당해서 관리하지 않고 C언어로 만들어진 libuv 그러니까 커널에서 이러한 작업을 관리하기에 메모리 사용량이 매우 낮다는 장점이 있다
