const http = require("http");

// reference: https://www.youtube.com/watch?v=8aGhZQkoFbQ
// blocking
// blocking의 정의는 정확한 정의는 없다고함
// 하지만 코드가 느려지는 것이라고 말함
for (let i = 0; i < 1000; i++) {
  console.log(i + 1);
}

// non-blocking
// event loop: c언어로 만들어진 libuv로 동작
// libuv: asyncronous io
// io는 읽고 쓰는 것. 파일, 메모리, 디스크 read/write
// 네트워크 통신은 파일을 sock이란 이름으로 rw
// 비동기 처리에도 순서가 있으며
setTimeout(() => {
  // macro queue에서 실행 대기
  // 메인 쓰레드가 비워져있고 micro queue가 비워져 있으면
  // 콜백함수가 메인 쓰레드로 호출되고 실행됨
  console.log(1);
});
// micro queue에서 실행 대기
http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.end();
    }
  })
  .listen(3000, () => {
    // 메인 쓰레드가 비워져으면
    // 메인 쓰레로 호출되고 실행됨
    console.log("listening port 3000");
  });
// 이렇게 메인 쓰레드 콜스택이 비었다면
// micro queue를 메인 쓰레드 콜스택에 해당 태스크를 옮기는 일
// macro queue를 메인 쓰레드 콜스택에 해당 태스크를 옮기는 일
// 메인 쓰레드 콜스택, micro queue, <animation queue>, macro queue를
// 검사하고 태스크를 옮기는 일, non-blocking 코드가 어떤 queue에 들어가는지에
// 관장하는 것이 이벤트 루프

console.log(2);

// 어떤 작업이 micro queue고 macro queue냐?
// micro queue: Promise, callback
// macro queue: setTimeout, setInterval
