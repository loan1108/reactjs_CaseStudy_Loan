import React from 'react'

export default function Loading() {
    return (
        <div style={{
            height: "100%",
            width: "100%",
            opacity: 0.3,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "silver",
            zIndex: 1000,
        }}>
            <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    height: "fit-content",
                    width: "fit-content"
                }}>
                <div className="spinner-border" role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}