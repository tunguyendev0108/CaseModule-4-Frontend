let container = document.querySelector('.shop-content>.tab-content>.tab-pane>.row')


function getData(url){
$.ajax({
    url: url,
    type: 'get',
    
    success: function(response) {
        for(let x of response){
            let str = ""
            str += `
            <div class="sin-product style-two">
                <div class="pro-img">
                    <img src="${x.image}" alt="">
                </div>
                <div class="mid-wrapper">
                    <h5 class="pro-title"><a href="product.html">${x.name}</a></h5>
                    <div class="color-variation">
                        <ul>
                            <li><i class="fas fa-circle"></i></li>
                            <li><i class="fas fa-circle"></i></li>
                            <li><i class="fas fa-circle"></i></li>
                            <li><i class="fas fa-circle"></i></li>
                        </ul>
                    </div>
                    <p>${x.price} VNĐ</span></p>
                </div>
                <div class="icon-wrapper">
                    <div class="pro-icon">
                        <ul>
                            <li><a href="#"><i class="flaticon-valentines-heart"></i></a></li>
                            <li><a href="#"><i class="flaticon-compare"></i></a></li>
                            <li><a href="#" class="trigger"><i class="flaticon-eye"></i></a></li>
                        </ul>
                    </div>
                    <div class="add-to-cart">
                        <a href="#">add to cart</a>
                    </div>
                </div>
            </div>
        `
            let newTag = document.createElement('div')
            newTag.className = 'col-sm-6 col-xl-3'
            newTag.innerHTML = str
            container.appendChild(newTag)
        }
        
    },
    error: function(xhr, status, error) {
      console.log('Upload failed:', error);
    }
  });
}
getData('http://localhost:8080/api/drugs')
let findByName = document.querySelector('.search-input')
findByName.onkeyup = function(e){
    if(e.keyCode == 13){
        container.innerHTML = ''
        getData(`http://localhost:8080/api/drugs/findByName?name=${findByName.value}`)
    }
}

