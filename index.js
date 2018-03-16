module.exports = (robot) => {
  // Your code here
  robot.log('Yay, the app was loaded!');
/*   robot.on('issues.opened', async context => {
    const params = context.issue({body: 'Thanks for reporting! We\'ll look into this'});
    //Post comment
    return context.github.issues.createComment(params);
  }); */
  robot.on('issues.opened', async context => {
    console.log(context);
    const params = context.issue({name: 'help wanted', color: '3BB273'});
    //Create label
    return context.github.issues.createLabel(params);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}