let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = $(".pokemon-list");
    let listItem = $('<li class="group-list-item"></li>');
    let button = $('<button class="pokemon-button btn btn-warning" data target="#modal-container" data-toggle="modal">' + pokemon.name + '</button>');
    listItem.append(button);
    pokemonList.append(listItem);
    button.on("click", function () {
      showDetails(pokemon);
    });
  }
  

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(item).then(function () {
      let modalContainer = document.querySelector("#modal-container");

      modalContainer.innerHTML = "";

      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "X";
      closeButtonElement.addEventListener("click", hideModal);

      let titleElement = document.createElement("h1");
      titleElement.innerText = item.name;

      let contentElement = document.createElement("p");
      contentElement.innerText = "Height: " + item.height;

      let imgElement = document.createElement("img");
      imgElement.src = item.imageUrl;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);
      modal.appendChild(imgElement);

      modalContainer.classList.add("is-visible");

      function hideModal() {
        modalContainer.classList.remove("is-visible");
      }

      window.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          modalContainer.classList.contains("is-visible")
        ) {
          hideModal();
        }
      });

      modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      document
        .querySelector("button.pokemon-button btn btn-warning")
        .addEventListener("click", () => {
          showDetails(pokemon.name, "Modal Content");
        });
    });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
