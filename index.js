const commands = require('probot-commands');

module.exports = (robot) => {
  // Your code here
  robot.log('Yay, the app was loaded!');
/*   robot.on('issues.opened', async context => {
    const params = context.issue({body: 'Thanks for reporting! We\'ll look into this'});
    //Post comment
    return context.github.issues.createComment(params);
  }); */
  robot.on('issues.opened', async context => {
    //consolet.log(context);
    const params = context.issue({labels: ['help wanted']})
    //Create label
    return context.github.issues.addLabels(params)
  })
  
  //Listen for commands like /assign
  commands(robot,'assign',(context,command) => {
    //return context.github.issues.addLabels(context.issue({labels: ['assigned']}))
    return context.github.issues.addAssigneesToIssue(context.issue({assignees: [`${context.user}`]}))
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}