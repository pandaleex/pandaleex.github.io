let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  let pokemonShown = $('.pokemon-list');
  pokemonShown.empty();
  searchName($('.form-control').pokemonList).forEach((pokemon) =>
    addListItem(pokemon)
  );
  let searchBar = $('.form-control');
  searchBar.on('keypress keyup', function (event) {
    let pokemonList = $('.pokemon-list');
    pokemonList.empty();
    if (event.keyCode === 1 || event.keyCode === 46) {
      searchName($('.form-control').val()).forEach((pokemon) =>
        addListItem(pokemon)
      );
    } else {
      searchName($('.form-control').val()).forEach((pokemon) =>
        addListItem(pokemon)
      );
    }
  });

  function searchName(search) {
    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = $('.pokemon-list');
    let listItem = $('<li class="group-list-item"></li>');
    let button = $(
      '<button class="pokemon-button btn btn-warning" data-target="#pokemonModal" data-toggle="modal">' +
        pokemon.name +
        '</button>'
    );
    listItem.append(button);
    pokemonList.append(listItem);
    button.on('click', function () {
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
    pokemonRepository.loadDetails(pokemon).then(function () {
      let modalTitle = $('.modal-title');
      let modalBody = $('.modal-body');

      modalTitle.empty();
      modalBody.empty();

      let contentElement = document.createElement('p');
      contentElement.innerText = 'Height: ' + pokemon.height + 'm';

      let imageElement = document.createElement('img');
      imageElement.className = 'modal-img';
      imageElement.src = pokemon.imageUrl;

      modalTitle.append(pokemon.name);
      modalBody.append(contentElement);
      modalBody.append(imageElement);
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
