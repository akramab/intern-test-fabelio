import './App.css';
import Header from './components/Header';
import Product from './components/Product'
import firebase from './firebase';
import React, { useState, useEffect, useMemo} from "react";
import { RestoreFromTrash } from '@material-ui/icons';


function App() {
  const SET_USER = "user1";
  const NUM_OF_PRODUCTS = 10;
  const OUT_OF_STOCK = 1;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const refProducts = firebase.firestore().collection("products");
  const refUsers = firebase.firestore().collection("users");

  function countVolume(products) {
    const productsDimension = []
    products.forEach(product => {
      productsDimension.push(product.dimension.split("x").map(string => parseInt(string)))
    })

    const productsVolume = productsDimension.map(dimensions => dimensions[0]*dimensions[1]*dimensions[2])

    return productsVolume;
  }

  function twoArraySort(targetArr, refArr) {
    for (let i=0; i <= refArr.length-1; i++) {
      // find the idnex of the smallest element
      let smallestIdx = i
  
      for (let j=i; j <= refArr.length-1; j++) {
        if (refArr[j] < refArr[smallestIdx]) { 
          smallestIdx = j
        }
      }
  
      // if current iteration element isn't smallest swap it
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

  function sortByVolume(products, productsVolume, targetVolume) {
    const distances = productsVolume.map(volume => Math.abs(volume-targetVolume))
    const filteredProducts = products.filter((product, index) => index != OUT_OF_STOCK);
    const filteredDistance = distances.filter((distance, index) => index != OUT_OF_STOCK);
    return twoArraySort(filteredProducts,filteredDistance)
  }

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

  // function getProducts() {
  //   setLoading(true);
  //   refProducts.get().then((item) => {
  //     const items = item.docs.map((doc) => doc.data());
  //     setProducts(items);
  //     setLoading(false);
  //   })
  // }

  // function getUser() {
  //   refUsers.onSnapshot((querySnapshot) => {
  //     const users = [];
  //     querySnapshot.forEach((doc) => {
  //       users.push(doc.data())
  //     });
  //     const cUser = users.find(user => user.id == SET_USER)
  //     setUser(cUser);
  //   })
  // }

  function getUser() {
    refUsers.get().then((item) => {
      const users = item.docs.map((doc) => doc.data());
      const cUser = users.find(user => user.id == SET_USER)
      setUser(cUser);
    })
  }

  function updateCurrentProduct(cUser) {
    console.log("Nilai saat ini " + cUser.currentproduct)
    let nextproduct = (cUser.currentproduct !== NUM_OF_PRODUCTS) ? cUser.currentproduct + 1 : 1
    console.log("Nilai next " + nextproduct)
    if (nextproduct === OUT_OF_STOCK) {
      nextproduct = (nextproduct !== NUM_OF_PRODUCTS) ? nextproduct + 1 : 1
      console.log("Nilai kalau masuk if "+nextproduct)
    }
    refUsers.doc(cUser.id).update({
      currentproduct: nextproduct
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getProducts();
    getUser();
  },[])

  useEffect(() => {
    updateCurrentProduct(user);
  },[user])


  if (products.length != 0 && user.currentproduct != undefined) {
    const productVolume = countVolume(products);
    console.log("Yang udah urut")
    console.log("Produk yang OUT OF STOCK: "+products[OUT_OF_STOCK].name)
    console.log(sortByVolume(products, productVolume, productVolume[OUT_OF_STOCK]))

    return (
      <div className="App">
      {/* <Header /> */}
      <Product product={products.find(product => product.id == user.currentproduct)} />
    </div>
    );
  }

  return (<div>Loading....</div>
  );
}

export default App;
