let demands = [
  {
    'type': 'Ann',
    'title': 'Give me $1000!',
    'text': '"I want $1000 to replace my toaster...and pay for the insult.  I might consider letting these people go if you do that!! I also want to be let go."',
    'concedecost': 0,
    'concede': {'hostage': 1},
    'penalty': {'timeleft': 0}
  },
  {
    'type': 'Arkayne',
    'title': 'Wire $10,000,000',
    'text': '"10 million! That\'s what it\'ll cost ya to get your people.  Think it over."',
    'concedecost': 4,
    'concede': {'hostage': 2},
    'penalty': {'dicepermanent': -1}
  },
  {
    'type': 'Arkayne',
    'title': 'Release Fugitives',
    'text': '"My team! Ya better release them!  Then we can talk!"',
    'concedecost': 4,
    'concede': {'freecard': 2},
    'penalty': {'threatmultiplier': 2}
  },
  {
    'type': 'Arkayne',
    'title': 'Supply of Weapons',
    'text': '"If ya can provide me guns and ammo, I\'ll consider ya request."',
    'concedecost': 4,
    'concede': {'hostage': 1, 'threat': -2},
    'penalty': {'threatincreaseperturn': 2}
  },
  {
    'type': 'Escape',
    'title': 'Helicopter',
    'text': '"I wanna chopper to leave!"',
    'concedecost': 4,
    'concede': {'dice': 2},
    'penalty': {'timeleft': 0}
  },
  {
    'type': 'Escape',
    'title': 'School bus',
    'text': '"I wanna bus to get out of here!"',
    'concedecost': 4,
    'concede': {'hostage':1,'dice': 1},
    'penalty': {'timeleft': 0}
  },
  {
    'type': 'Escape',
    'title': 'Armoured Truck',
    'text': '"Get me an armoured truck.  I want out of this!"',
    'concedecost': 4,
    'concede': {'freecard':1, 'dice': 1},
    'penalty': {'timeleft': 0}
  }
]

function DemandCard (type, title, text, cost, concedebonus, concedepenalty){
  this.type = type
  this.title = title
  this.text = text
  this.cost = cost
  this.concedebonus = concedebonus
  this.concedepenalty = concedepenalty
}

let demandcards = []
for (card in demands){
  let demandcardindividual = new DemandCard(demands[card]['type'], demands[card]['title'],demands[card]['text'],demands[card]['concedecost'],demands[card]['concede'],demands[card]['penalty'])
  demandcards.push(demandcardindividual)
}
