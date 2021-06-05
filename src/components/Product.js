import React from 'react'
import styled from 'styled-components'


const Product = ({product}) => {
    function refreshPage(){ 
        window.location.reload(); 
    }

    return (
        <Container>
            <ProductContainer>
            <ImageContainer>
                <img src={product.img}/>
            </ImageContainer>
            <ProductDetails>
                <RatingPrice>
                    <StarContainer>
                        <span class='checked'>★★★★★</span>
                    </StarContainer>
                    <ProductPrice>
                        IDR {product.price}
                    </ProductPrice>
                </RatingPrice>
                <ProductName>
                    {product.name}
                </ProductName>
                <ProductDimension>
                    <span>Dimension: </span>
                    <span>{product.dimension}</span>
                </ProductDimension>
                <ProductMaterial>
                    <span>Material: </span>
                    <span>{product.material}</span>
                </ProductMaterial>
                <ProductColours>
                    <h2>Colours: </h2>
                    <ColourContainer>
                        {/* tambahin property warna */}
                        {product.csscolours.map((colour) => (
                            <Colour style={{background : colour}}></Colour>
                        ))}
                    </ColourContainer>
                </ProductColours>
                <ProductMaterial>

                </ProductMaterial>
                {/* <AddToChart> Add To Chart</AddToChart> */}
                <RefreshButton onClick={ refreshPage }> Refresh Item</RefreshButton>
            </ProductDetails>
            </ProductContainer>
        </Container>
    )
}

export default Product

const Container = styled.div`
    --default-size: 360px;
    background-color: white;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #484848;
    overflow: hidden;

    // width: 90%;
	// max-width: 750px;
	// height: 425px;
	// background-size: 100%;
	// display: flex;
	// justify-content: center;
	// align-items: center;
	// box-shadow: 0 12.5px 20px 1px rgba(0, 0, 0, 0.3), inset 0px 0px 2px 0px rgba(0, 0, 0, 0.3);
	// border-radius: 4px;
	// color: #fff;
	// background-image: linear-gradient(-180deg, #fb947d, #FC3E65, #f23236);
`

const ProductContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`

const ImageContainer = styled.div`
    // border: 1px solid blue;
    width: var(--default-size);
    height: var(--default-size);
    img {
        width: 100%;
        height: 100%;
    }
`

const ProductDetails = styled.div`
    width: 400px;
    height: 400px;
    background-color: rgba(255,255,255,1);
    padding: 2rem;
    // padding-top: 5rem;
    text-align: left;
`
const ProductName = styled.h1`
    font-weight: bold;
`

const ProductDimension = styled.div``

const ProductMaterial = styled.div``


const RatingPrice  = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    .checked {
        color: #ffd700;
    }
`
const StarContainer = styled.div``

const ProductPrice = styled.div``

const AddToChart = styled.button`
    border: none;
    border-radius: 33px;
    background-image: linear-gradient(-180deg, #FD886E 0%, #FC3E65 100%);
    box-shadow: 0px 3px 13px 0px rgba(252, 75, 104, 0.6);
    margin-top: 20px;
    padding: 10px 40px;
    align-items: center;
    text-transform: uppercase;
    transition: all .3s ease;
    cursor: pointer;
    color: #fff;
    margin: 20px auto 0;
    display: block;

    :hover{
        transform: scale(1.1);
    }  
    :active{
        transform: scale(.9);
        box-shadow: 0 5px 40px -20px rgba(252, 75, 104, 0.6);
    }
`

const ProductColours = styled.div``

const ColourContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

const Colour = styled.span`
    width:20px;
    height:20px;
    display:inline-block;
    transition:0.3s all;
    border-radius:50%;
    background: #ef8bef;
    transition: all .3s;
    margin: 0 15px;

    :hover{
        transform: scale(1.2);
        box-shadow: 0 0 0 8px rgba(173, 173, 170, .3);
        cursor: pointer;
    }

    :active{
        transform: scale(.8);
    }
`
const RefreshButton = styled(AddToChart)``