let table = document.querySelector('.cart-area>.container-fluid>.row>.col-xl-9>.cart-table>.tables')
let arrCartParse;
let arrCart = localStorage.getItem('arrCart')
if(arrCart == null) arrCartParse = []
else arrCartParse = JSON.parse(arrCart)
 
function getData(url){

            let str = ''
            table.innerHTML = ''
            str += `
                <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>unit price</th>
                    <th>Total</th>
                </tr>
                `
            let newHead = document.createElement('thead')
            newHead.innerHTML = str
            table.appendChild(newHead)
            for(let x of arrCartParse){  
				  
                str = ''
                str = str + `<tbody>
									<tr>
										<td>
											<a href="#">X</a>
										</td>
										<td>
											<a href="#">
												<div class="product-image">
													<img alt="Stylexpo" src="${x.image}">
												</div>
											</a>
										</td>
										<td>
											<div class="product-title">
												<a href="#">${x.name}</a>
											</div>
										</td>
										<td>
											<div class="quantity">
												<input type="number" value="0">
											</div>
										</td>
										<td>
											<ul>
												<li>
													<div class="price-box">
														<span class="price">${x.price}</span>
													</div>
												</li>
											</ul>
										</td>
										<td>
											<div class="total-price-box">
												<span class="price">${x.price}</span>
											</div>
										</td>

									</tr>
                                </tbody>`
                                let newBody = document.createElement("tbody")
                                newBody.innerHTML = str
                                table.appendChild(newBody)
								let changeQuantity = newBody.querySelector('tbody>tr>td>.quantity>input')
								
								let totalPrice = newBody.querySelector('tbody>tr>td>.total-price-box>span')
								changeQuantity.oninput = function(){
									if(changeQuantity.value < 0) changeQuantity.value = 0
									totalPrice.innerText = changeQuantity.value * x.price
								}  
								changeQuantity.onchange = function(){
									totalPrice.innerText = changeQuantity.value * x.price
									if(changeQuantity.value < 0) changeQuantity.value = 0
								}    
								let deleteFromCart = newBody.querySelector('tbody>tr>td>a')
                                deleteFromCart.onclick = function(){
                                    event.preventDefault()
                                    event.stopPropagation()
                                    let arrCartParse1;
                                    let arrCart1 = localStorage.getItem('arrCart')
                                    arrCartParse1 = JSON.parse(arrCart1)
                                    let newArrCart = []
                                    for (let xx of arrCartParse1){
                                        if(xx.id != x.id){
                                            newArrCart.push(xx)
                                        }
                                    }
                                    localStorage.setItem('arrCart', JSON.stringify(newArrCart))
                                    window.location.href = 'cart.html'
                                }            
            }
}
getData('http://localhost:8080/api/carts')
