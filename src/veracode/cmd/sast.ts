
exports.command = 'sast <command>'
exports.desc = 'Availavle Static commands'
exports.builder = function (yargs:any) {
  return yargs
    .commandDir('sast_cmds');
}
exports.handler = function (argv:string[]) {}

