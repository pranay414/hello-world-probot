const commands = require('probot-commands')
const twitter = require('twitter')

var client = new Twitter({
  consumer_key: 'RkAhdeURYLmpxRXiLaoziYxaM',
  consumer_secret: '7ZP7hmWDT1CAIS0C1biYb3Wam5CXdeWsz9I1xEsZcBUDUcIRuI',
  access_token_key: '811290673643159554-chPrdXO0hKW7CqyUHgiuhQkpTFdQr1D',
  access_token_secret: 'ggBCkmklItrhMnI9d1G7metBXynVvixiFC5IkLE0JaoSY'
})

module.exports = (robot) => {
  // Your code here
  robot.log('Yay, the app was loaded!');

  robot.on('issues.opened', async context => {
    //consolet.log(context);
    const params = context.issue({labels: ['help wanted']})
    //Post a tweet when an issue is opened
    client.post('statuses/update', {status: 'Pull request opened in DiaBeat!'}, (err, tweet, res) => {
      if(err) throw err
      console.log(tweet)
      console.log(res)
    })
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

  comment(robot,'assign',(context,command) => {
    return context.github.issues.addLabels(context.issue({labels: ['assigned']}))
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