console.log("client side javascript file is loaded!")


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    let address = search.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const url = "/weather?address=" + address

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

    
    })
    

