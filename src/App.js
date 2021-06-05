import Product from './components/Product';
import Loading from './components/Loading';
import firebase from './firebase';
import React, { useState, useEffect} from "react";


function App() {
  //initialize constants and variables
  const SET_USER = "user1";
  const NUM_OF_PRODUCTS = 10;
  const OUT_OF_STOCK_NAME = "Sofa 2 dudukan Vienna"
  let OUT_OF_STOCK = 1;

  //react state to manage data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  //initialize firebase reference to each collection
  const refProducts = firebase.firestore().collection("products");
  const refUsers = firebase.firestore().collection("users");

  //count each product volume; return as array of number
  function countVolume(products) {
    const productsDimension = []
    products.forEach(product => {
      productsDimension.push(product.dimension.split("x").map(string => parseInt(string)))
    })

    const productsVolume = productsDimension.map(dimensions => dimensions[0]*dimensions[1]*dimensions[2])

    return productsVolume;
  }

  //ascending selection sort with 2 params; targetArr will be sorted with refArr as its sort parameter
  function twoArraySort(targetArr, refArr) {
    for (let i=0; i <= refArr.length-1; i++) {
      let smallestIdx = i
  
      for (let j=i; j <= refArr.length-1; j++) {
        if (refArr[j] < refArr[smallestIdx]) { 
          smallestIdx = j
        }
      }
  

      if (refArr[i] > refArr[smallestIdx]) {
        let temp1 = refArr[i]
        let temp2 = targetArr[i]
        refArr[i] = refArr[smallestIdx]
        targetArr[i] = targetArr[smallestIdx]
        refArr[smallestIdx] = temp1
        targetArr[smallestIdx] = temp2
      }
    }
  
    return targetArr
  }

  //sort products by its volume with reference a specific target volume as its reference
  function sortByVolume(products, productsVolume, targetVolume) {
    const distances = productsVolume.map(volume => Math.abs(volume-targetVolume))
    const filteredProducts = products.filter((product, index) => index != OUT_OF_STOCK);
    const filteredDistance = distances.filter((distance, index) => index != OUT_OF_STOCK);
    
    return twoArraySort(filteredProducts,filteredDistance)
  }

  //set product state with value from firestore database
  function getProducts() {
    setLoading(true);
    refProducts.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setProducts(items);
      setLoading(false);
    })
  }

  //set users state with value from firestore database
  function getUser() {
    refUsers.get().then((item) => {
      const users = item.docs.map((doc) => doc.data());
      const cUser = users.find(user => user.id == SET_USER)
      setUser(cUser);
    })
  }

  //update current product data in database after each render
  function updateCurrentProduct(cUser) {
    // let nextproduct = (cUser.currentproduct !== NUM_OF_PRODUCTS-2) ? cUser.currentproduct + 1 : 0

    let nextproduct = cUser.currentproduct;

    if (nextproduct === NUM_OF_PRODUCTS-2) {
      alert("You've viewed all the available products! When you refresh the page, you'll see the products from the start of the list!");
      nextproduct = 0;
    } else {
      nextproduct++;
    }
    
    refUsers.doc(cUser.id).update({
      currentproduct: nextproduct
    })
    .catch(err => console.log(err))
  }

  //call getProducts and getUser once in each render
  useEffect(() => {
    getProducts();
    getUser();
  },[])

  //call updateCurrentProduct whenever user state get changed
  useEffect(() => {
    updateCurrentProduct(user);
  },[user])


  if (products.length != 0 && user.currentproduct != undefined) {
    const productVolume = countVolume(products);
    let targetProduct;
    products.forEach((product, index) => {
      if (product.name === OUT_OF_STOCK_NAME) {
        targetProduct = index;
      }
    });
    OUT_OF_STOCK = targetProduct;
    const filteredProducts = sortByVolume(products, productVolume, productVolume[OUT_OF_STOCK])

    return (
      <div className="App">
      {/* <Header /> */}
      <Product product={filteredProducts[user.currentproduct]} />
    </div>
    );
  }

  return (
    <Loading />
  );
}

export default App;
