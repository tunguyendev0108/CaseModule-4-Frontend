localStorage.clear();
// let container = document.querySelector('.shop-content>.tab-content>.tab-pane>.row')
// let buttonFindByPrice = document.querySelector('.buttonFindByPrice')
// let findByName = document.querySelector('.search-input')
// let buttonSort = document.querySelector('select.orderby')
// let buttonShowFormCreate = document.querySelector('.shop-content>.tab-content>.tab-pane>.load-more-wrapper>a')
// let buttonCreate = document.querySelector('form.form-create>button[type=submit]')
// let arrDrugs = []
// let arrCategory = []
// let buttonHideFormCreate = document.querySelector('form.form-create svg')
// let formCreate = document.querySelector('form.form-create')
// function checkAuthenticate(){

// }

// function renderList(list){ 
//     container.innerHTML = ''
//     for(let x of list){
//         let str = ""
//         str += `
//         <input name="idDrug" value="${x.id}" type="hidden">
//         <div class="sin-product style-two">
//             <div class="pro-img">
//                 <img src="${x.image}" alt="">
//             </div>
//             <div class="mid-wrapper">
//                 <h5 class="pro-title"><a href="product.html">${x.name}</a></h5>
//                 <div class="color-variation">
//                     <ul>
//                         <li><i class="fas fa-circle"></i></li>
//                         <li><i class="fas fa-circle"></i></li>
//                         <li><i class="fas fa-circle"></i></li>
//                         <li><i class="fas fa-circle"></i></li>
//                     </ul>
//                 </div>
//                 <p>${x.price} VNĐ</span></p>
//             </div>
//             <div class="icon-wrapper">
//                 <div class="pro-icon">
//                     <ul>
//                         <li><a href="#"><i class="flaticon-valentines-heart"></i></a></li>
//                         <li><a href="#"><i class="flaticon-compare"></i></a></li>
//                         <li><a href="#" class="trigger"><i onclick="showDrug(${x.id})" class="flaticon-eye"></i></a></li>
//                     </ul>
//                 </div>
//                 <div class="add-to-cart">
//                     <a href="#">add to cart</a>
//                 </div>
//             </div>
//         </div>
//     `
//         let newTag = document.createElement('div')
//         newTag.className = 'col-sm-6 col-xl-3'
//         newTag.innerHTML = str
//         container.appendChild(newTag)
//         let buttonAdd = newTag.querySelector('.sin-product>.icon-wrapper>.add-to-cart>a')
//         let id = newTag.querySelector('input[name=idDrug]').value
//         buttonAdd.onclick = function(){
//             addToCart(id)
//         }
//     }
// }

// function showDrug(id){
//     localStorage.setItem('drugId', id)
//     window.location.href = 'show-drug.html'
    
// }

// function getData(url){
 
//     document.querySelector('input[name=fromPrice]').value = ''
//     document.querySelector('input[name=toPrice]').value = ''
//     document.querySelector('.search-input').value = ''
    
//     $.ajax({
//         url: url,
//         type: 'get',
//         success: function(response) {
            
//             arrDrugs = response
//             renderList(response);  
//         },
//         error: function(xhr, status, error) {
//         console.log('Upload failed:', error);
//         }
//     });
// }

// function getCategory(){
//     $.ajax({
//         type: 'get',
//         url: 'http://localhost:8080/api/category',
//         success: function(response){
//             arrCategory = response
//         }
//     })
// }

// function create(){  
//     let form = new FormData(formCreate)
//     let token = localStorage.getItem('accessToken')
    
//     $.ajax({
//         url: 'http://localhost:8080/api/drugs/create',
//         type: 'post',
//         headers:{
//             'Accept': 'application/json',
//             "Authorization": "Bearer " + token
//         },
//         data:form,
//         processData:false,
//         contentType: false,
        
//         success: function(response){
//             formCreate.reset();
//             getData('http://localhost:8080/api/drugs');
//         },
//         error: function(xhr){
//             if(xhr.status == 401){
//                 window.location.href = 'login.html'
//             } else if(403){
//                 alert('Bạn không có quyền để thực hiện thao tác này')
//             }
//         }
        
