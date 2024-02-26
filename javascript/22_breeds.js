const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42"
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all"
const request1 = new XMLHttpRequest()
const request2 = new XMLHttpRequest()

const header = document.getElementById("header")
const main = document.getElementById("main")
const input = document.getElementById("filter-text")
const button = document.getElementById("filter-button")
const select = document.getElementById("filter-select")
const more = document.getElementById("more")
const tothetop = document.getElementById("tothetop")
const refresh = document.getElementById("refresh-button")

const currentDogs = []

function displayDogs(item){
    const dogImgDiv = document.createElement("div")
    dogImgDiv.classList.add("flex-item")
    dogImgDiv.innerHTML = `<img src=${item}>`
    main.appendChild(dogImgDiv)
}

//페이지가 처음 로드되었을 때 화면
window.addEventListener("load", function(){
    // 강아지 사진 뿌리기
    request1.open("get", apiRandomDogs)
    request1.addEventListener("load", function(){
        const response = JSON.parse(request1.response)
        response.message.forEach(function(item){
            currentDogs.push(item)
            displayDogs(item)
        })
    })
    request1.send()

    //설렉트에 견종 정보 뿌리기
    request2.open("get", apiAllBreeds)
    request2.addEventListener("load", function(){
        const response = JSON.parse(request2.response)
        //정보가 key로 되어있어 key를 받아와야함
        //Object는 데이터타입을 대표하는 객체 -> key데이터 타입가져옴
        Object.keys(response.message).forEach(function(item){
            const option = document.createElement("option")
            option.textContent = item
            option.value = item
            select.appendChild(option)
        })
    })
    request2.send()
})

button.addEventListener("click", function(){
    main.innerHTML = ""
    let filteredDogs = currentDogs.filter(function(item){
        //문자열을 포함하지않으면 indexOf가 -1을 반환
        return item.indexOf(input.value) !== -1 //견종정보 안에 input.value가 포함되어 있다면 필터링
    })

    input.value = ""

    filteredDogs.forEach(function(item){
        displayDogs(item)
})
})

select.addEventListener("change", function(){
    main.innerHTML = ""
    let filteredDogs = currentDogs.filter(function(item){
        //문자열을 포함하지않으면 indexOf가 -1을 반환
        return item.indexOf(select.value) !== -1 //견종정보 안에 input.value가 포함되어 있다면 필터링
    })

    filteredDogs.forEach(function(item){
        displayDogs(item)
})
})
//more button
more.addEventListener("click", function(){
    request1.open("get", apiRandomDogs)
    request2.addEventListener("load", function(){
        const response = JwSON.parse(request1.response)
        response.message.forEach(function(item){
            currentDogs.push(item)
            displayDogs(item)
        })
    })
    request1.send()
})

//top button
tothetop.addEventListener("click", function(){
    //scrollTo: 주어진 위치로 스크롤을 이동
    window.scrollTo({top: 0})
})

refresh.addEventListener("click", function(){
    currentDogs.pop()

})