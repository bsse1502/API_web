const loadAllProduct = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      displayProduct(data);
    });
};

const displayProduct=(products)=>{
    const productContainer =document.getElementById("product-container");
    
    products.forEach( product => {
        const div = document.createElement("div");
        div.classList.add("card");

       div.innerHTML = `
           <img class="card-img" src=${product.image} alt="" />
            <h5>${product.title}</h5>
            <h3>price: ${product.price}</h3>
            <p>${product.description.slice(0, 50)}</p>
            <button onclick="singleProduct('${product.id}')">Details</button>
        <button onclick="handleAddToCart('${product.title.slice(0, 12)}',${
      product?.price
        })">Add to Cart</button>
    `;
      productContainer.appendChild(div);
    });
};


const handleAddToCart = (name,price) =>{
    const cartCount = document.getElementById("count").innerText;
    let convertedCount = parseInt(cartCount);
    convertedCount = convertedCount  +1;
    
    document.getElementById("count").innerText =convertedCount;
    console.log(convertedCount);

    const container  = document.getElementById("cart-main-container");
    const div = document.createElement("div");
    div.innerHTML = `
    <p> ${name} </p>
    <h3 class="price"> ${price} </h3> 
    `;
    container.appendChild(div);
    UpdateTotal();
}

const UpdateTotal =()=>{
    const allPrice = document.getElementsByClassName("price");
    let count =0;
     for ( const element of allPrice){
        count = count +parseInt(element.innerText);
     }
     document.getElementById("total").innerText =count;
};

const singleProduct = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((product) => {
      const modalBody = document.getElementById("modal-body");

      modalBody.innerHTML = `
        <div class="row">
          <div class="col-md-5">
            <img src="${product.image}" class="img-fluid" alt="${product.title}">
          </div>
          <div class="col-md-7">
            <h4>${product.title}</h4>
            <h5 class="text-success">Price: $${product.price}</h5>
            <p>${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <button onclick="handleAddToCart('${product.title.slice(0, 12)}',${
      product?.price
        })">Add to Cart</button>
          </div>
        </div>
      `;

      // Show the modal
      const myModal = new bootstrap.Modal(document.getElementById("productModal"));
      myModal.show();
    });
};


loadAllProduct();