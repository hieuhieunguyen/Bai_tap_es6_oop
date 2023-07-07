export let showMessage = (idSpan, message) => {
  document.getElementById(idSpan).innerText = message;
};

export let kiemTraKySo = (value, idSpan) => {
  const reg = new RegExp("^[0-9]+$");
  if (reg.test(value)) {
    showMessage(idSpan, "");
    return true;
  } else {
    showMessage(idSpan, "Ô này phải là ký số");
    return false;
  }
};

export let kiemTraTrung = (maND, dsnd) => {
  let index = dsnd.findIndex((nd) => {
    return nd.ma == maND;
  });
  if (index == -1) {
    showMessage("spanMa", "");
    return true;
  } else {
    showMessage("spanMa", "Mã người dùng đã tồn tại");
    return false;
  }
};

export let kiemTraEmail = (value) => {
  const reg =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (reg.test(value)) {
    showMessage("spanEmail", "");
    return true;
  } else {
    showMessage("spanEmail", "Ô này phải nhập đúng kiểu dữ liệu email");
    return false;
  }
};
