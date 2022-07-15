function init() {
	changeSize(0);
	const sizeDecreaseButton = document.querySelector("#size-decrease");
	const sizeIncreaseButton = document.querySelector("#size-increase");
	sizeDecreaseButton.addEventListener("click", () => { changeSize(-1); });
	sizeIncreaseButton.addEventListener("click", () => { changeSize(1); });
}

function changeSize(amount) {
	const grid = document.querySelector("#sketch-container");
	const gridSizeData = document.querySelector("#settings");
	gridSizeData.dataset.size = Number(gridSizeData.dataset.size) + amount;
	gridSize = Number(gridSizeData.dataset.size);
	if(gridSize < 1) gridSize = 1;
	if(gridSize > 25) gridSize = 25;
	gridSizeData.dataset.size = gridSize;

	grid.style.gap = `calc(8% / ${gridSize}`;

	while(grid.lastChild) {
		grid.removeChild(grid.lastChild);
	}	
	
	grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`; 
	for(let y = 1; y < gridSize + 1; y++) { 
		for(let x = 1; x < gridSize + 1; x++) { 
			const pixel = document.createElement("div");
			pixel.classList.add("pixel");
			pixel.style.gridColumn = y;
			pixel.style.gridRow = x;
			grid.appendChild(pixel);
			
			pixel.addEventListener("mouseover", (e) => {
				e.currentTarget.classList.add("on");
			});
		}
	}

	const sizePrompt = document.querySelector("#size-prompt");
	let visualSize = "";
	if(gridSize < 10) visualSize += 0;
	visualSize += gridSize;
	sizePrompt.innerHTML = `GRID SIZE: ${visualSize}`;
}

init();
