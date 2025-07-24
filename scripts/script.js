// create reference for input fields.
const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const passwordConfirmInput = document.querySelector("#password-confirm-input");

// create reference for buttons.
const submitBtn = document.querySelector("#submit-btn");
const resetBtn = document.querySelector("#reset-btn");

// simple email validation
function validateEmail(email) {
  var atPos = email.indexOf("@");
  var dotPos = email.lastIndexOf(".");
  return atPos > 0 && dotPos > atPos + 1 && dotPos < email.length - 1;
}

// add callback function for firstNameInput.onkeyup event
// ฟังก์ชันสำหรับล้างสถานะการ validate (กรอบสีเขียว/แดง) ของ input field
function clearValidationStatus(inputElement) {
  inputElement.classList.remove("is-valid"); // ลบกรอบสีเขียว
  inputElement.classList.remove("is-invalid"); // ลบกรอบสีแดง
}

firstNameInput.onkeyup = () => {
  clearValidationStatus(firstNameInput);
};

// add callback functions for other input events.
// (lastname, email, password, confirm password)
lastNameInput.onkeyup = () => {
  clearValidationStatus(lastNameInput);
};

emailInput.onkeyup = () => {
  clearValidationStatus(emailInput);
};

passwordInput.onkeyup = () => {
  clearValidationStatus(passwordInput);
};

passwordConfirmInput.onkeyup = () => {
  clearValidationStatus(passwordConfirmInput);
};

function setValidationStatus(inputElement, isValid) {
    if (!isValid) {
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid"); // เพิ่มกรอบสีแดง
    } else {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid"); // เพิ่มกรอบสีเขียว
    }
    return isValid; // คืนค่าความถูกต้อง
}
// add callback function for submit button.
submitBtn.onclick = () => {
  let isFormValid = true; // ตัวแปรสำหรับตรวจสอบว่าฟอร์มทั้งหมดถูกต้องหรือไม่

  // 1. ตรวจสอบ First name
  // First name และ Last name ให้เช็คเพียงว่าข้อมูลได้ถูกป้อนเข้ามาไหม (ไม่ว่างเปล่า)
  const isFirstNameOk = firstNameInput.value.trim().length > 0;
  // ใช้ && เพื่อให้ isFormValid เป็น false หากมีฟิลด์ใดไม่ถูกต้อง
  isFormValid = setValidationStatus(firstNameInput, isFirstNameOk) && isFormValid;

  // 2. ตรวจสอบ Last name
  const isLastNameOk = lastNameInput.value.trim().length > 0;
  isFormValid = setValidationStatus(lastNameInput, isLastNameOk) && isFormValid;

  // 3. ตรวจสอบ Email
  // Email เช็คว่ามีเครื่องหมาย “@” และเครื่องหมาย “.” อยู่ในข้อมูลหรือไม่
  const isEmailOk = validateEmail(emailInput.value);
  isFormValid = setValidationStatus(emailInput, isEmailOk) && isFormValid;

  // 4. ตรวจสอบ Password
  // Password ให้เช็คว่ารหัสผ่านมีความยาวตั้งแต่ 6 ตัวอักษรขึ้นไปใช่หรือไม่
  const isPasswordOk = passwordInput.value.length >= 6;
  isFormValid = setValidationStatus(passwordInput, isPasswordOk) && isFormValid;

  // 5. ตรวจสอบ Confirm Password
  // Confirm Password ให้เช็คว่าค่าที่ป้อนเหมือนกับรหัสผ่านที่ป้อนในช่อง Password หรือไม่
  // และต้องมีความยาวไม่เป็นศูนย์ด้วย (เพื่อให้แน่ใจว่ามีการป้อนข้อมูล)
  const isConfirmPasswordOk = passwordConfirmInput.value === passwordInput.value && passwordConfirmInput.value.length > 0;
  isFormValid = setValidationStatus(passwordConfirmInput, isConfirmPasswordOk) && isFormValid;

  // ถ้าทุกฟิลด์ถูกต้อง (isFormValid เป็น true) ให้แสดง Modal แจ้งเตือนสำเร็จ
  if (isFormValid) {
    // ใช้ Bootstrap Modal แทน alert() ตามข้อกำหนดใน Lab 07 รูปที่ 4
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show(); // แสดง Modal
  }
};

// add callback function for Reset button.
resetBtn.onclick = () => {
    // ล้างค่าในช่อง input ทั้งหมด
    firstNameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    passwordConfirmInput.value = "";

    // ล้างสถานะการ validate ของทุก input field (กรอบสีแดง/เขียวจะหายไป)
    clearValidationStatus(firstNameInput);
    clearValidationStatus(lastNameInput);
    clearValidationStatus(emailInput);
    clearValidationStatus(passwordInput);
    clearValidationStatus(passwordConfirmInput);
};