document.getElementById('arkane-sign').addEventListener('click', function() {
  ArkaneConnect.signTransaction({
    type: 'ETHEREUM_TRANSACTION',
    walletId: 44,
    submit: false,
    gasPrice: 10000000000,
    gas: 23000,
    nonce: 0,
    value: 10000000000,
    data: '0x',
    to: '0xdc71b72db51e227e65a45004ab2798d31e8934c9'
  }).then(function(result) {
    console.log(result);
  }).catch(function(error) {
    console.log(error);
  });
});
