import {
  checkForm,
  disableInput,
  getDataForm,
  hienTypeForm,
  renderHTML,
  resetForm,
  showThongTinLenForm,
} from "./controller.js";

import { KhachHang, ListPerson, NhanVien, SinhVien } from "./model.js";
import { kiemTraTrung } from "./validate.js";

let listPerson = new ListPerson();

renderHTML(listPerson.DanhSachNguoiDung);

window.hienTypeForm = hienTypeForm;

let createPeson = () => {
  let type = document.getElementById("select-object").value;
  let data = getDataForm(type);
  let checked =
    checkForm(data) && kiemTraTrung(data.ma, listPerson.DanhSachNguoiDung);
  if (checked) {
    if (type === "1") {
      let sv = new SinhVien(
        data.hoTen,
        data.diaChi,
        data.ma,
        data.email,
        data.diemToan,
        data.diemLy,
        data.diemHoa,
        (type = "sinh viên")
      );
      listPerson.ThemNguoiDung(sv);
    } else if (type === "2") {
      let nv = new NhanVien(
        data.hoTen,
        data.diaChi,
        data.ma,
        data.email,
        data.soNgayLam,
        data.luong,
        (type = "nhân viên")
      );
      listPerson.ThemNguoiDung(nv);
    } else if (type === "3") {
      let kh = new KhachHang(
        data.hoTen,
        data.diaChi,
        data.ma,
        data.email,
        data.tenCT,
        data.hoaDon,
        data.danhGia,
        (type = "khách hàng")
      );
      listPerson.ThemNguoiDung(kh);
    }
    resetForm();
    renderHTML(listPerson.DanhSachNguoiDung);
  }
};

window.createPeson = createPeson;

window.resetForm = resetForm;

let deletePerson = (ma) => {
  listPerson.XoaNguoiDung(ma);
  renderHTML(listPerson.DanhSachNguoiDung);
};

window.deletePerson = deletePerson;

let clickBtnSua = (ma) => {
  disableInput();
  let person = listPerson.TimNguoiDungTheoMa(ma);
  $("#myModal").modal("show");
  let type = person.type;
  switch (type) {
    case "sinh viên":
      document.getElementById("select-object").value = "1";
      break;
    case "nhân viên":
      document.getElementById("select-object").value = "2";
      break;
    case "khách hàng":
      document.getElementById("select-object").value = "3";
      break;
  }
  hienTypeForm();
  showThongTinLenForm(person);
};

window.clickBtnSua = clickBtnSua;

let updatePerson = () => {
  let type = document.getElementById("select-object").value;
  let person = getDataForm(type);
  let checked = checkForm(person, listPerson.DanhSachNguoiDung);
  if (checked) {
    listPerson.SuaNguoiDung(person);
    renderHTML(listPerson.DanhSachNguoiDung);
    resetForm();
  }
};

window.updatePerson = updatePerson;

let dsTenNDDuocSapXep = [];

let sapXepTheoThuTuHo = () => {
  let dsTen = [];
  listPerson.DanhSachNguoiDung.forEach((person) => {
    dsTen.push(person.hoTen);
  });
  const compareNames = (a, b) => {
    const lastNameA = a.split(" ").shift();
    const lastNameB = b.split(" ").shift();

    return lastNameA.localeCompare(lastNameB);
  };

  const sortedNames = dsTen.sort(compareNames);

  sortedNames.map((name) => {
    listPerson.DanhSachNguoiDung.forEach((person) => {
      if (name == person.hoTen) {
        dsTenNDDuocSapXep.push(person);
      }
    });
  });
  renderHTML(dsTenNDDuocSapXep);
  dsTenNDDuocSapXep = [];
};

window.sapXepTheoThuTuHo = sapXepTheoThuTuHo;

let sapXepTheoThuTuTen = () => {
  let dsTen = [];
  listPerson.DanhSachNguoiDung.forEach((person) => {
    dsTen.push(person.hoTen);
  });
  const compareNames = (a, b) => {
    const lastNameA = a.split(" ").pop();
    const lastNameB = b.split(" ").pop();
    return lastNameA.localeCompare(lastNameB);
  };
  const sortedNames = dsTen.sort(compareNames);

  sortedNames.map((name) => {
    listPerson.DanhSachNguoiDung.forEach((person) => {
      if (name == person.hoTen) {
        dsTenNDDuocSapXep.push(person);
      }
    });
  });
  renderHTML(dsTenNDDuocSapXep);
  dsTenNDDuocSapXep = [];
};

window.sapXepTheoThuTuTen = sapXepTheoThuTuTen;

let dsLocND = [];

let timKiemTheoLoaiND = () => {
  let type = document.getElementById("value-input-search").value.trim();
  listPerson.DanhSachNguoiDung.map((person) => {
    if (person.type == type) {
      dsLocND.push(person);
    }
  });
  renderHTML(dsLocND);
  dsLocND = [];
};

window.timKiemTheoLoaiND = timKiemTheoLoaiND;
