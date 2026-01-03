const editBtn = document.getElementById('editBtn');
const saveBtn = document.getElementById('saveBtn');
const editForm = document.getElementById('editForm');
const inpName = document.getElementById('inpName');
const inpEmail = document.getElementById('inpEmail');
const inpUserId = document.getElementById('inpUserId');
const inpMobile = document.getElementById('inpMobile');
const inpGender = document.getElementById('inpGender');
const avatarImg = document.getElementById('avatarImg');
const changePicBtn = document.getElementById('changePicBtn');
const fileInput = document.getElementById('fileInput');

var message = document.getElementById('message');
function validateMobile(number) {
    if (number.trim() === '') {
        return true;
    }
    const pattern = /^\d{10}$/;
    if (!pattern.test(number)) {
        message.style.color = "red";
        message.textContent = "Invalid Mobile Number. Please enter valid mobile number.";
        return false;
    }
    return true;
}
function toggleEdit(on) {
    if (on) {
        editForm.classList.remove('hidden');
        saveBtn.classList.remove('hidden');
        editBtn.classList.add('hidden');

    } else {
        editForm.classList.add('hidden');
        saveBtn.classList.add('hidden');
        editBtn.classList.remove('hidden');
    }
}

editBtn.addEventListener('click', () => toggleEdit(true));

saveBtn.addEventListener('click', () => {
    if (!validateMobile(inpMobile.value)) return;

    displayName.textContent = inpName.value || 'User Account';
    displayEmail.textContent = inpEmail.value || 'you@example.com';
    displayUserId.textContent = inpUserId.value || 'user123';
    displayMobile.textContent = inpMobile.value || '+1 555 0123';
    displayGender.textContent = inpGender.value || 'Prefer not to say';

    toggleEdit(false);
});

changePicBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) { avatarImg.src = ev.target.result; };
    reader.readAsDataURL(file);
});