const commands = require('probot-commands')
const Twitter = require('twitter')
const keys = require('./keys')

var client = new Twitter({
  consumer_key: keys.CONSUMER_KEY,
  consumer_secret: keys.CONSUMER_SECRET,
  access_token_key: keys.ACCESS_TOKEN_KEY,
  access_token_secret: keys.ACCESS_TOKEN_SECRET
})

module.exports = (robot) => {
  // Your code here
  robot.log('Yay, the app was loaded!');

  robot.on('issues.opened', async context => {
    //consolet.log(context);
    const params = context.issue({labels: ['help wanted']})
    //Post a tweet when an issue is opened
    client.post('statuses/update', {status: `Pull request opened in ${context.payload.repository.full_name}!\n-`}, (err, tweet, res) => {
      if(err) throw err
      console.log(tweet)
      console.log(res)
    })
    //Create label
    return context.github.issues.addLabels(params)
  })

  robot.on('issue_comment.created', async context => {
    //TODO
  })
  
  //Listen for command /assign
  commands(robot,'assign',(context,command) => {
    //return context.github.issues.addLabels(context.issue({labels: ['assigned']}))
    robot.log(`payload: ${context.payload}`)
    return context.github.issues.addAssigneesToIssue(context.issue({assignees: [`${context.payload.sender.login}`]}))
  })

  //TODO: Listen for command /unassign
  commands(robot, 'unassign',(context,command) => {
    let assignee = '';
    const check = context.issue.checkAssignee(context.issue({assignee: `${context.payload.sender.login}`}))
    if(check == 1) {
      assignee = context.payload.sender.login
    }
    return context.github.issues.removeAssigneesFromIssue(context.issue({assignees: [`${assignee}`]}))
  })

}