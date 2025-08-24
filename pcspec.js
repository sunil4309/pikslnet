// pcspec.js

const pcProducts = [
  {
    id: "PC-001",
    name: "Graphic Card",
    image: "spec/rtx 4060.png",   // update with your image path
    specs: "RTX 4060, 8GB, ",
    price: "₹ 92,000"
  },
  {
    id: "PC-002",
    name: "Processor",
    image: "spec/5700x.png",
    specs: "Ryzen 7, 5700X Desktop Processor,cores 16 Threads 36 MB Cache 3.4 GHz Upto 4.6 GHz ",
    price: "₹ 38,000"
  },
  {
    id: "PC-003",
    name: "Mother Board",
    image: "spec/b550m.png",
    specs: "GIGABYTE Micro ATX B550M K DDR4",
    price: "₹ 19,999"
  },
 {
    id: "PC-004",
    name: "Power Supply(SMPS)",
    image: "spec/pk650d.png",
    specs: "Deepcool PK650D 650 Watts Computer PSU with 2 SATA Cables",
    price: "₹ 7,999"
  },
   {
    id: "PC-005",
    name: "Liquid Cooler",
    image: "spec/le520.png",
    specs: "Deepcool LE520 240mm ARGB AIO / CPU Liquid Liquid Cooling Cabinet Cooler",
    price: "₹ 8,599"
  },


];

// Render dynamically
const container = document.getElementById("pcspec-list");

if (container) {
  pcProducts.forEach(product => {
    const row = document.createElement("div");
    row.classList.add("pc-row");

    row.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="pc-image">
      <div class="pc-details">
        <h2>${product.name}</h2>
        <p><strong>Specs:</strong> ${product.specs}</p>
        <p class="pc-price">${product.price}</p>
      </div>
    `;

    container.appendChild(row);
  });
}

