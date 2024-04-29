document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const colors = {
      red: [255, 0, 0],
      green: [0, 255, 0],
      blue: [0, 0, 255],
      yellow: [255, 255, 0],
      orange: [255, 165, 0],
      purple: [128, 0, 128],
      black: [0, 0, 0],
      white: [255, 255, 255]
    };
  
    let selectedColors = [];
    let mixedColor = [0, 0, 0];
  
    function mixColors() {
      let totalColors = selectedColors.length;
      mixedColor = [0, 0, 0]; // Reset mixedColor
      for (let color of selectedColors) {
        for (let i = 0; i < 3; i++) {
          mixedColor[i] += colors[color][i];
        }
      }
  
      // Calculate the weighted average of the mixed color
      for (let i = 0; i < 3; i++) {
        mixedColor[i] = Math.round(mixedColor[i] / totalColors); // Calculate average
      }
  
      return mixedColor;
    }
  
    function updateResult() {
      let hex = rgbToHex(mixedColor[0], mixedColor[1], mixedColor[2]);
      let percentage = (100 / selectedColors.length).toFixed(2) + '%';
  
      context.fillStyle = `rgb(${mixedColor[0]}, ${mixedColor[1]}, ${mixedColor[2]})`;
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      let resultDiv = document.getElementById("result");
      resultDiv.textContent = `Hex: ${hex} Percentage: ${percentage}`;
      resultDiv.style.backgroundColor = `rgb(${mixedColor[0]}, ${mixedColor[1]}, ${mixedColor[2]})`;
    }
  
    function rgbToHex(r, g, b) {
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
  
    canvas.addEventListener('dragover', function (event) {
      event.preventDefault();
    });
  
    canvas.addEventListener('drop', function (event) {
      event.preventDefault();
      let color = event.dataTransfer.getData('text/plain');
      selectedColors.push(color);
      mixColors();
      updateResult();
    });
  
    const draggableElements = document.querySelectorAll('.draggable');
  
    draggableElements.forEach(function (draggable) {
      draggable.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', draggable.classList[1]);
      });
    });

     // Function to reset canvas
  function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    selectedColors = []; // Clear selected colors array
    mixedColor = [0, 0, 0]; // Reset mixed color
    updateResult(); // Update result
  }

  // Event listener for reset canvas button
  document.getElementById('resetCanvasBtn').addEventListener('click', resetCanvas);

  
    updateResult();
  });
  