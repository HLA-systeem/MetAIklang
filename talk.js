let Wit = null;
let interactive = null;

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('keep at it');
    process.exit(1);
  }
  return process.argv[2];
})();

const WIT = new Wit({
    witKey: require('./settings/botSettings.json').witKey
});

interactive(WIT);

WIT.message('say hello world', {})
.then((data) => {
  console.log('got Wit.ai response: ' + JSON.stringify(data));
})
.catch(console.error);