let pokemonRepository = (function () {
    let pokemonList = [
        {
            name:'Bulbasaur',
            height: 0.7,
            type: ['grass','poison']
        },
        {
            name:'Ivysaur',
            height: 1,
            type: ['grass','poison']
        },
        {
            name:'Venusaur',
            height: 2,
            type: ['grass','poison']
        },
    ];



  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();


pokemonRepository.add({ name: 'Charmander', height: 2, type: ['fire'] });

let pokemonList = pokemonRepository.getAll();

//Using HTML within JavaScript so styling can be applied
document.write('<div class="pokemonList">');
//A forEach() loop which states a Pokemon's name and weight
pokemonList.forEach(function(pokemon) {
    if (pokemon.height>1.5) {
        document.write('<div class="pokemon--big">');
        document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Wow, that\'s giant!' + '</p>')
    } else if (pokemon.height<1) {
        document.write('<div class="pokemon--small">');
        document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + ' - Aww, that\'s tiny!!' + '</p>')
    }
    else {
        document.write('<div class="pokemon--mid">'); 
        document.write('<p>' + pokemon.name + ', height: ' + pokemon.height + '</p>')
}
document.write('</div>')
  });
      pokemonList.forEach(pokemonRepository);
      document.write('</div>') //Ends div element for pokemonList grid
