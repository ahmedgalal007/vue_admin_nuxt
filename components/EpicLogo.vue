<template>
  <img class="EpicLogo" alt="Epic Logo" src="/epic2.svg" />
</template>

<style>
.EpicLogo {
  height: 150px;
  width: 350px;
  transform: rotateY(720deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
