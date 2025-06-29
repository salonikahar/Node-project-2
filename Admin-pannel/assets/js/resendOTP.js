  let resendBtn = document.getElementById("resendBtn");
  let timerText = document.getElementById("timerText");

  // Function to start timer
  function startResendTimer(durationInSec) {
    let timer = durationInSec;
    resendBtn.classList.add("d-none");

    let interval = setInterval(() => {
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
      timerText.innerText = `You can resend OTP in ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      
      if (--timer < 0) {
        clearInterval(interval);
        resendBtn.classList.remove("d-none");
        timerText.innerText = "";
      }
    }, 1000);
  }

  // Initial 2-minute wait
  startResendTimer(10); // 120 seconds = 2 minutes

  // When user clicks "Resend OTP"
  resendBtn.addEventListener("click", function () {
    // You may want to trigger an actual resend via AJAX here
    console.log("OTP Resent!");

    // Hide button and restart timer
    startResendTimer(10);
  });