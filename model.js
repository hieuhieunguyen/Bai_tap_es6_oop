export class Person {
  constructor(hoTen, diaChi, ma, email) {
    this.hoTen = hoTen;
    this.diaChi = diaChi;
    this.ma = ma;
    this.email = email;
  }
}

export class SinhVien extends Person {
  constructor(hoTen, diaChi, ma, email, diemToan, diemLy, diemHoa, type) {
    super(hoTen, diaChi, ma, email);
    this.diemToan = diemToan;
    this.diemLy = diemLy;
    this.diemHoa = diemHoa;
    this.type = type;

    this.mangDoiChieu = [
      this.hoTen,
      this.diaChi,
      this.ma,
      this.email,
      this.diemToan,
      this.diemLy,
      this.diemHoa,
    ];
  }
}

export class KhachHang extends Person {
  constructor(hoTen, diaChi, ma, email, tenCT, hoaDon, danhGia, type) {
    super(hoTen, diaChi, ma, email);
    this.tenCT = tenCT;
    this.hoaDon = hoaDon;
    this.danhGia = danhGia;
    this.type = type;

    this.mangDoiChieu = [
      this.hoTen,
      this.diaChi,
      this.ma,
      this.email,
      this.tenCT,
      this.hoaDon,
      this.danhGia,
    ];
  }
}

export class NhanVien extends Person {
  constructor(hoTen, diaChi, ma, email, soNgayLam, luong, type) {
    super(hoTen, diaChi, ma, email);
    this.soNgayLam = soNgayLam;
    this.luong = luong;
    this.type = type;

    this.mangDoiChieu = [
      this.hoTen,
      this.diaChi,
      this.ma,
      this.email,
      this.soNgayLam,
      this.luong,
    ];
  }
}

export class ListPerson {
  constructor() {
    this.DanhSachNguoiDung = new Array();
  }

  ThemNguoiDung(nguoiDungMoi) {
    this.DanhSachNguoiDung = [...this.DanhSachNguoiDung, nguoiDungMoi];
  }

  TimViTriTheoMa(ma) {
    for (let viTri in this.DanhSachNguoiDung) {
      if (this.DanhSachNguoiDung[viTri].ma === ma) {
        return viTri;
      }
    }
  }

  TimNguoiDungTheoMa(ma) {
    for (let nhanvien of this.DanhSachNguoiDung) {
      if (nhanvien.ma === ma) {
        return nhanvien;
      }
    }
  }

  XoaNguoiDung(ma) {
    let viTri = this.TimViTriTheoMa(ma);
    this.DanhSachNguoiDung.splice(viTri, 1);
  }

  SuaNguoiDung(nhanVien) {
    let viTri = this.TimViTriTheoMa(nhanVien.ma);
    this.DanhSachNguoiDung[viTri] = nhanVien;
  }
}
