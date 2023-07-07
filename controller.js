import { kiemTraEmail, kiemTraKySo, kiemTraTrung } from "./validate.js";

export let renderHTML = (dsnd) => {
  let contentHTML = "";
  dsnd.forEach((person) => {
    let tinhLuong = () => {
      if (person.soNgayLam == undefined || person.luong == undefined) {
        return 0;
      } else {
        return person.soNgayLam * person.luong;
      }
    };
    let tinhDTB = () => {
      if (
        person.diemToan == undefined ||
        person.diemLy == undefined ||
        person.diemHoa == undefined
      ) {
        return 0;
      } else {
        return (person.diemToan + person.diemLy + person.diemHoa) / 3;
      }
    };
    let content = `
            <tr>
                <td>${person.ma}</td>
                <td>${person.hoTen}</td>
                <td>${person.diaChi}</td>
                <td>${person.email}</td>
                <td>${person.type}</td>
                <td>${tinhDTB()}</td>
                <td>${tinhLuong()}</td>
                <td class='d-flex'>
                    <button id='btn-xoa' onclick='deletePerson(${
                      person.ma
                    })' class="btn btn-danger mr-2">xóa</button>
                    <button onclick="clickBtnSua(${
                      person.ma
                    })" class="btn btn-warning">Sửa</button>
                </td>
            </tr>
        `;
    contentHTML += content;
  });
  document.getElementById("tblDanhSachND").innerHTML = contentHTML;
};

export let resetForm = () => {
  document.getElementById("ma").disabled = false;
  document.getElementById("ma").style.cursor = "text";
  $("#myModal").modal("hide");
  document.getElementById("modalBody").reset();
  document.getElementById("select-object").selectedIndex = 0;
  //   hide over form
  document.getElementById("general-form").style.display = "none";
  document.getElementById("sinh-vien").style.display = "none";
  document.getElementById("nhan-vien").style.display = "none";
  document.getElementById("khach-hang").style.display = "none";
};

export let hienTypeForm = () => {
  let type = document.getElementById("select-object").value;
  document.getElementById("general-form").style.display = "block";
  switch (type) {
    case "1":
      document.getElementById("sinh-vien").style.display = "block";
      document.getElementById("nhan-vien").style.display = "none";
      document.getElementById("khach-hang").style.display = "none";
      break;
    case "2":
      document.getElementById("nhan-vien").style.display = "block";
      document.getElementById("sinh-vien").style.display = "none";
      document.getElementById("khach-hang").style.display = "none";
      break;
    case "3":
      document.getElementById("khach-hang").style.display = "block";
      document.getElementById("nhan-vien").style.display = "none";
      document.getElementById("sinh-vien").style.display = "none";
      break;
  }
  return type;
};

export let getDataForm = (type) => {
  let hoTen = document.getElementById("hoTen").value;
  let diaChi = document.getElementById("diaChi").value;
  let ma = Number(document.getElementById("ma").value);
  let email = document.getElementById("email").value;
  switch (type) {
    case "1":
      let diemToan = Number(document.getElementById("diemToan").value);
      let diemLy = Number(document.getElementById("diemLy").value);
      let diemHoa = Number(document.getElementById("diemHoa").value);

      return {
        hoTen,
        diaChi,
        ma,
        email,
        diemToan,
        diemLy,
        diemHoa,
        type: "sinh viên",
      };
    case "2":
      let soNgayLam = Number(document.getElementById("soNgayLam").value);
      let luong = Number(document.getElementById("luong").value);
      return { hoTen, diaChi, ma, email, soNgayLam, luong, type: "nhân viên" };
    case "3":
      let tenCT = document.getElementById("tenCT").value;
      let hoaDon = document.getElementById("hoaDon").value;
      let danhGia = document.getElementById("danhGia").value;
      return {
        hoTen,
        diaChi,
        ma,
        email,
        tenCT,
        hoaDon,
        danhGia,
        type: "khách hàng",
      };
  }
};

export let showThongTinLenForm = (data) => {
  let type = document.getElementById("select-object").value;

  document.getElementById("hoTen").value = data.hoTen;
  document.getElementById("diaChi").value = data.diaChi;
  document.getElementById("ma").value = data.ma;
  document.getElementById("email").value = data.email;

  switch (type) {
    case "1":
      document.getElementById("diemToan").value = data.diemToan;
      document.getElementById("diemLy").value = data.diemLy;
      document.getElementById("diemHoa").value = data.diemHoa;
    case "2":
      document.getElementById("soNgayLam").value = data.soNgayLam;
      document.getElementById("luong").value = data.luong;
    case "3":
      document.getElementById("tenCT").value = data.tenCT;
      document.getElementById("hoaDon").value = data.hoaDon;
      document.getElementById("danhGia").value = data.danhGia;
  }
};

export let disableInput = () => {
  document.getElementById("ma").disabled = true;
  document.getElementById("ma").style.cursor = "no-drop";
};

export let checkForm = (data) => {
  let isValid = kiemTraKySo(data.ma, "spanMa");
  isValid &= kiemTraEmail(data.email);
  if (
    data.diemToan == undefined &&
    data.diemLy == undefined &&
    data.diemHoa == undefined &&
    data.tenCT == undefined &&
    data.hoaDon == undefined &&
    data.danhGia == undefined
  ) {
    isValid &= kiemTraKySo(data.soNgayLam, "spanSoNgayLam");
    isValid &= kiemTraKySo(data.luong, "spanLuong");
  } else if (
    data.soNgayLam == undefined &&
    data.luong == undefined &&
    data.tenCT == undefined &&
    data.hoaDon == undefined &&
    data.danhGia == undefined
  ) {
    isValid &= kiemTraKySo(data.diemToan, "spanToan");
    isValid &= kiemTraKySo(data.diemLy, "spanLy");
    isValid &= kiemTraKySo(data.diemHoa, "spanHoa");
  } else {
    isValid &= kiemTraKySo(data.hoaDon, "spanHoaDon");
  }

  return isValid;
};
