var pokemon = undefined
var team = []

$(document).ready(function() {
  // Load Team
  loadTeam();
  updatePokemonsList();

  // Update UI
  $('#messageFinderEmpty').hide();
  $('#loader').hide();

  // Register Events
  $('#pokemonField').on('keypress', function(e) {
    if (e.which === 13) {
      searchPokemon();
    }
  });
});

function searchPokemon() {
  // Update UI
  $('#pokemonResult').empty();
  $('#messageFinderEmpty').hide();
  $('#messageFinderDefault').hide();

  if ($('#pokemonField').val()) {
    $('#loader').show();

    // AJAX Call
    $.get('/pokemon?name=' + $('#pokemonField').val().toLowerCase(), function(data) {
      $('#loader').hide();
      if (data) {
        pokemon = JSON.parse(data);
    
        // Create Template
        var source = $('#pokemon-template').html();
        var template = Handlebars.compile(source);
        var types = pokemon.types.map(function(item) {
          return item.type.name;
        });
        var context = { mode: 'result', id: pokemon.id, name: pokemon.name, type: types.join(' - '), image: pokemon.sprites.front_default };
        var html = template(context);
     
        $('#pokemonResult').append(html);
  
      } else {
        $('#messageFinderEmpty').show();
      }
    });

  } else {
    $('#messageFinderDefault').show();
  }
}

function addPokemon() {
  if (pokemon && team.length < 6) {
    team.push(pokemon);
    updatePokemonsList();
    saveTeam();
  } else {
    alert("Sorry, you can't have more than 6 Pokemons in your Team");
  }
}

function removePokemon(index) {
  team.splice(index, 1);
  updatePokemonsList();
  saveTeam();
}

function updatePokemonsList() {
  $('#pokemonList').empty();
  team.forEach(function(pokemon, index) {
    // Create Template
    var source = $('#pokemon-template').html();
    var template = Handlebars.compile(source);
    var types = pokemon.types.map(function(item) {
      return item.type.name;
    });
    var context = { mode: 'team', index: index, id: pokemon.id, name: pokemon.name, type: types.join(' - '), image: pokemon.sprites.front_default };
    var html = template(context);
 
    // Update UI
    $('#pokemonList').append(html);
  });

  // Update Messages
  if (team.length > 0) {
    $('#messageListEmpty').hide();
  } else {
    $('#messageListEmpty').show();
  }
}

function saveTeam() {
  let teamData = JSON.stringify(team);
  localStorage.setItem("ogirdorPokemonMaster-team", teamData);
}

function loadTeam() {
  var teamData = localStorage.getItem("ogirdorPokemonMaster-team");
  if (teamData) {
    team = JSON.parse(teamData);
  }
}