//     })
// }

// function addToCart(id){  
//     $.ajax({
//         type:'get',
//         url: `http://localhost:8080/api/drugs/${id}`,
//         success: function(response){
//             alert('Đã thêm')
//             let arrCartParse;
//             let arrCart = localStorage.getItem('arrCart')
//             if(arrCart == null) arrCartParse = []
//             else arrCartParse = JSON.parse(arrCart)
//             arrCartParse.push(response)
//             localStorage.setItem('arrCart', JSON.stringify(arrCartParse))  
//         }
//     })
// }

// function sort(action){
//     if(action == 'asc'){
//         for(let i = 0; i <arrDrugs.length-1; i++){
//             for(let j = i+1; j <arrDrugs.length; j++){
//                 if(arrDrugs[j].price < arrDrugs[i].price){
//                     let temp = arrDrugs[i];
//                     arrDrugs[i] = arrDrugs[j]
//                     arrDrugs[j] = temp
//                 }
//             }
//         }
//     } else if(action == 'desc'){
//         for(let i = 0; i <arrDrugs.length-1; i++){
//             for(let j = i+1; j <arrDrugs.length; j++){
//                 if(arrDrugs[j].price > arrDrugs[i].price){
//                     let temp = arrDrugs[i];
//                     arrDrugs[i] = arrDrugs[j]
//                     arrDrugs[j] = temp
//                 }
//             }
//         } 
//     } else if(action == 'all'){
//         getData('http://localhost:8080/api/drugs')
//     }    
//     document.querySelector('.search-input').value = ''
//     renderList(arrDrugs)
// }

// function findByPriceFromTo(){
//     let valueFrom = document.querySelector('input[name=fromPrice]').value
//     let valueTo = document.querySelector('input[name=toPrice]').value
//     if(valueFrom == '' ||  valueTo == ''){
//         return;
//     }
//     document.querySelector('.search-input').value = ''
//     document.querySelector('select.orderby').value = '....'
//     let valueSort = document.querySelector('select.orderby').value
//     $.ajax({
//         type:'get',
//         url: `http://localhost:8080/api/drugs/findByPrice?price1=${valueFrom}&price2=${valueTo}`,
//         success: function(response){
//             arrDrugs = response
//             renderList(response)          
//         }
//     })
// }

// findByName.oninput = function(e){  
//     let list = []   
//     let value = findByName.value;
//     for(let x of arrDrugs){
//         if(x.name.includes(value)){
//             list.push(x)
//         }
//     }
//     renderList(list)  
// }

// buttonSort.onchange = function(){
//     let valueSort = document.querySelector('select.orderby').value
//     sort(valueSort)
// }

// buttonFindByPrice.onclick = function(){
//     findByPriceFromTo();
// }

// buttonCreate.onclick = function(){
//     event.preventDefault();
//     create()
//     document.body.style.pointerEvents = 'auto'
//     formCreate.style.display = 'none'
//     document.body.style.opacity = 1 
    
// }

// buttonShowFormCreate.onclick = function(){
//     event.preventDefault()
//     let selectCategories = document.querySelector('form.form-create>select[name=categories]')
//     selectCategories.innerHTML = ''  
//     for(let x of arrCategory){
//         let option = document.createElement('option')
//         option.value = x.id;
//         option.innerText = x.name
//         selectCategories.appendChild(option)
//     }
//     document.body.style.pointerEvents = 'none'
//     formCreate.style.pointerEvents = 'auto'
//     formCreate.style.display = 'block'
//     document.body.style.opacity = 0.87 
    
// }

// buttonHideFormCreate.onclick = function(){
//     document.body.style.pointerEvents = 'auto'
//     formCreate.style.display = 'none'
//     document.body.style.opacity = 1 
//     formCreate.reset();
// }

// getData('http://localhost:8080/api/drugs')
// getCategory()


