const rickContainer = document.querySelector(".rmContainer");
const rickSearch = document.querySelector(".search");
const rickInput = document.querySelector(".searchInput");
const rickBtn = document.querySelector(".searchBtn");

/* karakter */
const rmCount = 825;
const bgColor = {};
/* toggle */
rickBtn.addEventListener("click", () => {
  rickSearch.classList.toggle("active");
});
rickInput.addEventListener("input", (e) => {
  const searchValue = rickInput.value.toLowerCase();
  const rmNames = document.querySelectorAll(".rmName");
  rmNames.forEach((rmName) => {
    rmName.parentElement.parentElement.style.display = "block";

    if (!rmName.innerHTML.toLowerCase().includes(searchValue)) {
      rmName.parentElement.parentElement.style.display = "none";
    }
  });
});

/* asenkron islemler */
const fetchRm = async () => {
  for (let i = 1; i < rmCount; i++) {
    await getRm(i);
  }
};
/* data list kontrol ettikten sonra data icin rmlist olusturduk*/
const getRm = async (id) => {
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  rmlist(data);
};
const rmlist = (rmHidden) => {
  const rmType =
    rmHidden.types && rmHidden.types.length > 0 ? rmHidden.types[0] : "Unknown";

  const rickDiv = document.createElement("div");
  rickDiv.classList.add("rmHidden");
  const rickId = rmHidden.id.toString().padStart(3, "0");

  const rmBg = bgColor[rmType];
  rickDiv.style.backgroundColor = `${rmBg}`;
  const statusColor = rmHidden.status === "Dead" ? "red" : "green";
  const genderColor = rmHidden.gender === "Male" ? "blue" : "pink";
  const speciesColor = rmHidden.species === "Human" ? "yellow" : "brown";
  const rmDivInnerHTML = `
  <div class="imgContainer">
            <img src="https://rickandmortyapi.com/api/character/avatar/${rmHidden.id}.jpeg" alt="rick1" />
            <!-- hepsi dinamik olarak gelicek bubrasi gizli bolge -->
        </div>
        <div class="biInfo">
            <span class="RmId">${rickId}</span>
            <h3 class="rmName">${rmHidden.name}</h3>
            <small class="ikon">
            
            <i class="fa-solid fa-bowling-ball" style="color: ${statusColor};"></i> <span> ${rmHidden.status}</span>

            <i class="fa-solid fa-mars" style="color: ${genderColor};"></i> <span>${rmHidden.gender}</span>

            <i class="fa-solid fa-person-half-dress" style="color: ${speciesColor};"></i> <span>${rmHidden.species}</span>

            </small>
        </div>
    `;
  rickDiv.innerHTML = rmDivInnerHTML;
  rickContainer.appendChild(rickDiv);
};
fetchRm();
