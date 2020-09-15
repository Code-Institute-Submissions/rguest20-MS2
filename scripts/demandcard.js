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

let terror = [{
    'title':'I\'ve taken more hostages',
    'dicerollneeded': true,
    'threatsuccess': 'extrahostage',
    'threatfail': 'extrahostage',
    'effect': false
  },
  {
    'title':'This is going nowhere',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'hostagekilled: 1'
  },
  {
    'title':'This is going nowhere',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'hostagekilled: 1'
  },
  {
    'title':'This is going nowhere',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'hostagekilled: 1'
  },
  {
    'title':'The situation is worsening',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'threat: 1'
  },
  {
    'title':'The situation is worsening',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'threat: 1'
  },
  {
    'title':'The situation is worsening',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'threat: 1'
  },
  {
    'title':'The situation is worsening',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'threat: 1'
  },
  {
    'title':'I\'m getting angry',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'threat: 2'
  },
  {
    'title':'I\'m getting angry',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'threat: 2'
  },
  {
    'title':'Don\'t test me',
    'dicerollneeded': true,
    'threatsuccess': 'noeffect',
    'threatfail': 'hostagekilled',
    'effect': false
  },
  {
    'title':'Don\'t test me',
    'dicerollneeded': true,
    'threatsuccess': 'noeffect',
    'threatfail': 'hostagekilled',
    'effect': false
  },
  {
    'title':'Hostage escape attempt',
    'dicerollneeded': true,
    'threatsuccess': 'hostageescape',
    'threatfail': 'hostagekilled',
    'effect': false
  },
  {
    'title':'I\'m getting impatient',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'timeremaining: -1'
  },
  {
    'title':'I\'m getting impatient',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'timeremaining: -1'
  },
  // {
  //   'title':'Your time is running out',
  //   'dicerollneeded': false,
  //   'threatsuccess': false,
  //   'threatfail': false,
  //   'effect': 'timeremaining: half'
  // },
  {
    'title':'A moment of weakness',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'hostageescape: 1'
  },
  {
    'title':'Back to square 1',
    'dicerollneeded': false,
    'threatsuccess': false,
    'threatfail': false,
    'effect': 'threat: reset'
  }
]


function DemandCard (title, diceroll, threatsuccess, threatfail, effect){
  this.title = title
  this.diceroll = diceroll
  this.threatsuccess = threatsuccess
  this.threatfail = threatfail
  this.effect = effect
}

let demandcards = []
for (card in demands){
  let demandcardindividual = new DemandCard(demands[card]['title'],demands[card]['diceroll'],demands[card]['threatsuccess'],demands[card]['threatfail'],demands[card]['effect'])
  demandcards.push(demandcardindividual)
}
