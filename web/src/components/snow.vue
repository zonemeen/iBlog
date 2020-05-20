<template>
  <canvas id="Snow"></canvas>
</template>

<script>
export default {
  methods: {
    canvas() {
      var flakes = [],
        canvas = document.getElementById("Snow"),
        ctx = canvas.getContext("2d"),
        flakeCount = 150,
        mX = -100,
        mY = -100;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      function snow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < flakeCount; i++) {
          var flake = flakes[i],
            x = mX,
            y = mY,
            minDist = 200,
            x2 = flake.x,
            y2 = flake.y;

          var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

          if (dist < minDist) {
            var force = minDist / (dist * dist),
              xcomp = (x - x2) / dist,
              ycomp = (y - y2) / dist,
              deltaV = force / 2;

            flake.velX -= deltaV * xcomp;
            flake.velY -= deltaV * ycomp;
          } else {
            flake.velX *= 0.98;
            if (flake.velY <= flake.speed) {
              flake.velY = flake.speed;
            }
            flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
          }

          ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
          flake.y += flake.velY;
          flake.x += flake.velX;

          if (flake.y >= canvas.height || flake.y <= 0) {
            reset(flake);
          }

          if (flake.x >= canvas.width || flake.x <= 0) {
            reset(flake);
          }

          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
          ctx.fill();
        }
        requestAnimationFrame(snow);
      }

      function reset(flake) {
        flake.x = Math.floor(Math.random() * canvas.width);
        flake.y = 0;
        flake.size = Math.random() * 3 + 2;
        flake.speed = Math.random() * 1 + 0.4;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = Math.random() * 0.5 + 0.1;
      }

      function init() {
        for (var i = 0; i < flakeCount; i++) {
          var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = Math.random() * 3 + 2,
            speed = Math.random() * 1 + 0.4,
            opacity = Math.random() * 0.5 + 0.1;

          flakes.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random() / 30) * 2,
            step: 0,
            angle: 180,
            opacity: opacity,
          });
        }

        snow();
      }

      document.addEventListener("mousemove", function(e) {
        (mX = e.clientX), (mY = e.clientY);
      });
      window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
      init();
    },
  },
  mounted() {
    this.canvas();
  },
};
</script>

<style>
#Snow {
  z-index: -9999;
  position: fixed;
}
</style>
