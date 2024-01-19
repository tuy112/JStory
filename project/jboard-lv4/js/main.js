// 1. login
function login() {
  const data = {
    email: $("#email").val(),
    password: $("#password").val(),
  };
  axios
    .post("http://localhost:3000/api/login", data)
    .then((response) => {
      console.log(data);
      alert("어서오세요!!");
      // location.href = "../index.html";
    })
    .catch((error) => {
      alert("난 님을 몰라요..ㅠ_ㅠ");
      console.log(error);
    });
}

// 2. signUp
function signup() {
  const data = {
    email: $("#email").val(),
    password: $("#password").val(),
    confirm: $("#passwordConfirm").val(),
  };
  console.log(data);
  axios
    .post("http://localhost:3000/api/signup", data)
    .then((response) => {
      // 회원가입 성공 시
      alert("회원가입이 완료되었습니다.");
      location.href = "../index.html";
    })
    .catch(function (error) {
      alert("회원가입에 실패하였습니다. 다시 돌아가주세요^^");
      // location.href = "./signup.html";
    });
}

// // 3. 전체 회원 GET
// function userFind() {
//   const data = {
//     email: $("#email").val(),
//     password: $("#password").val(),
//   };
//   console.log(data);
//   axios
//     .post("http://localhost:3000/api/signup", data)
//     .then((response) => {
//       // 회원가입 성공 시
//       alert("회원가입이 완료되었습니다.");
//       location.href = "../index.html";
//     })
//     .catch(function (error) {
//       alert("회원가입에 실패하였습니다. 다시 돌아가주세요^^");
//       // location.href = "./signup.html";
//     });
// }

// 4. 로그아웃
function logout() {
  try {
      axios.post('http://localhost:3000/api/user/:userId/logout')
          .then(response => {
              alert('들어가세요~~');
          })
  } catch (error) {
      console.log(error);
  }
}