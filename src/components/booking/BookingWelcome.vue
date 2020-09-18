<template>
    <div>
        <h3>BookingWelcome组件</h3>
        .camera
        .panels
        - for (i = 0; i < 64; i++)
        .panel
    </div>
</template>
<script></script>
<style scoped>
    $size: 50px;

    body {
        background: #f49095;
        height: 100vh;
        overflow: hidden;
        display: flex;
        font-family: 'Anton', sans-serif;
        justify-content: center;
        align-items: center;
        perspective: 600px;
    }

    .panels {
        display: flex;
        flex-wrap: wrap;
        width: $size * 8;
    }

    .panel {
        width: $size;
        height: $size;
        border: 2px solid #006661;
        box-sizing: border-box;
        animation: box 3000ms cubic-bezier(0.645, 0.045, 0.355, 1.000) infinite;

        @for $i from 1 through 100 {
            &:nth-child(#{$i}) {
                animation-delay: $i * 18ms;
            }
        }
    }

    .camera {
        animation: cameraY 20000ms linear infinite;
        transform-style: preserve-3d;
    }

    @keyframes cameraY {
        0% {
            transform: rotateY(0deg);
        }

        100% {
            transform: rotateY(360deg);
        }
    }

    @keyframes box {
        0% {
            transform: rotateY(0deg);
        }

        20% {
            transform: rotateY(-180deg);
        }

        40% {
            transform: rotateY(-180deg) rotateX(-180deg);
        }

        60% {
            transform: rotateY(-180deg) rotateX(-180deg) translateZ($size);
        }

        80% {
            transform: rotateY(-180deg) rotateX(-180deg) translateZ(-$size) rotateZ(90deg);
        }

        100% {
            transform: rotateY(-180deg) rotateX(-180deg) translateZ(0) rotateZ(90deg);
        }
    }
</style>