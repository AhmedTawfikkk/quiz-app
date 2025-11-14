
  var token1 = localStorage.getItem('userFname');
  var token2 = localStorage.getItem('userPassword');
  var token3 = localStorage.getItem('userEmail');
  if (!token1 || !token2 || !token3) {
    window.location.href = '../signup/register.html';
  }
