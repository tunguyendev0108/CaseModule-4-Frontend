let areaShow = document.querySelector('.shop-area>.container-fluid>.row>.order-1>.row')
let arrCategory = []
areaShow.innerHTML = ''
function getDataDrug(){
    let id = localStorage.getItem('drugId')
    $.ajax({
        type:'get',
        url:`http://localhost:8080/api/drugs/${id}`,
        success: function(response){
            let str = `<div class="col-lg-6 col-xl-6">							
<div class="quickview-slider">
    <div class="slider-for">
        <div class="">
            <img src="${response.image}" alt="Thumb">
        </div>      
    </div>
    <div class="slider-nav">
    </div>
</div>
<br>
<div>
    <button class="buttonUpdate" style="border-radius:10px; background-color:green">Cập nhật</button>
    <button class="buttonDelete" style="border-radius:10px; background-color:red">Xoá</button>
</div>
</div>


<div class="col-lg-6 col-xl-6">
<div class="product-details">
    <h5 class="pro-title"><a href="#">${response.name}</a></h5>
    <span class="price">Price : ${response.price} VNĐ</span>
    <div class="size-variation">
        <span>size :</span>
    </div>
    <div class="color-checkboxes">
        <h4>Color:</h4>
        <input class="color-checkbox__input" id="col-Blue" name="colour" type="radio">
        <label class="color-checkbox" for="col-Blue" id="col-Blue-label"></label>
        <span></span>

        <input class="color-checkbox__input" id="col-Green" value="#8bc34a" name="colour" type="radio">
        <label class="color-checkbox" for="col-Green" id="col-Green-label"></label>
        <span></span>

        <input class="color-checkbox__input" id="col-Yellow" value="#fdd835" name="colour" type="radio">
        <label class="color-checkbox" for="col-Yellow" id="col-Yellow-label"></label>
        <span></span>

        <input class="color-checkbox__input" id="col-Orange" value="#ff9800" name="colour" type="radio">
        <label class="color-checkbox" for="col-Orange" id="col-Orange-label"></label>
        <span></span>

        <input class="color-checkbox__input" id="col-Red" value="#f44336" name="colour" type="radio">
        <label class="color-checkbox" for="col-Red" id="col-Red-label"></label>
        <span></span>

        <input class="color-checkbox__input" id="col-Black" value="#222222" name="colour" type="radio">
        <label class="color-checkbox" for="col-Black" id="col-Black-label"></label>
        <span></span>
    </div>

    <div class="add-tocart-wrap">
        
        <div class="cart-plus-minus-button">
            <input type="text" value="1" name="qtybutton" class="cart-plus-minus">
        </div>
        <a href="#" class="add-to-cart"><i class="flaticon-shopping-purse-icon"></i>Add to Cart</a>
    </div>

    <p>${response.description}</p>
    <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>quis nostrud exercitation ullamco</li>
        <li>Duis aute irure dolor in reprehenderit</li>
    </ul>
    <div class="product-social">
        <span>Share :</span>
        <ul>
            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
        </ul>
    </div>

</div>
</div>`
            areaShow.innerHTML = str

            
            let buttonDelete = document.querySelector('.buttonDelete')
            buttonDelete.onclick = function(){
                delete1()
            }
        

            let buttonShowFormUpdate = document.querySelector('.buttonUpdate')
            buttonShowFormUpdate.onclick = function(){
            event.preventDefault()
            let selectCategories = document.querySelector('form.form-update>select[name=categories]')
            selectCategories.innerHTML = ''  
            for(let x of arrCategory){
                let option = document.createElement('option')
                option.value = x.id;
                option.innerText = x.name
                selectCategories.appendChild(option)
            }
            document.body.style.pointerEvents = 'none'
            formUpdate.style.pointerEvents = 'auto'
            formUpdate.style.display = 'block'
            document.body.style.opacity = 0.87 
    
        }
        }
    })
}
getDataDrug()
getCategory()
function getCategory(){
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/category',
        success: function(response){
            arrCategory = response
        }
    })
}
let formUpdate = document.querySelector('form.form-update')

function delete1(){
    let id = localStorage.getItem('drugId')
    let token = localStorage.getItem('accessToken')
    $.ajax({
        type:'delete',
        url:`http://localhost:8080/api/drugs/delete/${id}`,
        headers:{
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        },
        success: function(response){
            
            alert('Đã xoá sản phẩm này khỏi của hàng')
            window.location.href = 'list-drug.html'

        },
        error: function(xhr){
            let token = localStorage.getItem('accessToken')
            
            if(xhr.status == 401 && token != null){
                alert('Bạn không có quyền để thực hiện thao tác này')
            } else if(xhr.status == 401){
                window.location.href = 'login.html'
            } 
        }
    })
}

function update(){
    let token = localStorage.getItem('accessToken')
    let id = localStorage.getItem('drugId')
    formUpdate.querySelector('input[name=id]').value = id
    console.log(formUpdate.querySelector('input[name=id]'));
    let form = new FormData(formUpdate)
    
    
    $.ajax({
        url: `http://localhost:8080/api/drugs/update`,
        type: 'put',
        headers:{
            'Accept': 'application/json',
            "Authorization": "Bearer " + token
        },
        data:form,
        processData:false,
        contentType: false,
        
        success: function(response){
            alert("Sản phẩm đã được cập nhật thành công");
            formUpdate.reset();
            getData('http://localhost:8080/api/drugs');
        },
        error: function(xhr){
            let token = localStorage.getItem('accessToken')
            
            if(xhr.status == 401 && token != null){
                alert('Bạn không có quyền để thực hiện thao tác này')
            } else if(xhr.status == 401){
                window.location.href = 'login.html'
            } 
        }
        
    })
}
let buttonUpdate = document.querySelector('form.form-update>button[type=submit]')
console.log(buttonUpdate);

buttonUpdate.onclick = function(){
    event.preventDefault()
    update()
}

let buttonHideFormUpdate = document.querySelector('form.form-update svg')
buttonHideFormUpdate.onclick = function(){
    document.body.style.pointerEvents = 'auto'
    formUpdate.style.display = 'none'
    document.body.style.opacity = 1 
    formUpdate.reset();
}

