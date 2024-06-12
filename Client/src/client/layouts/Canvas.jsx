import React, { useEffect, useRef } from 'react';
import './Canvas.css'; 

const Canvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const laptopWidth = 400;
        const laptopHeight = 200;
        const screenWidth = 360;
        const screenHeight = 160;
        const examText = 'Exam Quiz';
        const questionText = 'What is the purpose of the this keyword ';
        const optionsText = ['A. To refer to the current object', 'B. To refer to the global object'];

        const drawLaptop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const laptopX = (canvas.width - laptopWidth) / 2;
            const laptopY = (canvas.height - laptopHeight) / 2;

            ctx.fillStyle = '#555';
            ctx.fillRect(laptopX, laptopY, laptopWidth, laptopHeight);

            const screenX = laptopX + (laptopWidth - screenWidth) / 2;
            const screenY = laptopY + (laptopHeight - screenHeight) / 2;
            ctx.fillStyle = '#000';
            ctx.fillRect(screenX, screenY, screenWidth, screenHeight);

            ctx.fillStyle = '#fff';
            ctx.font = '20px Arial';
            ctx.fillText(examText, screenX + 60, screenY + 40);

            ctx.font = '16px Arial';
            ctx.fillText(questionText, screenX + 10, screenY + 80);
            for (let i = 0; i < optionsText.length; i++) {
                ctx.fillText(optionsText[i], screenX + 10, screenY + 110 + i * 30);
            }
        };

        const animate = () => {
            drawLaptop();
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
       <aside className='row'>
            <canvas  className='col-12'  ref={canvasRef} id="canvas" width="500" height="400"></canvas>
        </aside>
    );
};

export default Canvas;
