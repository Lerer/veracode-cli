
exports.command = 'sca <command>'
exports.desc = 'All availavle SCA commands'
exports.builder = function (yargs:any) {
  return yargs
    .commandDir('sca_cmds');
}
exports.handler = function (argv:string[]) {}

export interface outputWS  {
  name:string;
  guid: string;
  id:string;
  projects_count: number;

};