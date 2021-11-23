<template>
  <div class="loader">
    <div>
      <div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$blue: #375a7f;
$bronze: #cbb87f;

@mixin loaderDivMixin {
  border-radius: 50%;
  padding: 0.5rem;
  border: 2px solid transparent;
  animation: rotate linear 3.5s infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  position: relative;
  margin: 1.75rem auto;
  width: 100px;
  height: 100px;
  display: block;
  overflow: hidden;

  div {
    @include loaderDivMixin;
    height: 100%;
    border-top-color: $blue;
    border-left-color: $bronze;
    animation-timing-function: cubic-bezier(0.55, 0.38, 0.21, 0.88);
    animation-duration: 3s;

    &:hover {
      animation-play-state: paused;
    }
  }
}
</style>