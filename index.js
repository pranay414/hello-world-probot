const commands = require('probot-commands');

module.exports = (robot) => {
  // Your code here
  robot.log('Yay, the app was loaded!');

  robot.on('issues.opened', async context => {
    //consolet.log(context);
    const params = context.issue({labels: ['help wanted']})
    //Create label
    return context.github.issues.addLabels(params)
  })

  robot.on('issue_comment.created', async context => {

  })
  
  //Listen for command /assign
  commands(robot,'assign',(context,command) => {
    //return context.github.issues.addLabels(context.issue({labels: ['assigned']}))
    robot.log(`payload: ${context.payload}`)
    return context.github.issues.addAssigneesToIssue(context.issue({assignees: [`${context.payload.sender.login}`]}))
  })

  //Listen for command /unassign
  commands(robot, 'unassign',(context,command) => {
    let assignee = '';
    const check = context.issue.checkAssignee(context.issue({assignee: `${context.payload.sender.login}`}))
    if(check == 1) {
      assignee = context.payload.sender.login
    }
    return context.github.issues.removeAssigneesFromIssue(context.issue({assignees: [`${assignee}`]}))
  })
  
}