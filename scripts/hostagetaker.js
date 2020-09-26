let hostagetakerdata = [
  {
    'name': 'Ann Greashopper', 'description': 'After being unable to return her defective toaster, Ann seems to have lost it completely and returned to hold the shop owner and his wife hostage.  <br><br>Time for you to do your thing, Cap!', 'numberofhostages': 2
  },
  {
    'name': 'Arkayne Massua', 'description': 'A member of a radical cell, Arkayne was none too pleased when we arrested the rest of his group.  He\'s now taken some of our diplomats hostage as leverage to get what he wants.<br><br> I don\'t envy you this one, Cap!', 'numberofhostages': 7
  }
]

function HostageTaker(name, description, hostagenumber, extrarule){
  this.name = name
  this.description = description
  this.number = hostagenumber
  this.extrarule = extrarule
  this.sethostages = function(saved, alive, dead){
    let hostagedataset = hostagechart['data']["datasets"][0]["data"]
    hostagedataset[0] = saved
    hostagedataset[1] = alive
    hostagedataset[2] = dead
    hostagechart.update()
  }
  this.addhostage = function (amount) {
    let hostagedataset = hostagechart['data']["datasets"][0]["data"]
    hostagedataset[1] += amount
    this.number += amount
    hostagechart.update()
  }
  this.killhostage = function (amount) {
    let hostagedataset = hostagechart['data']["datasets"][0]["data"]
    hostagedataset[2] += amount
    hostagedataset[1] -= amount
    hostagechart.update()
  }
  this.hostageescape = function(amount){
    let hostagedataset = hostagechart['data']["datasets"][0]["data"]
    hostagedataset[0] += amount
    hostagedataset[1] -= amount
    hostagechart.update()
  }
}

let hostagetakerarray= []
for (person in hostagetakerdata){
  let hostagetakerindividual = new HostageTaker (hostagetakerdata[person]['name'], hostagetakerdata[person]['description'], hostagetakerdata[person]['numberofhostages'], hostagetakerdata[person]['extrarule'] = "none")
  hostagetakerarray.push(hostagetakerindividual)
}

//create chart for interface
let chartposition = $('#hostages_data_display');
let hostagechart = new Chart(chartposition, {
  type: 'doughnut',
  data: {
    labels: [
      'Saved',
      'Alive',
      'Dead',
    ],
    datasets: [{
      data: [1,0,0],
      backgroundColor: [
        'rgba(0, 255, 0, 0.2)',
        'rgba(0, 0 , 255, 0.2)',
        'rgba(255, 0 ,0 , 0.2)'
      ],
    }]
  },
  options: {
    responsive: true,
    legend: false
  }
})
