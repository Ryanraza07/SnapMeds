const forgotPasswordTemplate = ({name,otp}) =>{
    return `
    <div>
    <p>You are requested a password reset.Please use following OTP code to
    reset your password.</p>
    <div style="background:yellow;font-size:20px;padding:20px;text-align:center">
    ${otp}
    </div>
    <p>Please enter the code on snapmeds website to change the password </p>
    <br>
    <br>
   <p> Thank you </p>
   <p> Team SnapMeds<p> 
    </div>`
}
export default forgotPasswordTemplate