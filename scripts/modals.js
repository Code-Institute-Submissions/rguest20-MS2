function ModalHandler(){
  this.fourtofivepopup = function(){
    if (events.fourtofiveconversion === true) {
      for (i=0; i<dice.number; i++){
        if (dice.randomnumber[i] === 4){
          dice.randomnumber[i] = 5
          $('#dice' + (i+1)).removeClass('spintoright')
          $('#dice' + (i+1)).addClass('spintobottom')
          break
        }
      }
      $('#fourtofivebutton').prop('disabled', true)
      for (i=0; i<dice.number; i++){
        if (dice.randomnumber[i] === 4){
          buttondisable2()
          break
        }
      }
    }else{
      $('#4sto5smainbody').empty()
      for (card in player.hand){
        $('#4sto5smainbody').append('<input type="checkbox" onclick = "countboxes()" id="' + conversationcards[player.hand[card]-1].title +  '" name="' + conversationcards[player.hand[card]-1].title + '"<label for="' + conversationcards[player.hand[card]-1].title + '">' + conversationcards[player.hand[card]-1].title + '</label><br>')
      }
      for (i=0; i<dice.number; i++){
        if (dice.randomnumber[i] === 4){
          $('#4to5modal').modal({'backdrop':false, 'keyboard':false})
          $('#discardbutton').prop('disabled', true)
          break
        }
      }
    }
  }
}

let modals = new ModalHandler
