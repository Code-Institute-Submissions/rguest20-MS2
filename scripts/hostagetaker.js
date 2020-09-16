let hostagetaker = [
  {
    'name': 'Ann Greashopper', 'description': 'After being unable to return her defective toaster, Ann seems to have lost it completely and returned to hold the shop owner and his wife hostage.  <br><br>Time for you to do your thing, Cap!'
  },
  {
    'name': 'Arkayne Massua', 'description': 'A member of a radical cell, Arkayne was none too pleased when we arrested the rest of his group.  He\'s now taken some of our diplomats hostage as leverage to get what he wants.<br><br> I don\'t envy you this one, Cap!'
  }
]

function HostageTaker(name, description, extrarule){
  this.name = name
  this.description = description
  this.extrarule = extrarule
}
let hostagetakerarray= []
for (hostage in hostagetaker){
  let hostagetakerindividual = new HostageTaker (hostagetaker[hostage]['name'], hostagetaker[hostage]['description'], hostagetaker['extrarule'] = "none")
  hostagetakerarray.push(hostagetakerindividual)
}
