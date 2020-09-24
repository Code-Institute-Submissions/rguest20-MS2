let demands = [
  {
    'id': 1,
    'type': 'Ann',
    'title': 'Give me $1000!',
    'text': '"I want $1000 to replace my toaster...and pay for the insult.  I might consider letting these people go if you do that!! I also want to be let go."',
    'concedecost': 0,
    'concede': {'hostage': 1},
    'penalty': {'timeleft': 0}
  },
  {
    'id': 2,
    'type': 'Arkayne',
    'title': 'Wire $10,000,000',
    'text': '"10 million! That\'s what it\'ll cost ya to get your people.  Think it over."',
    'concedecost': 4,
    'concede': {'hostage': 2},
    'penalty': {'dicepermanent': -1}
  },
  {
    'id': 3,
    'type': 'Arkayne',
    'title': 'Release Fugitives',
    'text': '"My team! Ya better release them!  Then we can talk!"',
    'concedecost': 4,
    'concede': {'freecard': 2},
    'penalty': {'threatmultiplier': 2}
  },
  {
    'id': 4,
    'type': 'Arkayne',
    'title': 'Supply of Weapons',
    'text': '"If ya can provide me guns and ammo, I\'ll consider ya request."',
    'concedecost': 4,
    'concede': {'hostage': 1, 'threat': -2},
    'penalty': {'threatincreaseperturn': 2}
  },
  {
    'id': 5,
    'type': 'Escape',
    'title': 'Helicopter',
    'text': '"I wanna chopper to leave!"',
    'concedecost': 4,
    'concede': {'dice': 2},
    'penalty': {'timeleft': 0}
  },
  {
    'id': 6,
    'type': 'Escape',
    'title': 'School bus',
    'text': '"I wanna bus to get out of here!"',
    'concedecost': 4,
    'concede': {'hostage':1,'dice': 1},
    'penalty': {'timeleft': 0}
  },
  {
    'id': 7,
    'type': 'Escape',
    'title': 'Armoured Truck',
    'text': '"Get me an armoured truck.  I want out of this!"',
    'concedecost': 4,
    'concede': {'freecard':1, 'dice': 1},
    'penalty': {'timeleft': 0}
  }
]

function DemandCard (id, type, title, text, cost, concedebonus, concedepenalty){
  this.id = id
  this.type = type
  this.title = title
  this.text = text
  this.cost = cost
  this.concedebonus = concedebonus
  this.concedepenalty = concedepenalty
  this.setreward = function () {
    let rewards= []
    if ('hostage' in this.concedebonus){
      rewards.push('Hostages Released: ' + this.concedebonus['hostage'])
    }
    if ('freecard' in this.concedebonus){
      rewards.push('Number of Free Cards: ' + this.concedebonus['freecard'])
    }
    if ('dice' in this.concedebonus){
      rewards.push('Extra Dice: ' + this.concedebonus['dice'])
    }
    if ('threat' in this.concedebonus){
      rewards.push('Threat Change: ' + this.concedebonus['threat'])
    }
    return rewards
  }
  this.setpenalty = function(){
    let penalty = []
    if ('timeleft' in this.concedepenalty){
      demand1penalty.push('Abductor will escape at the end of the turn')
    }
    if ('dicepermanent' in this.concedepenalty){
      demand1penalty.push('1 Less Die Permanently')
    }
    if ('threatmultiplier' in this.concedepenalty){
      demand1penalty.push('Threat Increases are Doubled Permanently')
    }
    if ('threatincreaseperturn' in this.concedepenalty){
      demand1penalty.push('Threat Increases by 2 Per Turn Permanently')
    }
    return penalty
  }
  this.setcards = function (firstid = 1, secondid = 6){
    $('#demand1title').html(demandcards[firstid-1].title)
    $('#demand1cost').html(' CP to concede: ' + demandcards[firstid-1].cost)
    for (i=0; i<demandcards[firstid-1].setreward.length; i++){
      $('#demand1reward').append(demandcards[firstid-1].setreward[i])
    }
    $('#demand1penalty').html('HOWEVER ' + demandcards[firstid-1].setpenalty)
    $('#demand2title').html(demandcards[secondid-1].title)
    $('#demand2cost').html(' CP to concede: ' + demandcards[secondid-1].cost)
    for (i=0; i<demandcards[secondid-1].setreward.length; i++){
      $('#demand2reward').append(demandcards[secondid-1].setreward[i])
    }
    $('#demand2penalty').html('HOWEVER ' + demandcards[secondid-1].setpenalty)
  }
}



let demandcards = []
for (card in demands){
  let demandcardindividual = new DemandCard(demands[card]['id'], demands[card]['type'], demands[card]['title'],demands[card]['text'],demands[card]['concedecost'],demands[card]['concede'],demands[card]['penalty'])
  demandcards.push(demandcardindividual)
}
