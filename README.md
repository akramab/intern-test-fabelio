# Simple Webpage to Display Similiar Products

> Made to fill the requirement for Fabelio's Intern Challenge

## Case
    
    Budi wants to buy a Sofa 2 dudukan Vienna but it's sold out, so he decided to buy something similar with what he wanted before.

    You are going to help Budi to create a web page that shows 1 similar product each time he accessing the page. Whenever Budi comes back to this page he can't see the same product unless all product in list already seen by him. The sequence is from the most similar product to the least similar. Use attribute(s) in product list to decide similarity between products.
    

## Solution
With the given data, the attribute(s) of each product that we have are: Product Name, Price, Dimension, Colours, Material, and Product Image

From some sources, for example: https://www.thespruce.com/considerations-before-buying-sofa-1391489, we could infer that Size is one of the deciding factors when it comes to buying a Sofa. So the algorithm will first look for the product that has the most similiar size (in this case, Dimension (Volume)) from the reference product, and it will sort the product list starting from the product that has the smallest Δ in terms of dimension from the reference product .

Sometimes we also need to account for price too. So, the algorithm will next try to look for products that have the same Δ in dimension, and it will try to sort it again from the one that has the smallest Δ in price from the reference product.

The current product ID that's currently being viewed by the user is stored in a database. And it will constantly update itself whenever the page is rendered, so that every product will be viewed in succession, according to the list that has been sorted by the algorithm.

## Made With
- React
- Firestore Database

## Deployed on
https://silly-sammet-9faab6.netlify.app/

## Author:
- Muhammad Akram Al Bari (Institut Teknologi Bandung)