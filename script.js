
      // Add event listeners to car buttons to toggle dark background class
      document.addEventListener("DOMContentLoaded", function () {
        const carButtons = document.querySelectorAll(".car-container button");
        carButtons.forEach((button) => {
          button.addEventListener("click", function () {
            carButtons.forEach((btn) =>
              btn.classList.remove("dark-background")
            );
            this.classList.add("dark-background");
          });
        });
      });

      // Fetch track data from the server and populate the track cards
      async function fetchTracks() {
        try {
          const response = await fetch("http://localhost:3000/inscriptions");
          const tracks = await response.json();

          console.log("Tracks data:", tracks);

          const tracksContainer = document.getElementById("tracksContainer");

          tracks.forEach((track) => {
            const card = document.createElement("div");
            card.className = "track-card";

            const trackName = track.name[0].toLowerCase().replace(/\s+/g, "-");
            const imgSrc = `imgs/tracks/${trackName}.webp`;

            // Create track card HTML structure
            card.innerHTML = `
                    <button class="track-button">
                        <img src="${imgSrc}" alt="${track.name[0]}" class="track-image" onerror="this.onerror=null;this.src='imgs/tracks/default.webp';">
                        <div class="track-info">
                            <h2>${track.name[0]}</h2>
                            <p><strong>Location:</strong> ${track.location[0]}</p>
                            <p><strong>Length:</strong> ${track.length[0]}</p>
                            <p><strong>Price Per Lap:</strong> ${track.priceperlap[0]}</p>
                            <p><strong>Difficulty:</strong> ${track.difficulty[0]}</p>
                        </div>

                        <div class="laps-input">
                            <label for="laps-${track.name[0]}">Vueltas:</label>
                            <input type="number" id="laps-${track.name[0]}" name="laps" min="1" max="20" value="1" oninput="validateLaps(this)">
                        </div>

                        <div class="add-to-cart-popup">
                            <button class="add-to-cart-button">Añadir al carrito</button>
                        </div>
                    </button>
                `;

            tracksContainer.appendChild(card);
          });
        } catch (error) {
          console.error("Error fetching tracks:", error);
        }
      }

      // Validate the number of laps input
      function validateLaps(input) {
        if (input.value > 20) input.value = 20;
        if (input.value < 1) input.value = 1;
      }

      // Fetch tracks data on page load
      fetchTracks();