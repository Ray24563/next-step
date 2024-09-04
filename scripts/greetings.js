import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let date = dayjs();
let getDate = date.format('dddd')

function renderGreetings() {
  let storeGreetings = ''
  const belowNav = document.querySelector('.below-nav')
  if (getDate === 'Monday'){
    storeGreetings += `<p class="user-greetings">Happy Monday! Let's go!</p>`
    belowNav.insertAdjacentHTML('afterbegin', storeGreetings)
  } 
  
  else if(getDate === 'Tuesday'){
    storeGreetings += `<p class="user-greetings">Happy Tuesday! Have a fantastic day!</p>`
    belowNav.insertAdjacentHTML('afterbegin', storeGreetings)
  }

  else if(getDate === 'Wednesday'){
    storeGreetings += `<p class="user-greetings">Happy Wednesday! Enjoy your day!</p>`
    belowNav.insertAdjacentHTML('afterbegin', storeGreetings)
  }

  else if(getDate === 'Thursday'){
    storeGreetings += `<p class="user-greetings">Happy Thursday! Almost the weekend!</p>`
    belowNav.insertAdjacentHTML('afterbegin', storeGreetings)
  }

  else if(getDate === 'Friday'){
    storeGreetings += `<p class="user-greetings">Happy Friday! Enjoy the start of your weekend!</p>`
    belowNav.insertAdjacentHTML('afterbegin', storeGreetings)
  }

  else if(getDate === 'Saturday'){
    storeGreetings += `<p class="user-greetings">Happy Saturday! Have a wonderful day!</p>`
    belowNav.insertAdjacentHTML('afterbegin', storeGreetings)
  }

  else if(getDate === 'Sunday'){
    storeGreetings += `<p class="user-greetings">Happy Sunday! Relax and recharge!</p>`
    belowNav.insertAdjacentHTML('afterbegin', storeGreetings)
  }
}

renderGreetings();