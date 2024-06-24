const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== "") {
        
        console.log("Mencari:", searchTerm);
        
    } else {
        alert("Masukkan nama yang ingin dicari");
    }
});