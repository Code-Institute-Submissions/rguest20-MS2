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

function TerrorCard (title, diceroll, threatsuccess, threatfail, effect){
  this.title = title
  this.diceroll = diceroll
  this.threatsuccess = threatsuccess
  this.threatfail = threatfail
  this.effect = effect
}

let terrorcarddeck = []
for (card in terror){
  let terrorcard = new TerrorCard (terror[card]['title'], terror[card]['diceroll'], terror[card]['threatsuccess'], terror[card]['threatfail'], terror[card]['effect'])
  terrorcarddeck.push(terrorcard)
}
