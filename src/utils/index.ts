
export const thayDoiPhanTu = (mang, doiTuongMoi) => {

    // Tìm phần tử có id tương ứng trong mảng
    let phanTuCanThayThe = mang.find(item => item.id === doiTuongMoi.id);

    let data = {
        ...phanTuCanThayThe,
        ...doiTuongMoi
    }

    // Nếu tìm thấy phần tử cần thay thế
    if (!!phanTuCanThayThe) {
        // Tìm vị trí của phần tử cần thay thế
        let viTri = mang.indexOf(phanTuCanThayThe);

        // Thay thế phần tử cũ bằng phần tử mới
        mang[viTri] = data;
    }

}
