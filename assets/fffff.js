<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Bloody Knife Cursor</title>
  <style>
    :root{
      /* tune if needed (px, relative to the 80x80 knife box after rotation) */
      --tip-x: 10px;  /* horizontal offset to the FRONT bloody edge */
      --tip-y: 30px;  /* vertical offset to the bloody edge */
      --knife-angle: -18deg; /* natural angle of your pixel PNG */
    }
    html,body{margin:0;height:100%;background:#111}
    body{cursor:none;overflow:hidden}
    /* Knife cursor */
    .knife {
      position: fixed;
      width: 80px; height: 80px;
      left: 0; top: 0;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      image-rendering: pixelated;
      transform-origin: 20px 20px;
      pointer-events: none;
      z-index: 9999;
    }
    /* Blood particle */
    .drop{
      position: fixed;
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgb(223,30,99);
      pointer-events:none;
      z-index:999;
      animation: fall var(--dur) linear forwards;
      box-shadow: 0 0 6px rgba(223,30,99,0.4);
    }
    @keyframes fall{
      0%{opacity:1; transform: translateY(0)}
      100%{opacity:0; transform: translateY(160px);} /* slightly longer drop */
    }
  </style>
</head>
<body>
  <div class="knife" id="knife"></div>

  <script>
    const KNIFE_URL = "knife.png"; // your PNG file

    let TIP_OFFSET_X = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tip-x')) || 46;
    let TIP_OFFSET_Y = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tip-y')) || 50;

    const knifeEl = document.getElementById('knife');
    knifeEl.style.backgroundImage = `url(${KNIFE_URL})`;
    knifeEl.style.transform = `rotate(var(--knife-angle))`;

    let mx = innerWidth/2, my = innerHeight/2;
    addEventListener('mousemove', (e)=>{
      mx = e.clientX; my = e.clientY;
      knifeEl.style.left = (mx - 24) + "px";
      knifeEl.style.top  = (my - 24) + "px";
    }, {passive:true});

    // Emit slightly faster drips from the bloody edge
    const DRIP_INTERVAL_MS = 260;
    const DRIP_JITTER = 3;
    setInterval(()=>{
      const d = document.createElement('div');
      d.className = 'drop';

      const size = 3 + Math.random()*3;
      const dur  = 1.4 + Math.random()*2.0; // faster fall (was 2.2 + 3.0)
      d.style.width = d.style.height = size + 'px';
      d.style.setProperty('--dur', dur + 's');
      d.style.opacity = 0.6 + Math.random()*0.35;

      const x = mx + TIP_OFFSET_X + (Math.random()*DRIP_JITTER - DRIP_JITTER/2);
      const y = my + TIP_OFFSET_Y + (Math.random()*DRIP_JITTER - DRIP_JITTER/2);
      d.style.left = x + 'px';
      d.style.top  = y + 'px';

      document.body.appendChild(d);
      setTimeout(()=>d.remove(), dur*1000);
    }, DRIP_INTERVAL_MS);
  </script>
</body>
</html>
