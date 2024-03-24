let table = document.querySelector('.cart-area>.container-fluid>.row>.col-xl-9>.cart-table>.tables')

function getData(url){

    $.ajax({
        type:'get',
        url: url,
        success: function(response){
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
			if(response == null) return;
            for(let x of response){
                console.log(response);
                str = ''
                str = str + `<tbody>
<tr>
										<td>
											<a href="#">X</a>
										</td>
										<td>
											<a href="#">
												<div class="product-image">
													<img alt="Stylexpo" src="media/images/product/cp1.jpg">
												</div>
											</a>
										</td>
										<td>
											<div class="product-title">
												<a href="#">Cross Colours Camo Print Tank half mengo</a>
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
														<span class="price">$387 x 2</span>
													</div>
												</li>
											</ul>
										</td>
										<td>
											<div class="total-price-box">
												<span class="price">$774</span>
											</div>
										</td>

									</tr>
                                </tbody>`
                                let newBody = document.createElement("tbody")
                                newBody.innerHTML = str
                                table.appendChild(newBody)
                
            }
        }
    })
}
getData('http://localhost:8080/api/carts')