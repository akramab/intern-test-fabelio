import React from 'react'
import styled from 'styled-components'

const Header = () => {
    return (
        <Nav>
            <>
                <NavMenu>
                    <a href = "/">
                        <span>HOME</span>
                    </a>
                    <a href="/">
                        <span>SEARCH</span>
                    </a>
                    <a href="/">
                        <span>WATCHLIST</span>
                    </a>
                    <a href="/">
                        <span>ORIGINAL</span>
                    </a>
                    <a href="/">
                        <span>MOVIES</span>
                    </a>
                    <a href="/">
                        <span>SERIES</span>
                    </a>
                </NavMenu>
            </>
        </Nav>
    )
}

export default Header

const Nav = styled.div`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
`

// const Logo = styled.img`
//     width: 80px;
// `

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`