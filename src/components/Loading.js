import React from 'react'
import './../css/loading.css'



const Loading = () => {
    return (
        <div>
            <div class="loading-container">
                <div class="spinner">
                    <div class="loading-text">Loading</div>
                    <div class="section red-section"></div>
                    <div class="section green-section"></div>
                    <div class="section blue-section"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading
