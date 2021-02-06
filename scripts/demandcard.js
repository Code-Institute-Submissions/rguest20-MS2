const demands = [
  {
    'id': 1,
    'type': 'Ann',
    'title': 'Give me $1000!',
    'text': '"I want $1000 to replace my toaster...and pay for the insult.  I might consider letting these people go if you do that!! I also want to be let go."',
    'concedecost': 0,
    'concede': { 'hostage': 1 },
    'penalty': { 'timeleft': 0 }
  },
  {
    'id': 2,
    'type': 'Arkayne',
    'title': 'Wire $10,000,000',
    'text': '"10 million! That\'s what it\'ll cost ya to get your people.  Think it over."',
    'concedecost': 4,
    'concede': { 'hostage': 2 },
    'penalty': { 'dicepermanent': -1 }
  },
  {
    'id': 3,
    'type': 'Arkayne',
    'title': 'Release Fugitives',
    'text': '"My team! Ya better release them!  Then we can talk!"',
    'concedecost': 4,
    'concede': { 'freecard': 2 },
    'penalty': { 'threatmultiplier': 2 }
  },
  {
    'id': 4,
    'type': 'Arkayne',
    'title': 'Supply of Weapons',
    'text': '"If ya can provide me guns and ammo, I\'ll consider ya request."',
    'concedecost': 4,
    'concede': { 'hostage': 1, 'threat': -2 },
    'penalty': { 'threatincreaseperturn': 2 }
  },
  {
    'id': 5,
    'type': 'Escape',
    'title': 'Helicopter',
    'text': '"I wanna chopper to leave!"',
    'concedecost': 4,
    'concede': { 'dice': 2 },
    'penalty': { 'timeleft': 0 }
  },
  {
    'id': 6,
    'type': 'Escape',
    'title': 'School bus',
    'text': '"I wanna bus to get out of here!"',
    'concedecost': 4,
    'concede': { 'hostage': 1, 'dice': 1 },
    'penalty': { 'timeleft': 0 }
  },
  {
    'id': 7,
    'type': 'Escape',
    'title': 'Armoured Truck',
    'text': '"Get me an armoured truck.  I want out of this!"',
    'concedecost': 4,
    'concede': { 'freecard': 1, 'dice': 1 },
    'penalty': { 'timeleft': 0 }
  }
]

function DemandCard (id, type, title, text, cost, concedebonus, concedepenalty) {
  this.id = id
  this.type = type
  this.title = title
  this.text = text
  this.cost = cost
  this.concedebonus = concedebonus
  this.concedepenalty = concedepenalty
  this.rewards = []
  this.setreward = function () {
    if ('hostage' in this.concedebonus) {
      this.rewards.push('Hostages Released: ' + this.concedebonus['hostage'])
    }
    if ('freecard' in this.concedebonus) {
      this.rewards.push('Number of Free Cards: ' + this.concedebonus['freecard'])
    }
    if ('dice' in this.concedebonus) {
      this.rewards.push('Extra Dice: ' + this.concedebonus['dice'])
    }
    if ('threat' in this.concedebonus) {
      this.rewards.push('Threat Change: ' + this.concedebonus['threat'])
    }
  }
  this.setpenalty = function () {
    let penalty = []
    if ('timeleft' in this.concedepenalty) {
      penalty.push('Abductor will escape at the end of the turn')
    }
    if ('dicepermanent' in this.concedepenalty) {
      penalty.push('1 Less Die Permanently')
    }
    if ('threatmultiplier' in this.concedepenalty) {
      penalty.push('Threat Increases are Doubled Permanently')
    }
    if ('threatincreaseperturn' in this.concedepenalty) {
      penalty.push('Threat Increases by 2 Per Turn Permanently')
    }
    return penalty
  }
  this.concede = function (cardnumber) {
    if ('hostage' in this.concedebonus) {
      let hostagessaved = this.concedebonus['hostage']
      hostagetakeringame.hostageescape(hostagessaved)
    }
    if ('freecard' in this.concedebonus) {
      player.freecard = this.concedebonus['freecard']
    }
    if ('dice' in this.concedebonus) {
      moredice(this.concedebonus['dice'])
    }
    if ('threat' in this.concedebonus) {
      threatbar.change(-this.concedebonus['threat'])
    }
    if ('timeleft' in this.concedepenalty) {
      events.turnsleft = 0
      events.updatetime()
    }
    if ('dicepermanent' in this.concedepenalty) {
      diceingame.permanentchange -=1
      diceingame.set()
    }
    if ('threatmultiplier' in this.concedepenalty) {
      threatbar.threatdouble = true
    }
    if ('threatincreaseperturn' in this.concedepenalty) {
      events.threatperturn = 2
    }
  }
}

let demandcards = []
for (card in demands) {
  let demandcardindividual = new DemandCard(demands[card]['id'], demands[card]['type'], demands[card]['title'], demands[card]['text'], demands[card]['concedecost'], demands[card]['concede'], demands[card]['penalty'])
  demandcards.push(demandcardindividual)
}
demandcardsingame = []
