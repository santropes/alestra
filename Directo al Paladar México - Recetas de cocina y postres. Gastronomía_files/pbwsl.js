async function passback(partner,web,slot) {
  var queryString = top.window.location.search;var urlParams = new URLSearchParams(queryString)


  var refreshloops = 1
  var slots = top.googletag.pubads().getSlotIdMap();
  slotIdCode = keys = Object.keys(slots)[0].slice(-2)
  slotparse = "/1018282/"+slot+slotIdCode
  top.window.slotrefresh =  slots[slotparse];
  listslot = slot.split("-")

  if (listslot[1] == 'M') {
  a = listslot[1]
  b = listslot[2]
  div =  'div-gpt-'+ a + '-' + b
  pos = b
  pos = pos.toLowerCase()
  div = div.toLowerCase()
} else {
  a = listslot[1]
  div =  'div-gpt-'+ a
  pos = a
  pos = pos.toLowerCase()
  div = div.toLowerCase()
}
top.document.getElementById(div).style.display = 'none'
    //console.log(empl)
    //console.log('1')
  var slottorefresh = async function () {
    var partners = top.slotrefresh.getTargeting('passback_partner');
    partners.push(partner);
    loop = top.slotrefresh.getTargeting('passback_loop');

    if (loop == 1){
      top.document.getElementById(div).style.display = 'none'    
      return
    }
    
    if (pos != 'top' && pos != 'top3' && pos !='lat2' && pos != 'lat' && pos != 'cen' && pos != 'cen2' && pos != 'bot'){
        top.document.getElementById(div).style.display = 'none'  
        return
    }

    top.slotrefresh.setTargeting('passback_loop', 1)
    top.slotrefresh.setTargeting('adunit', slot)
    top.slotrefresh.setTargeting('passback_partner', partners);
    top.slotrefresh.setTargeting('passback_status', 'si');
    top.slotrefresh.setCategoryExclusion('Direct');
    top.slotrefresh.setCategoryExclusion(partner);
    top.slotrefresh.addService(top.googletag.pubads());
    //console.log('2')
    return top.slotrefresh
  }

  function refreshBid(r) {
                  top.pbjs.que.push(function() {
                      top.pbjs.requestBids({
                          timeout: 2000,
                          adUnitCodes: [div],
                          bidsBackHandler: function() {
                              top.pbjs.setTargetingForGPTAsync([div]);
                              top.googletag.pubads().refresh([r]);
                          }
                      });
                  });
              }


  slottorefresh().then(r => {

    if (r && urlParams.get('equipazo_debug') == "dev") {
      //withheaderbidding
      console.log('Slot refreshed with position ',slot,' from ', partner, '`s creative [PBJS refresh active]')
      refreshBid(r)

    } else if (r && urlParams.get('equipazo_debug')){
      //withoutheaderbidding
      console.log('Slot refreshed with position ',slot,' from ', partner, '`s creative [PBJS refresh unactive]')
      top.googletag.pubads().refresh([r])
    } else if (r){
       top.googletag.pubads().refresh([r])
        
    }
  })


}
