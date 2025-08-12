// Story & Character -- Faction
document.addEventListener('DOMContentLoaded', () => {
  const logos = document.querySelectorAll('.overlay__center');
  const left = document.querySelector('.faction__image.left');
  const right = document.querySelector('.faction__image.right');
  const leftLogo = document.querySelector('.sjet-logo');
  const rightLogo = document.querySelector('.gaalsien-logo');
  const closeLeft = document.querySelector('.close-left');
  const closeRight = document.querySelector('.close-right');

  const popup = document.getElementById('popup');
  const popupImage = popup.querySelector('.popup__character-image');  // renamed as requested
  const popupName = popup.querySelector('.popup__name');
  const popupDesc = popup.querySelector('.popup__description');
    
  // Hide popup intially 
  popup.classList.add('hidden');

  // Character Data (Name, Description, & images)
  const infoData = {
    sjet: {
      name: "Rachel S'jet",
      description: ["Race: Kushan",
                    "Homeworld: Kharak",
                    "Gender: Female",
                    "Date of Birth: Before 0 AHL",
                    "Description:",
                    "Rachel S'jet was a brilliant scientist whose life changed after losing her brother. Driven to find him or learn his fate, she joined the Coalition military and trained as a scout specialist. Assigned to the carrier Kapisi, she met the Sakala’s captain before their launch, finding him arrogant and unfriendly. Shortly after departing Epsilon Base, her carrier narrowly escaped a Gaalsien attack",
                    "At Cape Wrath, Rachel led the recovery of data and advanced tech from the wrecked Ifriit-Naabal. Later, she infiltrated a Gaalsien base, uncovering vital intel about The Exile and her brother that led the Kapisi to Torin Crater. There, she commanded an advanced team defending against Gaalsien and Kiith Siidim forces vying for the Jaraci Object. Her actions delayed the attackers long enough for the Kapisi to arrive and defeat the enemy."
      ],
      images: [
        "../../media/images/Rachel Sjet.jpg",
        "../../media/images/BG-Rachel Sjet.jpg",
      ],
    },
    gaalsien: {
      name: "K'had Sajuuk",
      description: ["Race: Kushan",
                    "Homeworld: Kharak",
                    "Gender: Male",
                    "Date of Birth: N/A",
                    "Little is known about the K'Had Sajuuk's life before the events of Operation Khadiim. As part of ancient Kushan traditions that were kept alive by his kiith, the K'Had Sajuuk was the eldest patriarch of the oldest family line of Kiith Gaalsien, as only such a man could hold the title of Kiith-Sa of the entire kiith. He addressed the Coalition of the Northern Kiithid several times during the expedition stating that by going into space they had violated the Will of Sajuuk and war has been forced upon them. His only will is to make peace and stop the Kushan from entering into space.",
                    "The K'Had Sajuuk saw the expeditions sent by the Coalition of the Northern Kiithid to find the ruins of Khar-Toba, the First City of Kharak, as an invasion attempt on Gaalsien lands. When the Gaalsien realized that the Northerners were going to send an even bigger expedition than the first, the kiith declared war on the Coalition and assaulted it, destroying three of the five carriers intended for Operation Khadiim and sieging the capital city of Tiir."
      ],
      images: [
        "../../media/images/Khad Sajuuk.jpg",
        "../../media/images/BG-Khad Sajuuk.jpg",
      ],
    },
  };

  // Holds the interval ID for slideshow
  let slideshowInterval = null;

  // Starts slideshow for popup 
  function startSlideshow(faction) {
    const images = infoData[faction].images;
    let index = 0;

    // Set first image immediately and ensure opacity visible
    popupImage.style.backgroundImage = `url('${images[0]}')`;
    popupImage.style.opacity = 1;
    
    // Clear existing interval to avoid overlapping
    if (slideshowInterval) clearInterval(slideshowInterval);

    slideshowInterval = setInterval(() => {
      // Fade out
      popupImage.style.opacity = 0;

      setTimeout(() => {
        // Change image after fade out
        index = (index + 1) % images.length;
        popupImage.style.backgroundImage = `url('${images[index]}')`;

        // Fade back in
        popupImage.style.opacity = 1;
      }, 1000); // duration matches CSS transition (1s)
    }, 10000); // switch every 10 seconds
  }

  // Stops running slideshow
  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
  }

  // Loop to each logo and attach a click event 
  logos.forEach((logo) => {
    logo.addEventListener('click', () => {
      const faction = logo.dataset.faction;

      // Handle Rachel S'jet (Left)
      if (faction === 'sjet') {
        // Visual Layout
        left.classList.add('fullscreen-left');
        left.classList.remove('fullscreen-right', 'slide-in');
        right.classList.add('hidden');
        rightLogo.classList.add('hidden');
        leftLogo.classList.add('hidden');

        // Show correct close button
        closeLeft.hidden = false;
        closeRight.hidden = true;

        // Trigger slide-in animation
        requestAnimationFrame(() => {
          left.classList.add('slide-in');
        });

        // Show popup after transition is done
        left.addEventListener(
          'transitionend',
          function showPopup() {
            popupName.textContent = infoData.sjet.name;
            popupDesc.innerHTML = infoData.sjet.description
              .map(p => `<p>${p}</p>`)
              .join('');
            popup.classList.remove('hidden');
            startSlideshow('sjet');
            left.removeEventListener('transitionend', showPopup);
          },
          { once: true }
        );

        // Handle K'had Sajuuk (Right)
      } else if (faction === 'gaalsien') {
        right.classList.add('fullscreen-right');
        right.classList.remove('fullscreen-left', 'slide-in');
        left.classList.add('hidden');
        leftLogo.classList.add('hidden');
        rightLogo.classList.add('hidden');

        closeRight.hidden = false;
        closeLeft.hidden = true;

        requestAnimationFrame(() => {
          right.classList.add('slide-in');
        });

        right.addEventListener(
          'transitionend',
          function showPopup() {
            popupName.textContent = infoData.gaalsien.name;
            popupDesc.innerHTML = infoData.gaalsien.description
              .map(p => `<p>${p}</p>`)
              .join('');
            popup.classList.remove('hidden');
            startSlideshow('gaalsien');
            right.removeEventListener('transitionend', showPopup);
          },
          { once: true }
        );
      }
    });
  });

  // Close Left button behavior
  closeLeft.addEventListener('click', () => {
    left.classList.remove('slide-in');
    popup.classList.add('hidden');
    stopSlideshow();
    left.addEventListener(
      'transitionend',
      () => {
        left.classList.remove('fullscreen-left');
        right.classList.remove('hidden');
        rightLogo.classList.remove('hidden');
        leftLogo.classList.remove('hidden');
        closeLeft.hidden = true;
      },
      { once: true }
    );
  });

  // Close Right button behavior
  closeRight.addEventListener('click', () => {
    right.classList.remove('slide-in');
    popup.classList.add('hidden');
    stopSlideshow();
    right.addEventListener(
      'transitionend',
      () => {
        right.classList.remove('fullscreen-right');
        left.classList.remove('hidden');
        leftLogo.classList.remove('hidden');
        rightLogo.classList.remove('hidden');
        closeRight.hidden = true;
      },
      { once: true }
    );
  });
});
