const terror = [{
  title: 'I\'ve taken more hostages',
  dicerollneeded: true,
  threatsuccess: 'extrahostage',
  threatfail: 'extrahostage',
  effect: false
},
{
  title: 'This is going nowhere',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'hostagekilled: 1'
},
{
  title: 'This is going nowhere',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'hostagekilled: 1'
},
{
  title: 'This is going nowhere',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'hostagekilled: 1'
},
{
  title: 'The situation is worsening',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'threat: 1'
},
{
  title: 'The situation is worsening',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'threat: 1'
},
{
  title: 'The situation is worsening',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'threat: 1'
},
{
  title: 'The situation is worsening',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'threat: 1'
},
{
  title: 'I\'m getting angry',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'threat: 2'
},
{
  title: 'I\'m getting angry',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'threat: 2'
},
{
  title: 'Don\'t test me',
  dicerollneeded: true,
  threatsuccess: 'noeffect',
  threatfail: 'hostagekilled',
  effect: false
},
{
  title: 'Don\'t test me',
  dicerollneeded: true,
  threatsuccess: 'noeffect',
  threatfail: 'hostagekilled',
  effect: false
},
{
  title: 'Hostage escape attempt',
  dicerollneeded: true,
  threatsuccess: 'hostageescape',
  threatfail: 'hostagekilled',
  effect: false
},
{
  title: 'I\'m getting impatient',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'timeremaining: -1'
},
{
  title: 'I\'m getting impatient',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'timeremaining: -1'
},
// {
//   'title':'Your time is running out',
//   'dicerollneeded': false,
//   'threatsuccess': false,
//   'threatfail': false,
//   'effect': 'timeremaining: half'
// },
{
  title: 'A moment of weakness',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'hostageescape: 1'
},
{
  title: 'Back to square 1',
  dicerollneeded: false,
  threatsuccess: false,
  threatfail: false,
  effect: 'threat: reset'
}]

function TerrorCard (title, diceroll, threatsuccess, threatfail, effect) {
  this.title = title
  this.diceroll = diceroll
  this.threatsuccess = threatsuccess
  this.threatfail = threatfail
  this.effect = effect
  this.play = function () {
    if (this.diceroll === false) {
      switch (this.effect) {
        case 'hostageescape: 1':
          hostagetakeringame.hostageescape()
          break
        case 'hostagekilled: 1':
          hostagetakeringame.killhostage(1)
          break
        case 'timeremaining: -1':
          events.turnsleft -= 1
          events.updatetime()
          break
        case 'threat: 1':
          threatbar.change(1)
          break
        case 'threat: 2':
          threatbar.change(2)
          break
        case 'threat: reset':
          threatbar.value = 4
          threatbar.set()
          break
        default:
          alert('This should never appear')
          break
      }
    } else {
      if (events.terrorsuccess === true) {
        events.terrorsuccess = false
        switch (this.threatsuccess) {
          case 'extrahostage':
            hostagetakeringame.addhostage(1)
            break
          case 'hostageescape':
            hostagetakeringame.hostageescape()
            break
          case 'noeffect':
            break
          default:
            alert('This should never appear')
            break
        }
      } else {
        switch (this.threatfail){
          case 'extrahostage':
            hostagetakeringame.addhostage(2)
            break
          case 'hostagekilled':
            hostagetakeringame.killhostage(1)
            break
          case 'noeffect':
            break
          default:
            alert('This should never appear')
            break
        }
      }
    }
    events.phaseone()
    events.currentterror = {}
  }
}

let terrorcarddeck = []
for (card in terror) {
  let terrorcard = new TerrorCard(terror[card]['title'], terror[card]['dicerollneeded'], terror[card]['threatsuccess'], terror[card]['threatfail'], terror[card]['effect'])
  terrorcarddeck.push(terrorcard)
}

function shuffle (o) {
  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
    return o
  }
}

shuffle(terrorcarddeck)
