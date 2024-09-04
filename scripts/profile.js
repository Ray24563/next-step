let profile = JSON.parse(localStorage.getItem('information')) || [
  { name: 'LeBron Raymone James',
    age: 40,
    dob: '1984-30-12',
    address: 'Akron, Ohio',
    nickname: 'The King',
    image: "images/pic-example.png"
  }
]

function saveInformation(){
  localStorage.setItem('information', JSON.stringify(profile));
}

function renderProfile(){
  let storeProfile = ''
  profile.forEach((info) => {
    storeProfile += `<aside>
    <div class="profile-container">
      <label class="update-button" for="input-file"><img class="user-pic" src="${info.image}" id="profile-pic"></label>
      <input class="select-pic" type="file" accept="image/jpeg, image/png, image/jpg" id="input-file">
    </div>
  
    <div class="nickname-div">
      <p class="user-nickname">${info.nickname ? info.nickname : 'The King'}</p>
      <input class="edit-nickname" type="text" placeholder="Edit Nickname">
    </div>
  
    <div class="user-info">
      <div class="info-container name-div">
        <p class="user-name"><span class="category">Name:&emsp; &nbsp; &nbsp;${info.name ? info.name : 'LeBron Raymone James'}</span></p>
        <input class="input-name" type="text" placeholder="Enter Your Name">
      </div>
  
      <div class="info-container age-div">
        <p class="user-age"><span class="category">Age:&emsp; &ensp;  &nbsp; &nbsp; ${info.age ? info.age : 40}</span></p>
        <input class="input-age" type="number" placeholder="Edit Age">
      </div>
  
      <div class="info-container birth-div">
        <p class="user-birth"><span class="category">D.O.B: &ensp; &nbsp; &nbsp; &nbsp;${info.dob ? info.dob : '1984-30-12'}</span></p>
        <input class="input-birth" type="date">
      </div>
  
      <div class="info-container add-div">
        <p class="user-address"><span class="category">Address:&nbsp;  &nbsp; ${info.address ? info.address: 'Akron, Ohio'}</span></p>
        <input class="input-address" type="text" placeholder="Enter Address">
      </div>
    </div>
    <div class="middle-button">
      <button class="edit-info edit-profile">Edit</button>
      <button class="save-info save-profile">Save</button>
    </div>
  </aside>`
  
  })
  document.querySelector('.sec-aside').innerHTML = storeProfile
  editSaveProfile();
}
renderProfile();


function editSaveProfile() {
  const removeTemp = document.querySelector('.user-nickname')
  const removeTemp1 = document.querySelector('.user-name')
  const removeTemp2 = document.querySelector('.user-age')
  const removeTemp3 = document.querySelector('.user-birth')
  const removeTemp4 = document.querySelector('.user-address')
  const editProfile = document.querySelectorAll('.edit-profile')
  const saveInfo = document.querySelector('.save-profile')
  editProfile.forEach((editButt) => {
    editButt.addEventListener('click', () => {
      removeTemp.classList.add("input-task")
      removeTemp1.classList.add("input-task")
      removeTemp2.classList.add("input-task")
      removeTemp3.classList.add("input-task")
      removeTemp4.classList.add("input-task")
      editButt.classList.add("input-task")
    })
      saveInfo.addEventListener('click', () => {
        const userNickName = document.querySelector('.edit-nickname');
        const userName = document.querySelector('.input-name');
        const userAge = document.querySelector('.input-age');
        const userBirth = document.querySelector('.input-birth');
        const userAdd = document.querySelector('.input-address');

        /* 'profile[0]' means profile is the name of the array and it only has 1 element. Take note
        that, the countings of the index always start at 0.
        The name, age and other attributes are called object. That's why when you read those it
        means: (Calling the array profile and index 0 with the (attribute name) object)*/
        profile[0].name = userName.value
        profile[0].age = userAge.value
        profile[0].dob = userBirth.value
        profile[0].address = userAdd.value
        profile[0].nickname =  userNickName.value
        saveInformation();
        renderProfile();

        removeTemp.classList.remove("input-task")
        removeTemp1.classList.remove("input-task")
        removeTemp2.classList.remove("input-task")
        removeTemp3.classList.remove("input-task")
        removeTemp4.classList.remove("input-task")
        editButt.classList.remove("input-task")
        saveInformation();
      })
    })
}

// This function is for changing the profile picture. It only works when the website is not published online so use this function instead if you are not using this website online.
function changePicture(){
  let profilePic = document.getElementById('profile-pic')
  let inputFile = document.getElementById('input-file')
  
  inputFile.onchange = function(){
    let newProfile = profilePic.src = URL.createObjectURL(inputFile.files[0])
    profile[0].image = newProfile
    saveInformation();
  }
}

changePicture()
//This is the code to make the change profiile works online. Kindly use this code if you are using this website online. (Need to learn)
/*
document.addEventListener('DOMContentLoaded', function() {
  function changePicture() {
    const profilePic = document.getElementById('profile-pic');
    const inputFile = document.getElementById('input-file');

    inputFile.addEventListener('change', function() {
      const file = inputFile.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const newProfile = e.target.result;
          profilePic.src = newProfile;

          console.log("New profile picture URL: ", newProfile); // Debug output

          // Assuming 'profile' is a global object/array
          if (typeof profile !== 'undefined' && profile.length > 0) {
            profile[0].image = newProfile;
          }

          // Save the image to local storage
          localStorage.setItem('profilePic', newProfile);

          saveInformation();
        };
        reader.readAsDataURL(file);
      } else {
        console.error("No file selected.");
      }
    });

    // Load the image from local storage
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      profilePic.src = storedProfilePic;

      // Assuming 'profile' is a global object/array
      if (typeof profile !== 'undefined' && profile.length > 0) {
        profile[0].image = storedProfilePic;
      }
    }
  }

  // Call the function to set up the event listener
  changePicture();
});*/