const form = document.getElementById("form")

form.addEventListener("submit", function(event){
    event.preventDefault() //기존 기능 차단 (새로고침 x)

    let userId = event.target.id.value
    let userPw1 = event.target.pw1.value
    let userPw2 = event.target.pw2.value
    let userName = event.target.name.value
    let userPhone = event.target.phone.value
    let userPosition = event.target.phone.value
    let userGender = event.target.gender.value
    let userEmail = event.target.email.value
    let userIntro = event.target.intro.value
    
    if(userId.length < 6){
        alert("아이디가 너무 짧습니다. 6글자 이상 입력해주세요.")
        return
    }

    if(userPw1 !== userPw2){
        alert("비밀번호가 일치하지 않습니다.")
        return
    }

    document.body.innerHTML = ""
    document.write(`<p><b>${userId}</b>님 환영합니다!</p>`)
    document.write(`<p>회원 가입 시 입력하신 내역은 다음과 같습니다.</p>`)
    document.write(`<p><b>아이디:</b> ${userId}</p>`)
    document.write(`<p><b>이름:</b> ${userName}</p>`)
    document.write(`<p><b>전화번호:</b> ${userPhone}</p>`)
    document.write(`<p><b>원하는 직무:</b> ${userPosition}</p>`)

})