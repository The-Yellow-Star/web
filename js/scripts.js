// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// ------------SEARCH-------------
const getAllDataTable = () => {
  const data = [];
  const rows = document.querySelectorAll("#myTable tbody tr")
  rows.forEach((row, index) => {
      const allTd = row.querySelectorAll("td");
      
      data.push({
          "SoPhieu" : allTd[0].textContent.trim(),
          "SoHoSo" : allTd[1].textContent.trim(),
          "TenBenhNhan" : allTd[2].textContent.trim(),
          "Tuoi" : allTd[3].textContent.trim(),
          "GioiTinh" : allTd[4].textContent.trim(),
          "NgayKham" : allTd[5].textContent.trim(),
          "NgayVao" : allTd[6].textContent.trim(),
          "TrangThai" : allTd[7].textContent.trim(),
          "HuongDieuTri" : allTd[8].textContent.trim(),
          "NgayKetThuc" : allTd[9].textContent.trim(),
      })
  })

  return [...data]
}

const dataOld = getAllDataTable();

const getValueSearch = () => {
  const allInputForm = document.querySelectorAll(".form input")
  const sttValue = ["NgayVao","NgayKetThuc", "SoHoSo", "TenBenhNhan"]
  const valueForm = {}

  for (let i = 0; i < allInputForm.length; i++) {
      const element = allInputForm[i];
      if(!element.value) continue;
      switch (element.type) {
          case "date":
              const val = new Date(element.value)
              valueForm[sttValue[i]] = `${((val.getDate() > 9) ? "" : "0") + (val.getDate())}/${((val.getUTCMonth() > 9) ? "" : "0") + (val.getUTCMonth() + 1)}/${val.getFullYear()}`
              break;
          default:
              valueForm[sttValue[i]] = element.value.trim()
              break;
         
      }
  }

  return { ...valueForm }
}

const changeTable = (rows) => {
  const allTr = document.querySelectorAll("#myTable tbody>*")

  for (let i = 0; i < allTr.length; i++) {
      const element = allTr[i];
      element.remove()
  
  }

  rows.forEach(element => {
      const trElm = document.createElement("tr")

      const keyElms = Object.keys(element)
      for (let i = 0; i < keyElms.length; i++) {
          const tdElm = document.createElement("td");
          tdElm.textContent = element[keyElms[i]];
          trElm.append(tdElm)
      }

      document.querySelector("#myTable tbody").append(trElm)
  });
}

const resetForm = () => {
  const allInputForm = document.querySelectorAll(".form input")

  allInputForm.forEach(element => {
      element.value = ""
  });
}

document.getElementById('btns').onclick = function(){
  const valueForm = getValueSearch();
  const keyValues = Object.keys(valueForm);
  const results = []

  dataOld.forEach((row) => {
      for (let i = 0; i < keyValues.length; i++) {
          const element = keyValues[i];
          if(row[element] != valueForm[element]) return
      }

      results.push(row)
  })

  changeTable(results)
  resetForm()
}



// Phân trang web-----------
$(document).ready( function () {
    $('#myTable').DataTable();
} );
$('#myTable').DataTable( {
    responsive: true
} );
// let thisPage = 1;
// let limit = 6;
// let list = document.querySelectorAll('.table tr');

// function loadItem(){
//     let beginGet = limit * (thisPage - 1);
//     let endGet =  limit * thisPage - 1;
//     list.forEach((item, key)=>{
//         if(key >= beginGet && key <= endGet){
//              item.style.display = 'block';
//         }else{
//              item.style.display = 'none';
//         }
//     })
//     listPage();
// }


// loadItem();
// function listPage(){
//     let count = Math.ceil(list.length / limit);
//     document.querySelector('.listPage').innerHTML = '';

//     if(thisPage != 1){
//         let prev = document.createElement('li');
//         prev.innerText = 'PREV';
//         prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
//         document.querySelector('.listPage').appendChild(prev);
//     }

//     for(i = 1; i <= count; i++){
//         let newPage = document.createElement('li');
//         newPage.innerText = i;
//         if(i == thisPage){
//             newPage.classList.add('active');
//         }
//         newPage.setAttribute('onclick', "changePage(" + i + ")");
//         document.querySelector('.listPage').appendChild(newPage);
//     }

//     if(thisPage != count){
//         let next = document.createElement(' li');
//         next.innerText = 'NEXT';
//         next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
//         document.querySelector('.listPage').appendChild(next);
//     }
// }
// function changePage(i){
//     thisPage = i;
//     loadItem();
// }
