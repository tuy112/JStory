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
      alert("이런 누추한 곳에 어서옵셔!");
      location.href = "./ceo.html";
    })
    .catch((error) => {
      alert("난 댁을 몰라유..");
      console.log(error);
    });
}

// 2. signUp
function signUp() {
  const data = {
    email: $("#email").val(),
    password: $("#password").val(),
    confirm: $("#passwordConfirm").val(),
    storeName: $("#storeName").val(),
    storeImage: $("#storeImage").val(),
  };
  console.log(data);
  axios
    .post("http://localhost:3000/api/ceo/signup", data)
    .then((response) => {
      // 회원가입 성공 시
      alert("회원가입이 완료되었습니다. 사장님!");
      location.href = "./ceo.html";
    })
    .catch(function (error) {
      alert("회원가입에 실패하였습니다. 다시 돌아가주세요^^");
      location.href = "./ceoSignup.html";
    });
}

// 3. 전체 회원 GET
const data = {
  email: $("#email").val(),
  password: $("#password").val(),
  confirm: $("#passwordConfirm").val(),
  storeName: $("#storeName").val(),
  storeImage: $("#storeImage").val(),
};

// API 요청 보내기
axios
  .get("http://localhost:3000/api/storeInfoList", { params: data })
  .then((response) => {
    const formattedData = JSON.stringify(response.data, null, 2);
    document.getElementById("loginInfo").innerHTML = formattedData;
  })
  .catch((error) => {
    console.log(error);
  });
