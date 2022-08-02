let pokemonList=[
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

//Using HTML within JavaScript so styling can be applied
document.write('<div class="pokemonList">');
//A for loop which states a Pokemon's name and weight
for (let i = 0; i < pokemonList.length; i++) {
	if (pokemonList[i].height > 1.5) {
        document.write('<div class="pokemon--big">');
		document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ') - Wow, that\'s giant!') //Adds conditions for stating the giant size of the pokemon
	} else if (pokemonList[i].height <= 1.5 && pokemonList[i].height >= 1) {
        document.write('<div class="pokemon--mid">'); 
		document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')')
	} else	if (pokemonList[i].height < 1) { 
        document.write('<div class="pokemon--small">');
		document.write('<p>' + pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ') - Aww, that\'s tiny!') //Adds conditions for stating the small size of the pokemon
	}
    document.write('</div>');}
    document.write('</div>'); //Ends div element within HTML